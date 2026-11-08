import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_territories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_territories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_territories" ADD CONSTRAINT "pages_blocks_territories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_territories" ADD CONSTRAINT "_pages_v_blocks_territories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_territories_order_idx" ON "pages_blocks_territories" USING btree ("_order");
  CREATE INDEX "pages_blocks_territories_parent_id_idx" ON "pages_blocks_territories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_territories_path_idx" ON "pages_blocks_territories" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_territories_order_idx" ON "_pages_v_blocks_territories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_territories_parent_id_idx" ON "_pages_v_blocks_territories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_territories_path_idx" ON "_pages_v_blocks_territories" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_territories" CASCADE;
  DROP TABLE "_pages_v_blocks_territories" CASCADE;`)
}
