import { MigrationInterface, QueryRunner } from "typeorm";

export class GameStatus1680700079599 implements MigrationInterface {
    name = 'GameStatus1680700079599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96cad1033a771bf73da9d422b4f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "game_status"`);
    }

}
