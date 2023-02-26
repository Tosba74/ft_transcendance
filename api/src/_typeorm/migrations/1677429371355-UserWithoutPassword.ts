import { MigrationInterface, QueryRunner } from "typeorm";

export class UserWithoutPassword1677429371355 implements MigrationInterface {
    name = 'UserWithoutPassword1677429371355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }

}
