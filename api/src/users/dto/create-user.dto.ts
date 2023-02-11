import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ type: String })
    login_name: string;
    @ApiProperty({ type: String })
    password: string;
    @ApiProperty({ type: String })
    pseudo: string;

    @ApiProperty({ type: String })
    tfa_email: string;
    @ApiProperty({ type: String })
    tfa_code: string;
}