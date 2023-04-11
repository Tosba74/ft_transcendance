import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNumber, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';

export class UpdateRoleDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    new_role: number;

    @ApiProperty({ type: Number })
    @IsNumber()
    participantId: number;

    @ApiProperty({ type: Number })
    @IsNumber()
    roomId: number;
}
