import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1786257000612 implements MigrationInterface {
  name = 'InitialSchema1786257000612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "titulo" character varying NOT NULL, "descricao" text NOT NULL, "dataPublicacao" date NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "nome" character varying NOT NULL, "dataNascimento" date NOT NULL, "biografia" text, CONSTRAINT "UQ_99e77dcb52e2f3b0c0499dee3fa" UNIQUE ("nome"), CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "books_authors" ("booksId" uuid NOT NULL, "authorsId" uuid NOT NULL, CONSTRAINT "PK_b11eee472df51bc2878d599a659" PRIMARY KEY ("booksId", "authorsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b5dc8c40ffd14a0b53ec702bb8" ON "books_authors"  ("booksId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_716e46108482b2cdfbc72008ca" ON "books_authors"  ("authorsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_b5dc8c40ffd14a0b53ec702bb8e" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" ADD CONSTRAINT "FK_716e46108482b2cdfbc72008cac" FOREIGN KEY ("authorsId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_716e46108482b2cdfbc72008cac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_authors" DROP CONSTRAINT "FK_b5dc8c40ffd14a0b53ec702bb8e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_716e46108482b2cdfbc72008ca"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b5dc8c40ffd14a0b53ec702bb8"`,
    );
    await queryRunner.query(`DROP TABLE "books_authors"`);
    await queryRunner.query(`DROP TABLE "authors"`);
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
