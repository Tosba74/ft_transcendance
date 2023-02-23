import { User } from '../user.entity';
import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';

// can be usefull for methods like PUT/PATCH, etc ... :

// export class UpdateUserDto extends PartialType(CreateUserDto) {
// export class UpdateUserDto extends OmitType(CreateUserDto, ['tfa_email', 'tfa_code'] as const,) {}
export class UpdateUserDto extends PartialType(OmitType(User, ['id','tfa_code','creation_date','state'] as const)) {
    
    @ApiPropertyOptional({ type: String })
    password?: string;
    
    @ApiPropertyOptional({ type: String })
    pseudo?: string;

    @ApiPropertyOptional({ type: String })
    avatar_url?: string;

    @ApiPropertyOptional({ type: Boolean })
    tfa_enabled?: boolean;

    @ApiPropertyOptional({ type: String })
    tfa_email?: string;
    
    @ApiPropertyOptional({ type: Number })
    status_id?: number;
    
    @ApiPropertyOptional({ type: Date })
    status_updated_at?: Date;

    @ApiPropertyOptional({ type: String })
    token?: string;
}
  
