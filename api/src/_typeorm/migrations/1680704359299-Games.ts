import { MigrationInterface, QueryRunner } from "typeorm";

export class Games1680704359299 implements MigrationInterface {
    name = 'Games1680704359299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "user1_score" integer, "user2_score" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user1Id" integer, "user2Id" integer, "statusId" integer, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_47147fa525d8d9670ebea355f82" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_f87ec10e7554c7fd5d3a8bf9a57" FOREIGN KEY ("user2Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_a4d8fc46ad2323a4fa4c65f1f0a" FOREIGN KEY ("statusId") REFERENCES "game_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_a4d8fc46ad2323a4fa4c65f1f0a"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_f87ec10e7554c7fd5d3a8bf9a57"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_47147fa525d8d9670ebea355f82"`);
        await queryRunner.query(`DROP TABLE "games"`);
    }

}
