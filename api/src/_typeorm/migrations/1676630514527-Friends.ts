import { MigrationInterface, QueryRunner } from "typeorm";

export class Friends1676630514527 implements MigrationInterface {
    name = 'Friends1676630514527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friends" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstUserId" integer, "secondUserId" integer, "friendTypeId" integer, CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friends" ADD CONSTRAINT "FK_d073b6ab7aa1e55c6cd07974ae1" FOREIGN KEY ("firstUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friends" ADD CONSTRAINT "FK_06f2d3f5c6ddf5d9db892f5373a" FOREIGN KEY ("secondUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friends" ADD CONSTRAINT "FK_7b14db4b9f72c51631047378454" FOREIGN KEY ("friendTypeId") REFERENCES "friend_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friends" DROP CONSTRAINT "FK_7b14db4b9f72c51631047378454"`);
        await queryRunner.query(`ALTER TABLE "friends" DROP CONSTRAINT "FK_06f2d3f5c6ddf5d9db892f5373a"`);
        await queryRunner.query(`ALTER TABLE "friends" DROP CONSTRAINT "FK_d073b6ab7aa1e55c6cd07974ae1"`);
        await queryRunner.query(`DROP TABLE "friends"`);
    }

}
