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
import { WsResponseDto } from 'src/_shared_dto/ws-response.dto';

export class GameRoom {
  // host: WebsocketUser | undefined;
  // guest: WebsocketUser | undefined;

  inactivity_count: number;

  fun_mode: boolean;
  score_objective: number;

  host_id: number;
  guest_id: number;

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

  currentGames: { [key: string]: GameRoom } = {};



  findAll(): Promise<GameModel[]> {
    return this.gamesRepository.find();
  }


  findFinished(): Promise<GameModel[]> {
    const games = this.gamesRepository.find({
      where: { status: { id: GameStatusModel.FINISHED_STATUS } },
      relations: { user1: true, user2: true },
    });
    return games;
  }

  findFinishedFor(id: number): Promise<GameModel[]> {
    const games = this.gamesRepository.find({
      where: [
        {
          status: { id: GameStatusModel.FINISHED_STATUS },
          user1: { id: id },
        },
        {
          status: { id: GameStatusModel.FINISHED_STATUS },
          user2: { id: id },
        },
      ],
      relations: { user1: true, user2: true },
    });
    return games;
  }

  findRecent(): Promise<GameModel[]> {
    const games = this.gamesRepository.find({
      where: {
        status: { id: GameStatusModel.FINISHED_STATUS },
      },
      order: {
        created_at: "DESC",
      },
      take: 7,
      relations: { user1: true, user2: true },
    });
    return games;
  }

  findOneById(id: number): Promise<GameModel> {
    try {
      const games = this.gamesRepository.findOneOrFail({
        where: { id }
      });
      return games;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }



  async createEmpty(user1_id: number, user2_id: number, fun_mode: boolean, points_objective: number): Promise<GameModel> {

    const res = new GameModel();

    res.fun_mode = fun_mode;
    res.score_objective = points_objective;
    res.user1_score = -1;
    res.user2_score = -1;

    res.user1 = { id: user1_id } as UserModel;
    if (user2_id !== -1) {
      res.user2 = { id: user2_id } as UserModel;
    }
    else {
      res.user2 = null;
    }

    res.status = new GameStatusModel(GameStatusModel.CREATED_STATUS);

    const created = await this.gamesRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Game creation error');
    });

    return created;

  }


  async clientOnlyRoom(client: Socket, user_id: number, game_id: number) {
    const game_room = game_id.toString();

    this.activeGame.set(user_id, game_id);

    client.rooms.forEach(value => {
      if (value !== client.id && value !== game_id.toString()) {
        client.leave(value);
      }
    });
    client.join(game_id.toString());
  }


  async connectGameRoom(server: Server, client: Socket, user_id: number, game_id: number) {

    if (this.currentGames[game_id.toString()] !== undefined) {
      this.clientOnlyRoom(client, user_id, game_id);

      const gameContent = {
        userInfos1: await this.usersService.findOneById(this.currentGames[game_id.toString()].host_id),
        userInfos2: (this.currentGames[game_id.toString()].guest_id !== -1 ?
          await this.usersService.findOneById(this.currentGames[game_id.toString()].guest_id) :
          undefined),

        game_id: game_id,
      } as GameSetterDto


      if (user_id === this.currentGames[game_id.toString()].host_id || user_id === this.currentGames[game_id.toString()].guest_id) {
        //
        server.to(game_id.toString()).emit("setGame", {
          gameSetter: gameContent,
        });
      }
      else {
        client.emit("setGame", {
          gameSetter: gameContent,
        });
      }
    }
  }

  async searchConnect(server: Server, client: Socket, user_id: number) {

    const game_id = this.activeGame.get(user_id);


    if (game_id !== undefined) {
      this.connectGameRoom(server, client, user_id, game_id);
    }
  }




  async createGame(server: Server, client: Socket, user_id: number, invite_id: number, game_id: number, game_function: Function, fun_mode: boolean, points_objective: number) {

    if (this.currentGames[game_id.toString()] !== undefined) {
      console.log('game already created');
      return -1;
    }

    this.currentGames[game_id.toString()] = new GameRoom();
    this.currentGames[game_id.toString()].game.fun_mode = fun_mode;
    // this.currentGames[game_id.toString()].game.points_objective = points_objective;


    this.currentGames[game_id.toString()].host_id = user_id;
    this.currentGames[game_id.toString()].guest_id = invite_id;
    this.currentGames[game_id.toString()].fun_mode = fun_mode;
    this.currentGames[game_id.toString()].score_objective = points_objective;
    this.currentGames[game_id.toString()].inactivity_count = 0;

    // this.currentGames[game_id].game. inactivity_count = 0;



    this.currentGames[game_id.toString()].timer = setInterval(() => { game_function() }, 1000 / module_const.fps);

    this.connectGameRoom(server, client, user_id, game_id);
  }


  async searchGame(user_id: number, fun_mode: boolean, force_fun: boolean, points_objective: number, force_points: boolean): Promise<number | undefined> {

    let game = Object.keys(this.currentGames).find((key) => {
      return (
        this.currentGames[key.toString()].host_id !== user_id && this.currentGames[key.toString()].guest_id === -1 &&
        this.currentGames[key.toString()].game.ended === false && this.currentGames[key.toString()].game.start === false &&
        (this.currentGames[key.toString()].fun_mode === fun_mode) &&
        (this.currentGames[key.toString()].score_objective === points_objective)
      );
    });

    if (game === undefined) {
      game = Object.keys(this.currentGames).find((key) => {
        return (
          this.currentGames[key.toString()].host_id !== user_id && this.currentGames[key.toString()].guest_id === -1 &&
          this.currentGames[key.toString()].game.ended === false && this.currentGames[key.toString()].game.start === false &&
          (!force_fun || this.currentGames[key.toString()].fun_mode === fun_mode) &&
          (!force_points || this.currentGames[key.toString()].score_objective === points_objective)
        );
      });
    }

    if (game !== undefined) {
      const game_id = parseInt(game);

      if (!Number.isNaN(game_id)) {

        this.currentGames[game_id.toString()].guest_id = user_id;

        return (game_id)
      }
      return (undefined);
    }
    return (undefined);


    // if (this.currentGames[game_id.toString()] !== undefined) {
    //   console.log('game already created');
    //   return;
    // }

    // this.currentGames[game_id] = new GameRoom();


    // this.currentGames[game_id].host_id = user_id;
    // this.currentGames[game_id].guest_id = invite_id;
    // this.currentGames[game_id].fun_mode = fun_mode;
    // this.currentGames[game_id].score_objective = points_objective;
    // this.currentGames[game_id].inactivity_count = 0;

    // // this.currentGames[game_id].game. inactivity_count = 0;



    // this.currentGames[game_id].timer = setInterval(() => { game_function() }, 1000 / module_const.fps);

    // this.connectGameRoom(client, user_id, game_id);


    console.log('create');
  }


  async joinGame(server: Server, client: Socket, user_id: number, game_id: number): Promise<WsResponseDto<undefined>> {


    if (this.currentGames[game_id.toString()] == undefined) {
      return { error: "Game not running", value: undefined };
    }
    
    this.connectGameRoom(server, client, user_id, game_id);
    return { error: undefined, value: undefined };
  }




  playGame(user_id: number, game_id: number, actions: string[]) {

    if (this.currentGames[game_id.toString()] == undefined) {
      return;
    }


    if (this.currentGames[game_id.toString()].host_id !== undefined && this.currentGames[game_id.toString()].host_id == user_id) {

      import_actions(this.currentGames[game_id.toString()].game.playerOne, actions, this.currentGames[game_id.toString()].game.playerTwo, this.currentGames[game_id.toString()].game);
    }

    else if (this.currentGames[game_id.toString()].guest_id !== undefined && this.currentGames[game_id.toString()].guest_id == user_id) {

      import_actions(this.currentGames[game_id.toString()].game.playerTwo, actions, this.currentGames[game_id.toString()].game.playerOne, this.currentGames[game_id.toString()].game);
    }
  }



  async gameLife(server: Server, game_id: number) {

    if (this.currentGames[game_id.toString()] == undefined) {
      return;
    }

    const gameRoom: GameRoom = this.currentGames[game_id.toString()];

    gameRoom.game.update();

    server.to(game_id.toString()).emit("gameInfos", { game: gameRoom.game.export() });


    if ((new Set(this.activeGame.values()).has(game_id)) && (this.connecteds.has(gameRoom.host_id) || this.connecteds.has(gameRoom.guest_id || -1))) {
      gameRoom.inactivity_count = 0;
    }
    else {
      gameRoom.inactivity_count++;
    }

    if (gameRoom.game.playerOne.score >= gameRoom.score_objective || gameRoom.game.playerTwo.score >= gameRoom.score_objective) {

      gameRoom.game.ended = true;
      server.to(game_id.toString()).emit("gameInfos", { game: gameRoom.game.export() });

      try {
        const gameToSave = await this.findOneById(game_id);

        gameToSave.user1 = { id: gameRoom.host_id } as UserModel;
        gameToSave.user2 = { id: gameRoom.guest_id } as UserModel;

        gameToSave.user1_score = gameRoom.game.playerOne.score;
        gameToSave.user2_score = gameRoom.game.playerTwo.score;

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
        gameToSave.status = new GameStatusModel(GameStatusModel.CLOSED_STATUS);

        this.gamesRepository.save(gameToSave);
      } //
      catch (e) {

      }

      clearInterval(gameRoom.timer);

      delete this.currentGames[game_id.toString()];
    }
  }


  async getUserStatus(id: number): Promise<string> {
    //
    if (this.connecteds.has(id)) {
      //
      const connectedGame = this.activeGame.get(id) || -1;

      if (connectedGame !== -1) {
        const connectedGameRoom = this.currentGames[connectedGame.toString()];

        if (connectedGameRoom.host_id === id || connectedGameRoom.guest_id === id) {
          //
          if (connectedGameRoom.game.start === true) {
            return "ingame";
          }
        }
      }

      return "connected";
    }

    return "disconnected";
  }
}
