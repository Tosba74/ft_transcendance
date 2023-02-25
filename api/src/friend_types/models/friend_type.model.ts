import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("friend_types")
export class FriendTypeModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiResponseProperty({ type: String })
    @Column()
    type: string;

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

    static readonly ASKED_TYPE = 1;
    static readonly FRIEND_TYPE = 2;
}
