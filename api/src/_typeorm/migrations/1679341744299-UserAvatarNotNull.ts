import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAvatarNotNull1679341744299 implements MigrationInterface {
    name = 'UserAvatarNotNull1679341744299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar_url" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar_url" DROP NOT NULL`);
    }

}
