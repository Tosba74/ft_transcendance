import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccessTokenToUser1677513667347 implements MigrationInterface {
    name = 'AddAccessTokenToUser1677513667347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "access_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "access_token"`);
    }

}
