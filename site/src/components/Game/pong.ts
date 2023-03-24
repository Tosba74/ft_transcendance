import * as module_const from './constant'



import * as module_draw from './draw'
import { Paddle } from './paddle';
import { Ball } from './ball';

import { GameDataDto } from './dto/gamedata.dto';



export class GameArea {

	public canvas: HTMLCanvasElement | null;
	public context: CanvasRenderingContext2D | null;

	// public interval: any;
	public pause = false;
	public start = false;

	public playerOne: Paddle;
	public playerTwo: Paddle;

	public balls: Ball[] = [];

	constructor() {

		this.canvas = null;
		this.context = null;


		// this.playerOne = new Paddle(module_const.paddle_width, module_const.paddle_height, module_const.paddle_color, module_const.paddle_x, module_const.paddle_y);
		// this.playerTwo = new Paddle(module_const.paddle_width, module_const.paddle_height, module_const.paddle2_color, module_const.paddle2_x, module_const.paddle_y);

		this.playerOne = new Paddle();
		this.playerTwo = new Paddle();

		console.log('dasd');

		// this.interval = setInterval(() => { this.update(); this.render(); }, 1000 / 50); //50 fps
	}




	get_elements() {
		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		if (this.canvas == null)
			return;

		this.context = this.canvas.getContext("2d");
		if (this.context == null)
			return;

		this.playerOne.progress_bar = document.getElementById("myBar");
		if (this.playerOne.progress_bar == null)
			return ;
		this.playerTwo.progress_bar = document.getElementById("myBar2");
		if (this.playerTwo.progress_bar == null)
			return ;
	}


	import(game: GameDataDto) {


		this.playerOne.import(game.player1);
		this.playerTwo.import(game.player2);

		this.balls = [];
		game.balls.forEach((ball) => {
			this.balls.push(new Ball(ball.x, ball.y, ball.radius, ball.xunits, ball.yunits));
		});


		this.render();
	}

	render() {


		if (this.canvas == null || this.context == null) {
			return;
		}
		let ctx = this.context;



		this.canvas.width = module_const.canvas_width;
		this.canvas.height = module_const.canvas_height;
		this.canvas.tabIndex = 1;

		
		ctx.save();
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.playerOne.render(ctx);
		this.playerTwo.render(ctx);
		
		this.balls.forEach((value) => {
			value.render(ctx);
		});
		

		module_draw.draw_center_line(ctx);
		module_draw.draw_scores(ctx, this.playerOne, this.playerTwo);

		if (this.playerOne.progress_bar != null)
			module_draw.draw_progress_bar(this.playerOne.progress_bar, this.playerOne);

		if (this.playerTwo.progress_bar != null)
			module_draw.draw_progress_bar(this.playerTwo.progress_bar, this.playerTwo);


		ctx.restore();

	}

}


