import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';
import { IsLoginNameAlreadyExist } from '../validation/is-user-already-exist';

export class CreateUserDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsAlphanumeric()
    // @IsLoginNameAlreadyExist() // Custom validation decorators (FONCTIONNE PAS)
    // ... plus de validation ? 
    login_name: string;
    
    @ApiProperty({ type: String })
    @IsStrongPassword()
    // ... plus de validation ? 
    password: string;
    
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsAlphanumeric()
    // @IsPseudoAlreadyExist() // Custom validation decorators (FONCTIONNE PAS)
    // ... plus de validation ? 
    pseudo: string;
}
