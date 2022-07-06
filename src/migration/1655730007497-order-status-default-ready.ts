import { MigrationInterface, QueryRunner } from 'typeorm';

export class orderStatusDefaultReady1655730007497 implements MigrationInterface {
  name = 'orderStatusDefaultReady1655730007497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` MODIFY \`status\` enum ('ready', 'done', 'complete', 'canceled') NOT NULL DEFAULT 'ready'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` MODIFY \`status\` enum ('ready', 'done', 'complete', 'canceled') NOT NULL`,
    );
  }
}
