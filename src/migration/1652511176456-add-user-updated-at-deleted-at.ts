import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserUpdatedAtDeletedAt1652511176456 implements MigrationInterface {
  name = 'addUserUpdatedAtDeletedAt1652511176456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedAt\` timestamp(6) NOT NULL 
      DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`deletedAt\` timestamp(6) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
  }
}
