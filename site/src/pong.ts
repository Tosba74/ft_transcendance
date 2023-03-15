const canvas_width = 1200;
const canvas_height = 800;
const paddle_width = 5;
const paddle_height = 150;
const paddle_x = 20;
const paddle2_x = canvas_width - 25;
const paddle_y = canvas_height / 2 - (paddle_height / 2);
const ball_speed = 12;
const paddle_speed = 15;
const score_size = canvas_width / 10;
const score1_x = canvas_width / 3;
const score2_x = canvas_width / 3 + canvas_width / 3;

class Ball {
	private x: number;
	private y: number;
	private radius: number;
	private speed: number;
	private movement: number;
	private angle: number;
	private xunits: number;
	private yunits: number;
	constructor(x : any, y : any, radius : any, speed : any) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;
		this.angle = 0;
		this.xunits = 0;
		this.yunits = 0;

		this.changeAngle(0);
		this.movement = 0;

	}
	changeAngle(angle : any) {
		// if(angle == 0)
		//  angle = 1; // angle cannot be equal to 0;
		//this.angle = angle;
		this.angle = angle % 360;

	}
	angleTo(x : any, y : any) {
		this.changeAngle(Math.atan2(y - this.y, x - this.x));
	}
	render(ctx : any) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "white";
		this.movement += this.speed;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.save();
		ctx.shadowColor = '#999';
		ctx.shadowBlur = 20;
		ctx.shadowOffsetX = 15;
		ctx.shadowOffsetY = 15;
		ctx.strokeStyle = "purple";
		ctx.fill();
		ctx.stroke();
		ctx.restore();

	}
	ghostPath(toX : any) {
		let {x, y} = this;
		while(x < toX) {
			x += this.xunits;
			y += this.yunits;
		}
		return {x, y};
	}
}

var pause = false;
var start = false;
var playerOne : any;
var playerTwo : any;
var ball : any;
var playerOne_points = 0;
var playerTwo_points = 0;

export function startGame() //set up everything
{
	document.getElementById('btn_pause')!.style.visibility = 'visible';
	document.getElementById('btn_restart')!.style.visibility = 'visible';
	document.getElementById('btn_start')!.style.visibility = 'hidden';
	document.getElementById('btn_exportToJson')!.style.visibility = 'visible';
	myGameArea.start();
	playerOne = new paddle(paddle_width, paddle_height, "green", paddle_x, paddle_y);
	playerTwo = new paddle(paddle_width , paddle_height, "red", paddle2_x, paddle_y);
	init_ball(myGameArea.context, myGameArea.canvas);
}

var myGameArea : any =
{ //Start the canvas
	canvas : 0,
	context : 0,
	move : 0,
	start : function()
	{
		this.canvas = document.getElementById("canvas")
		this.context = this.canvas.getContext("2d");
		this.canvas.width = canvas_width;
		this.canvas.height = canvas_height;
		this.canvas.tabIndex = 1;
		//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20); //50 fps
		window.onkeyup = (e: KeyboardEvent): any => {
			if (e.key == "w")
				if (playerOne.speedY <= 0)
					playerOne.speedY = 0;

			if (e.key == "s")
				if (playerOne.speedY >= 0)
					playerOne.speedY = 0;

			if (e.key == "ArrowUp")//up
				if (playerTwo.speedY <= 0)
					playerTwo.speedY = 0;

			if (e.key == "ArrowDown") //down
				if (playerTwo.speedY >= 0)
					playerTwo.speedY = 0;
	}
		window.onkeydown = (e: KeyboardEvent): any => {
			//console.log(e.key)
			if (e.key == "w")
				if (playerOne.y >= 0)
					playerOne.speedY = -(paddle_speed);

			if (e.key == "s")
				if (playerOne.y + playerOne.height < myGameArea.canvas.height)
					playerOne.speedY = paddle_speed;

			if (e.key == "ArrowUp")//up
				if (playerTwo.y >= 0)
					playerTwo.speedY = -(paddle_speed);

			if (e.key == "ArrowDown") //down
				if (playerTwo.y + playerTwo.height < myGameArea.canvas.height)
					playerTwo.speedY = paddle_speed;
		}
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
declare var ctx : any;
function init_ball(ctx : any, canvas : any) //create first ball
{
	ctx.beginPath();
	let ball_x = canvas.width / 2;
	let ball_y = canvas.height / 2;
	let ball_radius = 5;
	ctx.arc(ball_x, ball_y, ball_radius, 0, 2 * Math.PI);
	ball = new Ball(ball_x, ball_y, ball_radius, ball_speed);
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
}

class paddle //set up first playerOne
{
	private x: number;
	private y: number;
	private gamearea: number;
	private width: number;
	private height: number;
	private speedY: number;
	private speedX: number;
	private color: number;
	constructor(width : any, height : any, color : any, x : any, y : any) {
		var canvas = document.getElementById("canvas");
		this.gamearea = myGameArea;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speedY = 0;
		this.speedX = 0;
		this.color = color;
	}
	update(ctx : any) {
		this.y += this.speedY;
		if (this.y <= 0)
			this.y = 0;
		if (this.y + this.height > myGameArea.canvas.height)
			this.y = myGameArea.canvas.height - this.height;
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

/*class drawPlayerTwo(this: any, width : any, height : any, color : any, x : any, y : any) //set up first playerTwo
{
	var canvas = document.getElementById("canvas");
	this.gamearea = myGameArea;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedY = 0;
	this.update = function() {
		this.y += this.speedY;
		if (this.y + this.height > myGameArea.canvas.height)
			this.y = myGameArea.canvas.height - this.height;
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}*/

function check_for_collisions(canvas : any) //if ball hit either player or goal
{
	// if ball is at goal
	if (ball.x > canvas.width || ball.x < 0)
	{
		if (ball.x > canvas.width)
			addPoint(1);
		if (ball.x < 0)
			addPoint(2);
	}
	else if (ball.y >= canvas.height - ball.radius || ball.y <= 0 + ball.radius)
	{
		ball.changeAngle(360 - ball.angle);
		if (ball.y >= canvas.height - ball.radius)
			ball.y = canvas.height - ball.radius - 1;
		if (ball.y <= 0 + ball.radius)
			ball.y = ball.radius + 1;
	}
	if (!pause)
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

		if (ball.x < canvas_width / 2)
		{
			if (!calculate_impact(playerOne.x + playerOne.width, (playerOne.x + playerOne.width), ball.x, xdest,
		playerOne.y, (playerOne.y + playerOne.height), ball.y, ydest))
			{
				ball.x = xdest;
				ball.y = ydest;
			}
		}
		else
		{
			if (!calculate_impact(playerTwo.x, playerTwo.x, ball.x, xdest,
		playerTwo.y, (playerTwo.y + playerTwo.height), ball.y, ydest))
			{
				ball.x = xdest;
				ball.y = ydest;
			}
		}


	}
	//if playerOne paddle collision
	/*if (ball.x - ball.radius < playerOne.x + playerOne.width && ball.x + ball.radius > playerOne.x + playerOne.width &&
			ball.y - ball.radius > playerOne.y && ball.y + ball.radius < playerOne.y + playerOne.height && ball.xunits < 0)
	{
		ball.changeAngle( Math.floor(Math.random() * (175 - 180) + 175) - ball.angle);
		ball.speed = min(ball.speed + 1, ball_speed * 2);
	}
	//if playerTwo paddle collision
	if (ball.x + ball.radius > playerTwo.x - playerTwo.width && ball.x - ball.radius < playerTwo.x + playerTwo.width &&
			ball.y - ball.radius >= playerTwo.y && ball.y + ball.radius <= playerTwo.y + playerTwo.height && ball.xunits > 0)
	{
		ball.changeAngle( Math.floor(Math.random() * (185 - 175) + 175) - ball.angle);
		ball.speed = min(ball.speed + 1, ball_speed * 2);
	}*/
	function map(x : any, in_min : any, in_max : any, out_min : any, out_max : any)
	{
		return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	function calculate_impact(x1 : any, x2 : any, x3 : any, x4 : any, y1 : any, y2 : any, y3 : any, y4 : any)
	{
		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (den == 0)
			return;
		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
		if (t > 0 && t < 1 && u > 0 && u < 1)
		{
			if (ball.x < canvas_width / 2)
				ball.changeAngle((map(t, 0,1 ,-45, 45 )));
			else
			{
				ball.changeAngle((map(t, 0,1 ,225, 135 )));
			}
			ball.speed = Math.min(ball.speed + 0.5, ball_speed * 2);
			return (true);
		}
		return false;
	}
	function addPoint(p1ORp2 : any) //add point and reset position
	{
		switch(p1ORp2)
		{
			case 1:
				playerOne_points += 1;
				break;
			case 2:
				playerTwo_points += 1;
				break;
		}
		ball.x = canvas_width / 2;
		ball.y = canvas_height / 2;
		playerOne.y = paddle_y;
		playerTwo.y = paddle_y;
		ball.speed = ball_speed;
		ball.movement = ball_speed;
		ball.changeAngle(180 - ball.angle);
	}
}

function updateGameArea() // do the 50 fps games
{
	if (!pause)
	{
		myGameArea.clear();
		//document.getElementById("res").innerHTML = ball.angle; //just to test value
		//ball.changeAngle(ball.angle);
		playerOne.update(myGameArea.context);
		playerTwo.update(myGameArea.context);
		draw_center_line(myGameArea.context, myGameArea.canvas);
		ball.render(myGameArea.context);
		check_for_collisions(myGameArea.canvas);
		draw_scores(myGameArea.context, myGameArea.canvas);
	}
}

function draw_center_line(ctx : any, canvas : any) //draw line with 30 dash
{
	let currentX = canvas.width / 2, currentY = 0;
	ctx.moveTo(currentX, currentY);
	let buffer = 2;
	let numberOfDashes = 30;
	let bufferSize = numberOfDashes * buffer;
	let heightOfDash = canvas.height / numberOfDashes;
	for (let i = 0; i < numberOfDashes; i++) {
		currentY += heightOfDash;
		ctx.lineTo(currentX, currentY);
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.beginPath();
		currentY += buffer;
		ctx.moveTo(currentX, currentY);
	}
}

function draw_scores(ctx : any, canvas : any) //draw score p1 & p2
{
	ctx.fillStyle = "white";
	ctx.font = score_size + "px pixel";
	let txt_H = score_size;
	let txt_W_Pone = score1_x;
	let txt_W_Ptwo = score2_x;
	ctx.fillText(playerOne_points, txt_W_Pone, txt_H);
	ctx.fillText(playerTwo_points, txt_W_Ptwo, txt_H);
	if (playerOne_points == 10)
	{
		pause = true;
		document.getElementById('btn_pause')!.style.visibility = 'hidden';
		ctx.font = canvas.width / 10 + "px pixel";
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;
		ctx.fillStyle = "green";
		ctx.textAlign = "center";
		ctx.fillText("player one WON!", canvas.width/2, canvas.height/2);
	}
	if (playerTwo_points == 10)
	{
		pause = true;
		document.getElementById('btn_pause')!.style.visibility = 'hidden';
		ctx.font = canvas.width / 10 + "px pixel";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("player two WON!", canvas.width/2, canvas.height/2);
	}
}

export function do_pause() //when button pause pressed
{
	pause = !pause;
}

export function restart() //when button restart pressed
{
	document.getElementById('btn_pause')!.style.visibility = 'visible';
	pause = false;
	ball.x = canvas_width / 2;
	ball.y = canvas_height / 2;
	playerOne.y = paddle_y;
	playerTwo.y = paddle_y;
	ball.speed = ball_speed;
	ball.movement = ball_speed;
	ball.angle = 0;
	playerOne_points = 0;
	playerTwo_points = 0;
}

export function exportToJson() //when button export pressed
{
	//let dataStr = JSON.stringify({ Scoreplayer1: playerOne_points, Scoreplayer2: playerTwo_points, Yplayer1: playerOne.y, Yplayer2: playerTwo.y, Xball: ball.x, Yball: ball.y });
	//let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

	//let exportFileDefaultName = 'data.json';

	//let linkElement = document.createElement('a');
	//linkElement.setAttribute('href', dataUri);
	//linkElement.setAttribute('download', exportFileDefaultName);
	//linkElement.click();

	console.log(JSON.stringify({ Scoreplayer1: playerOne_points, Scoreplayer2: playerTwo_points, Yplayer1: playerOne.y, Yplayer2: playerTwo.y, Xball: ball.x, Yball: ball.y }));
}

function ImportJson(value : any) //when command ImportJson is written
{
	playerOne_points = value.Scoreplayer1;
	playerTwo_points = value.Scoreplayer2;
	playerOne.y = value.Yplayer1;
	playerTwo.y = value.Yplayer2;
	ball.x = value.Xball;
	ball.y = value.Yball;
}