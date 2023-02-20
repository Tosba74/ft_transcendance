import { MigrationInterface, QueryRunner } from "typeorm"

export class FriendTypesTypes1676583424451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "friend_types" ("id", "type") VALUES (1, 'Asked')`);
        await queryRunner.query(`INSERT INTO "friend_types" ("id", "type") VALUES (2, 'Friend')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "friend_types" WHERE id = 1`);
        await queryRunner.query(`DELETE FROM "friend_types" WHERE id = 2`);
    }

}
