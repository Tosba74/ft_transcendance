import { GameArea } from './pong';

import { Paddle } from './paddle';
import * as module_const from './constant';
import { GameDataDto } from './dto/gamedata.dto';



export function import_action(player: Paddle, action: string) {

  if (action == "w") {

    player.speedY = -module_const.paddle_speed;
  }
  else if (action == "s") {

    player.speedY = +module_const.paddle_speed;
  }
  else if (action == "ready") {

    player.ready = true;
  }
  else if (action == "unready") {

    player.ready = false;
  }
  else {

    player.speedY = 0;
  }

}



export function ext_export(this: GameArea): GameDataDto {

  const res: GameDataDto = {
    started: this.start,

    player1: this.playerOne.export(),
    player2: this.playerTwo.export(),

    balls: [],
  };

  this.balls.forEach((ball) => {
    res.balls.push({ x: ball.x, y: ball.y, radius: ball.radius, xunits: ball.xunits, yunits: ball.yunits });
  })

  return res;
}