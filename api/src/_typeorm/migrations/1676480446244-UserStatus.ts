import { MigrationInterface, QueryRunner } from "typeorm";

export class UserStatus1676480446244 implements MigrationInterface {
    name = 'UserStatus1676480446244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_892a2061d6a04a7e2efe4c26d6f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_status"`);
    }

}
