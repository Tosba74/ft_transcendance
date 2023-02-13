import { ApiResponseProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id?: number;
    
    @ApiResponseProperty({ type: String })
    @Column()
    login_name: string;
    @ApiResponseProperty({ type: String })
    @Column()
    password: string; 
    @ApiResponseProperty({ type: String })
    @Column()
    pseudo: string;
    
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    avatar_url?: string;
    
    @ApiResponseProperty({ type: Boolean })
    @Column()
    tfa_enabled: boolean;
    @ApiResponseProperty({ type: String })
    @Column()
    tfa_email: string;
    @ApiResponseProperty({ type: String })
    @Column()
    tfa_code: string;
    
    @ApiResponseProperty({ type: Number })
    @Column()
    status_id: number;
    @ApiResponseProperty({ type: Date })
    @Column()
    status_updated_at: Date;
    
    @ApiResponseProperty({ type: Date })
    @Column()
    creation_date: Date;
    @ApiResponseProperty({ type: Date })
    @Column({ nullable: true, default: null })
    validate_date?: Date;
}
