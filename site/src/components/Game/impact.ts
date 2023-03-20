import * as module_pong from "./pong"
import * as module_draw from "./draw"
import * as module_const from "./constant"
import * as module_ult from "./ultimate"

export function check_for_collisions(canvas : any, ball : any) //if ball hit either player or goal
{
	// if ball is at goal
	if (ball.x > canvas.width || ball.x < 0)
	{
		if (ball.x > canvas.width && ball.goal == false)
		{
			module_pong.myGameArea.nbr_ball_point++;
			ball.goal = true;
			module_pong.addPoint(1, module_pong.myGameArea);
		}
		if (ball.x < 0 && ball.goal == false)
		{
			module_pong.myGameArea.nbr_ball_point++;
			ball.goal = true;
			module_pong.addPoint(2, module_pong.myGameArea);
		}
	}
	else if (ball.y >= canvas.height - ball.radius || ball.y <= 0 + ball.radius)
	{
		ball.changeAngle(360 - ball.angle);
		if (ball.y >= canvas.height - ball.radius)
			ball.y = canvas.height - ball.radius - 1;
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
function map(x : any, in_min : any, in_max : any, out_min : any, out_max : any)
{
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function calculate_impact(x1 : any, x2 : any, x3 : any, x4 : any, y1 : any, y2 : any, y3 : any, y4 : any, ball : any)
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
			module_draw.progressBar((map(t, 0,1 ,-45, 45 )));
			ball.changeAngle((map(t, 0,1 ,-45, 45 )));
			if (module_pong.myGameArea.addABALL == true)
			{
				module_pong.myGameArea.addABALL = false;
				setTimeout(
					function() {
						module_ult.add_ball(map(t, 0,1 ,-45, 45 ), x3, y3);
				}, 1000);
			}
		}
		else
		{
			ball.changeAngle((map(t, 0,1 ,225, 135 )));
			if (module_pong.myGameArea.addABALL == true)
			{
				module_pong.myGameArea.addABALL = false;
				setTimeout(
					function() {
						module_ult.add_ball(map(t, 0,1 ,225, 135), x3, y3);
				}, 1000);
			}
		}
		ball.speed = Math.min(ball.speed + 0.5, module_const.ball_speed * 2);
		return (true);
	}
	return false;
}
