import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNumber, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';


export class CreateMessageDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsAlphanumeric()
    message: string;
    
    @ApiProperty({ type: Number })
    @IsNumber()
    user_id: number;
    
    @ApiProperty({ type: Number })
    @IsNumber()
    chat_id: number;
}
