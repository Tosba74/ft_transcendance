import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDeleteTfaEmail1677872904256 implements MigrationInterface {
    name = 'UserDeleteTfaEmail1677872904256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tfa_email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tfa_email" character varying`);
    }

}
