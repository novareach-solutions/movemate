import { MigrationInterface, QueryRunner } from "typeorm";

export class SendAPackagEntity1739297594413 implements MigrationInterface {
    name = 'SendAPackagEntity1739297594413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "agent"
            ALTER COLUMN "commissionRate"
            SET DEFAULT '0.1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "agent"
            ALTER COLUMN "commissionRate"
            SET DEFAULT 0.1
        `);
    }

}
