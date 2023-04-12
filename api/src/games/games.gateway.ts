import { Logger, Request, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WsAuthGuard } from 'src/auth/auth-strategy/ws-auth.guard';
import { WebsocketExceptionsFilter } from 'src/_common/filters/ws-exception.filter';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { GamesService } from './games.service';
import { Interval } from '@nestjs/schedule';
import { CreateGameDto } from './dto/creategame.dto';
import { WsResponseDto } from 'src/_shared_dto/ws-response.dto';




@WebSocketGateway({ path: '/socket-game/', cors: { origin: '*' } })
@UseFilters(WebsocketExceptionsFilter)
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	constructor(
		private readonly gamesService: GamesService,
	) { }

	private readonly logger = new Logger('adasd');

	handleConnection(@ConnectedSocket() client: Socket): void {


	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {

		// Dont remove from set => multiple connections => let interval manage
	}



	@Interval('syncConnecteds', 3000)
	syncConnecteds() {

		let connected: Set<number> = new Set<number>();

		this.server.sockets.sockets.forEach((value) => {
			if (value.data.loggedId !== undefined)
				connected.add(value.data.loggedId);
		});

		this.gamesService.connecteds = connected;
	}





	@SubscribeMessage('identify')
	@UseGuards(WsAuthGuard)
	async identify(@ConnectedSocket() client: Socket): Promise<WsResponseDto<undefined>> {

		const user = (client.handshake as any).user as LoggedUserDto;

		if (!user || user.id == undefined) {
			return { error: 'Not logged', value: undefined };
		}

		client.data = { ...client.data, loggedId: user.id };

		if (client.data.loggedId !== undefined)
			this.gamesService.connecteds.add(client.data.loggedId)

		this.gamesService.searchConnect(this.server, client, user.id);

		return { error: undefined, value: undefined };
	}


	@SubscribeMessage('createGame')
	async createGame(client: Socket, body: CreateGameDto): Promise<WsResponseDto<undefined>> {

		if (client.data.loggedId === undefined) {
			throw new WsException('Not identified');
		}

		body.force_fun = true;
		body.points_objective = Math.max(Math.min(body.points_objective, 10), 3);


		if (body.invited_id === -1) {

			const foundMatchmakingGame = await this.gamesService.searchGame(client.data.loggedId, body.fun_mode, body.force_fun, body.points_objective, body.force_points);

			console.log('found ', foundMatchmakingGame);

			if (foundMatchmakingGame !== undefined) {
				
				this.gamesService.joinGame(this.server, client, client.data.loggedId, foundMatchmakingGame);

				return { error: undefined, value: undefined };
			}
		}
		
		const newGame = await this.gamesService.createEmpty(client.data.loggedId, body.invited_id, body.fun_mode, body.points_objective);

		let game_function = () => {
			this.gamesService.gameLife(this.server, newGame.id);
		}
		
		this.gamesService.createGame(this.server, client, client.data.loggedId, body.invited_id, newGame.id, game_function, body.fun_mode, body.points_objective);
		return { error: undefined, value: undefined };
	}


	@SubscribeMessage('joinGame')
	async joinGame(client: Socket, body: { game_id: number }): Promise<WsResponseDto<undefined>> {

		if (client.data.loggedId === undefined) {
			throw new WsException('Not identified');
		}

		return this.gamesService.joinGame(this.server, client, client.data.loggedId, body.game_id);
	}


	@SubscribeMessage('sendAction')
	async sendAction(client: Socket, body: { game_id: number, actions: string[] }): Promise<void> {

		if (client.data.loggedId === undefined) {
			throw new WsException('Not identified');
		}
		// console.log('play')

		this.gamesService.playGame(client.data.loggedId, body.game_id, body.actions);

	}



}
