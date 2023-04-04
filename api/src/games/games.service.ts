import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';

import { GameModel } from "./models/game.model";


import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { import_actions } from './gamelogic/export';
import { GameArea } from './gamelogic/pong';
import * as module_const from './gamelogic/constant';


class GameRoom {
  host: WebsocketUser | undefined;
  guest: WebsocketUser | undefined;
  timer: NodeJS.Timer;

  game: GameArea = new GameArea();
}




interface WebsocketUser {
  socket: Socket;
  user: LoggedUserDto;
}


@Injectable()
export class GamesService {

  constructor(@InjectRepository(GameModel) private gamesRepository: Repository<GameModel>) { }

  currentGames: { [key: number]: GameRoom } = {};

  clients: WebsocketUser[] = [];

  findAll(): Promise<GameModel[]> {
    return this.gamesRepository.find();
  }

  async findOneById(id: number): Promise<GameModel> {
    try {
      const games = await this.gamesRepository.findOneOrFail({
        where: { id }
      });
      return games;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }


  createGame(user: WebsocketUser, game_id: number, game_function: Function) {

    this.currentGames[game_id] = new GameRoom();

	if (this.currentGames[game_id].timer == undefined)
		this.currentGames[game_id].timer = setInterval(() => { game_function() }, 1000 / module_const.fps);

    this.currentGames[game_id].host = user;
    console.log('create');
  }


  joinGame(user: WebsocketUser, game_id: number) {


    if (this.currentGames[game_id] == undefined)
    {
      console.log('joined game not exists');
      return;
    }

    if (this.currentGames[game_id].guest == undefined) {

      this.currentGames[game_id].guest = user;
    }

    console.log('join');

  }




  playGame(user: WebsocketUser, game_id: number, actions: string[]) {

    if (this.currentGames[game_id] == undefined)
    {
      console.log('played game not exists');
      return;
    }


    if (this.currentGames[game_id].host && this.currentGames[game_id].host?.user.id == user.user.id) {

      import_actions(this.currentGames[game_id].game.playerOne, actions, this.currentGames[game_id].game.playerTwo, this.currentGames[game_id].game.balls);
    }

    else if (this.currentGames[game_id].guest && this.currentGames[game_id].guest?.user.id == user.user.id, this.currentGames[game_id].game.balls) {

      import_actions(this.currentGames[game_id].game.playerTwo, actions, this.currentGames[game_id].game.playerOne, this.currentGames[game_id].game.balls);
    }
  }



  gameLife(server: Server, game_id: number) {

    // console.log('life');

    if (this.currentGames[game_id] == undefined)
    {
      console.log('life not existing')
      return;
    }

    const game = this.currentGames[game_id].game;

    // console.log('actions', game.player1.action, game.player2.action)

    game.update();
    // console.log(game.playerOne.y, game.playerOne.speedY);

    // console.log('emit');
    server.emit("gameInfos", { game: game.export() });
	if (game.playerOne.score >= 10 || game.playerTwo.score >= 10)
			clearInterval(this.currentGames[game_id].timer);
  }






  async getUserStatus(id: number): Promise<string> {
    const clientsFound = this.clients.filter((client) => {
      return client.user.id === id;
    });

    if (clientsFound.length > 0) {
        return "connected";
    }

    return "disconnected";
  }



  isIdentifed(client: Socket): WebsocketUser | undefined {

    let found = this.clients.find(value => {
      if (value.socket.id == client.id) {
        return value;
      }
    });

    return found || undefined;
  }

  async identify(user: LoggedUserDto, client: Socket): Promise<{ error: string | undefined }> {

    if (!user || user.id == undefined) {
      return { error: 'Not logged' };
    }

    if (this.isIdentifed(client) != undefined) {
      return { error: 'Already identified' };
    }

    const newConn: WebsocketUser = {
      socket: client,
      user: user,
    }

    this.clients.push(newConn);

    return { error: undefined };
  }
}
