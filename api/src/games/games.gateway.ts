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


	@SubscribeMessage('sendAction')
	async sendAction(client: Socket, body: { actions: string[] }): Promise<void> {

		
		const loggedUser = this.gamesService.isIdentifed(client);
		
		if (loggedUser == undefined) {
			throw new WsException('Not identified');
		}
		// console.log('play')
		
		let game_id = 1;

		this.gamesService.playGame(loggedUser, game_id, body.actions);

	} 



}
