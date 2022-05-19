import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1652923874307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE  \`product\` MODIFY imageUrl varchar(255)`);
    await queryRunner.query(`ALTER TABLE  \`product\` MODIFY description varchar(255)`);
    await queryRunner.query(`UPDATE \`product\` set \`description\`=null where \`description\`= "null"`);
    await queryRunner.query(`UPDATE \`product\` set \`imageUrl\`=null where \`imageUrl\`="null"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE \`product\` set \`description\`="null" where \`description\` is null`);
    await queryRunner.query(`UPDATE \`product\` set \`imageUrl\`="null" where \`imageUrl\` is null`);
    await queryRunner.query(`ALTER TABLE  \`product\` MODIFY imageUrl varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE  \`product\` MODIFY description varchar(255) NOT NULL`);
  }
}
