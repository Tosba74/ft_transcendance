import { UserDto } from "./user.dto";

export interface UserGameDto {

    id: number;

    fun_mode: boolean;

    user1_score: number;
    user2_score: number;
    started_at: Date;

    user1: UserDto;
    user2: UserDto;

}
