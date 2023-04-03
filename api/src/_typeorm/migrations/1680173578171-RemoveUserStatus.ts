import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserStatus1680173578171 implements MigrationInterface {
    name = 'RemoveUserStatus1680173578171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fffa7945e50138103659f6326b7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status_updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "statusId"`);
        await queryRunner.query(`DROP TABLE "user_status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status_updated_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fffa7945e50138103659f6326b7" FOREIGN KEY ("statusId") REFERENCES "user_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "user_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_892a2061d6a04a7e2efe4c26d6f" PRIMARY KEY ("id"))`);
    }
}
