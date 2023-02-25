import { MigrationInterface, QueryRunner } from "typeorm"

export class ChatTypesTypes1676889641892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "chat_types" ("id", "name") VALUES (1, 'discussion')`);
        await queryRunner.query(`INSERT INTO "chat_types" ("id", "name") VALUES (2, 'public')`);
        await queryRunner.query(`INSERT INTO "chat_types" ("id", "name") VALUES (3, 'private')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "chat_types" WHERE id = 1`);
        await queryRunner.query(`DELETE FROM "chat_types" WHERE id = 2`);
        await queryRunner.query(`DELETE FROM "chat_types" WHERE id = 3`);
    }

}
