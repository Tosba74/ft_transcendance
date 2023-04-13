import { UserDto } from "./user.dto";

export class ChatMessageDto {
	id: number;
	sender: UserDto;

	invite_id?: number = -1;
	invite_pseudo?: string = "";
	invite_game_id?: number = -1;

	content: string;
}
