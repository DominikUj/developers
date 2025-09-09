import { MigrationInterface, QueryRunner } from "typeorm";

export class test1757358853717 implements MigrationInterface {
    name = 'test1757358853717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "country" character varying(255) NOT NULL, "currency" character varying(255) NOT NULL, "amount" integer NOT NULL, "currencyCode" character(3) NOT NULL, "rate" numeric(10,6) NOT NULL, "validFor" date NOT NULL, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_9f5a6fa4bb42aff05eab328f184" UNIQUE ("currencyCode", "validFor"), CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }

}
