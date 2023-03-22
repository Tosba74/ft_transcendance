import * as module_pong from "./pong"
import * as module_ball from "./ball"
import * as module_const from "./constant"
import * as module_paddle from "./paddle";

export function boost_ult() {
	let elem: any;

	elem = document.getElementById("myBar");
	module_pong.myGameArea.playerOne.ultimate = 100;
	elem.style.width = module_pong.myGameArea.playerOne.ultimate + "%";
	elem.style.backgroundColor = "#FE5A52";
}

export function paddle_dash(player: module_paddle.paddle) {
	if (player.last_input == false)
		player.y -= 100;

	if (player.last_input == true)
		player.y += 100;
}

export function paddle_reduce(player: module_paddle.paddle) {
	player.reducePaddle = true;
	player.bonk = 0;
}

export function add_ball(angle: number, x: number, y: number) //create another ball
{
	module_pong.myGameArea.ball.push(new module_ball.Ball(x, y, module_const.ball_radius, module_pong.myGameArea.ball[module_pong.myGameArea.ball.length - 1].speed / 1.5));
	//angle = -angle;
	module_pong.myGameArea.ball[module_pong.myGameArea.ball.length - 1].changeAngle(-angle);
}
