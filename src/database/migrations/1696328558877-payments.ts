import { MigrationInterface, QueryRunner } from 'typeorm';

export class Payments1696328558877 implements MigrationInterface {
  name = 'Payments1696328558877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "checkout_id" uuid NOT NULL, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "product_title" character varying NOT NULL, "product_price" integer NOT NULL, "admin_id" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_125c5afaa7216a2bf2b2127fdf4" UNIQUE ("checkout_id", "product_id"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment"`);
  }
}
