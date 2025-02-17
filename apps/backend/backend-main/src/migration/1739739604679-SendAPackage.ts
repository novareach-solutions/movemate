import { MigrationInterface, QueryRunner } from "typeorm";

export class SendAPackage1739739604679 implements MigrationInterface {
  name = "SendAPackage1739739604679";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
                RENAME COLUMN "payments" TO "itemVerifiedPhoto"
        `);
    await queryRunner.query(`
            CREATE TABLE "agent_vehicle" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "agentId" integer NOT NULL,
                "vehicleMake" character varying NOT NULL,
                "vehicleModel" character varying NOT NULL,
                "licensePlateNumber" character varying NOT NULL,
                "registrationExpiryDate" date,
                "vehicleRegoImageUrl" character varying,
                "approvalStatus" character varying NOT NULL DEFAULT 'PENDING',
                CONSTRAINT "PK_0d727fac25b0587b7015aed649c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_agent_vehicle_agentId" ON "agent_vehicle" ("agentId")
        `);
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
            CREATE TABLE "saved_address" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "userId" integer NOT NULL,
                "title" character varying(255) NOT NULL,
                "addressLine1" character varying(255) NOT NULL,
                "addressLine2" character varying(255),
                "landmark" character varying(255),
                "latitude" double precision NOT NULL,
                "longitude" double precision NOT NULL,
                CONSTRAINT "PK_f126b7baa5fb0620967538818cd" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_saved_address_userId" ON "saved_address" ("userId")
            WHERE "deletedAt" IS NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "vehicleMake"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "vehicleModel"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "vehicleYear"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ALTER COLUMN "commissionRate"
            SET DEFAULT '0.1'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ALTER COLUMN "itemVerifiedPhoto" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ALTER COLUMN "itemVerifiedPhoto" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_vehicle"
            ADD CONSTRAINT "FK_d0bc409b7cf4b44f8691ec709ba" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE
        `);
    await queryRunner.query(`
            ALTER TABLE "order_chat_message"
            ADD CONSTRAINT "FK_04cd527537596d0f4761f509645" FOREIGN KEY ("orderId") REFERENCES "send_package_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "order_chat_message"
            ADD CONSTRAINT "FK_5188513708de1e93c136d5de6a1" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "saved_address"
            ADD CONSTRAINT "FK_fb781bfbfbe2cde369ae9a0e101" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "saved_address" DROP CONSTRAINT "FK_fb781bfbfbe2cde369ae9a0e101"
        `);
    await queryRunner.query(`
            ALTER TABLE "order_chat_message" DROP CONSTRAINT "FK_5188513708de1e93c136d5de6a1"
        `);
    await queryRunner.query(`
            ALTER TABLE "order_chat_message" DROP CONSTRAINT "FK_04cd527537596d0f4761f509645"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_vehicle" DROP CONSTRAINT "FK_d0bc409b7cf4b44f8691ec709ba"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ALTER COLUMN "itemVerifiedPhoto"
            SET DEFAULT 'NOT_PAID'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ALTER COLUMN "itemVerifiedPhoto"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ALTER COLUMN "commissionRate"
            SET DEFAULT 0.1
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "vehicleYear" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "vehicleModel" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "vehicleMake" character varying NOT NULL
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_saved_address_userId"
        `);
    await queryRunner.query(`
            DROP TABLE "saved_address"
        `);
    await queryRunner.query(`
            DROP TABLE "order_chat_message"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_agent_vehicle_agentId"
        `);
    await queryRunner.query(`
            DROP TABLE "agent_vehicle"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
                RENAME COLUMN "itemVerifiedPhoto" TO "payments"
        `);
  }
}
