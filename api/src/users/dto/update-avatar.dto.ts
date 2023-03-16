import { ApiProperty, } from '@nestjs/swagger';
import {IsNotEmpty,} from 'class-validator';

export class UpdateAvatarDto {
	@ApiProperty({ type: String })
    @IsNotEmpty()
    content: string;

	// @ApiResponseProperty({ type: String })
    // @Column({ nullable: true, default: null })
    // avatar_url?: string;
}
