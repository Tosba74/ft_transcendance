import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

export interface UseChatDto {
  rooms: { [key: string]: ChatRoomDto } | undefined;
  identify: Function;
  connectRoom: Function;
  sendMessage: Function;
}
