import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1722156479395 implements MigrationInterface {
    name = 'Initial1722156479395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`uuid\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(200) NOT NULL, \`auth_provider\` json NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`image\` varchar(500) NULL, INDEX \`IDX_6620cd026ee2b231beac7cfe57\` (\`role\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_6620cd026ee2b231beac7cfe57\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
