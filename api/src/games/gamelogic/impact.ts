

import { GameArea } from "./pong"

import * as module_const from "./constant";

import { Paddle } from "./paddle"
import { Ball } from "./ball";

export function ext_check_for_collisions(this: GameArea, ball: Ball) //if ball hit either player or goal
{
	// if ball is at goal
	if (ball.x > module_const.canvas_width || ball.x < 0) {

		if (ball.x > module_const.canvas_width && ball.goal == false) {
			ball.goal = true;
			this.addPoint(this.playerOne);
		}

		if (ball.x < 0 && ball.goal == false) {
			ball.goal = true;
			this.addPoint(this.playerTwo);
		}
	}
	else if (ball.y >= module_const.canvas_height - ball.radius || ball.y <= 0 + ball.radius) {
		ball.changeAngle(360 - ball.angle);

		if (ball.y >= module_const.canvas_height - ball.radius)
			ball.y = module_const.canvas_height - ball.radius - 1;

		if (ball.y <= 0 + ball.radius)
			ball.y = ball.radius + 1;
	}

	if (!this.ended) {
		let xdest, ydest;

		ball.radians = ball.angle / (180 * Math.PI) * 10;
		ball.xunits = Math.cos(ball.radians) * ball.speed;
		ball.yunits = Math.sin(ball.radians) * ball.speed;

		/*let x1 = playerOne.x;
		let x2 = (playerOne.x + playerOne.width);
		let x3 = ball.x;
		let x4 = xdest;
		let y1 = playerOne.y;
		let y2 = (playerOne.y + playerOne.height);
		let y3 = ball.y;
		let y4 = ydest;*/

		xdest = ball.x + ball.xunits;
		ydest = ball.y + ball.yunits;
		//if playerOne paddle collision
		if (ball.x < module_const.canvas_width / 2) {
			if (!this.calculate_impact(
				this.playerOne.x + this.playerOne.width, this.playerOne.x + this.playerOne.width, ball.x, xdest,
				this.playerOne.y, this.playerOne.y + this.playerOne.height, ball.y, ydest,
				ball)) {

				ball.x = xdest;
				ball.y = ydest;
			}
		}
		//if playerTwo paddle collision
		else {
			if (!this.calculate_impact(
				this.playerTwo.x, this.playerTwo.x, ball.x, xdest,
				this.playerTwo.y, this.playerTwo.y + this.playerTwo.height, ball.y, ydest,
				ball)) {

				ball.x = xdest;
				ball.y = ydest;
			}
		}
	}
}

export function ext_bounce_action(this: GameArea, bouncer: Paddle, other: Paddle, ball: Ball) {

	if (bouncer.addABALL == true) {

		bouncer.addABALL = false;
		this.add_ball(ball.angle, ball.x, ball.y);
	}
	if (other.reducePaddle == true) {
		other.reducePaddle = false;
		other.height = module_const.paddle_height / 2;
		other.y += module_const.paddle_height / 4;
	}

	if (bouncer.bonk >= 0) {
		bouncer.bonk++;

		if (bouncer.bonk == 4) {
			bouncer.bonk = -1;
			bouncer.height = module_const.paddle_height;
			bouncer.y -= module_const.paddle_height / 4;
		}
	}

}




export function ext_calculate_impact(this: GameArea, x1: number, x2: number, x3: number, x4: number, y1: number, y2: number, y3: number, y4: number, ball: Ball) {
	const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

	if (den == 0)
		return;

	const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
	const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
	
	if (t > -0.05 && t < 1.05 && u > 0 && u < 1) {
		if (ball.x < module_const.canvas_width / 2) {

			const map_angle = (map(t, 0, 1, -module_const.bounce_angle, module_const.bounce_angle));

			if (ball.first_bounce == true)
				ball.first_bounce = false;
			else
				this.playerOne.ultimate = Math.min(100, this.playerOne.ultimate + Math.abs(map_angle));

			ball.changeAngle(map_angle);
			this.bounce_action(this.playerOne, this.playerTwo, ball);
		}
		else {

			const map_angle = (map(t, 0, 1, module_const.bounce_angle, -module_const.bounce_angle));

			if (ball.first_bounce == true)
				ball.first_bounce = false;
			else
				this.playerTwo.ultimate = Math.min(100, this.playerTwo.ultimate + Math.abs(map_angle));
				
			ball.changeAngle(180 + map_angle);
			this.bounce_action(this.playerTwo, this.playerOne, ball);
		}

		ball.speed = Math.max(ball.speed, module_const.ball_speed);
		ball.speed = Math.min(ball.speed + 0.5, module_const.ball_speed * 2);
		return (true);
	}
	return false;
}


function map(x: number, in_min: number, in_max: number, out_min: number, out_max: number) {
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

