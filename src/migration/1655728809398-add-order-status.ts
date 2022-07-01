import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOrderStatus1655728809398 implements MigrationInterface {
  name = 'addOrderStatus1655728809398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`status\` enum ('ready', 'done', 'complete', 'canceled') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`status\``);
  }
}
