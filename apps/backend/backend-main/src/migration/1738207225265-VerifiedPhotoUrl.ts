import { MigrationInterface, QueryRunner } from "typeorm";

export class VerifiedPhotoUrl1738207225265 implements MigrationInterface {
  name = "VerifiedPhotoUrl1738207225265";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "send_package_order"
            ADD "itemVerifiedPhoto" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "send_package_order" DROP COLUMN "itemVerifiedPhoto"
        `);
  }
}
