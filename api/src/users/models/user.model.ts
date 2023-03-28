import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Unique } from "typeorm"

import { UserStatusModel } from "src/user_status/models/user_status.model";
import { ChatMessageModel } from "src/chat_messages/models/chat_message.model";
import { ChatParticipantModel } from "src/chat_participants/models/chat_participant.model";

@Entity("users")
@Unique('unique_constraint', ['login_name', 'pseudo'])
export class UserModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiResponseProperty({ type: String })
    @Column()
    login_name: string;

    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, select: false })
    password?: string; 

    @ApiResponseProperty({ type: String })
    @Column()
    pseudo: string;
    
    @ApiResponseProperty({ type: String })
    @Column()
    avatar_url: string;

    @ApiResponseProperty({ type: Boolean })
    @Column({ default: false })
    is_admin: boolean;

    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null })
    access_token?: string;

    @ApiResponseProperty({ type: Number })
    @Column({ default: -1 })
    color: number;
    
    //--------------------------------------------
    
    @ApiResponseProperty({ type: Boolean })
    @Column({ default: false })
    tfa_enabled: boolean;
    
    @ApiResponseProperty({ type: String })
    @Column({ nullable: true, default: null, select: false })
    tfa_secret: string;

    //--------------------------------------------
    
    @ApiResponseProperty({ type: () => [ChatMessageModel] })
    @OneToMany(() => ChatMessageModel, (chatMessage) => chatMessage.sender)
    messages: ChatMessageModel[];

    @ApiResponseProperty({ type: () => [ChatParticipantModel] })
    @OneToMany(() => ChatParticipantModel, (chatParticipant) => chatParticipant.participant)
    rooms: ChatParticipantModel[];
    
    //--------------------------------------------
    
    @ApiResponseProperty({ type: Number })
    @ManyToOne(() => UserStatusModel)
    status: UserStatusModel;
    
    @ApiResponseProperty({ type: Date })
    @Column()
    status_updated_at: Date;
    
    //--------------------------------------------
    
    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;
    
    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;
        
    @ApiResponseProperty({ type: Date })
    @Column({ nullable: true, default: null })
    validate_date?: Date;
}
