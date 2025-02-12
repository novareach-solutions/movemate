import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1739346573222 implements MigrationInterface {
  name = "NewMigration1739346573222";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_review_sendPackageOrderId"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."agent_subscription_plan_enum" AS ENUM('DAILY', 'MONTHLY', 'WEEKLY')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."agent_subscription_status_enum" AS ENUM('ACTIVE', 'INACTIVE')
        `);
    await queryRunner.query(`
            CREATE TABLE "agent_subscription" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "agentId" integer NOT NULL,
                "plan" "public"."agent_subscription_plan_enum" NOT NULL,
                "status" "public"."agent_subscription_status_enum" NOT NULL DEFAULT 'INACTIVE',
                "startDate" TIMESTAMP NOT NULL,
                "endDate" TIMESTAMP NOT NULL,
                "amount" numeric(10, 2) NOT NULL,
                "stripeSubscriptionId" character varying(255),
                CONSTRAINT "PK_a8c0dc5f0c13e875be76865da42" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."payment_type_enum" AS ENUM('ORDER', 'SUBSCRIPTION', 'WITHDRAWAL')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."payment_status_enum" AS ENUM(
                'ERROR',
                'NOT_PAID',
                'PAID',
                'PENDING',
                'REFUNDED'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "stripePaymentIntentId" character varying(255) NOT NULL,
                "type" "public"."payment_type_enum" NOT NULL,
                "status" "public"."payment_status_enum" NOT NULL DEFAULT 'PENDING',
                "amount" numeric(10, 2) NOT NULL,
                "commissionAmount" numeric(10, 2),
                "failureReason" character varying(255),
                "stripeTransferId" character varying(255) NOT NULL,
                "orderId" integer,
                "agentId" integer,
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
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
            ALTER TABLE "user"
            ADD "stripeCustomerId" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "required_document"
            ADD "isExpiry" boolean NOT NULL DEFAULT false
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "stripeAccountId" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "walletBalance" numeric(10, 2) NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "subscriptionStatus" character varying DEFAULT 'INACTIVE'
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "subscriptionExpiresAt" TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "commissionRate" numeric(5, 2) NOT NULL DEFAULT '0.1'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "itemVerifiedPhoto" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_document"
            ADD "expiry" date
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_document"
            ADD "approvalStatus" character varying NOT NULL DEFAULT 'PENDING'
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_user_role"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "required_document" DROP COLUMN "agentType"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."required_document_agenttype_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "required_document"
            ADD "agentType" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "approvalStatus"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."agent_approvalstatus_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "approvalStatus" character varying NOT NULL DEFAULT 'PENDING'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "status"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."send_package_order_status_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "status" character varying NOT NULL DEFAULT 'PENDING'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "type"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."send_package_order_type_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "type" character varying NOT NULL DEFAULT 'DELIVERY'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "canceledBy"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."send_package_order_canceledby_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "canceledBy" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "paymentStatus"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."send_package_order_paymentstatus_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "paymentStatus" character varying NOT NULL DEFAULT 'NOT_PAID'
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_user_role" ON "user" ("role")
            WHERE "deletedAt" IS NULL
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_review_orderId" ON "order_review" ("sendPackageOrderId")
            WHERE "deletedAt" IS NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_subscription"
            ADD CONSTRAINT "FK_d7ddd7d730dc540da1500823cae" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "send_package_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_754241fc9cdb90649d428d5c73d" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "payment" DROP CONSTRAINT "FK_754241fc9cdb90649d428d5c73d"
        `);
    await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_subscription" DROP CONSTRAINT "FK_d7ddd7d730dc540da1500823cae"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_review_orderId"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_user_role"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "paymentStatus"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."send_package_order_paymentstatus_enum" AS ENUM('ERROR', 'NOT_PAID', 'PAID', 'REFUNDED')
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "paymentStatus" "public"."send_package_order_paymentstatus_enum" NOT NULL DEFAULT 'NOT_PAID'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "canceledBy"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."send_package_order_canceledby_enum" AS ENUM('ADMIN', 'AGENT', 'CUSTOMER', 'SUPPORT')
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "canceledBy" "public"."send_package_order_canceledby_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "type"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."send_package_order_type_enum" AS ENUM('DELIVERY', 'PICKUP')
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "type" "public"."send_package_order_type_enum" NOT NULL DEFAULT 'DELIVERY'
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "status"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."send_package_order_status_enum" AS ENUM(
                'ACCEPTED',
                'CANCELED',
                'COMPLETED',
                'IN_PROGRESS',
                'PENDING'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "status" "public"."send_package_order_status_enum" NOT NULL DEFAULT 'PENDING'
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "approvalStatus"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."agent_approvalstatus_enum" AS ENUM('APPROVED', 'PENDING', 'REJECTED')
        `);
    await queryRunner.query(`
            ALTER TABLE "agent"
            ADD "approvalStatus" "public"."agent_approvalstatus_enum" NOT NULL DEFAULT 'PENDING'
        `);
    await queryRunner.query(`
            ALTER TABLE "required_document" DROP COLUMN "agentType"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."required_document_agenttype_enum" AS ENUM('CAR_TOWING', 'DELIVERY')
        `);
    await queryRunner.query(`
            ALTER TABLE "required_document"
            ADD "agentType" "public"."required_document_agenttype_enum" NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'AGENT', 'CUSTOMER', 'SUPPORT')
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" "public"."user_role_enum" NOT NULL
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_user_role" ON "user" ("role")
            WHERE ("deletedAt" IS NULL)
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_document" DROP COLUMN "approvalStatus"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent_document" DROP COLUMN "expiry"
        `);
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "itemVerifiedPhoto"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "commissionRate"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "subscriptionExpiresAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "subscriptionStatus"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "walletBalance"
        `);
    await queryRunner.query(`
            ALTER TABLE "agent" DROP COLUMN "stripeAccountId"
        `);
    await queryRunner.query(`
            ALTER TABLE "required_document" DROP COLUMN "isExpiry"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "stripeCustomerId"
        `);
    await queryRunner.query(`
            DROP TABLE "order_chat_message"
        `);
    await queryRunner.query(`
            DROP TABLE "payment"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."payment_status_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."payment_type_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "agent_subscription"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."agent_subscription_status_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."agent_subscription_plan_enum"
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_review_sendPackageOrderId" ON "order_review" ("sendPackageOrderId")
            WHERE ("deletedAt" IS NULL)
        `);
  }
}
