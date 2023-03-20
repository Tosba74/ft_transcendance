import * as module_ball from './ball';
import * as module_ultimate from './ultimate';
import * as module_paddle from './paddle';
import * as module_const from './constant'
import * as module_draw from './draw'
import * as module_impact from './impact'

export var myGameArea : GameArea;

export function startGame() //set up everything
{
	document.getElementById('btn_pause')!.style.visibility = 'visible';
	document.getElementById('btn_restart')!.style.visibility = 'visible';
	document.getElementById('btn_start')!.style.visibility = 'hidden';
	document.getElementById('btn_exportToJson')!.style.visibility = 'visible';
	myGameArea = new GameArea();
}

export class GameArea
{
	public canvas: any;
	public context: any;
	public move: any;
	public interval: any;
	public pause = false;
	public playerOne : any;
	public playerTwo : any;
	public nbr_ball : any;
	public ball : module_ball.Ball[] = [];
	public nbr_ball_point = 0;
	public playerOne_points = 0;
	public playerTwo_points = 0;
	public ultimate = 0;
	public addABALL = false;
	public last_input = false;
	constructor()
	{
		this.canvas = document.getElementById("canvas")
		this.context = this.canvas.getContext("2d");
		this.canvas.width = module_const.canvas_width;
		this.canvas.height = module_const.canvas_height;
		this.canvas.tabIndex = 1;
		this.interval = setInterval(() => {this.render()}, 20); //50 fps
		this.init_ball();
		this.playerOne = new module_paddle.paddle(module_const.paddle_width, module_const.paddle_height, module_const.paddle_color, module_const.paddle_x, module_const.paddle_y, this);
		this.playerTwo = new module_paddle.paddle(module_const.paddle_width , module_const.paddle_height, module_const.paddle2_color, module_const.paddle2_x, module_const.paddle_y, this);
		window.onkeyup = (e: KeyboardEvent): any => {
			if (e.key == "w")
				if (this.playerOne.speedY <= 0)
					this.playerOne.speedY = 0;

			if (e.key == "s")
				if (this.playerOne.speedY >= 0)
					this.playerOne.speedY = 0;

			if (e.key == "ArrowUp")//up
				if (this.playerTwo.speedY <= 0)
					this.playerTwo.speedY = 0;

			if (e.key == "ArrowDown") //down
				if (this.playerTwo.speedY >= 0)
					this.playerTwo.speedY = 0;
			if (e.key == "1") //ult
			{
				if (this.ultimate >= 100)
				{
					this.addABALL = true;
					this.ultimate = 0;
					module_draw.progressBar(0);
				}
			}
			if (e.key == "2") //ult
			{
				if (this.ultimate >= 100)
				{
					module_ultimate.paddle_dash();
					this.ultimate = 0;
					module_draw.progressBar(0);
				}
			}
			if (e.key == "3") //ult
			{
				if (this.ultimate >= 100)
				{
					module_ultimate.paddle_reduce();
					this.ultimate = 0;
					module_draw.progressBar(0);
				}
			}
		}

		window.onkeydown = (e: KeyboardEvent): any => {
			if (e.key == "w")
			{
				this.last_input = false;
				if (this.playerOne.y >= 0)
					this.playerOne.speedY = -(module_const.paddle_speed);
			}
			if (e.key == "s")
			{
				this.last_input = true;
				if (this.playerOne.y + this.playerOne.height < this.canvas.height)
					this.playerOne.speedY = module_const.paddle_speed;
			}
			if (e.key == "ArrowUp")//up
				if (this.playerTwo.y >= 0)
					this.playerTwo.speedY = -(module_const.paddle_speed);
			if (e.key == "ArrowDown") //down
				if (this.playerTwo.y + this.playerTwo.height < this.canvas.height)
					this.playerTwo.speedY = module_const.paddle_speed;
		}
	}

	clear()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	render()
	{
		if (this.pause == false)
		{
			this.clear();
			this.playerOne.update(this.context, this);
			this.playerTwo.update(this.context, this);
			let i = 0;
			while (this.ball[i])
			{
				module_impact.check_for_collisions(this.canvas, this.ball[i]);
				this.ball[i].render(this.context);
				i++;
			}
			module_draw.draw_center_line(this.context, this.canvas);
			module_draw.draw_scores(this.context, this.canvas, this);
		}
	}

	init_ball()
	{
		this.context.beginPath();
		let ball_x = this.canvas.width / 2;
		let ball_y = this.canvas.height / 2;
		let ball_radius = 5;
		this.context.arc(ball_x, ball_y, ball_radius, 0, 2 * Math.PI);
		//this.ball = [];
		this.ball[0] = new module_ball.Ball(ball_x, ball_y, ball_radius, module_const.ball_speed);
		this.context.fillStyle = "white";
		this.context.save();
		this.context.shadowColor = '#999';
		this.context.shadowBlur = 20;
		this.context.shadowOffsetX = 15;
		this.context.shadowOffsetY = 15;
		this.context.strokeStyle = "purple";
		this.context.fill();
		this.context.stroke();
		this.context.restore();
		this.nbr_ball = 1;
	}
}


export function addPoint(p1ORp2 : any, myGameArea: any) //add point and reset position
{
	switch(p1ORp2)
	{
		case 1:
			myGameArea.playerOne_points += 1;
			break;
		case 2:
			myGameArea.playerTwo_points += 1;
			break;
	}
	if (myGameArea.nbr_ball_point == myGameArea.nbr_ball)
	{
		let i = 1;
		myGameArea.ball[0].x = myGameArea.canvas.width / 2;
		myGameArea.ball[0].y = Math.random() * ((module_const.canvas_height - myGameArea.canvas.height / 3) - myGameArea.canvas.height / 3) + myGameArea.canvas.height / 3;
		myGameArea.ball[0].speed = module_const.ball_speed;
		myGameArea.ball[0].movement = module_const.ball_speed;
		myGameArea.ball[0].goal = false;
		myGameArea.ball[0].changeAngle(180 - myGameArea.ball[0].angle);
		myGameArea.playerOne.height = module_const.paddle_height;
		myGameArea.playerTwo.height = module_const.paddle_height;
		myGameArea.nbr_ball = 1;
		while (myGameArea.ball[i])
		{
			delete myGameArea.ball[i];
			i++;
		}
		myGameArea.nbr_ball_point = 0;
		myGameArea.playerOne.y = module_const.paddle_y;
		myGameArea.playerTwo.y = module_const.paddle_y;
	}
}

export function do_pause() //when button pause pressed
{
	myGameArea.pause = !myGameArea.pause;
}

export function restart() //when button restart pressed
{
	document.getElementById('btn_pause')!.style.visibility = 'visible';
	myGameArea.pause = false;
	let i = 1;
	myGameArea.ball[0].x = myGameArea.canvas.width / 2;
	myGameArea.ball[0].y = myGameArea.canvas.height / 2;
	myGameArea.ball[0].speed = module_const.ball_speed;
	myGameArea.ball[0].movement = module_const.ball_speed;
	myGameArea.ball[0].goal = false;
	myGameArea.ball[0].angle = 0;
	myGameArea.nbr_ball = 1;
	while (myGameArea.ball[i])
	{
		delete myGameArea.ball[i];
		i++;
	}
	myGameArea.nbr_ball_point = 0;
	myGameArea.playerOne.y = module_const.paddle_y;
	myGameArea.playerTwo.y = module_const.paddle_y;
	myGameArea.playerOne.height = module_const.paddle_height;
	myGameArea.playerTwo.height = module_const.paddle_height;
	myGameArea.playerOne_points = 0;
	myGameArea.playerTwo_points = 0;
	myGameArea.ultimate = 0;
	myGameArea.addABALL = false;
	myGameArea.last_input = false;
	module_draw.progressBar(0);
}
