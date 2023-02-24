import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNumber, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';


export class CreateParticipantDto {  
    @ApiProperty({ type: Number })
    @IsNumber()
    user_id: number;
    
    @ApiProperty({ type: Number })
    @IsNumber()
    chat_id: number;
    
    @ApiProperty({ type: Number })
    @IsNumber()
    role_id: number;
}
