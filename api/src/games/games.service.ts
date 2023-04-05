import { forwardRef, Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';

import { GameModel } from "./models/game.model";


import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { import_actions } from './gamelogic/export';
import { GameArea } from './gamelogic/pong';
import * as module_const from './gamelogic/constant';
import { GameSetterDto } from 'src/_shared_dto/gamesetter.dto';
import { UsersService } from 'src/users/users.service';

class GameRoom {
  // host: WebsocketUser | undefined;
  // guest: WebsocketUser | undefined;

  host_id: number;
  guest_id: number | undefined;

  timer: NodeJS.Timer | undefined;

  game: GameArea = new GameArea();
}




@Injectable()
export class GamesService {

  constructor(
    @InjectRepository(GameModel) private gamesRepository: Repository<GameModel>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) { }


  connecteds: Set<number> = new Set<number>();

  activeGame: Map<number, number> = new Map<number, number>();

  currentGames: { [key: number]: GameRoom } = {};



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


  clientOnlyRoom(client: Socket, user_id: number, game_id: number) {
    const game_room = game_id.toString();

    this.activeGame.set(user_id, game_id);

    client.rooms.forEach(value => {
      if (value !== client.id && value !== game_id.toString()) {
        client.leave(value);
      }
    });
    client.join(game_id.toString());
  }


  async createGame(client: Socket, user_id: number, invite_id: number, game_id: number, game_function: Function) {

    if (this.currentGames[game_id] !== undefined) {
      console.log('game already created');
      return;
    }

    this.currentGames[game_id] = new GameRoom();

    this.currentGames[game_id].timer = setInterval(() => { game_function() }, 1000 / module_const.fps);


    this.currentGames[game_id].host_id = user_id;
    this.clientOnlyRoom(client, user_id, game_id);

    this.currentGames[game_id].guest_id = invite_id;


    client.emit("setGame", {
      gameSetter: {
        userInfos1: await this.usersService.findOneById(this.currentGames[game_id].host_id),
        userInfos2: await this.usersService.findOneById(this.currentGames[game_id].guest_id || -1),

        game_id: game_id,
      } as GameSetterDto
    });


    console.log('create');
  }


  async joinGame(client: Socket, user_id: number, game_id: number) {


    if (this.currentGames[game_id] == undefined) {
      console.log('joined game not exists');
      return;
    }

    this.clientOnlyRoom(client, user_id, game_id);

    client.emit("setGame", {
      gameSetter: {
        userInfos1: await this.usersService.findOneById(this.currentGames[game_id].host_id),
        userInfos2: await this.usersService.findOneById(this.currentGames[game_id].guest_id || -1),

        game_id: game_id,
      } as GameSetterDto
    });

    console.log('join');

  }




  playGame(user_id: number, game_id: number, actions: string[]) {

    if (this.currentGames[game_id] == undefined) {
      console.log('played game not exists');
      return;
    }


    if (this.currentGames[game_id].host_id !== undefined && this.currentGames[game_id].host_id == user_id) {

      import_actions(this.currentGames[game_id].game.playerOne, actions, this.currentGames[game_id].game.playerTwo, this.currentGames[game_id].game.balls);
    }

    else if (this.currentGames[game_id].guest_id !== undefined && this.currentGames[game_id].guest_id == user_id) {

      import_actions(this.currentGames[game_id].game.playerTwo, actions, this.currentGames[game_id].game.playerOne, this.currentGames[game_id].game.balls);
    }
  }



  gameLife(server: Server, game_id: number) {

    // console.log('life');

    if (this.currentGames[game_id] == undefined) {
      console.log('life not existing')
      return;
    }

    const game = this.currentGames[game_id].game;

    // console.log('actions', game.player1.action, game.player2.action)

    game.update();
    // console.log(game.playerOne.y, game.playerOne.speedY);

    // console.log('emit');
    server.to(game_id.toString()).emit("gameInfos", { game: game.export() });

    if (game.playerOne.score >= 10 || game.playerTwo.score >= 10)
      clearInterval(this.currentGames[game_id].timer);
  }




  async getUserStatus(id: number): Promise<string> {

    if (this.connecteds.has(id)) {

      return "connected";
    }



    return "disconnected";
  }
}
