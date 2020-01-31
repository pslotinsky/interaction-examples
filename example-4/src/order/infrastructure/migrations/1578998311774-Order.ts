import { MigrationInterface, QueryRunner } from 'typeorm';

export class Order1578998311774 implements MigrationInterface {
    name = 'Order1578998311774';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "order" (
                "order_id" character varying NOT NULL,
                "consumer_id" character varying NOT NULL,
                "price" integer NOT NULL,
                "status" character varying NOT NULL,
                "creation_time" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86"
                PRIMARY KEY ("order_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
