import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserModel {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    display_name: string;

    @Column()
    login_name: string;

    // @Column({ nullable: true, default: null })
    // password: string; 

    // @Column()
    // avatar_url: string;

    // @Column()
    // tfa_enabled: boolean;
    // @Column()
    // tfa_email: string;
    // @Column()
    // tfa_code: string;

    // @Column()
    // status_id: number;
    // @Column()
    // status_updated_at: Date;

}
