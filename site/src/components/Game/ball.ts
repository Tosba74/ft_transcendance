export class Ball {
  public x: number;
  public y: number;
  public radius: number;
  public xunits: number;
  public yunits: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    xunits: number,
    yunits: number
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xunits = xunits;
    this.yunits = yunits;
  }

  render(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = "black";
    context.arc(
      this.x - this.xunits * 0.8,
      this.y - this.yunits * 0.8,
      this.radius,
      0,
      2 * Math.PI
    );
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
