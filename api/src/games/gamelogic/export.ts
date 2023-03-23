import { GameArea } from './pong';

import { Paddle } from './paddle';
import * as module_const from './constant';



export class GameData {
  started: boolean;
  player1: Player = new Player();
  player2: Player = new Player();

  constructor() {
    this.started = false;
  }
}


class Player {
  paddle: number;

  constructor() {
    this.paddle = 0;
  }
}


export function import_action(player: Paddle, action: string) {

  if (action == "up") {

    player.speedY = -module_const.paddle_speed;
  }
  else if (action == "down") {

    player.speedY = +module_const.paddle_speed;
  }
  else {

    player.speedY = 0;
  }

}



export function ext_export(this: GameArea): GameData {

  const res: GameData = new GameData();


  res.player1.paddle = this.playerOne.y;
  res.player2.paddle = this.playerTwo.y;


  // this.render();
  return res;
}