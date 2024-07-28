import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial21722156938388 implements MigrationInterface {
    name = 'Initial21722156938388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`auth_provider\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`image\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`image\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`auth_provider\` longtext COLLATE "utf8mb4_bin" NULL`);
    }

}
