import * as module_const from "./constant"


import { GameArea } from "./pong";
import { Paddle } from "./paddle";
import { Ball } from "./ball";


export function ext_boost_ult(this: GameArea) {
	this.playerOne.ultimate = 100;
}

export function paddle_dash(player: Paddle) {
	if (player.last_input == false)
		player.y -= 100;

	if (player.last_input == true)
		player.y += 100;
}

export function paddle_reduce(player: Paddle) {
	player.reducePaddle = true;
	player.bonk = 0;
}

export function ext_add_ball(this: GameArea, angle: number, x: number, y: number) //create another ball
{
	this.balls.push(new Ball(x, y, module_const.ball_radius, this.balls[this.balls.length - 1].speed / 1.5));

	this.balls[this.balls.length - 1].changeAngle(-angle);
}
