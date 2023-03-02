import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1676546357105 implements MigrationInterface {
    name = 'Users1676546357105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login_name" character varying NOT NULL, "password" character varying NOT NULL, "pseudo" character varying NOT NULL, "avatar_url" character varying, "tfa_enabled" boolean NOT NULL DEFAULT false, "tfa_email" character varying, "tfa_secret" character varying, "status_updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "validate_date" TIMESTAMP, "statusId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fffa7945e50138103659f6326b7" FOREIGN KEY ("statusId") REFERENCES "user_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fffa7945e50138103659f6326b7"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
