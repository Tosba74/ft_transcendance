import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';

export class UpdatePseudoDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    pseudo: string;
}
