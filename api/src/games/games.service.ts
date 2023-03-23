import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';

import { GameModel } from "./models/game.model";


import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { GameData, import_action } from './gamelogic/export';
import { GameArea } from './gamelogic/pong';


class GameRoom {
  host: WebsocketUser | undefined;
  guest: WebsocketUser | undefined;
  timer: NodeJS.Timer;

  game: GameArea = new GameArea();

  // constructor() {
  //   this.game = new GameData();
  // }
}




interface WebsocketUser {
  socket: Socket;
  user: LoggedUserDto;
}


@Injectable()
export class GamesService {

  constructor(@InjectRepository(GameModel) private gamesRepository: Repository<GameModel>) { }

  currentGames: { [key: number]: GameRoom } = {};
  // currentGames: Map<number, GameRoom>;

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

    this.currentGames[game_id].timer = setInterval(() => { game_function() }, 1000 / 50);

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
  
  


  playGame(user: WebsocketUser, game_id: number, action: string) {

    if (this.currentGames[game_id] == undefined)
    {
      console.log('played game not exists');
      return;
    }


    if (this.currentGames[game_id].host && this.currentGames[game_id].host?.user.id == user.user.id) {

      import_action(this.currentGames[game_id].game.playerOne, action);
    }
    
    else if (this.currentGames[game_id].guest && this.currentGames[game_id].guest?.user.id == user.user.id) {
      
      import_action(this.currentGames[game_id].game.playerTwo, action);
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

    // console.log('emit');
    server.emit("gameInfos", { game: game.export() });
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