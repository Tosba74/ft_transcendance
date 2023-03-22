import * as module_const from "./constant"
import * as module_pong from "./pong"

export function draw_center_line() //draw line with 30 dash
{
	let buffer = 12;
	let numberOfDashes = 30;
	let bufferSize = numberOfDashes * buffer;
	let heightOfDash = (module_const.canvas_height - bufferSize) / numberOfDashes;

	let currentX = module_const.canvas_width / 2;
	let currentY = buffer / 2;

	module_pong.myGameArea.context.strokeStyle = "white";

	for (let i = 0; i < numberOfDashes; i++, currentY += buffer) {
		module_pong.myGameArea.context.beginPath();
		module_pong.myGameArea.context.moveTo(currentX, currentY);
		currentY += heightOfDash;
		module_pong.myGameArea.context.lineTo(currentX, currentY);
		module_pong.myGameArea.context.stroke();
	}
}

export function draw_scores() //draw score p1 & p2
{
	module_pong.myGameArea.context.fillStyle = "white";
	module_pong.myGameArea.context.font = module_const.score_size + "px pixel";

	let txt_H = module_const.score_size;
	let txt_W_Pone = module_const.score1_x;
	let txt_W_Ptwo = module_const.score2_x;

	module_pong.myGameArea.context.fillText(module_pong.myGameArea.playerOne.score, txt_W_Pone, txt_H);
	module_pong.myGameArea.context.fillText(module_pong.myGameArea.playerTwo.score, txt_W_Ptwo, txt_H);

	if (module_pong.myGameArea.playerOne.score == 10) {
		module_pong.myGameArea.pause = true;
		document.getElementById('btn_pause')!.style.visibility = 'hidden';
		module_pong.myGameArea.context.font = module_const.canvas_width / 10 + "px pixel";
		module_pong.myGameArea.context.fillStyle = module_const.paddle_color;
		module_pong.myGameArea.context.textAlign = "center";
		module_pong.myGameArea.context.fillText("player one WON!", module_const.canvas_width / 2, module_const.canvas_height / 2);
	}

	if (module_pong.myGameArea.playerTwo.score == 10) {
		module_pong.myGameArea.pause = true;
		document.getElementById('btn_pause')!.style.visibility = 'hidden';
		module_pong.myGameArea.context.font = module_const.canvas_width / 10 + "px pixel";
		module_pong.myGameArea.context.fillStyle = module_const.paddle2_color;
		module_pong.myGameArea.context.textAlign = "center";
		module_pong.myGameArea.context.fillText("player two WON!", module_const.canvas_width / 2, module_const.canvas_height / 2);
	}
}

export function progressBar(progress: number) {
	let elem: any;

	elem = document.getElementById("myBar");
	if (module_pong.myGameArea.playerOne.ultimate < 100) {
		if (progress < 0)
			progress = -progress;

		module_pong.myGameArea.playerOne.ultimate += progress;
		if (module_pong.myGameArea.playerOne.ultimate >= 100)
			module_pong.myGameArea.playerOne.ultimate = 100;

		elem.style.width = module_pong.myGameArea.playerOne.ultimate + "%";

		if (module_pong.myGameArea.playerOne.ultimate == 100)
			elem.style.backgroundColor = "#FE5A52";
		else
			elem.style.backgroundColor = "#4CBB17";
	}
}
