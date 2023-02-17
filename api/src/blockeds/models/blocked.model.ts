import { ApiResponseProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"

import { UserModel } from "src/users/models/user.model";

@Entity("blockeds")
export class BlockedModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiResponseProperty({ type: UserModel })
    @ManyToOne(() => UserModel)
    blocked: UserModel;

    @ApiResponseProperty({ type: UserModel })
    @ManyToOne(() => UserModel)
    blocker: UserModel;

    //--------------------------------------------

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;

    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;
}
