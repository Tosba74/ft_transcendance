import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"

import { UserModel } from "src/users/models/user.model";
import { FriendTypeModel } from "src/friend_types/models/friend_type.model";

@Entity("friends")
export class FriendModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiResponseProperty({ type: Number })
    @ManyToOne(() => UserModel)
    first_user: UserModel;

    @ApiResponseProperty({ type: Number })
    @ManyToOne(() => UserModel)
    second_user: UserModel;

    @ApiResponseProperty({ type: Number })
    @ManyToOne(() => FriendTypeModel)
    friend_type: FriendTypeModel;


    //--------------------------------------------

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;

    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;
}
