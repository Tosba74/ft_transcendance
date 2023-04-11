import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean } from 'class-validator';

export class CreateGameDto {

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  fun_mode: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  force_fun: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  points_objective: number;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  force_points: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  invited_id: number;
}
