import { ChatMessage } from './chat-message.dto';

export class ChatRoom {
	id: number;
	name: string;

	messages: ChatMessage[];
}
