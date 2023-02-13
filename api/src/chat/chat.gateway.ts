import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { UserDto } from './dto/user.dto';
import { Server, Socket } from 'socket.io';


import { Message } from './dto/message.dto';
import { Room } from './dto/room.dto';
import { ChatResponse } from './dto/chat_response.dto';

@WebSocketGateway({ cors: { origin: '*' } }) // a voir pour autoriser une liste de CORS directement via Nginx
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	users: number = 0;
	constructor(private readonly chatService: ChatService) { }


	handleConnection(): void {

	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {

	}

	// @SubscribeMessage('findAllUsers')
	// findAllUsers(): UserDto[] {
	// 	return this.chatService.findAllUsers();
	// }

	// // get old messages
	// @SubscribeMessage('findAllMessages')
	// findAllMessages(): MessageDto[] {
	// 	return this.chatService.findAllMessages();
	// }

	
	@SubscribeMessage('joinRoom')
	// async joinRoom(@MessageBody('room') room: string, @ConnectedSocket() client: Socket): Promise<RoomResponse | undefined> {
	async joinRoom(client: Socket, body: { room: string }): Promise<ChatResponse<Room>> {

		return (this.chatService.joinRoom(client, body.room))
	}




	// // alert when typing/stop typing
	// @SubscribeMessage('typing')
	// async typing(@MessageBody('name') userTyping: string, @MessageBody('isTyping') isTyping: boolean): Promise<void> {
	// 	// add the user typing to datastorage
	// 	await this.chatService.userIsTyping(userTyping, isTyping);

	// 	// notifie les users de la liste des users entrain d'ecrire 
	// 	// (A VOIR SI ON VEUT PAS RENVOYER JUSTE LE USER QUI COMMENCE/ARRETE A ECRIRE ET LAISSER LE CLIENT GERER LE TABLEAU)
	// 	this.server.emit('typing', this.chatService.findAllUsersTyping());
	// }

	// create and send message
	@SubscribeMessage('createMessage')
	// async create(@MessageBody() input: MessageDto, @ConnectedSocket() client: Socket): Promise<MessageDto> {
	async createMessage(client: Socket, body: { room: string, message: Message }): Promise<ChatResponse<undefined>> {

		let res = new ChatResponse<undefined>();
		
		//Check if user can send in room
		if (1 == 1)
		{
			this.server.emit('broadcastMessage', { room: body.room, message: body.message });
		}

		return (res);
	}
}
