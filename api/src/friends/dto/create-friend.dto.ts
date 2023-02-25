import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEmail, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';

export class FriendDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    friender_id: number;

    @ApiProperty({ type: Number })
    @IsNumber()
    friended_id: number;
}
