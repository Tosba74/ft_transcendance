import { MigrationInterface, QueryRunner } from "typeorm";

export class UserBlockeds1677833966875 implements MigrationInterface {
    name = 'UserBlockeds1677833966875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blockeds" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "blockedId" integer, "blockerId" integer, CONSTRAINT "PK_226c02ef18a6a2b6095c39ddffe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blockeds" ADD CONSTRAINT "FK_68c6e499c314a5a7c060d4f1d34" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blockeds" ADD CONSTRAINT "FK_77eac751a7424c2f219d4c84ce8" FOREIGN KEY ("blockerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blockeds" DROP CONSTRAINT "FK_77eac751a7424c2f219d4c84ce8"`);
        await queryRunner.query(`ALTER TABLE "blockeds" DROP CONSTRAINT "FK_68c6e499c314a5a7c060d4f1d34"`);
        await queryRunner.query(`DROP TABLE "blockeds"`);
    }

}
