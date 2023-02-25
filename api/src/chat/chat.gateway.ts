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
import { UserDto } from './dto/user.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway( {cors: { origin: '*' }} ) // a voir pour autoriser une liste de CORS directement via Nginx
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
	@WebSocketServer() server: Server;
	users: number = 0;
	constructor(private readonly chatService: ChatService) {}

	// handleConnection() and handleDisconnect() hooks will be triggered every time a client connects or disconnects
	handleConnection(): void {
		// A client has connected
		this.users++;

		// Notify connected clients of current users
		this.server.emit('users', this.users);
	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {
		// A client has disconnected
		this.users--;

		// Notify connected clients of current users
		this.server.emit('users', this.users);

		// remove the client from the memory list of people connected
		this.chatService.quitChat(client.id);
		
		// notify the client about the user left
		this.server.emit('disconect', client.id);
	}

	@SubscribeMessage('findAllUsers')
	findAllUsers(): UserDto[] {
		return this.chatService.findAllUsers();
	}

    // get old messages
	@SubscribeMessage('findAllMessages')
	findAllMessages(): MessageDto[] {
		return this.chatService.findAllMessages();
	}
  
	// join and identify myself (store name-socket)
	@SubscribeMessage('join')
	async joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket): Promise<boolean> {
		// inscrit le client et son socket id en memoire
		await this.chatService.identify(name, client.id);

		// notifie les autres users du nouvel user connecte
		const id: string = client.id;
		this.server.emit('join', {id, name});

		return true;
	}

	// alert when typing/stop typing
	@SubscribeMessage('typing')
	async typing(@MessageBody('name') userTyping: string, @MessageBody('isTyping') isTyping: boolean): Promise<void>
	{
		// add the user typing to datastorage
		await this.chatService.userIsTyping(userTyping, isTyping);
		
		// notifie les users de la liste des users entrain d'ecrire 
		// (A VOIR SI ON VEUT PAS RENVOYER JUSTE LE USER QUI COMMENCE/ARRETE A ECRIRE ET LAISSER LE CLIENT GERER LE TABLEAU)
		this.server.emit('typing', this.chatService.findAllUsersTyping());
	}

	// create and send message
	@SubscribeMessage('createMessage')
	async create(@MessageBody() input: MessageDto, @ConnectedSocket() client: Socket): Promise<MessageDto> {
		// add the new message to datastorage
		const newMessage: MessageDto = await this.chatService.create(input, client.id);
		
		// notify all the users connected to the websocket that there is a new msg
		this.server.emit('message', newMessage);

		return newMessage;
	}
}
