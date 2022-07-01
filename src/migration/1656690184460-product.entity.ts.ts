import { MigrationInterface, QueryRunner } from 'typeorm';

export class productentityts1656690184460 implements MigrationInterface {
  name = 'product.entity.ts1656690184460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` ADD \`isAvailable\` tinyint NOT NULL DEFAULT 0`);
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`status\` \`status\` enum ('ready', 'done', 'complete', 'canceled') NOT NULL DEFAULT 'ready'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` CHANGE \`status\` \`status\` enum ('ready', 'done', 'complete', 'canceled') NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`isAvailable\``);
  }
}
