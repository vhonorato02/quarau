import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "latitude" numeric;
  ALTER TABLE "projects" ADD COLUMN "longitude" numeric;
  ALTER TABLE "_projects_v" ADD COLUMN "version_latitude" numeric;
  ALTER TABLE "_projects_v" ADD COLUMN "version_longitude" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP COLUMN "latitude";
  ALTER TABLE "projects" DROP COLUMN "longitude";
  ALTER TABLE "_projects_v" DROP COLUMN "version_latitude";
  ALTER TABLE "_projects_v" DROP COLUMN "version_longitude";`)
}
