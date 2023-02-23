import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"

import { UserModel } from "src/users/models/user.model";
import { ChatModel } from "src/chats/models/chat.model";

@Entity("chat_messages")
export class ChatMessageModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiResponseProperty({ type: String })
    @Column()
    message: string;

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    sent_at: Date;

    //--------------------------------------------

    @ApiResponseProperty({ type: () => UserModel })
    @ManyToOne(() => UserModel, (user) => user.messages)
    sender: UserModel;
    
    @ApiResponseProperty({ type: () => ChatModel })
    @ManyToOne(() => ChatModel, (chat) => chat.messages)
    room: ChatModel;

    //--------------------------------------------

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;

    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;
}
