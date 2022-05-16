import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueIndexNameAndStoreId1652677795509 implements MigrationInterface {
  name = 'addUniqueIndexNameAndStoreId1652677795509';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE UNIQUE INDEX \`nameAndStoreId\` ON \`product\` (\`name\`, \`storeId\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`nameAndStoreId\` ON \`product\``);
  }
}
