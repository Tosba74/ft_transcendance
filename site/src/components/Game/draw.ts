import * as module_const from "./constant"
import { Paddle } from "./paddle";





export function draw_center_line(context: CanvasRenderingContext2D) //draw line with 30 dash
{
	let buffer = 12;
	let numberOfDashes = 30;
	let bufferSize = numberOfDashes * buffer;
	let heightOfDash = (module_const.canvas_height - bufferSize) / numberOfDashes;

	let currentX = module_const.canvas_width / 2;
	let currentY = buffer / 2;

	context.strokeStyle = "white";

	for (let i = 0; i < numberOfDashes; i++, currentY += buffer) {
		context.beginPath();
		context.moveTo(currentX, currentY);
		currentY += heightOfDash;
		context.lineTo(currentX, currentY);
		context.stroke();
	}
}

export function draw_scores(context: CanvasRenderingContext2D, score1: number, score2: number) //draw score p1 & p2
{
	context.fillStyle = "white";
	context.font = module_const.score_size + "px pixel";

	let txt_H = module_const.score_size;
	let txt_W_Pone = module_const.score1_x;
	let txt_W_Ptwo = module_const.score2_x;

	context.fillText(score1.toString(), txt_W_Pone, txt_H);
	context.fillText(score2.toString(), txt_W_Ptwo, txt_H);

	if (score1 >= 10) {

		document.getElementById('btn_pause')!.style.visibility = 'hidden';

		context.font = module_const.canvas_width / 10 + "px pixel";
		context.fillStyle = module_const.paddle_color;
		context.textAlign = "center";
		context.fillText("player one WON!", module_const.canvas_width / 2, module_const.canvas_height / 2);
	}

	if (score2 >= 10) {

		document.getElementById('btn_pause')!.style.visibility = 'hidden';

		context.font = module_const.canvas_width / 10 + "px pixel";
		context.fillStyle = module_const.paddle2_color;
		context.textAlign = "center";
		context.fillText("player two WON!", module_const.canvas_width / 2, module_const.canvas_height / 2);
	}
}

export function draw_progress_bar(elem: HTMLElement, player: Paddle) {

	elem.style.width = player.ultimate + "%";

	if (player.ultimate == 100)
		elem.style.backgroundColor = "#FE5A52";
	else
		elem.style.backgroundColor = "#4CBB17";
}
