import { MigrationInterface, QueryRunner } from 'typeorm';

export class storeIsAvailableDefailtFalse1655729918054 implements MigrationInterface {
  name = 'storeIsAvailableDefailtFalse1655729918054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`store\` ADD \`isAvailable\` tinyint NOT NULL DEFAULT 0`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`isAvailable\``);
  }
}
