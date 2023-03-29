import { ChatMessageDto } from "./chat-message.dto";
import { UserDto } from "./user.dto";

export interface ChatRoomDto {
  id: number;
  name: string;
  type: number;

  messages: ChatMessageDto[];
  participants: UserDto[];
}
