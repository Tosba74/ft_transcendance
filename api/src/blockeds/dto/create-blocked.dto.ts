import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEmail, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';

export class BlockedDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    blocked_id: number;

    @ApiProperty({ type: Number })
    @IsNumber()
    blocker_id: number;
}
