import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("user_status")
export class UserStatusModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiResponseProperty({ type: String })
    @Column()
    name: string;

    //--------------------------------------------

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;

    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;


    constructor(status_id: number) {
        this.id = status_id;
    }

    static readonly ONLINE_STATUS = 1;
    static readonly OFFLINE_STATUS = 2;
    static readonly INGAME_STATUS = 3;
}
