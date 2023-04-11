import { UserDto } from "./user.dto";

export class ChatMessageDto {
	id: number;
	sender: UserDto;
	content: string;
}
