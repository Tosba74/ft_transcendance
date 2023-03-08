import { ChatMessage } from './chat_message.dto';

export class ChatRoom{
	id: number;
	name: string;

    messages: ChatMessage[];
}
