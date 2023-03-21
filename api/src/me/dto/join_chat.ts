import { ApiProperty } from '@nestjs/swagger';


export class JoinChatDto {
    @ApiProperty({ type: String })
    password?: string;
}
