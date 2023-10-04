import { MigrationInterface, QueryRunner } from 'typeorm';

export class Orders1696414736934 implements MigrationInterface {
  name = 'Orders1696414736934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_id" uuid NOT NULL, "productPrice" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_caabe91507b3379c7ba73637b8" ON "order" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_88991860e839c6153a7ec878d3" ON "order" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_88991860e839c6153a7ec878d3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_caabe91507b3379c7ba73637b8"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
  }
}
