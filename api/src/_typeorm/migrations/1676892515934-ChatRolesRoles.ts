import { MigrationInterface, QueryRunner } from "typeorm"

export class ChatRolesRoles1676892515934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "chat_roles" ("id", "name") VALUES (1, 'user')`);
        await queryRunner.query(`INSERT INTO "chat_roles" ("id", "name") VALUES (2, 'admin')`);
        await queryRunner.query(`INSERT INTO "chat_roles" ("id", "name") VALUES (3, 'owner')`);
        await queryRunner.query(`INSERT INTO "chat_roles" ("id", "name") VALUES (4, 'ban')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "chat_roles" WHERE id = 1`);
        await queryRunner.query(`DELETE FROM "chat_roles" WHERE id = 2`);
        await queryRunner.query(`DELETE FROM "chat_roles" WHERE id = 3`);
        await queryRunner.query(`DELETE FROM "chat_roles" WHERE id = 4`);
    }

}
