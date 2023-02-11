import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserModel {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    login_name: string;
    @Column()
    password: string; 
    @Column()
    pseudo: string;

    @Column({ nullable: true, default: null })
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

    @Column()
    creation_date: Date;
    @Column({ nullable: true, default: null })
    validate_date: Date;
}
