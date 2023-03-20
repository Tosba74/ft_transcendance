export class paddle //set up first playerOne
{
	private x: number;
	private y: number;
	private gamearea: number;
	private width: number;
	private height: number;
	private speedY: number;
	private speedX: number;
	private color: number;
	constructor(width : any, height : any, color : any, x : any, y : any, myGameArea : any) {
		//var canvas = document.getElementById("canvas");
		this.gamearea = myGameArea;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speedY = 0;
		this.speedX = 0;
		this.color = color;
	}
	update(ctx : any, myGameArea : any) {
		this.y += this.speedY;
		if (this.y <= 0)
			this.y = 0;
		if (this.y + this.height > myGameArea.canvas.height)
			this.y = myGameArea.canvas.height - this.height;
		myGameArea.context.fillStyle = this.color;
		myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
	}
}