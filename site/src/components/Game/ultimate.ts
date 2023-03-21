import * as module_pong from "./pong"
import * as module_ball from "./ball"
import * as module_const from "./constant"
import * as module_paddle from "./paddle";

export function boost_ult()
{
	let elem : any;
	elem = document.getElementById("myBar");
	module_pong.myGameArea.playerOne.ultimate = 100;
	elem.style.width = module_pong.myGameArea.playerOne.ultimate + "%";
	elem.style.backgroundColor = "#FE5A52";
}

export function paddle_dash(player : module_paddle.paddle)
{
	if (player.last_input == false)
		player.y -= 100;
	if (player.last_input == true)
		player.y += 100;
}

export function paddle_reduce(player : module_paddle.paddle)
{
	player.height = player.height / 2;
	player.y += player.height / 2;
	setTimeout(
		function() {
			player.height = module_const.paddle_height;
	}, 5000);
}

export function add_ball(angle : number, x : number, y : number) //create another ball
{
	module_pong.myGameArea.context.beginPath();
	module_pong.myGameArea.context.arc(x, y, module_const.ball_radius, 0, 2 * Math.PI);
	module_pong.myGameArea.ball.push(new module_ball.Ball(x, y, module_const.ball_radius, module_const.ball_speed));
	angle = -angle;
	module_pong.myGameArea.ball[module_pong.myGameArea.ball.length - 1].changeAngle(angle);
	module_pong.myGameArea.context.fillStyle = "white";
	module_pong.myGameArea.context.save();
	module_pong.myGameArea.context.shadowColor = '#999';
	module_pong.myGameArea.context.shadowBlur = 20;
	module_pong.myGameArea.context.shadowOffsetX = 15;
	module_pong.myGameArea.context.shadowOffsetY = 15;
	module_pong.myGameArea.context.strokeStyle = "purple";
	module_pong.myGameArea.context.fill();
	module_pong.myGameArea.context.stroke();
	module_pong.myGameArea.context.restore();
}
