import { ChatMessageDto } from "./chat-message.dto";
import { ParticipantDto } from "./participant.dto";
import { UserDto } from "./user.dto";

export interface ChatRoomDto {
  id: number;
  name: string;
  type: number;
  protected?: boolean;

  messages: ChatMessageDto[];
  participants: ParticipantDto[];
}
