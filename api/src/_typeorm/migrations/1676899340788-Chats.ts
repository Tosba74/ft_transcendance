import { MigrationInterface, QueryRunner } from "typeorm";

export class Chats1676899340788 implements MigrationInterface {
    name = 'Chats1676899340788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chats" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "typeId" integer, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_525a238c4b8632032f8466c2000" FOREIGN KEY ("typeId") REFERENCES "chat_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_525a238c4b8632032f8466c2000"`);
        await queryRunner.query(`DROP TABLE "chats"`);
    }

}
