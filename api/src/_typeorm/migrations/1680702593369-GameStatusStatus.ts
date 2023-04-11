import { MigrationInterface, QueryRunner } from "typeorm"

export class GameStatusStatus1680702593369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "game_status" ("id", "name") VALUES (1, 'Created')`);
        await queryRunner.query(`INSERT INTO "game_status" ("id", "name") VALUES (2, 'Finished')`);
        await queryRunner.query(`INSERT INTO "game_status" ("id", "name") VALUES (3, 'Closed')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "game_status" WHERE id = 1`);
        await queryRunner.query(`DELETE FROM "game_status" WHERE id = 2`);
        await queryRunner.query(`DELETE FROM "game_status" WHERE id = 3`);
    }

}
