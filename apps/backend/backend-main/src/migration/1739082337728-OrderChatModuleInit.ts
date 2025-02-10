import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderChatModuleInit1739082337728 implements MigrationInterface {
  name = "OrderChatModuleInit1739082337728";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "order_chat_message" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "orderId" integer NOT NULL,
                "senderId" integer NOT NULL,
                "type" character varying NOT NULL DEFAULT 'TEXT',
                "content" text NOT NULL,
                "isRead" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_74036a1d4e6df37fb4ba917505c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "order_chat_message"
            ADD CONSTRAINT "FK_04cd527537596d0f4761f509645" FOREIGN KEY ("orderId") REFERENCES "send_package_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "order_chat_message"
            ADD CONSTRAINT "FK_5188513708de1e93c136d5de6a1" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "order_chat_message" DROP CONSTRAINT "FK_5188513708de1e93c136d5de6a1"
        `);
    await queryRunner.query(`
            ALTER TABLE "order_chat_message" DROP CONSTRAINT "FK_04cd527537596d0f4761f509645"
        `);
    await queryRunner.query(`
            DROP TABLE "order_chat_message"
        `);
  }
}
