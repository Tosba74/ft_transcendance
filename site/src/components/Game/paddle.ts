import { PlayerDto } from "src/_shared_dto/player.dto";

export class Paddle {
  //set up first playerOne
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  public ready: boolean;

  public color: string;
  public ultimate: number;
  public score: number;

  public progress_bar: HTMLElement | null;

  // constructor(width: number, height: number, color: string, x: number, y: number) {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.width = 0;
    this.height = 0;

    this.ready = false;

    this.color = "white";
    this.ultimate = 0;
    this.score = 0;

    this.progress_bar = null;
  }

  import(player: PlayerDto) {
    this.x = player.x;
    this.y = player.y;

    this.width = player.width;
    this.height = player.height;

    this.ready = player.ready;

    this.ultimate = player.ultimate;
    this.score = player.score;

    this.color = player.color;
  }

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
