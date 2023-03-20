import * as module_const from "./constant"
import * as module_pong from "./pong"

export function draw_center_line(ctx : any, canvas : any) //draw line with 30 dash
{
	let buffer = 12;
	let numberOfDashes = 30;
	let bufferSize = numberOfDashes * buffer;
	let heightOfDash = (canvas.height - bufferSize) / numberOfDashes;

	let currentX = canvas.width / 2;
	let currentY = buffer / 2;
	ctx.strokeStyle = "white";

	for (let i = 0; i < numberOfDashes; i++, currentY += buffer) {
		ctx.beginPath();
		ctx.moveTo(currentX, currentY);
		currentY += heightOfDash;
		ctx.lineTo(currentX, currentY);
		ctx.stroke();
	}
}

export function draw_scores(ctx : any, canvas : any, myGameArea : any) //draw score p1 & p2
{
	ctx.fillStyle = "white";
	ctx.font = module_const.score_size + "px pixel";
	let txt_H = module_const.score_size;
	let txt_W_Pone = module_const.score1_x;
	let txt_W_Ptwo = module_const.score2_x;
	ctx.fillText(myGameArea.playerOne_points, txt_W_Pone, txt_H);
	ctx.fillText(myGameArea.playerTwo_points, txt_W_Ptwo, txt_H);
	if (myGameArea.playerOne_points == 10)
	{
		myGameArea.pause = true;
		document.getElementById('btn_pause')!.style.visibility = 'hidden';
		ctx.font = canvas.width / 10 + "px pixel";
		let i = 0;
		while (myGameArea.ball[i])
		{
			myGameArea.ball[i].x = canvas.width / 2;
			myGameArea.ball[i].y = canvas.height / 2;
			i++;
		}
		ctx.fillStyle = module_const.paddle_color;
		ctx.textAlign = "center";
		ctx.fillText("player one WON!", canvas.width/2, canvas.height/2);
	}
	if (myGameArea.playerTwo_points == 10)
	{
		myGameArea.pause = true;
		document.getElementById('btn_pause')!.style.visibility = 'hidden';
		ctx.font = canvas.width / 10 + "px pixel";
		ctx.fillStyle = module_const.paddle2_color;
		ctx.textAlign = "center";
		ctx.fillText("player two WON!", canvas.width/2, canvas.height/2);
	}
}

export function progressBar(progress : any)
{
	let elem : any;
	elem = document.getElementById("myBar");
	if (module_pong.myGameArea.ultimate < 100)
	{
		if (progress < 0)
			progress = -progress;
		module_pong.myGameArea.ultimate += progress;
		elem.style.width = module_pong.myGameArea.ultimate + "%";
		if (module_pong.myGameArea.ultimate >= 100)
			elem.style.backgroundColor = "#FE5A52";
		else
			elem.style.backgroundColor = "#4CBB17";
	}
}
