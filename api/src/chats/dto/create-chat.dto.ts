import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsAlphanumeric, IsEmail, IsNumber, IsNotEmpty, IsStrongPassword, Length, MinLength, MaxLength } from 'class-validator';

export class CreateChatDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    type_id: number;

    @ApiPropertyOptional({ type: String })
    @IsNotEmpty()
    @IsAlphanumeric()
    name?: string;
    
    @ApiPropertyOptional({ type: String })
    password?: string;

    @ApiPropertyOptional({ type: [Number] })
    users?: number[];
}
