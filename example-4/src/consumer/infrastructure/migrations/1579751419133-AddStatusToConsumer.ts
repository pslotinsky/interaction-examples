import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToConsumer1579751419133 implements MigrationInterface {
    name = 'AddStatusToConsumer1579751419133';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "consumer" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "status"`);
    }

}
