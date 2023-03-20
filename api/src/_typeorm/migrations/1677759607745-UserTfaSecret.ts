import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTfaSecret1677759607745 implements MigrationInterface {
    name = 'UserTfaSecret1677759607745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "tfa_code" TO "tfa_secret"`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "tfa_secret" TO "tfa_code"`);
    }

}
