import { MigrationInterface, QueryRunner } from "typeorm"

export class UserStatusStates1676480781279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "user_status" ("id", "name") VALUES (1, 'Offline')`);
        await queryRunner.query(`INSERT INTO "user_status" ("id", "name") VALUES (2, 'Online')`);
        await queryRunner.query(`INSERT INTO "user_status" ("id", "name") VALUES (3, 'In game')`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user_status" WHERE id = 1`);
        await queryRunner.query(`DELETE FROM "user_status" WHERE id = 2`);
        await queryRunner.query(`DELETE FROM "user_status" WHERE id = 3`);
    }

}
