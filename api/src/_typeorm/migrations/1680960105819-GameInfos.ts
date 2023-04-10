import { MigrationInterface, QueryRunner } from "typeorm";

export class GameInfos1680960105819 implements MigrationInterface {
    name = 'GameInfos1680960105819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" ADD "fun_mode" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "games" ADD "score_objective" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "score_objective"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "fun_mode"`);
    }

}
