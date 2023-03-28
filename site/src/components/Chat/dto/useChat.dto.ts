import { ChatRoom } from "./chat-room.dto";

export interface UseChatDto {
  rooms: { [key: string]: ChatRoom } | undefined;
  identify: Function;
  connectRoom: Function;
  sendMessage: Function;
}
