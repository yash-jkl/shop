import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1695202027568 implements MigrationInterface {
  name = 'Product1695202027568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "price" integer NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "adminId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c30f00a871de74c8e8c213acc4" ON "products" ("title") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c54524c7e4f7409fd7ff2974f2" ON "products" ("is_available") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_e951e321bc51bc792f304636b69" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_e951e321bc51bc792f304636b69"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c54524c7e4f7409fd7ff2974f2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_75895eeb1903f8a17816dafe0a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c30f00a871de74c8e8c213acc4"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
