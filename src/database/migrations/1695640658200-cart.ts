import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cart1695640658200 implements MigrationInterface {
  name = 'Cart1695640658200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, "productId" uuid, CONSTRAINT "UQ_df04e57736b705180c89c5a6367" UNIQUE ("userId", "productId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_756f53ab9466eb52a52619ee01" ON "cart" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_371eb56ecc4104c2644711fa85" ON "cart" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_371eb56ecc4104c2644711fa85"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_756f53ab9466eb52a52619ee01"`,
    );
    await queryRunner.query(`DROP TABLE "cart"`);
  }
}
