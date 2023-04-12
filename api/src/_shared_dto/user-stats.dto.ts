import { ApiProperty } from '@nestjs/swagger';
import { GameModel } from 'src/games/models/game.model';

export class UserStatsDto {
	@ApiProperty({ type: Number })
    friends_count: number;
    
    @ApiProperty({ type: Number })
    games_count: number;

    @ApiProperty({ type: String })
    rank: string;
    
    @ApiProperty({ type: Number })
    win_rate: number;
    
    @ApiProperty({ type: [GameModel] })
    last_games: GameModel[];
    
}
  

