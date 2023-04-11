import { BallDto } from "./ball.dto";
import { PlayerDto } from "./player.dto";

export interface GameDataDto {
  started: boolean;
  ended: boolean;

  player1: PlayerDto;
  player2: PlayerDto;
  balls: BallDto[];
}
