export class Ball {
	public x: number;
	public y: number;
	public radius: number;
	public speed: number;
	public movement: number;
	public angle: number;
	public xunits: number;
	public yunits: number;
	public goal: boolean;
	constructor(x : number, y : number, radius : number, speed : number) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;
		this.angle = 0;
		this.xunits = 0;
		this.yunits = 0;
		this.changeAngle(0);
		this.movement = 0;
		this.goal = false;
	}

	changeAngle(angle : number) {
		this.angle = angle % 360;
	}

	render(ctx : any) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "white";
		this.movement += this.speed;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.save();
		//ctx.shadowColor = '#999';
		//ctx.shadowBlur = 20;
		//ctx.shadowOffsetX = 15;
		//ctx.shadowOffsetY = 15;
		ctx.strokeStyle = "purple";
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}
