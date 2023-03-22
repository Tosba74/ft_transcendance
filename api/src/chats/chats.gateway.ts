import { Request, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WsAuthGuard } from 'src/auth/auth-strategy/ws-auth.guard';
import { WebsocketExceptionsFilter } from 'src/_common/filters/ws-exception.filter';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { ChatsService } from './chats.service';

import { ChatResponse } from './dto/chat-response.dto';
import { ChatRoom } from './dto/chat-room.dto';



@WebSocketGateway({ path: '/socket-chat/', cors: { origin: '*' } })
@UseFilters(WebsocketExceptionsFilter)
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	constructor(private readonly chatsService: ChatsService) { }


	handleConnection(@ConnectedSocket() client: Socket): void {

	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {

		this.chatsService.disconnect(client);
	}

	@SubscribeMessage('createGame')
	async createGame(client: Socket, body: { }): Promise<void> {

		console.log('wring')
	}


	@SubscribeMessage('identify')
	@UseGuards(WsAuthGuard)
	async identify(@ConnectedSocket() client: Socket): Promise<ChatResponse<undefined>> {

		const user = (client.handshake as any).user as LoggedUserDto;

		console.log(user);

		return this.chatsService.identify(user, client);
	}


	@SubscribeMessage('connectRoom')
	async connectRoom(client: Socket, body: { room: number }): Promise<ChatResponse<ChatRoom>> {

		const loggedUser = this.chatsService.isIdentifed(client);
		
		if (loggedUser == undefined) {
			throw new WsException('Not identified');
		}

		// const loggedUser: LoggedUserDto = {
		// 	id: 1,
		// 	login_name: 'ada',
		// 	pseudo: 'dad',
		// 	color: 1,
		// 	is_admin: false,
		// }

		return (this.chatsService.connectRoom(loggedUser, client, body.room))
	}




	// create and send message
	@SubscribeMessage('createMessage')
	async createMessage(client: Socket, body: { room_id: number, message: string }) {


		if (body == undefined || body.room_id == undefined || body.message == undefined) {
			throw new WsException('Not identified');

		}

		if (!client.rooms.has(body.room_id.toString())) {
			throw new WsException('Room not joined');
		}

		const loggedUser = this.chatsService.isIdentifed(client);

		if (loggedUser == undefined) {
			throw new WsException('Not identified');
		}

		// const loggedUser: LoggedUserDto = {
		// 	id: 1,
		// 	login_name: 'ada',
		// 	pseudo: 'dad',
		// 	color: 1,
		// 	is_admin: false,
		// }



		if (body.message.startsWith("/") == true) {

			let messageObj = await this.chatsService.adminCommand(loggedUser, client, body.room_id, body.message);

			if (messageObj != undefined)
				this.server.to(body.room_id.toString()).emit('broadcastMessage', { room_id: body.room_id.toString(), message: messageObj });

		}
		else {

			let messageObj = await this.chatsService.createMessage(loggedUser, client, body.room_id, body.message);

			if (messageObj != undefined)
				this.server.to(body.room_id.toString()).emit('broadcastMessage', { room_id: body.room_id.toString(), message: messageObj });
		}
	}
}
