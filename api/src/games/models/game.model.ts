import { ApiResponseProperty } from "@nestjs/swagger";
import { GameStatusModel } from "src/game_status/models/game_status.model";
import { UserModel } from "src/users/models/user.model";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"

@Entity("games")
export class GameModel {

    @ApiResponseProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiResponseProperty({ type: Number })
    @Column({ nullable: true })
    user1_score: number;

    @ApiResponseProperty({ type: Number })
    @Column()
    user2_score: number;

    @ApiResponseProperty({ type: Date })
    started_at: Date;

    @ApiResponseProperty({ type: Date })
    ended_at: Date;

    //--------------------------------------------

    @ApiResponseProperty({ type: () => UserModel })
    @ManyToOne(() => UserModel, { nullable: true })
    user1: UserModel | null;

    @ApiResponseProperty({ type: () => UserModel })
    @ManyToOne(() => UserModel, { nullable: true })
    user2: UserModel | null;

    @ApiResponseProperty({ type: () => GameStatusModel })
    @ManyToOne(() => GameStatusModel)
    status: GameStatusModel;

    //--------------------------------------------

    @ApiResponseProperty({ type: Date })
    @CreateDateColumn()
    created_at: Date;

    @ApiResponseProperty({ type: Date })
    @UpdateDateColumn()
    updated_at: Date;

}
