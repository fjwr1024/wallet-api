import { MigrationInterface, QueryRunner } from "typeorm";

export class user1670088012571 implements MigrationInterface {
    name = 'user1670088012571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refreshtoken\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refreshtokenexp\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`refreshtokenexp\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`refreshtoken\` varchar(255) NULL`);
    }

}
