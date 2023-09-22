import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1695209565207 implements MigrationInterface {
  name = 'Product1695209565207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "price" integer NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "adminId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f7bf944ad9f1034110e8c2133a" ON "product" ("title") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3234b06e4d16f52b384dfa4dd" ON "product" ("price") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_168ba3f85d177b138464fb8065" ON "product" ("is_available") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_2b26f37c948355fc254229ae4cf" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_2b26f37c948355fc254229ae4cf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_168ba3f85d177b138464fb8065"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3234b06e4d16f52b384dfa4dd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f7bf944ad9f1034110e8c2133a"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
