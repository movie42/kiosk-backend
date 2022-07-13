import { MigrationInterface, QueryRunner } from 'typeorm';

export class addImpUidAndMerchantUid1657703810764 implements MigrationInterface {
  name = 'addImpUidAndMerchantUid1657703810764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`imp_uid\` varchar(16) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`merchant_uid\` varchar(40) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`merchant_uid\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`imp_uid\``);
  }
}
