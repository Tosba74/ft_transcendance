import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"

import { UserModel } from "src/users/models/user.model";
import { ChatModel } from "src/chats/models/chat.model";
import { ChatRoleModel } from "src/chat_roles/models/chat_role.model";

@Entity("chat_participants")
export class ChatParticipantModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiResponseProperty({ type: Date })
    @Column()
    muted_until: Date;
    
    //--------------------------------------------

    @ApiResponseProperty({ type: () => ChatRoleModel })
    @ManyToOne(() => ChatRoleModel)
    role: ChatRoleModel;

    @ApiResponseProperty({ type: () => UserModel })
    @ManyToOne(() => UserModel, (user) => user.rooms)
    participant: UserModel;
    
    @ApiResponseProperty({ type: () => ChatModel })
    @ManyToOne(() => ChatModel, (chat) => chat.participants)
    room: ChatModel;

    //--------------------------------------------

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;

    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;
}
