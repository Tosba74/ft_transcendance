import { ChatMessageDto } from './chat-message.dto';
import { UserDto } from './user.dto';

export class ChatRoomDto {
	id: number;
	name: string;
	type: number;
	pw?: boolean;

	messages: ChatMessageDto[];
	participants: UserDto[];
}
