import { MigrationInterface, QueryRunner } from 'typeorm';

export class Consumer1579098041932 implements MigrationInterface {
    name = 'Consumer1579098041932';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "consumer" (
                "consumer_id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "creation_time" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_fb08555b42dfaad197313d2fa0d"
                PRIMARY KEY ("consumer_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "consumer"`);
    }

}
