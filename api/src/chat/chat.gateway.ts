import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WebSocketServer,
	ConnectedSocket,
	OnGatewayConnection,
	OnGatewayDisconnect, 
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway( {cors: { origin: '*' }} ) // a voir pour autoriser une liste de CORS directement via Nginx
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
	@WebSocketServer() server: Server;
	users: number = 0;
	constructor(private readonly chatService: ChatService) {}

	// handleConnection() and handleDisconnect() hooks will be triggered every time a client connects or disconnects
	async handleConnection(): Promise<void> {
		// A client has connected
		this.users++;

		// Notify connected clients of current users
		this.server.emit('users', this.users);
	}

	async handleDisconnect(): Promise<void> {
		// A client has disconnected
		this.users--;

		// Notify connected clients of current users
		this.server.emit('users', this.users);
	}

    // get old messages
	@SubscribeMessage('findAllMessages')
	async findAll(): Promise<MessageDto[]> {
		return this.chatService.findAll();
	}
  
	// async joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket): Promise<void> {
	// join and identify myself (store name-socket) (VALEUR/EVENT PAS UTILISÉ POUR L'INSTANT)
	@SubscribeMessage('join')
	joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket): IterableIterator<string> {
		return this.chatService.identify(name, client.id);
		// this.chatService.identify(name, client.id);
		// this.server.emit('join', name);

		// return this.chatService.getClientName(client.id);
	}

	// alert when typing/stop typing
	@SubscribeMessage('typing')
	async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket): Promise<void> {
		const name: string | undefined = await this.chatService.getClientName(client.id);
		
		// broadcoast.emit alerts everybody except myself
		client.broadcast.emit('typing', {name, isTyping});
	}

	// create and send message
	@SubscribeMessage('createMessage')
	async create(@MessageBody() input: MessageDto, @ConnectedSocket() client: Socket): Promise<MessageDto> {
		// add the new message to datastorage
		const newMessage: MessageDto = await this.chatService.create(input, client.id);
		
		// notify all the clients connected to the websocket that there is a new msg
		this.server.emit('message', newMessage);

		return newMessage;
	}

}
