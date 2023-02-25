import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("chat_types")
export class ChatTypeModel {

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


    constructor(type_id: number) {
        this.id = type_id;
    }

    static readonly DISCUSSION_TYPE = 1;
    static readonly PUBLIC_TYPE = 2;
    static readonly PRIVATE_TYPE = 3;
}
