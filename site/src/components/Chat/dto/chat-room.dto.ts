import { ChatMessage } from "./chat-message.dto";

export interface ChatRoom {
  id: number;
  name: string;

  messages: ChatMessage[];
}
