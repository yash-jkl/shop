import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1696337319586 implements MigrationInterface {
  name = 'Init1696337319586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
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
      `CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de87485f6489f5d0995f584195" ON "admin" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "checkout_id" uuid NOT NULL, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "product_title" character varying NOT NULL, "product_price" integer NOT NULL, "admin_id" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_125c5afaa7216a2bf2b2127fdf4" UNIQUE ("checkout_id", "product_id"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`,
    );
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_de87485f6489f5d0995f584195"`,
    );
    await queryRunner.query(`DROP TABLE "admin"`);
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
    await queryRunner.query(
      `DROP INDEX "public"."IDX_371eb56ecc4104c2644711fa85"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_756f53ab9466eb52a52619ee01"`,
    );
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
