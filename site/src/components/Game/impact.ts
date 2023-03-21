import * as module_pong from "./pong"
import * as module_draw from "./draw"
import * as module_const from "./constant"
import * as module_ult from "./ultimate"
import * as module_ball from "./ball"

export function check_for_collisions(ball : module_ball.Ball) //if ball hit either player or goal
{
	// if ball is at goal
	if (ball.x > module_pong.myGameArea.canvas.width || ball.x < 0)
	{
		if (ball.x > module_const.canvas_width && ball.goal == false)
		{
			ball.goal = true;
			module_pong.addPoint(1);
		}
		if (ball.x < 0 && ball.goal == false)
		{
			ball.goal = true;
			module_pong.addPoint(2);
		}
	}
	else if (ball.y >= module_const.canvas_height - ball.radius || ball.y <= 0 + ball.radius)
	{
		ball.changeAngle(360 - ball.angle);
		if (ball.y >= module_const.canvas_height - ball.radius)
			ball.y = module_const.canvas_height - ball.radius - 1;
		if (ball.y <= 0 + ball.radius)
			ball.y = ball.radius + 1;
	}
	if (!module_pong.myGameArea.pause)
	{
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
		if (ball.x < module_const.canvas_width / 2)
		{
			if (!calculate_impact(module_pong.myGameArea.playerOne.x + module_pong.myGameArea.playerOne.width, (module_pong.myGameArea.playerOne.x + module_pong.myGameArea.playerOne.width), ball.x, xdest,
				module_pong.myGameArea.playerOne.y, (module_pong.myGameArea.playerOne.y + module_pong.myGameArea.playerOne.height), ball.y, ydest, ball))
			{
				ball.x = xdest;
				ball.y = ydest;
			}
		}
		//if playerTwo paddle collision
		else
		{
			if (!calculate_impact(module_pong.myGameArea.playerTwo.x, module_pong.myGameArea.playerTwo.x, ball.x, xdest,
				module_pong.myGameArea.playerTwo.y, (module_pong.myGameArea.playerTwo.y + module_pong.myGameArea.playerTwo.height), ball.y, ydest, ball))
			{
				ball.x = xdest;
				ball.y = ydest;
			}
		}
	}
}
function map(x : number, in_min : number, in_max : number, out_min : number, out_max : number)
{
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function calculate_impact(x1 : number, x2 : number, x3 : number, x4 : number, y1 : number, y2 : number, y3 : number, y4 : number, ball : module_ball.Ball)
{
	const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	if (den == 0)
		return;
	const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
	const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
	if (t > 0 && t < 1 && u > 0 && u < 1)
	{
		if (ball.x < module_const.canvas_width / 2)
		{
			const map_angle = (map(t, 0,1 ,-45, 45));
			module_draw.progressBar(map_angle);
			ball.changeAngle(map_angle);
			if (module_pong.myGameArea.playerOne.addABALL == true)
			{
				module_pong.myGameArea.playerOne.addABALL = false;
				setTimeout(
					function() {
						module_ult.add_ball(map_angle, x3, y3);
				}, 1000);
			}
		}
		else
		{
			const map_angle = (map(t, 0,1 ,225, 135 ));
			ball.changeAngle(map_angle);
			if (module_pong.myGameArea.playerTwo.addABALL == true)
			{
				module_pong.myGameArea.playerTwo.addABALL = false;
				setTimeout(
					function() {
						module_ult.add_ball(map_angle, x3, y3);
				}, 1000);
			}
		}
		if (ball.speed < module_const.ball_speed)
			ball.speed = module_const.ball_speed;
		ball.speed = Math.min(ball.speed + 0.5, module_const.ball_speed * 2);
		return (true);
	}
	return false;
}
