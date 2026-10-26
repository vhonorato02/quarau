import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_lens_primary_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_lens_secondary_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_project_index_mode" AS ENUM('all', 'featured', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_project_index_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum_pages_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_lens_primary_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_lens_secondary_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_project_index_mode" AS ENUM('all', 'featured', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_project_index_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_ods" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum_projects_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum_projects_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_projects_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_ods" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum__projects_v_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__projects_v_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum_services_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_services_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__services_v_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_news_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum_news_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_news_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_blocks_rich_text_layout" AS ENUM('narrow', 'split');
  CREATE TYPE "public"."enum__news_v_blocks_media_text_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__news_v_blocks_figure_size" AS ENUM('text', 'wide', 'full');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_partners_kind" AS ENUM('client', 'partner', 'executor');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'in_progress', 'answered', 'archived');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'author');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_navigation_items_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_navigation_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_legal_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_social_profiles_network" AS ENUM('instagram', 'linkedin', 'facebook', 'youtube');
  CREATE TABLE "pages_blocks_hero_lens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lead" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"primary_type" "enum_pages_blocks_hero_lens_primary_type" DEFAULT 'internal',
  	"primary_new_tab" boolean,
  	"primary_url" varchar,
  	"primary_label" varchar,
  	"secondary_type" "enum_pages_blocks_hero_lens_secondary_type" DEFAULT 'internal',
  	"secondary_new_tab" boolean,
  	"secondary_url" varchar,
  	"secondary_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_page_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lead" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partners_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum_pages_blocks_project_index_mode" DEFAULT 'all',
  	"limit" numeric,
  	"link_type" "enum_pages_blocks_project_index_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cycle_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_cycle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_pages_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_media_text_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum_pages_blocks_figure_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer
  );
  
  CREATE TABLE "pages_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ods_goals",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"link_type" "enum_pages_blocks_cta_band_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"show_contacts" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_news_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"search_text" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_lens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lead" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"primary_type" "enum__pages_v_blocks_hero_lens_primary_type" DEFAULT 'internal',
  	"primary_new_tab" boolean,
  	"primary_url" varchar,
  	"primary_label" varchar,
  	"secondary_type" "enum__pages_v_blocks_hero_lens_secondary_type" DEFAULT 'internal',
  	"secondary_new_tab" boolean,
  	"secondary_url" varchar,
  	"secondary_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lead" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum__pages_v_blocks_project_index_mode" DEFAULT 'all',
  	"limit" numeric,
  	"link_type" "enum__pages_v_blocks_project_index_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__pages_v_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_media_text_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum__pages_v_blocks_figure_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ods_goals",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"link_type" "enum__pages_v_blocks_cta_band_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"show_contacts" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_search_text" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "projects_ods" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_projects_ods",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_projects_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum_projects_blocks_media_text_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum_projects_blocks_figure_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer
  );
  
  CREATE TABLE "projects_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"cover_image_id" integer,
  	"territory" varchar,
  	"territory_detail" varchar,
  	"program" varchar,
  	"carried_out_by" varchar,
  	"role" varchar,
  	"start_year" numeric,
  	"end_year" numeric,
  	"ongoing" boolean,
  	"lead" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 100,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"search_text" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer,
  	"services_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_projects_v_version_ods" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_version_ods",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__projects_v_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum__projects_v_blocks_media_text_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum__projects_v_blocks_figure_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_cover_image_id" integer,
  	"version_territory" varchar,
  	"version_territory_detail" varchar,
  	"version_program" varchar,
  	"version_carried_out_by" varchar,
  	"version_role" varchar,
  	"version_start_year" numeric,
  	"version_end_year" numeric,
  	"version_ongoing" boolean,
  	"version_lead" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 100,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_search_text" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer,
  	"services_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_services_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum_services_blocks_media_text_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum_services_blocks_figure_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer
  );
  
  CREATE TABLE "services_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"cover_image_id" integer,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"search_text" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_services_v_version_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__services_v_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum__services_v_blocks_media_text_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum__services_v_blocks_figure_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_cover_image_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_search_text" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "news_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_news_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum_news_blocks_media_text_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum_news_blocks_figure_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer
  );
  
  CREATE TABLE "news_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"cover_image_id" integer,
  	"source_url" varchar,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"search_text" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "_news_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__news_v_blocks_rich_text_layout" DEFAULT 'narrow',
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image_position" "enum__news_v_blocks_media_text_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_figure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum__news_v_blocks_figure_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_publications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"cover_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_proof_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_cover_image_id" integer,
  	"version_source_url" varchar,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_search_text" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"full_name" varchar,
  	"kind" "enum_partners_kind" DEFAULT 'client',
  	"logo_id" integer,
  	"url" varchar,
  	"show_on_home" boolean DEFAULT true,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"needs_review" boolean DEFAULT false,
  	"legacy_url" varchar,
  	"blur_data_u_r_l" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_sm_url" varchar,
  	"sizes_sm_width" numeric,
  	"sizes_sm_height" numeric,
  	"sizes_sm_mime_type" varchar,
  	"sizes_sm_filesize" numeric,
  	"sizes_sm_filename" varchar,
  	"sizes_md_url" varchar,
  	"sizes_md_width" numeric,
  	"sizes_md_height" numeric,
  	"sizes_md_mime_type" varchar,
  	"sizes_md_filesize" numeric,
  	"sizes_md_filename" varchar,
  	"sizes_lg_url" varchar,
  	"sizes_lg_width" numeric,
  	"sizes_lg_height" numeric,
  	"sizes_lg_mime_type" varchar,
  	"sizes_lg_filesize" numeric,
  	"sizes_lg_filename" varchar,
  	"sizes_xl_url" varchar,
  	"sizes_xl_width" numeric,
  	"sizes_xl_height" numeric,
  	"sizes_xl_mime_type" varchar,
  	"sizes_xl_filesize" numeric,
  	"sizes_xl_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"organization" varchar,
  	"subject" varchar,
  	"message" varchar NOT NULL,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"notes" varchar,
  	"meta_consent" boolean,
  	"meta_source_path" varchar,
  	"meta_ip_hash" varchar,
  	"meta_user_agent" varchar,
  	"meta_email_delivered" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "enum_redirects_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer,
  	"partners_id" integer,
  	"media_id" integer,
  	"leads_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_navigation_items_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum_navigation_cta_type" DEFAULT 'internal',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_legal_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "contact_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"whatsapp" boolean
  );
  
  CREATE TABLE "contact_form_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"notification_emails" varchar,
  	"name" varchar NOT NULL,
  	"legal_name" varchar,
  	"cnpj" varchar,
  	"address_street" varchar,
  	"address_district" varchar,
  	"address_city" varchar,
  	"address_state" varchar,
  	"address_postal_code" varchar,
  	"founding_year" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"network" "enum_social_profiles_network" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "social" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"title_template" varchar NOT NULL,
  	"default_description" varchar NOT NULL,
  	"default_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"common_skip_link" varchar DEFAULT 'Pular para o conteúdo' NOT NULL,
  	"common_menu_open" varchar DEFAULT 'Menu' NOT NULL,
  	"common_menu_close" varchar DEFAULT 'Fechar' NOT NULL,
  	"common_nav_label" varchar DEFAULT 'Menu principal' NOT NULL,
  	"common_breadcrumb_label" varchar DEFAULT 'Você está em' NOT NULL,
  	"common_home" varchar DEFAULT 'Início' NOT NULL,
  	"common_search" varchar DEFAULT 'Buscar' NOT NULL,
  	"common_read_more" varchar DEFAULT 'Ler mais' NOT NULL,
  	"common_external_hint" varchar DEFAULT '(abre em nova aba)' NOT NULL,
  	"footer_nav_title" varchar DEFAULT 'Site' NOT NULL,
  	"footer_contact_title" varchar DEFAULT 'Contato' NOT NULL,
  	"footer_social_title" varchar DEFAULT 'Redes' NOT NULL,
  	"footer_cookie_preferences" varchar DEFAULT 'Preferências de cookies' NOT NULL,
  	"footer_cnpj" varchar DEFAULT 'CNPJ {cnpj}' NOT NULL,
  	"footer_copyright" varchar DEFAULT '© {year} {name}' NOT NULL,
  	"project_territory" varchar DEFAULT 'Território' NOT NULL,
  	"project_program" varchar DEFAULT 'Programa' NOT NULL,
  	"project_carried_out_by" varchar DEFAULT 'Quem realiza' NOT NULL,
  	"project_role" varchar DEFAULT 'Papel da Quarau' NOT NULL,
  	"project_period" varchar DEFAULT 'Período' NOT NULL,
  	"project_since" varchar DEFAULT 'desde {year}' NOT NULL,
  	"project_areas" varchar DEFAULT 'Áreas de atuação' NOT NULL,
  	"project_partners" varchar DEFAULT 'Parceiros' NOT NULL,
  	"project_ods" varchar DEFAULT 'Objetivos de Desenvolvimento Sustentável' NOT NULL,
  	"project_photos" varchar DEFAULT 'Fotos do projeto' NOT NULL,
  	"project_next" varchar DEFAULT 'Próximo projeto' NOT NULL,
  	"project_all" varchar DEFAULT 'Todos os projetos' NOT NULL,
  	"project_empty" varchar DEFAULT 'Nenhum projeto publicado ainda.' NOT NULL,
  	"gallery_see_all" varchar DEFAULT 'Ver as {n} fotos' NOT NULL,
  	"gallery_close" varchar DEFAULT 'Fechar' NOT NULL,
  	"gallery_previous" varchar DEFAULT 'Foto anterior' NOT NULL,
  	"gallery_next" varchar DEFAULT 'Próxima foto' NOT NULL,
  	"gallery_counter" varchar DEFAULT '{i} de {n}' NOT NULL,
  	"gallery_dialog_label" varchar DEFAULT 'Fotos em tela cheia' NOT NULL,
  	"service_deliverables" varchar DEFAULT 'O que entregamos' NOT NULL,
  	"service_related_projects" varchar DEFAULT 'Projetos nesta área' NOT NULL,
  	"service_all" varchar DEFAULT 'Todas as áreas' NOT NULL,
  	"news_published_on" varchar DEFAULT 'Publicado em {date}' NOT NULL,
  	"news_source" varchar DEFAULT 'Ver a publicação original' NOT NULL,
  	"news_related" varchar DEFAULT 'Projetos relacionados' NOT NULL,
  	"news_all" varchar DEFAULT 'Todas as notícias' NOT NULL,
  	"form_name" varchar DEFAULT 'Nome' NOT NULL,
  	"form_email" varchar DEFAULT 'E-mail' NOT NULL,
  	"form_phone" varchar DEFAULT 'Telefone (opcional)' NOT NULL,
  	"form_organization" varchar DEFAULT 'Organização (opcional)' NOT NULL,
  	"form_subject" varchar DEFAULT 'Assunto' NOT NULL,
  	"form_subject_placeholder" varchar DEFAULT 'Escolha um assunto' NOT NULL,
  	"form_message" varchar DEFAULT 'Mensagem' NOT NULL,
  	"form_message_help" varchar DEFAULT 'Conte o território, o público e o prazo, se já souber.' NOT NULL,
  	"form_consent" varchar DEFAULT 'Concordo com o uso destes dados para responderem ao meu contato, conforme a' NOT NULL,
  	"form_privacy_link" varchar DEFAULT 'política de privacidade' NOT NULL,
  	"form_legal_basis" varchar DEFAULT 'Base legal: consentimento (LGPD, art. 7º, I). Os dados são usados só para responder e podem ser excluídos a pedido.' NOT NULL,
  	"form_submit" varchar DEFAULT 'Enviar mensagem' NOT NULL,
  	"form_sending" varchar DEFAULT 'Enviando…' NOT NULL,
  	"form_success_title" varchar DEFAULT 'Mensagem enviada' NOT NULL,
  	"form_success_text" varchar DEFAULT 'Obrigado pelo contato. Vamos responder no e-mail informado.' NOT NULL,
  	"form_send_another" varchar DEFAULT 'Enviar outra mensagem' NOT NULL,
  	"form_error_summary" varchar DEFAULT 'Corrija os campos marcados para enviar.' NOT NULL,
  	"form_required" varchar DEFAULT 'Preencha este campo.' NOT NULL,
  	"form_email_invalid" varchar DEFAULT 'Informe um e-mail válido, como nome@exemplo.com.' NOT NULL,
  	"form_message_short" varchar DEFAULT 'Escreva pelo menos 10 caracteres.' NOT NULL,
  	"form_consent_required" varchar DEFAULT 'Para enviar, marque a concordância com a política de privacidade.' NOT NULL,
  	"form_rate_limited" varchar DEFAULT 'Muitas tentativas seguidas. Aguarde um minuto e envie de novo.' NOT NULL,
  	"form_captcha" varchar DEFAULT 'Não foi possível confirmar o envio. Recarregue a página e tente de novo.' NOT NULL,
  	"form_server" varchar DEFAULT 'A mensagem não foi enviada por um erro no servidor. Tente de novo ou escreva para {email}.' NOT NULL,
  	"contact_email" varchar DEFAULT 'E-mail' NOT NULL,
  	"contact_phone" varchar DEFAULT 'Telefone' NOT NULL,
  	"contact_whatsapp" varchar DEFAULT 'WhatsApp' NOT NULL,
  	"contact_address" varchar DEFAULT 'Endereço' NOT NULL,
  	"contact_instagram" varchar DEFAULT 'Instagram' NOT NULL,
  	"contact_linkedin" varchar DEFAULT 'LinkedIn' NOT NULL,
  	"contact_facebook" varchar DEFAULT 'Facebook' NOT NULL,
  	"contact_youtube" varchar DEFAULT 'YouTube' NOT NULL,
  	"cookies_title" varchar DEFAULT 'Sua privacidade' NOT NULL,
  	"cookies_text" varchar DEFAULT 'O site usa só o armazenamento essencial para funcionar. Com a sua permissão, também mede a audiência de forma anônima.' NOT NULL,
  	"cookies_accept" varchar DEFAULT 'Aceitar medição' NOT NULL,
  	"cookies_reject" varchar DEFAULT 'Só o essencial' NOT NULL,
  	"cookies_customize" varchar DEFAULT 'Escolher' NOT NULL,
  	"cookies_save" varchar DEFAULT 'Salvar escolhas' NOT NULL,
  	"cookies_essential" varchar DEFAULT 'Essenciais' NOT NULL,
  	"cookies_essential_help" varchar DEFAULT 'Guardam a sua escolha de privacidade. Sempre ativos.' NOT NULL,
  	"cookies_analytics" varchar DEFAULT 'Medição de audiência' NOT NULL,
  	"cookies_analytics_help" varchar DEFAULT 'Conta visitas de forma anônima, sem rastrear você entre sites.' NOT NULL,
  	"cookies_policy" varchar DEFAULT 'Política de privacidade' NOT NULL,
  	"search_title" varchar DEFAULT 'Buscar no site' NOT NULL,
  	"search_label" varchar DEFAULT 'O que você procura?' NOT NULL,
  	"search_submit" varchar DEFAULT 'Buscar' NOT NULL,
  	"search_results_one" varchar DEFAULT '1 resultado para “{q}”' NOT NULL,
  	"search_results_many" varchar DEFAULT '{n} resultados para “{q}”' NOT NULL,
  	"search_empty" varchar DEFAULT 'Nada encontrado para “{q}”. Tente outra palavra ou veja todos os projetos.' NOT NULL,
  	"search_type_projects" varchar DEFAULT 'Projeto' NOT NULL,
  	"search_type_pages" varchar DEFAULT 'Página' NOT NULL,
  	"search_type_services" varchar DEFAULT 'Área de atuação' NOT NULL,
  	"search_type_news" varchar DEFAULT 'Notícia' NOT NULL,
  	"not_found_title" varchar DEFAULT 'Esta página não existe mais' NOT NULL,
  	"not_found_text" varchar DEFAULT 'O endereço pode ter mudado. Estes caminhos ajudam a continuar:' NOT NULL,
  	"not_found_home" varchar DEFAULT 'Ir para o início' NOT NULL,
  	"not_found_projects" varchar DEFAULT 'Ver os projetos' NOT NULL,
  	"not_found_contact" varchar DEFAULT 'Falar com a Quarau' NOT NULL,
  	"error_title" varchar DEFAULT 'A página não carregou' NOT NULL,
  	"error_text" varchar DEFAULT 'Houve um erro do nosso lado. Tente de novo em instantes.' NOT NULL,
  	"error_retry" varchar DEFAULT 'Tentar de novo' NOT NULL,
  	"video_play" varchar DEFAULT 'Assistir ao vídeo' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_lens" ADD CONSTRAINT "pages_blocks_hero_lens_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_lens" ADD CONSTRAINT "pages_blocks_hero_lens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_intro" ADD CONSTRAINT "pages_blocks_page_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_intro" ADD CONSTRAINT "pages_blocks_page_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_strip" ADD CONSTRAINT "pages_blocks_partners_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project_index" ADD CONSTRAINT "pages_blocks_project_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_proof_number" ADD CONSTRAINT "pages_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_steps" ADD CONSTRAINT "pages_blocks_cycle_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle" ADD CONSTRAINT "pages_blocks_cycle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_areas" ADD CONSTRAINT "pages_blocks_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_figure" ADD CONSTRAINT "pages_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_figure" ADD CONSTRAINT "pages_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_publications_items" ADD CONSTRAINT "pages_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_publications_items" ADD CONSTRAINT "pages_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_publications" ADD CONSTRAINT "pages_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ods_goals" ADD CONSTRAINT "pages_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ods" ADD CONSTRAINT "pages_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_list" ADD CONSTRAINT "pages_blocks_news_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_lens" ADD CONSTRAINT "_pages_v_blocks_hero_lens_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_lens" ADD CONSTRAINT "_pages_v_blocks_hero_lens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_intro" ADD CONSTRAINT "_pages_v_blocks_page_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_intro" ADD CONSTRAINT "_pages_v_blocks_page_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners_strip" ADD CONSTRAINT "_pages_v_blocks_partners_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project_index" ADD CONSTRAINT "_pages_v_blocks_project_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_proof_number" ADD CONSTRAINT "_pages_v_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_steps" ADD CONSTRAINT "_pages_v_blocks_cycle_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle" ADD CONSTRAINT "_pages_v_blocks_cycle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_areas" ADD CONSTRAINT "_pages_v_blocks_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_figure" ADD CONSTRAINT "_pages_v_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_figure" ADD CONSTRAINT "_pages_v_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publications_items" ADD CONSTRAINT "_pages_v_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publications_items" ADD CONSTRAINT "_pages_v_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publications" ADD CONSTRAINT "_pages_v_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ods_goals" ADD CONSTRAINT "_pages_v_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ods" ADD CONSTRAINT "_pages_v_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_list" ADD CONSTRAINT "_pages_v_blocks_news_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_ods" ADD CONSTRAINT "projects_ods_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_text" ADD CONSTRAINT "projects_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_text" ADD CONSTRAINT "projects_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_quote" ADD CONSTRAINT "projects_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_figure" ADD CONSTRAINT "projects_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_figure" ADD CONSTRAINT "projects_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_publications_items" ADD CONSTRAINT "projects_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_publications_items" ADD CONSTRAINT "projects_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_publications" ADD CONSTRAINT "projects_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_proof_number" ADD CONSTRAINT "projects_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_ods" ADD CONSTRAINT "_projects_v_version_ods_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD CONSTRAINT "_projects_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_text" ADD CONSTRAINT "_projects_v_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_text" ADD CONSTRAINT "_projects_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_quote" ADD CONSTRAINT "_projects_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_figure" ADD CONSTRAINT "_projects_v_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_figure" ADD CONSTRAINT "_projects_v_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_publications_items" ADD CONSTRAINT "_projects_v_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_publications_items" ADD CONSTRAINT "_projects_v_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_publications" ADD CONSTRAINT "_projects_v_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_proof_number" ADD CONSTRAINT "_projects_v_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_text" ADD CONSTRAINT "services_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_media_text" ADD CONSTRAINT "services_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_quote" ADD CONSTRAINT "services_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_figure" ADD CONSTRAINT "services_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_figure" ADD CONSTRAINT "services_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery" ADD CONSTRAINT "services_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_publications_items" ADD CONSTRAINT "services_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_publications_items" ADD CONSTRAINT "services_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_publications" ADD CONSTRAINT "services_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_proof_number" ADD CONSTRAINT "services_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_deliverables" ADD CONSTRAINT "_services_v_version_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text" ADD CONSTRAINT "_services_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_text" ADD CONSTRAINT "_services_v_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_text" ADD CONSTRAINT "_services_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_quote" ADD CONSTRAINT "_services_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_figure" ADD CONSTRAINT "_services_v_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_figure" ADD CONSTRAINT "_services_v_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery" ADD CONSTRAINT "_services_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_publications_items" ADD CONSTRAINT "_services_v_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_publications_items" ADD CONSTRAINT "_services_v_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_publications" ADD CONSTRAINT "_services_v_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_proof_number" ADD CONSTRAINT "_services_v_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_rich_text" ADD CONSTRAINT "news_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_media_text" ADD CONSTRAINT "news_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_media_text" ADD CONSTRAINT "news_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_quote" ADD CONSTRAINT "news_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_figure" ADD CONSTRAINT "news_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_figure" ADD CONSTRAINT "news_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_gallery" ADD CONSTRAINT "news_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_video" ADD CONSTRAINT "news_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_video" ADD CONSTRAINT "news_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_video" ADD CONSTRAINT "news_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_publications_items" ADD CONSTRAINT "news_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_publications_items" ADD CONSTRAINT "news_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_publications" ADD CONSTRAINT "news_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_proof_number" ADD CONSTRAINT "news_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_rich_text" ADD CONSTRAINT "_news_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_media_text" ADD CONSTRAINT "_news_v_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_media_text" ADD CONSTRAINT "_news_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_quote" ADD CONSTRAINT "_news_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_figure" ADD CONSTRAINT "_news_v_blocks_figure_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_figure" ADD CONSTRAINT "_news_v_blocks_figure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_gallery" ADD CONSTRAINT "_news_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_video" ADD CONSTRAINT "_news_v_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_video" ADD CONSTRAINT "_news_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_video" ADD CONSTRAINT "_news_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_publications_items" ADD CONSTRAINT "_news_v_blocks_publications_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_publications_items" ADD CONSTRAINT "_news_v_blocks_publications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_publications" ADD CONSTRAINT "_news_v_blocks_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_proof_number" ADD CONSTRAINT "_news_v_blocks_proof_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_phones" ADD CONSTRAINT "contact_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_form_subjects" ADD CONSTRAINT "contact_form_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_profiles" ADD CONSTRAINT "social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_lens_order_idx" ON "pages_blocks_hero_lens" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_lens_parent_id_idx" ON "pages_blocks_hero_lens" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_lens_path_idx" ON "pages_blocks_hero_lens" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_lens_image_idx" ON "pages_blocks_hero_lens" USING btree ("image_id");
  CREATE INDEX "pages_blocks_page_intro_order_idx" ON "pages_blocks_page_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_intro_parent_id_idx" ON "pages_blocks_page_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_intro_path_idx" ON "pages_blocks_page_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_page_intro_image_idx" ON "pages_blocks_page_intro" USING btree ("image_id");
  CREATE INDEX "pages_blocks_partners_strip_order_idx" ON "pages_blocks_partners_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_strip_parent_id_idx" ON "pages_blocks_partners_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_strip_path_idx" ON "pages_blocks_partners_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_index_order_idx" ON "pages_blocks_project_index" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_index_parent_id_idx" ON "pages_blocks_project_index" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_index_path_idx" ON "pages_blocks_project_index" USING btree ("_path");
  CREATE INDEX "pages_blocks_proof_number_order_idx" ON "pages_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "pages_blocks_proof_number_parent_id_idx" ON "pages_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_proof_number_path_idx" ON "pages_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "pages_blocks_cycle_steps_order_idx" ON "pages_blocks_cycle_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycle_steps_parent_id_idx" ON "pages_blocks_cycle_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cycle_order_idx" ON "pages_blocks_cycle" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycle_parent_id_idx" ON "pages_blocks_cycle" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cycle_path_idx" ON "pages_blocks_cycle" USING btree ("_path");
  CREATE INDEX "pages_blocks_areas_order_idx" ON "pages_blocks_areas" USING btree ("_order");
  CREATE INDEX "pages_blocks_areas_parent_id_idx" ON "pages_blocks_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_areas_path_idx" ON "pages_blocks_areas" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_order_idx" ON "pages_blocks_media_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_parent_id_idx" ON "pages_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_path_idx" ON "pages_blocks_media_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_image_idx" ON "pages_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_figure_order_idx" ON "pages_blocks_figure" USING btree ("_order");
  CREATE INDEX "pages_blocks_figure_parent_id_idx" ON "pages_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_figure_path_idx" ON "pages_blocks_figure" USING btree ("_path");
  CREATE INDEX "pages_blocks_figure_image_idx" ON "pages_blocks_figure" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_video_idx" ON "pages_blocks_video" USING btree ("video_id");
  CREATE INDEX "pages_blocks_video_poster_idx" ON "pages_blocks_video" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_publications_items_order_idx" ON "pages_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_publications_items_parent_id_idx" ON "pages_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_publications_items_cover_idx" ON "pages_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "pages_blocks_publications_order_idx" ON "pages_blocks_publications" USING btree ("_order");
  CREATE INDEX "pages_blocks_publications_parent_id_idx" ON "pages_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_publications_path_idx" ON "pages_blocks_publications" USING btree ("_path");
  CREATE INDEX "pages_blocks_ods_goals_order_idx" ON "pages_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "pages_blocks_ods_goals_parent_idx" ON "pages_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ods_order_idx" ON "pages_blocks_ods" USING btree ("_order");
  CREATE INDEX "pages_blocks_ods_parent_id_idx" ON "pages_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ods_path_idx" ON "pages_blocks_ods" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_list_order_idx" ON "pages_blocks_news_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_list_parent_id_idx" ON "pages_blocks_news_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_list_path_idx" ON "pages_blocks_news_list" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_created_by_idx" ON "pages" USING btree ("created_by_id");
  CREATE INDEX "pages_search_text_idx" ON "pages" USING btree ("search_text");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_news_id_idx" ON "pages_rels" USING btree ("news_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_hero_lens_order_idx" ON "_pages_v_blocks_hero_lens" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_lens_parent_id_idx" ON "_pages_v_blocks_hero_lens" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_lens_path_idx" ON "_pages_v_blocks_hero_lens" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_lens_image_idx" ON "_pages_v_blocks_hero_lens" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_page_intro_order_idx" ON "_pages_v_blocks_page_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_intro_parent_id_idx" ON "_pages_v_blocks_page_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_intro_path_idx" ON "_pages_v_blocks_page_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_page_intro_image_idx" ON "_pages_v_blocks_page_intro" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_partners_strip_order_idx" ON "_pages_v_blocks_partners_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_strip_parent_id_idx" ON "_pages_v_blocks_partners_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_strip_path_idx" ON "_pages_v_blocks_partners_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_index_order_idx" ON "_pages_v_blocks_project_index" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_index_parent_id_idx" ON "_pages_v_blocks_project_index" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_index_path_idx" ON "_pages_v_blocks_project_index" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_proof_number_order_idx" ON "_pages_v_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_proof_number_parent_id_idx" ON "_pages_v_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_proof_number_path_idx" ON "_pages_v_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cycle_steps_order_idx" ON "_pages_v_blocks_cycle_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycle_steps_parent_id_idx" ON "_pages_v_blocks_cycle_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_order_idx" ON "_pages_v_blocks_cycle" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycle_parent_id_idx" ON "_pages_v_blocks_cycle" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_path_idx" ON "_pages_v_blocks_cycle" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_areas_order_idx" ON "_pages_v_blocks_areas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_areas_parent_id_idx" ON "_pages_v_blocks_areas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_areas_path_idx" ON "_pages_v_blocks_areas" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_order_idx" ON "_pages_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_parent_id_idx" ON "_pages_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_path_idx" ON "_pages_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_image_idx" ON "_pages_v_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_quote_order_idx" ON "_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_parent_id_idx" ON "_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_path_idx" ON "_pages_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_figure_order_idx" ON "_pages_v_blocks_figure" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_figure_parent_id_idx" ON "_pages_v_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_figure_path_idx" ON "_pages_v_blocks_figure" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_figure_image_idx" ON "_pages_v_blocks_figure" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_video_idx" ON "_pages_v_blocks_video" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_video_poster_idx" ON "_pages_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_publications_items_order_idx" ON "_pages_v_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_publications_items_parent_id_idx" ON "_pages_v_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_publications_items_cover_idx" ON "_pages_v_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "_pages_v_blocks_publications_order_idx" ON "_pages_v_blocks_publications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_publications_parent_id_idx" ON "_pages_v_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_publications_path_idx" ON "_pages_v_blocks_publications" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ods_goals_order_idx" ON "_pages_v_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ods_goals_parent_idx" ON "_pages_v_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ods_order_idx" ON "_pages_v_blocks_ods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ods_parent_id_idx" ON "_pages_v_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ods_path_idx" ON "_pages_v_blocks_ods" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_news_list_order_idx" ON "_pages_v_blocks_news_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_list_parent_id_idx" ON "_pages_v_blocks_news_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_list_path_idx" ON "_pages_v_blocks_news_list" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_created_by_idx" ON "_pages_v" USING btree ("version_created_by_id");
  CREATE INDEX "_pages_v_version_version_search_text_idx" ON "_pages_v" USING btree ("version_search_text");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_news_id_idx" ON "_pages_v_rels" USING btree ("news_id");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "projects_ods_order_idx" ON "projects_ods" USING btree ("order");
  CREATE INDEX "projects_ods_parent_idx" ON "projects_ods" USING btree ("parent_id");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_media_text_order_idx" ON "projects_blocks_media_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_media_text_parent_id_idx" ON "projects_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_text_path_idx" ON "projects_blocks_media_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_media_text_image_idx" ON "projects_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "projects_blocks_quote_order_idx" ON "projects_blocks_quote" USING btree ("_order");
  CREATE INDEX "projects_blocks_quote_parent_id_idx" ON "projects_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_quote_path_idx" ON "projects_blocks_quote" USING btree ("_path");
  CREATE INDEX "projects_blocks_figure_order_idx" ON "projects_blocks_figure" USING btree ("_order");
  CREATE INDEX "projects_blocks_figure_parent_id_idx" ON "projects_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_figure_path_idx" ON "projects_blocks_figure" USING btree ("_path");
  CREATE INDEX "projects_blocks_figure_image_idx" ON "projects_blocks_figure" USING btree ("image_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_order_idx" ON "projects_blocks_video" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_parent_id_idx" ON "projects_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_path_idx" ON "projects_blocks_video" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_video_idx" ON "projects_blocks_video" USING btree ("video_id");
  CREATE INDEX "projects_blocks_video_poster_idx" ON "projects_blocks_video" USING btree ("poster_id");
  CREATE INDEX "projects_blocks_publications_items_order_idx" ON "projects_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_publications_items_parent_id_idx" ON "projects_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_publications_items_cover_idx" ON "projects_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "projects_blocks_publications_order_idx" ON "projects_blocks_publications" USING btree ("_order");
  CREATE INDEX "projects_blocks_publications_parent_id_idx" ON "projects_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_publications_path_idx" ON "projects_blocks_publications" USING btree ("_path");
  CREATE INDEX "projects_blocks_proof_number_order_idx" ON "projects_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "projects_blocks_proof_number_parent_id_idx" ON "projects_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_proof_number_path_idx" ON "projects_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_created_by_idx" ON "projects" USING btree ("created_by_id");
  CREATE INDEX "projects_search_text_idx" ON "projects" USING btree ("search_text");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_partners_id_idx" ON "projects_rels" USING btree ("partners_id");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_version_ods_order_idx" ON "_projects_v_version_ods" USING btree ("order");
  CREATE INDEX "_projects_v_version_ods_parent_idx" ON "_projects_v_version_ods" USING btree ("parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_order_idx" ON "_projects_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_parent_id_idx" ON "_projects_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_path_idx" ON "_projects_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_media_text_order_idx" ON "_projects_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_media_text_parent_id_idx" ON "_projects_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_text_path_idx" ON "_projects_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_media_text_image_idx" ON "_projects_v_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_quote_order_idx" ON "_projects_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_quote_parent_id_idx" ON "_projects_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_quote_path_idx" ON "_projects_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_figure_order_idx" ON "_projects_v_blocks_figure" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_figure_parent_id_idx" ON "_projects_v_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_figure_path_idx" ON "_projects_v_blocks_figure" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_figure_image_idx" ON "_projects_v_blocks_figure" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_order_idx" ON "_projects_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_video_parent_id_idx" ON "_projects_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_path_idx" ON "_projects_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_video_idx" ON "_projects_v_blocks_video" USING btree ("video_id");
  CREATE INDEX "_projects_v_blocks_video_poster_idx" ON "_projects_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_projects_v_blocks_publications_items_order_idx" ON "_projects_v_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_publications_items_parent_id_idx" ON "_projects_v_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_publications_items_cover_idx" ON "_projects_v_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "_projects_v_blocks_publications_order_idx" ON "_projects_v_blocks_publications" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_publications_parent_id_idx" ON "_projects_v_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_publications_path_idx" ON "_projects_v_blocks_publications" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_proof_number_order_idx" ON "_projects_v_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_proof_number_parent_id_idx" ON "_projects_v_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_proof_number_path_idx" ON "_projects_v_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_created_by_idx" ON "_projects_v" USING btree ("version_created_by_id");
  CREATE INDEX "_projects_v_version_version_search_text_idx" ON "_projects_v" USING btree ("version_search_text");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_partners_id_idx" ON "_projects_v_rels" USING btree ("partners_id");
  CREATE INDEX "_projects_v_rels_services_id_idx" ON "_projects_v_rels" USING btree ("services_id");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "services_blocks_media_text_order_idx" ON "services_blocks_media_text" USING btree ("_order");
  CREATE INDEX "services_blocks_media_text_parent_id_idx" ON "services_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_media_text_path_idx" ON "services_blocks_media_text" USING btree ("_path");
  CREATE INDEX "services_blocks_media_text_image_idx" ON "services_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "services_blocks_quote_order_idx" ON "services_blocks_quote" USING btree ("_order");
  CREATE INDEX "services_blocks_quote_parent_id_idx" ON "services_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_quote_path_idx" ON "services_blocks_quote" USING btree ("_path");
  CREATE INDEX "services_blocks_figure_order_idx" ON "services_blocks_figure" USING btree ("_order");
  CREATE INDEX "services_blocks_figure_parent_id_idx" ON "services_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_figure_path_idx" ON "services_blocks_figure" USING btree ("_path");
  CREATE INDEX "services_blocks_figure_image_idx" ON "services_blocks_figure" USING btree ("image_id");
  CREATE INDEX "services_blocks_gallery_order_idx" ON "services_blocks_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_parent_id_idx" ON "services_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_path_idx" ON "services_blocks_gallery" USING btree ("_path");
  CREATE INDEX "services_blocks_video_order_idx" ON "services_blocks_video" USING btree ("_order");
  CREATE INDEX "services_blocks_video_parent_id_idx" ON "services_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_video_path_idx" ON "services_blocks_video" USING btree ("_path");
  CREATE INDEX "services_blocks_video_video_idx" ON "services_blocks_video" USING btree ("video_id");
  CREATE INDEX "services_blocks_video_poster_idx" ON "services_blocks_video" USING btree ("poster_id");
  CREATE INDEX "services_blocks_publications_items_order_idx" ON "services_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "services_blocks_publications_items_parent_id_idx" ON "services_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_publications_items_cover_idx" ON "services_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "services_blocks_publications_order_idx" ON "services_blocks_publications" USING btree ("_order");
  CREATE INDEX "services_blocks_publications_parent_id_idx" ON "services_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_publications_path_idx" ON "services_blocks_publications" USING btree ("_path");
  CREATE INDEX "services_blocks_proof_number_order_idx" ON "services_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "services_blocks_proof_number_parent_id_idx" ON "services_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_proof_number_path_idx" ON "services_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "services_cover_image_idx" ON "services" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_created_by_idx" ON "services" USING btree ("created_by_id");
  CREATE INDEX "services_search_text_idx" ON "services" USING btree ("search_text");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_media_id_idx" ON "services_rels" USING btree ("media_id");
  CREATE INDEX "_services_v_version_deliverables_order_idx" ON "_services_v_version_deliverables" USING btree ("_order");
  CREATE INDEX "_services_v_version_deliverables_parent_id_idx" ON "_services_v_version_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_order_idx" ON "_services_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_parent_id_idx" ON "_services_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_path_idx" ON "_services_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_text_order_idx" ON "_services_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_media_text_parent_id_idx" ON "_services_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_media_text_path_idx" ON "_services_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_text_image_idx" ON "_services_v_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_quote_order_idx" ON "_services_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_quote_parent_id_idx" ON "_services_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_quote_path_idx" ON "_services_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_figure_order_idx" ON "_services_v_blocks_figure" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_figure_parent_id_idx" ON "_services_v_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_figure_path_idx" ON "_services_v_blocks_figure" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_figure_image_idx" ON "_services_v_blocks_figure" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_gallery_order_idx" ON "_services_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_gallery_parent_id_idx" ON "_services_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_path_idx" ON "_services_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_video_order_idx" ON "_services_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_video_parent_id_idx" ON "_services_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_video_path_idx" ON "_services_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_video_video_idx" ON "_services_v_blocks_video" USING btree ("video_id");
  CREATE INDEX "_services_v_blocks_video_poster_idx" ON "_services_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_services_v_blocks_publications_items_order_idx" ON "_services_v_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_publications_items_parent_id_idx" ON "_services_v_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_publications_items_cover_idx" ON "_services_v_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "_services_v_blocks_publications_order_idx" ON "_services_v_blocks_publications" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_publications_parent_id_idx" ON "_services_v_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_publications_path_idx" ON "_services_v_blocks_publications" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_proof_number_order_idx" ON "_services_v_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_proof_number_parent_id_idx" ON "_services_v_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_proof_number_path_idx" ON "_services_v_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_cover_image_idx" ON "_services_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_created_by_idx" ON "_services_v" USING btree ("version_created_by_id");
  CREATE INDEX "_services_v_version_version_search_text_idx" ON "_services_v" USING btree ("version_search_text");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_media_id_idx" ON "_services_v_rels" USING btree ("media_id");
  CREATE INDEX "news_blocks_rich_text_order_idx" ON "news_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "news_blocks_rich_text_parent_id_idx" ON "news_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_rich_text_path_idx" ON "news_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "news_blocks_media_text_order_idx" ON "news_blocks_media_text" USING btree ("_order");
  CREATE INDEX "news_blocks_media_text_parent_id_idx" ON "news_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_media_text_path_idx" ON "news_blocks_media_text" USING btree ("_path");
  CREATE INDEX "news_blocks_media_text_image_idx" ON "news_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "news_blocks_quote_order_idx" ON "news_blocks_quote" USING btree ("_order");
  CREATE INDEX "news_blocks_quote_parent_id_idx" ON "news_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_quote_path_idx" ON "news_blocks_quote" USING btree ("_path");
  CREATE INDEX "news_blocks_figure_order_idx" ON "news_blocks_figure" USING btree ("_order");
  CREATE INDEX "news_blocks_figure_parent_id_idx" ON "news_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_figure_path_idx" ON "news_blocks_figure" USING btree ("_path");
  CREATE INDEX "news_blocks_figure_image_idx" ON "news_blocks_figure" USING btree ("image_id");
  CREATE INDEX "news_blocks_gallery_order_idx" ON "news_blocks_gallery" USING btree ("_order");
  CREATE INDEX "news_blocks_gallery_parent_id_idx" ON "news_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_gallery_path_idx" ON "news_blocks_gallery" USING btree ("_path");
  CREATE INDEX "news_blocks_video_order_idx" ON "news_blocks_video" USING btree ("_order");
  CREATE INDEX "news_blocks_video_parent_id_idx" ON "news_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_video_path_idx" ON "news_blocks_video" USING btree ("_path");
  CREATE INDEX "news_blocks_video_video_idx" ON "news_blocks_video" USING btree ("video_id");
  CREATE INDEX "news_blocks_video_poster_idx" ON "news_blocks_video" USING btree ("poster_id");
  CREATE INDEX "news_blocks_publications_items_order_idx" ON "news_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "news_blocks_publications_items_parent_id_idx" ON "news_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_publications_items_cover_idx" ON "news_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "news_blocks_publications_order_idx" ON "news_blocks_publications" USING btree ("_order");
  CREATE INDEX "news_blocks_publications_parent_id_idx" ON "news_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_publications_path_idx" ON "news_blocks_publications" USING btree ("_path");
  CREATE INDEX "news_blocks_proof_number_order_idx" ON "news_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "news_blocks_proof_number_parent_id_idx" ON "news_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_proof_number_path_idx" ON "news_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_created_by_idx" ON "news" USING btree ("created_by_id");
  CREATE INDEX "news_search_text_idx" ON "news" USING btree ("search_text");
  CREATE INDEX "news_meta_meta_image_idx" ON "news" USING btree ("meta_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_media_id_idx" ON "news_rels" USING btree ("media_id");
  CREATE INDEX "news_rels_projects_id_idx" ON "news_rels" USING btree ("projects_id");
  CREATE INDEX "_news_v_blocks_rich_text_order_idx" ON "_news_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_rich_text_parent_id_idx" ON "_news_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_rich_text_path_idx" ON "_news_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_media_text_order_idx" ON "_news_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_media_text_parent_id_idx" ON "_news_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_media_text_path_idx" ON "_news_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_media_text_image_idx" ON "_news_v_blocks_media_text" USING btree ("image_id");
  CREATE INDEX "_news_v_blocks_quote_order_idx" ON "_news_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_quote_parent_id_idx" ON "_news_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_quote_path_idx" ON "_news_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_figure_order_idx" ON "_news_v_blocks_figure" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_figure_parent_id_idx" ON "_news_v_blocks_figure" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_figure_path_idx" ON "_news_v_blocks_figure" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_figure_image_idx" ON "_news_v_blocks_figure" USING btree ("image_id");
  CREATE INDEX "_news_v_blocks_gallery_order_idx" ON "_news_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_gallery_parent_id_idx" ON "_news_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_gallery_path_idx" ON "_news_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_video_order_idx" ON "_news_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_video_parent_id_idx" ON "_news_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_video_path_idx" ON "_news_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_video_video_idx" ON "_news_v_blocks_video" USING btree ("video_id");
  CREATE INDEX "_news_v_blocks_video_poster_idx" ON "_news_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_news_v_blocks_publications_items_order_idx" ON "_news_v_blocks_publications_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_publications_items_parent_id_idx" ON "_news_v_blocks_publications_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_publications_items_cover_idx" ON "_news_v_blocks_publications_items" USING btree ("cover_id");
  CREATE INDEX "_news_v_blocks_publications_order_idx" ON "_news_v_blocks_publications" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_publications_parent_id_idx" ON "_news_v_blocks_publications" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_publications_path_idx" ON "_news_v_blocks_publications" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_proof_number_order_idx" ON "_news_v_blocks_proof_number" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_proof_number_parent_id_idx" ON "_news_v_blocks_proof_number" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_proof_number_path_idx" ON "_news_v_blocks_proof_number" USING btree ("_path");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_created_by_idx" ON "_news_v" USING btree ("version_created_by_id");
  CREATE INDEX "_news_v_version_version_search_text_idx" ON "_news_v" USING btree ("version_search_text");
  CREATE INDEX "_news_v_version_meta_version_meta_image_idx" ON "_news_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_media_id_idx" ON "_news_v_rels" USING btree ("media_id");
  CREATE INDEX "_news_v_rels_projects_id_idx" ON "_news_v_rels" USING btree ("projects_id");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "media_legacy_url_idx" ON "media" USING btree ("legacy_url");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_sm_sizes_sm_filename_idx" ON "media" USING btree ("sizes_sm_filename");
  CREATE INDEX "media_sizes_md_sizes_md_filename_idx" ON "media" USING btree ("sizes_md_filename");
  CREATE INDEX "media_sizes_lg_sizes_lg_filename_idx" ON "media" USING btree ("sizes_lg_filename");
  CREATE INDEX "media_sizes_xl_sizes_xl_filename_idx" ON "media" USING btree ("sizes_xl_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_projects_id_idx" ON "redirects_rels" USING btree ("projects_id");
  CREATE INDEX "redirects_rels_services_id_idx" ON "redirects_rels" USING btree ("services_id");
  CREATE INDEX "redirects_rels_news_id_idx" ON "redirects_rels" USING btree ("news_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_rels_order_idx" ON "navigation_rels" USING btree ("order");
  CREATE INDEX "navigation_rels_parent_idx" ON "navigation_rels" USING btree ("parent_id");
  CREATE INDEX "navigation_rels_path_idx" ON "navigation_rels" USING btree ("path");
  CREATE INDEX "navigation_rels_pages_id_idx" ON "navigation_rels" USING btree ("pages_id");
  CREATE INDEX "navigation_rels_projects_id_idx" ON "navigation_rels" USING btree ("projects_id");
  CREATE INDEX "navigation_rels_services_id_idx" ON "navigation_rels" USING btree ("services_id");
  CREATE INDEX "navigation_rels_news_id_idx" ON "navigation_rels" USING btree ("news_id");
  CREATE INDEX "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_projects_id_idx" ON "footer_rels" USING btree ("projects_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "footer_rels_news_id_idx" ON "footer_rels" USING btree ("news_id");
  CREATE INDEX "contact_phones_order_idx" ON "contact_phones" USING btree ("_order");
  CREATE INDEX "contact_phones_parent_id_idx" ON "contact_phones" USING btree ("_parent_id");
  CREATE INDEX "contact_form_subjects_order_idx" ON "contact_form_subjects" USING btree ("_order");
  CREATE INDEX "contact_form_subjects_parent_id_idx" ON "contact_form_subjects" USING btree ("_parent_id");
  CREATE INDEX "social_profiles_order_idx" ON "social_profiles" USING btree ("_order");
  CREATE INDEX "social_profiles_parent_id_idx" ON "social_profiles" USING btree ("_parent_id");
  CREATE INDEX "settings_default_og_image_idx" ON "settings" USING btree ("default_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_lens" CASCADE;
  DROP TABLE "pages_blocks_page_intro" CASCADE;
  DROP TABLE "pages_blocks_partners_strip" CASCADE;
  DROP TABLE "pages_blocks_project_index" CASCADE;
  DROP TABLE "pages_blocks_proof_number" CASCADE;
  DROP TABLE "pages_blocks_cycle_steps" CASCADE;
  DROP TABLE "pages_blocks_cycle" CASCADE;
  DROP TABLE "pages_blocks_areas" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_media_text" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_figure" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "pages_blocks_publications_items" CASCADE;
  DROP TABLE "pages_blocks_publications" CASCADE;
  DROP TABLE "pages_blocks_ods_goals" CASCADE;
  DROP TABLE "pages_blocks_ods" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_news_list" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_lens" CASCADE;
  DROP TABLE "_pages_v_blocks_page_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_partners_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_project_index" CASCADE;
  DROP TABLE "_pages_v_blocks_proof_number" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle" CASCADE;
  DROP TABLE "_pages_v_blocks_areas" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text" CASCADE;
  DROP TABLE "_pages_v_blocks_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_figure" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_publications_items" CASCADE;
  DROP TABLE "_pages_v_blocks_publications" CASCADE;
  DROP TABLE "_pages_v_blocks_ods_goals" CASCADE;
  DROP TABLE "_pages_v_blocks_ods" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_news_list" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "projects_ods" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects_blocks_media_text" CASCADE;
  DROP TABLE "projects_blocks_quote" CASCADE;
  DROP TABLE "projects_blocks_figure" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_video" CASCADE;
  DROP TABLE "projects_blocks_publications_items" CASCADE;
  DROP TABLE "projects_blocks_publications" CASCADE;
  DROP TABLE "projects_blocks_proof_number" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_ods" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text" CASCADE;
  DROP TABLE "_projects_v_blocks_media_text" CASCADE;
  DROP TABLE "_projects_v_blocks_quote" CASCADE;
  DROP TABLE "_projects_v_blocks_figure" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_video" CASCADE;
  DROP TABLE "_projects_v_blocks_publications_items" CASCADE;
  DROP TABLE "_projects_v_blocks_publications" CASCADE;
  DROP TABLE "_projects_v_blocks_proof_number" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_media_text" CASCADE;
  DROP TABLE "services_blocks_quote" CASCADE;
  DROP TABLE "services_blocks_figure" CASCADE;
  DROP TABLE "services_blocks_gallery" CASCADE;
  DROP TABLE "services_blocks_video" CASCADE;
  DROP TABLE "services_blocks_publications_items" CASCADE;
  DROP TABLE "services_blocks_publications" CASCADE;
  DROP TABLE "services_blocks_proof_number" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_deliverables" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text" CASCADE;
  DROP TABLE "_services_v_blocks_media_text" CASCADE;
  DROP TABLE "_services_v_blocks_quote" CASCADE;
  DROP TABLE "_services_v_blocks_figure" CASCADE;
  DROP TABLE "_services_v_blocks_gallery" CASCADE;
  DROP TABLE "_services_v_blocks_video" CASCADE;
  DROP TABLE "_services_v_blocks_publications_items" CASCADE;
  DROP TABLE "_services_v_blocks_publications" CASCADE;
  DROP TABLE "_services_v_blocks_proof_number" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "news_blocks_rich_text" CASCADE;
  DROP TABLE "news_blocks_media_text" CASCADE;
  DROP TABLE "news_blocks_quote" CASCADE;
  DROP TABLE "news_blocks_figure" CASCADE;
  DROP TABLE "news_blocks_gallery" CASCADE;
  DROP TABLE "news_blocks_video" CASCADE;
  DROP TABLE "news_blocks_publications_items" CASCADE;
  DROP TABLE "news_blocks_publications" CASCADE;
  DROP TABLE "news_blocks_proof_number" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v_blocks_rich_text" CASCADE;
  DROP TABLE "_news_v_blocks_media_text" CASCADE;
  DROP TABLE "_news_v_blocks_quote" CASCADE;
  DROP TABLE "_news_v_blocks_figure" CASCADE;
  DROP TABLE "_news_v_blocks_gallery" CASCADE;
  DROP TABLE "_news_v_blocks_video" CASCADE;
  DROP TABLE "_news_v_blocks_publications_items" CASCADE;
  DROP TABLE "_news_v_blocks_publications" CASCADE;
  DROP TABLE "_news_v_blocks_proof_number" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_rels" CASCADE;
  DROP TABLE "footer_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "contact_phones" CASCADE;
  DROP TABLE "contact_form_subjects" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "social_profiles" CASCADE;
  DROP TABLE "social" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "site_texts" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_lens_primary_type";
  DROP TYPE "public"."enum_pages_blocks_hero_lens_secondary_type";
  DROP TYPE "public"."enum_pages_blocks_project_index_mode";
  DROP TYPE "public"."enum_pages_blocks_project_index_link_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_layout";
  DROP TYPE "public"."enum_pages_blocks_media_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_figure_size";
  DROP TYPE "public"."enum_pages_blocks_ods_goals";
  DROP TYPE "public"."enum_pages_blocks_cta_band_link_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_lens_primary_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_lens_secondary_type";
  DROP TYPE "public"."enum__pages_v_blocks_project_index_mode";
  DROP TYPE "public"."enum__pages_v_blocks_project_index_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_layout";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_figure_size";
  DROP TYPE "public"."enum__pages_v_blocks_ods_goals";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_link_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_projects_ods";
  DROP TYPE "public"."enum_projects_blocks_rich_text_layout";
  DROP TYPE "public"."enum_projects_blocks_media_text_image_position";
  DROP TYPE "public"."enum_projects_blocks_figure_size";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_ods";
  DROP TYPE "public"."enum__projects_v_blocks_rich_text_layout";
  DROP TYPE "public"."enum__projects_v_blocks_media_text_image_position";
  DROP TYPE "public"."enum__projects_v_blocks_figure_size";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_services_blocks_rich_text_layout";
  DROP TYPE "public"."enum_services_blocks_media_text_image_position";
  DROP TYPE "public"."enum_services_blocks_figure_size";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_layout";
  DROP TYPE "public"."enum__services_v_blocks_media_text_image_position";
  DROP TYPE "public"."enum__services_v_blocks_figure_size";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_news_blocks_rich_text_layout";
  DROP TYPE "public"."enum_news_blocks_media_text_image_position";
  DROP TYPE "public"."enum_news_blocks_figure_size";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_blocks_rich_text_layout";
  DROP TYPE "public"."enum__news_v_blocks_media_text_image_position";
  DROP TYPE "public"."enum__news_v_blocks_figure_size";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum_partners_kind";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_navigation_items_type";
  DROP TYPE "public"."enum_navigation_cta_type";
  DROP TYPE "public"."enum_footer_links_type";
  DROP TYPE "public"."enum_footer_legal_links_type";
  DROP TYPE "public"."enum_social_profiles_network";`)
}
