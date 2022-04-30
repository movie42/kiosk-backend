import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyOrder1651306350440 implements MigrationInterface {
  name = 'modifyOrder1651306350440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order_product\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`orderId\` int NOT NULL, \`productId\` int NOT NULL, \`amount\` int NOT NULL, \`productOptionIds\` text NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`imageUrl\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`productId\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`productOptionIds\``);
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`productOptionIds\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`productId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`description\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`imageUrl\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`name\` varchar(255) NOT NULL`);
    await queryRunner.query(`DROP TABLE \`order_product\``);
  }
}
