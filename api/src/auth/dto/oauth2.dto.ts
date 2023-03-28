import { ApiProperty } from '@nestjs/swagger';


export class Oauth2Dto {
    @ApiProperty({ type: String })
    code: string;

    @ApiProperty({ type: String })
    state: string;
}
