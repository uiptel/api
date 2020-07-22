import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStatMigration1595454549368 implements MigrationInterface {
    name = 'UpdateStatMigration1595454549368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `stat` ADD `version` char(16) NOT NULL");
        await queryRunner.query("ALTER TABLE `stat` ADD `digestImage` char(128) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `stat` DROP COLUMN `digestImage`");
        await queryRunner.query("ALTER TABLE `stat` DROP COLUMN `version`");
    }

}
