import { Request, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WsAuthGuard } from 'src/auth/auth-strategy/ws-auth.guard';
import { WebsocketExceptionsFilter } from 'src/_common/filters/ws-exception.filter';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { GamesService } from './games.service';




@WebSocketGateway({ path: '/socket-game/', cors: { origin: '*' } })
@UseFilters(WebsocketExceptionsFilter)
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	constructor(private readonly gamesService: GamesService) { }


	handleConnection(@ConnectedSocket() client: Socket): void {

	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {


	}


	@SubscribeMessage('identify')
	@UseGuards(WsAuthGuard)
	async identify(@ConnectedSocket() client: Socket): Promise<{ error: string | undefined }> { 

		const user = (client.handshake as any).user as LoggedUserDto;

		// console.log(user);

		return this.gamesService.identify(user, client);
	}


	@SubscribeMessage('createGame')
	async createGame(client: Socket, body: { }): Promise<void> {

		
		const loggedUser = this.gamesService.isIdentifed(client);
		
		if (loggedUser == undefined) {
			throw new WsException('Not identified');
		}
		
		let game_id = 1;
		let game_function = () => {
			this.gamesService.gameLife(this.server, game_id);
		}


		// let timer = setInterval(() => {

		// 	this.gamesService.gameLife(this.server, game_id);
	
		// }, 1000 / 1)

		this.gamesService.createGame(loggedUser, game_id, game_function);
	}


	@SubscribeMessage('joinGame')
	async joinGame(client: Socket, body: { }): Promise<void> {

		
		const loggedUser = this.gamesService.isIdentifed(client);
		
		if (loggedUser == undefined) {
			throw new WsException('Not identified');
		}
		
		let game_id = 1;



		this.gamesService.joinGame(loggedUser, game_id);
	}


	@SubscribeMessage('playGame')
	async playGame(client: Socket, body: { action: string }): Promise<void> {

		
		const loggedUser = this.gamesService.isIdentifed(client);
		
		if (loggedUser == undefined) {
			throw new WsException('Not identified');
		}
		console.log('play')
		
		let game_id = 1;


		this.gamesService.playGame(loggedUser, game_id, body.action);
	} 




	// create and send message
	@SubscribeMessage('hostToServer')
	async createMessage(client: Socket, body: { room_id: number, message: {} }) {


		// if (body == undefined || body.room_id == undefined || body.message == undefined) {
		// 	throw new WsException('Not identified');

		// }

		// if (!client.rooms.has(body.room_id.toString())) {
		// 	throw new WsException('Room not joined');
		// }

		const loggedUser = this.gamesService.isIdentifed(client);

		if (loggedUser == undefined) {
			throw new WsException('Not identified');
		}


		// const myGame = this.hostFindGuest(loggedUser, body.room_id);


		// if (body.message.startsWith("/") == true) {

		// 	let messageObj = await this.chatsService.adminCommand(loggedUser, client, body.room_id, body.message);

		// 	if (messageObj != undefined)
		// 		this.server.to(body.room_id.toString()).emit('broadcastMessage', { room_id: body.room_id.toString(), message: messageObj });

		// }
		// else {

		// 	let messageObj = await this.chatsService.createMessage(loggedUser, client, body.room_id, body.message);
 
		// 	if (messageObj != undefined)
		// 		this.server.to(body.room_id.toString()).emit('broadcastMessage', { room_id: body.room_id.toString(), message: messageObj });
		// }
	}
}
