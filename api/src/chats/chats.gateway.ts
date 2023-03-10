import { Request } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

import { ChatResponse } from './dto/chat-response.dto';
import { ChatMessage } from './dto/chat-message.dto';
import { ChatRoom } from './dto/chat-room.dto';
import { AllowLogged } from 'src/auth/auth.decorators';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { connect } from 'http2';


// @WebSocketGateway({ path: 'chat', cors: { origin: '*' } })
@WebSocketGateway({ path: '/chat/', cors: { origin: '*' } })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	constructor(private readonly chatsService: ChatsService) { }


	handleConnection(@Request() req: any, @ConnectedSocket() client: Socket): void {
		console.log('handle Connection', client);

		// let responseMessage = new ChatMessage();
		// responseMessage.id = -1;
		// responseMessage.senderDiplayName = 'Server';
		// responseMessage.senderId = -1;
		// responseMessage.content = 'Command done';

		// client.emit('broadcastMessage', { room: 'body.room', message: responseMessage });
	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {

		this.chatsService.disconnect(client);
	}


	@SubscribeMessage('identify')
	// async joinRoom(@MessageBody('room') room: string, @ConnectedSocket() client: Socket): Promise<RoomResponse | undefined> {
	async identify(client: Socket, @Request() req: any, body: {}) {


		console.log('get identify');

		let responseMessage = new ChatMessage();
		responseMessage.id = -1;
		responseMessage.senderDiplayName = 'Server';
		responseMessage.senderId = -1;
		responseMessage.content = 'Command done';

		// client.emit('broadcastMessage', { room: 5, message: responseMessage });

		this.server.emit('broadcastMessage', { room: 30, message: responseMessage });

		// this.chatsService.identify(req.user as LoggedUserDto, client);
	}


	@SubscribeMessage('connectRoom')
	// async joinRoom(@MessageBody('room') room: string, @ConnectedSocket() client: Socket): Promise<RoomResponse | undefined> {
	async connectRoom(client: Socket, @Request() req: any, body: { room: number }): Promise<ChatResponse<ChatRoom>> {

		return (this.chatsService.connectRoom(req.user as LoggedUserDto, client, body.room))
	}




	// create and send message
	@SubscribeMessage('createMessage')
	// async create(@MessageBody() input: MessageDto, @ConnectedSocket() client: Socket): Promise<MessageDto> {
	async createMessage(client: Socket, body: { room: number, message: ChatMessage }): Promise<ChatResponse<undefined>> {

		let res = new ChatResponse<undefined>();

		//Check if user can send in room
		if (1 == 1) {
			if (body.message.content.startsWith("/") == true) {
				let responseMessage = new ChatMessage();
				responseMessage.id = -1;
				responseMessage.senderDiplayName = 'Server';
				responseMessage.senderId = -1;
				responseMessage.content = 'Command done';

				client.emit('broadcastMessage', { room: body.room, message: responseMessage })
				// this.server.emit('broadcastMessage', { room: body.room, message: body.message });


			}
			else {
				this.server.to(body.room.toString()).emit('broadcastMessage', { room: body.room, message: body.message });
			}
		}

		return (res);
	}
}
