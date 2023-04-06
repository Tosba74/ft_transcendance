import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, } from '@nestjs/common';
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
import { GameStatusModel } from 'src/game_status/models/game_status.model';
import { UserModel } from 'src/users/models/user.model';

class GameRoom {
  // host: WebsocketUser | undefined;
  // guest: WebsocketUser | undefined;

  inactivity_count: number;

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



  async createEmpty(user1_id: number, user2_id: number): Promise<GameModel> {

    const res = new GameModel();

    res.user1_score = -1;
    res.user2_score = -1;

    res.user1 = { id: user1_id } as UserModel;
    res.user2 = { id: user2_id } as UserModel;

    res.started_at = new Date();
    res.ended_at = new Date();

    res.status = new GameStatusModel(GameStatusModel.CREATED_STATUS);

    const created = await this.gamesRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Game creation error');
    });

    return created;

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


  async connectGameRoom(client: Socket, user_id: number, game_id: number) {

    this.clientOnlyRoom(client, user_id, game_id);
    client.emit("setGame", {
      gameSetter: {
        userInfos1: await this.usersService.findOneById(this.currentGames[game_id].host_id),
        userInfos2: await this.usersService.findOneById(this.currentGames[game_id].guest_id || -1),

        game_id: game_id,
      } as GameSetterDto
    });
  }

  async searchConnect(client: Socket, user_id: number) {

    const game_id = this.activeGame.get(user_id);


    if (game_id !== undefined) {
      this.connectGameRoom(client, user_id, game_id);
    }
  }




  async createGame(client: Socket, user_id: number, invite_id: number, game_id: number, game_function: Function) {

    if (this.currentGames[game_id] !== undefined) {
      console.log('game already created');
      return;
    }

    this.currentGames[game_id] = new GameRoom();

    this.currentGames[game_id].timer = setInterval(() => { game_function() }, 1000 / module_const.fps);



    this.currentGames[game_id].host_id = user_id;
    this.currentGames[game_id].guest_id = invite_id;
    this.currentGames[game_id].inactivity_count = 0;


    this.connectGameRoom(client, user_id, game_id);


    console.log('create');
  }


  async joinGame(client: Socket, user_id: number, game_id: number) {


    if (this.currentGames[game_id] == undefined) {
      console.log('joined game not exists');
      return;
    }

    this.connectGameRoom(client, user_id, game_id);

    console.log('join');

  }




  playGame(user_id: number, game_id: number, actions: string[]) {

    if (this.currentGames[game_id] == undefined) {
      console.log('played game not exists', game_id);
      return;
    }


    if (this.currentGames[game_id].host_id !== undefined && this.currentGames[game_id].host_id == user_id) {

      import_actions(this.currentGames[game_id].game.playerOne, actions, this.currentGames[game_id].game.playerTwo, this.currentGames[game_id].game.balls);
    }

    else if (this.currentGames[game_id].guest_id !== undefined && this.currentGames[game_id].guest_id == user_id) {

      import_actions(this.currentGames[game_id].game.playerTwo, actions, this.currentGames[game_id].game.playerOne, this.currentGames[game_id].game.balls);
    }
  }



  async gameLife(server: Server, game_id: number) {

    if (this.currentGames[game_id] == undefined) {
      console.log('life not existing')
      return;
    }

    const gameRoom: GameRoom = this.currentGames[game_id];

    gameRoom.game.update();

    server.to(game_id.toString()).emit("gameInfos", { game: gameRoom.game.export() });


    if ((new Set(this.activeGame.values()).has(game_id)) && (this.connecteds.has(gameRoom.host_id) || this.connecteds.has(gameRoom.guest_id || -1))) {
      gameRoom.inactivity_count = 0;
    }
    else {
      gameRoom.inactivity_count++;
    }

    if (gameRoom.game.playerOne.score >= 10 || gameRoom.game.playerTwo.score >= 10) {

      try {
        const gameToSave = await this.findOneById(game_id);

        gameToSave.user1 = { id: gameRoom.host_id } as UserModel;
        gameToSave.user2 = { id: gameRoom.guest_id } as UserModel;

        gameToSave.user1_score = gameRoom.game.playerOne.score;
        gameToSave.user2_score = gameRoom.game.playerTwo.score;

        gameToSave.ended_at = new Date();
        gameToSave.status = new GameStatusModel(GameStatusModel.FINISHED_STATUS);

        this.gamesRepository.save(gameToSave);
      }
      catch (e) { }

      clearInterval(gameRoom.timer);

      this.activeGame.forEach((value, key) => {
        if (value === game_id) {
          this.activeGame.delete(key);
        }
      })
    }

    else if (gameRoom.inactivity_count > 200) {

      console.log('delete inactivity', game_id)

      try {
        const gameToSave = await this.findOneById(game_id);
        gameToSave.ended_at = new Date();
        gameToSave.status = new GameStatusModel(GameStatusModel.CLOSED_STATUS);

        this.gamesRepository.save(gameToSave);
      } //
      catch (e) {

      }

      clearInterval(gameRoom.timer);

      delete this.currentGames[game_id];
    }
  }


  async getUserStatus(id: number): Promise<string> {

    if (this.connecteds.has(id)) {

      return "connected";
    }



    return "disconnected";
  }
}
