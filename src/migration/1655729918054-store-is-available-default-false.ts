import { MigrationInterface, QueryRunner } from 'typeorm';

export class storeIsAvailableDefaultFalse1655729918054 implements MigrationInterface {
  name = 'storeIsAvailableDefaultFalse1655729918054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`store\` MODIFY \`isAvailable\` tinyint NOT NULL DEFAULT 0`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`store\` MODIFY \`isAvailable\` tinyint NOT NULL`);
  }
}
