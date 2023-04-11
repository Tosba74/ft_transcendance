import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("game_status")
export class GameStatusModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

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

    static readonly CREATED_STATUS = 1;
    static readonly FINISHED_STATUS = 2;
    static readonly CLOSED_STATUS = 3;
}
