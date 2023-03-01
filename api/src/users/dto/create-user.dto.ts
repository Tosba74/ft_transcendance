import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';
import { IsLoginNameAlreadyExist } from '../validation/is-user-already-exist';

export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsAlphanumeric()
    login_name: string;
    
    @ApiProperty({ type: String })
    @IsNotEmpty()
    pseudo: string;
    
    @ApiProperty({ type: String })
    password: string;
}
