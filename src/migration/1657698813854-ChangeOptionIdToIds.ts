import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOptionIdToIds1657698813854 implements MigrationInterface {
  name = 'ChangeOptionIdToIds1657698813854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`orderAndProduct\` ON \`order_product\``);
    await queryRunner.query(`ALTER TABLE \`order_product\` DROP COLUMN \`productOptionIds\``);
    await queryRunner.query(`ALTER TABLE \`order_product\` ADD \`productOptionId\` int NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`orderAndOptionId\` ON \`order_product\` (\`orderId\`, \`productOptionId\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`orderAndOptionId\` ON \`order_product\``);
    await queryRunner.query(`ALTER TABLE \`order_product\` DROP COLUMN \`productOptionId\``);
    await queryRunner.query(`ALTER TABLE \`order_product\` ADD \`productOptionIds\` text NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`orderAndProduct\` ON \`order_product\` (\`orderId\`, \`productId\`)`,
    );
  }
}
