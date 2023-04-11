import { UserGameDto } from "./user-game.dto";

export interface UserStatsDto {
    friends_count: number;
    
    games_count: number;

    rank: string;
    
    win_rate: number;
    
    last_games: UserGameDto[];
    
}
  

