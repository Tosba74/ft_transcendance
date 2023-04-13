import { UserDto } from "./user.dto";

export interface ChatMessageDto {
  id: number;
  sender: UserDto;

  invite_id?: number;
  invite_pseudo?: string;
  invite_game_id?: number;

  content: string;
}
