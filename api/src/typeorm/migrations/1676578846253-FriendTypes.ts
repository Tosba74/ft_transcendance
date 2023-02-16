import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendTypes1676578846253 implements MigrationInterface {
    name = 'FriendTypes1676578846253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friend_types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c696aaedd926d7f264f439a1b5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "friend_types"`);
    }

}
