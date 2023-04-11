import { IsNumber } from 'class-validator';

export class AskRoleDto {
	@IsNumber()
	roomId: number;

	@IsNumber()
	participantId: number;
}
