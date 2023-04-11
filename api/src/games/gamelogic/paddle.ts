import * as module_const from "./constant"
import { PlayerDto } from "src/_shared_dto/player.dto";

export class Paddle //set up first playerOne
{
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	public ready: boolean;

	public speedY: number;
	public speedX: number;

	public color: string;

	public ultimate: number;
	public addABALL: boolean;
	public last_input: boolean; //false:down true: up
	public score: number;
	public bonk: number; //for reduce paddle
	public reducePaddle: boolean; //for reduce paddle

	constructor(width: number, height: number, color: string, x: number, y: number) {

		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;

		this.ready = false;

		this.speedY = 0;
		this.speedX = 0;
		this.color = color;

		this.ultimate = 0;
		this.addABALL = false;
		this.last_input = false;


		this.score = 0;
		this.bonk = -1;
		this.reducePaddle = false;
	}
	
	update() {
		this.y += this.speedY;

		this.y = Math.max(this.y, 0);
		this.y = Math.min(this.y, module_const.canvas_height - this.height);
		
	}

	export(): PlayerDto {

		return {
			x: this.x,
			y: this.y,

			height: this.height, 
			width: this.width, 

			ready: this.ready,
			color: this.color,
			
			ultimate: this.ultimate, 
			score: this.score,
		};
	}
	
	reset() {
		this.speedY = 0;
		this.speedX = 0;
		this.ultimate = 0;
		this.addABALL = false;
		this.reducePaddle = false;
		this.last_input = false;
		this.score = 0;
	}
}