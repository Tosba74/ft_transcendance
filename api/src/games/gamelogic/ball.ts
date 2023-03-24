

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

	public first_bounce: boolean;
	
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
		this.first_bounce = true;
	}

	changeAngle(angle: number) {
		this.angle = angle % 360;
	}
}
