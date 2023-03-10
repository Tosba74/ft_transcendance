import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm"

import { ChatTypeModel } from "src/chat_types/models/chat_type.model";
import { UserModel } from "src/users/models/user.model";
import { ChatMessageModel } from "src/chat_messages/models/chat_message.model";
import { ChatParticipantModel } from "src/chat_participants/models/chat_participant.model";

@Entity("chats")
export class ChatModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiResponseProperty({ type: String })
    @Column()
    name: string;

    @ApiResponseProperty({ type: String })
    @Column({ select: false })
    password: string;

    @ApiResponseProperty({ type: ChatTypeModel })
    @ManyToOne(() => ChatTypeModel)
    type: ChatTypeModel;
    
    //--------------------------------------------

    @ApiResponseProperty({ type: () => [ChatMessageModel] })
    @OneToMany(() => ChatMessageModel, (chatMessage) => chatMessage.room)
    messages: ChatMessageModel[];

    @ApiResponseProperty({ type: () => [ChatParticipantModel] })
    @OneToMany(() => ChatParticipantModel, (chatParticipant) => chatParticipant.room)
    participants: ChatParticipantModel[];

    //--------------------------------------------

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;

    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;
}
