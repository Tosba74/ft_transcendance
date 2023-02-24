import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatParticipants1677253587006 implements MigrationInterface {
    name = 'ChatParticipants1677253587006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_participants" ("id" SERIAL NOT NULL, "muted_until" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "participantId" integer, "roomId" integer, CONSTRAINT "PK_ebf68c52a2b4dceb777672b782d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_participants" ADD CONSTRAINT "FK_988df8e2a4f7d5533595942c758" FOREIGN KEY ("roleId") REFERENCES "chat_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_participants" ADD CONSTRAINT "FK_c4209d3554c47a84b6e402561bc" FOREIGN KEY ("participantId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_participants" ADD CONSTRAINT "FK_6be6922a86211449f6f74f5078e" FOREIGN KEY ("roomId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_participants" DROP CONSTRAINT "FK_6be6922a86211449f6f74f5078e"`);
        await queryRunner.query(`ALTER TABLE "chat_participants" DROP CONSTRAINT "FK_c4209d3554c47a84b6e402561bc"`);
        await queryRunner.query(`ALTER TABLE "chat_participants" DROP CONSTRAINT "FK_988df8e2a4f7d5533595942c758"`);
        await queryRunner.query(`DROP TABLE "chat_participants"`);
    }

}
