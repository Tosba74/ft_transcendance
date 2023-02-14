import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';
import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import { IsLoginNameAlreadyExist } from '../validation/is-user-already-exist';


export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsAlphanumeric()
    // @IsLoginNameAlreadyExist() // Custom validation decorators
    // ... plus de validation ? 
    login_name: string;
    
    @ApiProperty({ type: String })
    @IsStrongPassword()
    // ... plus de validation ? 
    password: string;
    
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsAlphanumeric()
    // @IsPseudoAlreadyExist() // Custom validation decorators
    // ... plus de validation ? 
    pseudo: string;

    
    
    @ApiProperty({ type: String })
    @IsEmail()
    // @IsEmailAlreadyExist() // Custom validation decorators
    tfa_email: string;
    
    @ApiProperty({ type: String })
    @IsNotEmpty()
    tfa_code: string;
}

// can be usefull for other method like PUT, etc ... :

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
// export class UpdateUserDto extends OmitType(CreateUserDto, ['tfa_email', 'tfa_code'] as const,) {}
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['tfa_email', 'tfa_code'] as const)) {}
  
export class UpdateUserPasswordDto extends PickType(CreateUserDto, ['password'] as const) {}
