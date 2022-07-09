import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueIndexProductAndOrderId1657273165823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`orderAndProduct\` ON \`order_product\` (\`orderId\`, \`productId\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`orderAndProduct\` ON \`order_product\``);
  }
}
