import { GameArea } from './pong';

import {Ball} from './ball'
import { Paddle } from './paddle';
import * as module_const from './constant';
import * as module_ultimate from './ultimate';
import { GameDataDto } from './dto/gamedata.dto';



export function import_actions(player: Paddle, actions: string[], other: Paddle, balls : Ball[]) {

	let move_actions = ["w", "ArrowUp", "s", "ArrowDown"];

	actions.forEach((action) => {

		if (action == "w" || action == "ArrowUp") {

		player.speedY = -module_const.paddle_speed;
		player.last_input = false;
		player.ultimate = 100;
		}
		else if (action == "s" || action == "ArrowDown") {

		player.speedY = +module_const.paddle_speed;
		player.last_input = true;
		}

		else if (action == "1" && player.ultimate >= 100 && player.score < 10 && other.score < 10) {

		player.addABALL = true;
		player.ultimate = 0;
		}
		else if (action == "2" && player.ultimate >= 100 && player.score < 10 && other.score < 10) {

		module_ultimate.paddle_dash(player, balls);
		player.ultimate = 0;
		}
		else if (action == "3" && player.ultimate >= 100 && player.score < 10 && other.score < 10) {

		module_ultimate.paddle_reduce(other);
		player.ultimate = 0;
		}
		else if (action == "ready") {

		player.ready = true;
		}
		else if (action == "unready") {

		player.ready = false;
		}
	});

  if (actions.some((action) => { return move_actions.indexOf(action) != -1 } ) == false) {

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