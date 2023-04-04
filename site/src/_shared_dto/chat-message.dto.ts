import { UserDto } from "./user.dto";

export interface ChatMessageDto {
  id: number;
  sender: UserDto;
  content: string;
}
