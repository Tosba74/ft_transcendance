import { ChatMessageDto } from './chat-message.dto';
import { UserDto } from './user.dto';

export class ChatRoomDto {
	id: number;
	name: string;
	type: number;
	protected?: boolean;

	messages: ChatMessageDto[];
	participants: UserDto[];
}
