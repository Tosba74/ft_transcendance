

export class Ball {
	public x: number;
	public y: number;
	public radius: number;
	public speed: number;
	public angle: number;
	public xunits: number;
	public yunits: number;
	public radians: number;
	public goal: boolean;
	
	constructor(x: number, y: number, radius: number, speed: number) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;
		this.angle = 0;
		this.xunits = 0;
		this.yunits = 0;
		this.radians = 0;
		this.changeAngle(0);
		this.goal = false;
	}

	changeAngle(angle: number) {
		this.angle = angle % 360;
	}

	update() {


	}

	render(context: CanvasRenderingContext2D) {
		
		context.beginPath();
		context.fillStyle = "black";
		context.arc(this.x - (this.xunits * 0.8), this.y - (this.yunits * 0.8), this.radius, 0, 2 * Math.PI);
		context.strokeStyle = "white";
		context.fill();
		context.stroke();

		context.beginPath();
		context.fillStyle = "white";
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.strokeStyle = "purple";
		context.fill();
		context.stroke();

	}
}
