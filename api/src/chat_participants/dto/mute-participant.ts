import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNumber, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';


export class MuteParticipantDto {  
    @ApiProperty({ type: Number })
    @IsNumber()
    timeout: number;
}
