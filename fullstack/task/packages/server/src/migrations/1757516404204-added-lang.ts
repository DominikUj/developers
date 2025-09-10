import { MigrationInterface, QueryRunner } from "typeorm";

export class addedLang1757516404204 implements MigrationInterface {
    name = 'addedLang1757516404204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rate" DROP CONSTRAINT "UQ_9f5a6fa4bb42aff05eab328f184"`);
        await queryRunner.query(`ALTER TABLE "exchange_rate" ADD "language" character(2) NOT NULL DEFAULT 'en'`);
        await queryRunner.query(`ALTER TABLE "exchange_rate" ADD CONSTRAINT "UQ_4c018d103384721aeed7273284a" UNIQUE ("currencyCode", "validFor", "language")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rate" DROP CONSTRAINT "UQ_4c018d103384721aeed7273284a"`);
        await queryRunner.query(`ALTER TABLE "exchange_rate" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "exchange_rate" ADD CONSTRAINT "UQ_9f5a6fa4bb42aff05eab328f184" UNIQUE ("currencyCode", "validFor")`);
    }

}
