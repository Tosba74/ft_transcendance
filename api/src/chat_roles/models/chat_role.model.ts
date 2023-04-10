import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ChatParticipantModel } from "src/chat_participants/models/chat_participant.model";


@Entity("chat_roles")
export class ChatRoleModel {

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

    static readonly USER_ROLE = 1;
    static readonly ADMIN_ROLE = 2;
    static readonly OWNER_ROLE = 3;
    static readonly BAN_ROLE = 4;
}
