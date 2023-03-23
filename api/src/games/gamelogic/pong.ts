import * as module_const from './constant'


import { Paddle } from './paddle';
import { Ball } from './ball';

import { ext_check_for_collisions, ext_calculate_impact } from './impact';
import { ext_add_ball, ext_boost_ult } from './ultimate';
import { ext_bounce_action } from './impact';
import { ext_export, import_action } from './export';



export class GameArea {

	public canvas: HTMLCanvasElement | null;
	public context: CanvasRenderingContext2D | null;
	public progress_bar: HTMLElement | null;

	// public interval: any;
	public pause = false;
	public start = false;

	public playerOne: Paddle;
	public playerTwo: Paddle;

	public balls: Ball[] = [];

	constructor() {

		this.canvas = null;
		this.context = null;
		this.progress_bar = null;


		this.balls.push(new Ball(module_const.ball_x, module_const.ball_y, module_const.ball_radius, module_const.ball_speed / 3));

		this.playerOne = new Paddle(module_const.paddle_width, module_const.paddle_height, module_const.paddle_color, module_const.paddle_x, module_const.paddle_y);
		this.playerTwo = new Paddle(module_const.paddle_width, module_const.paddle_height, module_const.paddle2_color, module_const.paddle2_x, module_const.paddle_y);

		console.log('dasd');

		// this.interval = setInterval(() => { this.update(); this.render(); }, 1000 / 50); //50 fps
	}

	check_for_collisions = ext_check_for_collisions;
	calculate_impact = ext_calculate_impact;
	bounce_action = ext_bounce_action;
	add_ball = ext_add_ball;
	boost_ult = ext_boost_ult;
	export = ext_export;


	startGame() //set up everything
	{
		this.pause = false;
		this.start = true;
	}



	update() {


		this.playerOne.update();
		this.playerTwo.update();

		if (this.start == true) {

			this.balls.forEach((value) => {
				this.check_for_collisions(value);
			});
		}


		if (this.playerOne.score >= 10 || this.playerTwo.score >= 10)
			this.pause = true;
	}


	addPoint(player: Paddle) //add point and reset position
	{
		player.score += 1;

		if (this.balls.every((element) => (element.goal))) {

			this.reset(Math.random() * ((module_const.canvas_height - module_const.canvas_height / 3) - module_const.canvas_height / 3) + module_const.canvas_height / 3);
			this.balls[0].changeAngle(180 - this.balls[0].angle);

		}
	}



	do_pause() //when button pause pressed
	{
		this.pause = !this.pause;
	}

	reset(y: number) {
		this.balls[0].x = module_const.canvas_width / 2;
		this.balls[0].y = y;
		this.balls[0].speed = module_const.ball_speed / 3;
		this.balls[0].goal = false;

		this.balls.splice(1, this.balls.length);

		this.playerOne.y = module_const.paddle_y;
		this.playerTwo.y = module_const.paddle_y;
		this.playerOne.height = module_const.paddle_height;
		this.playerTwo.height = module_const.paddle_height;

		this.playerOne.addABALL = false;
		this.playerOne.reducePaddle = false;
		this.playerTwo.addABALL = false;
		this.playerTwo.reducePaddle = false;
	}

	restart() //when button restart pressed
	{
		document.getElementById('btn_pause')!.style.visibility = 'visible';
		this.pause = false;
		this.start = true;

		this.reset(module_const.canvas_height / 2);
		this.balls[0].angle = 0;
		this.playerOne.reset();
		this.playerTwo.reset();
	}

}


