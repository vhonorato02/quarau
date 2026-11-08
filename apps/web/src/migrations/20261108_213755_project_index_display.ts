import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_project_index_display" AS ENUM('stories', 'index');
  CREATE TYPE "public"."enum__pages_v_blocks_project_index_display" AS ENUM('stories', 'index');
  ALTER TABLE "pages_blocks_project_index" ADD COLUMN "display" "enum_pages_blocks_project_index_display" DEFAULT 'stories';
  ALTER TABLE "_pages_v_blocks_project_index" ADD COLUMN "display" "enum__pages_v_blocks_project_index_display" DEFAULT 'stories';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_project_index" DROP COLUMN "display";
  ALTER TABLE "_pages_v_blocks_project_index" DROP COLUMN "display";
  DROP TYPE "public"."enum_pages_blocks_project_index_display";
  DROP TYPE "public"."enum__pages_v_blocks_project_index_display";`)
}
