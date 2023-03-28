import { MigrationInterface, QueryRunner } from "typeorm"

export class RmChatTypeBan1677869964558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "chat_types" WHERE id = 4`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "chat_types" ("id", "name") VALUES (4, 'ban')`);
    }

}
