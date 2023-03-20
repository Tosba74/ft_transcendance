import * as module_pong from "./pong"
import * as module_ball from "./ball"
import * as module_const from "./constant"

export function boost_ult()
{
	let elem : any;
	elem = document.getElementById("myBar");
	module_pong.myGameArea.ultimate = 100;
	elem.style.width = module_pong.myGameArea.ultimate + "%";
	if (module_pong.myGameArea.ultimate >= 100)
		elem.style.backgroundColor = "#FE5A52";
}

export function paddle_dash()
{
	if (module_pong.myGameArea.last_input == false)
		module_pong.myGameArea.playerOne.y -= 100;
	if (module_pong.myGameArea.last_input == true)
		module_pong.myGameArea.playerOne.y += 100;
}

export function paddle_reduce()
{
	module_pong.myGameArea.playerTwo.height = module_pong.myGameArea.playerTwo.height / 2;
	module_pong.myGameArea.playerTwo.y += module_pong.myGameArea.playerTwo.height / 2;
}

export function add_ball(angle : number, x : number, y : number) //create another ball
{
	let canvas : any;
	let ctx : any;
	canvas = module_pong.myGameArea.canvas;
	ctx = canvas.getContext("2d");
	ctx.beginPath();
	let ball_x = x;
	let ball_y = y;
	let ball_radius = 5;
	ctx.arc(ball_x, ball_y, ball_radius, 0, 2 * Math.PI);
	module_pong.myGameArea.ball[module_pong.myGameArea.nbr_ball] = new module_ball.Ball(ball_x, ball_y, ball_radius, module_const.ball_speed);
	angle = -angle;
	module_pong.myGameArea.ball[module_pong.myGameArea.nbr_ball].changeAngle(angle);
	ctx.fillStyle = "white";
	ctx.save();
	ctx.shadowColor = '#999';
	ctx.shadowBlur = 20;
	ctx.shadowOffsetX = 15;
	ctx.shadowOffsetY = 15;
	ctx.strokeStyle = "purple";
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	module_pong.myGameArea.nbr_ball++;
}
