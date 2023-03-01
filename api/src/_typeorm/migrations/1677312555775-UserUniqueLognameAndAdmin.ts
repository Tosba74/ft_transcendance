import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUniqueLognameAndAdmin1677312555775 implements MigrationInterface {
    name = 'UserUniqueLognameAndAdmin1677312555775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_b1d0a1e8ae666d95893eb95c168" UNIQUE ("login_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_b1d0a1e8ae666d95893eb95c168"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
    }

}
