import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    login_name?: string;
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    password?: string; 
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    pseudo?: string;
    
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    avatar_url?: string;
    
    @ApiResponseProperty({ type: Boolean })
    @Column()
    tfa_enabled: boolean;
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    tfa_email?: string;
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    tfa_code?: string;

    @ApiResponseProperty({ type: Date })
    @Column()
    created_at: Date;
    @ApiResponseProperty({ type: String })
    @Column()
    token: string;

    @ApiResponseProperty({ type: Number })
    @Column()
    status: number;    // 0 = logged-out, 1 = logged-in, 2 = logged-in and playing
    @ApiResponseProperty({ type: Date })
    @Column()
    status_updated_at: Date;
}
