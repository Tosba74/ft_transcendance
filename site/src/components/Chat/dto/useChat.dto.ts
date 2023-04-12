import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

export interface UseChatDto {
  rooms: { [key: string]: ChatRoomDto } | undefined;

  chatOpen: boolean;
  setChatOpen: Function;
  modeChannel: boolean;
  setModeChannel: Function;
  currChannel: number;
  setCurrChannel: Function;

  identify: Function;
  connectRoom: Function;
  sendMessage: Function;
  deco: Function;
}
