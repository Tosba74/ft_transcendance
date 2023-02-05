import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class UserModel {

    @ApiPropertyOptional({ type: Number })
    @PrimaryGeneratedColumn()
    id?: number;

    
    @ApiProperty({ type: String })
    @Column()
    display_name: string;

    @ApiProperty({ type: String })
    @Column()
    login_name: string;

    @ApiProperty({ type: String })
    @Column({ nullable: true, default: null })
    password: string; 
    

    @ApiProperty({ type: String })
    @Column()
    avatar_url: string;


    @Column()
    tfa_enabled: boolean;
    @Column()
    tfa_email: string;
    @Column()
    tfa_code: string;

    @Column()
    status_id: number;
    @Column()
    status_updated_at: Date;

}
