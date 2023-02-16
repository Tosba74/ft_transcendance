import { CreateUserDto } from './create-user.dto';
import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';

// can be usefull for methods like PUT/PATCH, etc ... :

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
// export class UpdateUserDto extends OmitType(CreateUserDto, ['tfa_email', 'tfa_code'] as const,) {}
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, [] as const)) {
	@ApiPropertyOptional({ type: String })
    login_name?: string;
    
    @ApiPropertyOptional({ type: String })
    password?: string;
    
    @ApiPropertyOptional({ type: String })
    pseudo?: string;
}
  
// export class UpdateUserPasswordDto extends PickType(CreateUserDto, ['password'] as const) {}
