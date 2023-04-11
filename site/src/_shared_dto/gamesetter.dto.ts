import { UserDto } from "./user.dto";

export interface GameSetterDto {
  game_id: number;

  userInfos1: UserDto;
  userInfos2: UserDto;
}
