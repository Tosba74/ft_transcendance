import { UserDto } from "src/_shared_dto/user.dto";

export class UserParticipantDto extends UserDto {
	roleId: number;
	roleName: string;
}
