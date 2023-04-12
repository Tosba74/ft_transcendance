import { UserDto } from "./user.dto";

export interface ParticipantDto extends UserDto {
  roleId: number;
  roleName: string;
}
