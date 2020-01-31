import { MigrationInterface, QueryRunner } from 'typeorm';

export class Account1579165787295 implements MigrationInterface {
    name = 'Account1579165787295';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "account" (
                "account_id" character varying NOT NULL,
                "balance" integer NOT NULL,
                CONSTRAINT "PK_ea08b54a9d7322975ffc57fc612"
                PRIMARY KEY ("account_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
