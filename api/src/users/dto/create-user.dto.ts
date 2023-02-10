import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ type: String })
    display_name: string;

    @ApiProperty({ type: String })
    login_name: string;
}