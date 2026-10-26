import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('pt', 'en', 'es');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('immersive', 'image', 'simple');
  CREATE TYPE "public"."enum_pages_blocks_statement_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_statement_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_statement_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_content_layout" AS ENUM('split', 'narrow');
  CREATE TYPE "public"."enum_pages_blocks_content_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_media_text_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_media_text_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_media_text_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_stats_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_timeline_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('mosaic', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_gallery_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_video_source" AS ENUM('upload', 'embed');
  CREATE TYPE "public"."enum_pages_blocks_video_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_projects_mode" AS ENUM('featured', 'latest', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_projects_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_services_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_partners_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum_pages_blocks_ods_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_team_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_downloads_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_faq_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_map_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('immersive', 'image', 'simple');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_content_layout" AS ENUM('split', 'narrow');
  CREATE TYPE "public"."enum__pages_v_blocks_content_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('mosaic', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_video_source" AS ENUM('upload', 'embed');
  CREATE TYPE "public"."enum__pages_v_blocks_video_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_mode" AS ENUM('featured', 'latest', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_services_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_partners_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum__pages_v_blocks_ods_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_team_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_downloads_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_map_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('pt', 'en', 'es');
  CREATE TYPE "public"."enum_services_blocks_hero_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_hero_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('immersive', 'image', 'simple');
  CREATE TYPE "public"."enum_services_blocks_statement_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_statement_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_statement_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_content_layout" AS ENUM('split', 'narrow');
  CREATE TYPE "public"."enum_services_blocks_content_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_media_text_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_media_text_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_services_blocks_media_text_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_stats_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_timeline_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_gallery_layout" AS ENUM('mosaic', 'carousel');
  CREATE TYPE "public"."enum_services_blocks_gallery_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_video_source" AS ENUM('upload', 'embed');
  CREATE TYPE "public"."enum_services_blocks_video_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_projects_mode" AS ENUM('featured', 'latest', 'selected');
  CREATE TYPE "public"."enum_services_blocks_projects_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_services_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_testimonials_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_partners_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum_services_blocks_ods_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_team_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_downloads_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_faq_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_map_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_contact_form_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_cta_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_cta_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_services_blocks_cta_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('territory', 'heritage', 'education', 'management', 'diffusion');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_hero_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_hero_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('immersive', 'image', 'simple');
  CREATE TYPE "public"."enum__services_v_blocks_statement_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_statement_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_statement_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_content_layout" AS ENUM('split', 'narrow');
  CREATE TYPE "public"."enum__services_v_blocks_content_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_stats_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_timeline_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_layout" AS ENUM('mosaic', 'carousel');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_video_source" AS ENUM('upload', 'embed');
  CREATE TYPE "public"."enum__services_v_blocks_video_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_projects_mode" AS ENUM('featured', 'latest', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_projects_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_services_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_partners_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum__services_v_blocks_ods_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_team_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_downloads_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_faq_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_map_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_contact_form_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_cta_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__services_v_blocks_cta_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_cta_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('territory', 'heritage', 'education', 'management', 'diffusion');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('pt', 'en', 'es');
  CREATE TYPE "public"."enum_projects_ods" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum_projects_blocks_content_layout" AS ENUM('split', 'narrow');
  CREATE TYPE "public"."enum_projects_blocks_content_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_media_text_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_projects_blocks_media_text_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_projects_blocks_media_text_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_statement_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_projects_blocks_statement_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_projects_blocks_statement_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_stats_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_gallery_layout" AS ENUM('mosaic', 'carousel');
  CREATE TYPE "public"."enum_projects_blocks_gallery_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_video_source" AS ENUM('upload', 'embed');
  CREATE TYPE "public"."enum_projects_blocks_video_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_timeline_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_testimonials_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum_projects_blocks_ods_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum_projects_accent" AS ENUM('blue', 'green', 'dark');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_ods" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum__projects_v_blocks_content_layout" AS ENUM('split', 'narrow');
  CREATE TYPE "public"."enum__projects_v_blocks_content_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_media_text_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__projects_v_blocks_media_text_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__projects_v_blocks_media_text_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_statement_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__projects_v_blocks_statement_links_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__projects_v_blocks_statement_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_stats_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_gallery_layout" AS ENUM('mosaic', 'carousel');
  CREATE TYPE "public"."enum__projects_v_blocks_gallery_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_video_source" AS ENUM('upload', 'embed');
  CREATE TYPE "public"."enum__projects_v_blocks_video_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_timeline_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_testimonials_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_blocks_ods_goals" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
  CREATE TYPE "public"."enum__projects_v_blocks_ods_tone" AS ENUM('default', 'alt', 'brand', 'dark');
  CREATE TYPE "public"."enum__projects_v_version_accent" AS ENUM('blue', 'green', 'dark');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('pt', 'en', 'es');
  CREATE TYPE "public"."enum_news_category" AS ENUM('noticia', 'artigo', 'evento', 'publicacao');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('noticia', 'artigo', 'evento', 'publicacao');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('pt', 'en', 'es');
  CREATE TYPE "public"."enum_jobs_type" AS ENUM('clt', 'pj', 'estagio', 'temporario');
  CREATE TYPE "public"."enum_jobs_opening" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_version_type" AS ENUM('clt', 'pj', 'estagio', 'temporario');
  CREATE TYPE "public"."enum__jobs_v_version_opening" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum__jobs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_published_locale" AS ENUM('pt', 'en', 'es');
  CREATE TYPE "public"."enum_partners_kind" AS ENUM('client', 'partner', 'executor');
  CREATE TYPE "public"."enum_documents_category" AS ENUM('publicacao', 'relatorio', 'institucional', 'edital');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'in_progress', 'answered', 'archived');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'author');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_navigation_items_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_navigation_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_columns_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_legal_links_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_social_profiles_network" AS ENUM('instagram', 'linkedin', 'facebook', 'youtube', 'whatsapp');
  CREATE TYPE "public"."enum_site_settings_announcement_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_hero_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_pages_blocks_hero_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'immersive',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_statement_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_pages_blocks_statement_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"tone" "enum_pages_blocks_statement_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"layout" "enum_pages_blocks_content_layout" DEFAULT 'split',
  	"tone" "enum_pages_blocks_content_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_media_text_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_pages_blocks_media_text_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum_pages_blocks_media_text_media_position" DEFAULT 'right',
  	"tone" "enum_pages_blocks_media_text_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_pages_blocks_stats_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_pages_blocks_timeline_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'mosaic',
  	"tone" "enum_pages_blocks_gallery_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"source" "enum_pages_blocks_video_source" DEFAULT 'upload',
  	"file_id" integer,
  	"url" varchar,
  	"poster_id" integer,
  	"caption" varchar,
  	"tone" "enum_pages_blocks_video_tone" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum_pages_blocks_projects_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_all_link" boolean DEFAULT true,
  	"tone" "enum_pages_blocks_projects_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum_pages_blocks_services_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_pages_blocks_testimonials_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_pages_blocks_partners_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ods_goals",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum_pages_blocks_ods_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_pages_blocks_team_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_pages_blocks_downloads_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_pages_blocks_faq_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"address" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"zoom" numeric DEFAULT 13,
  	"tone" "enum_pages_blocks_map_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum_pages_blocks_contact_form_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_cta_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_pages_blocks_cta_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum_pages_blocks_cta_tone" DEFAULT 'brand',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"partners_id" integer,
  	"team_id" integer,
  	"documents_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_hero_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__pages_v_blocks_hero_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'immersive',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_statement_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__pages_v_blocks_statement_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"tone" "enum__pages_v_blocks_statement_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"layout" "enum__pages_v_blocks_content_layout" DEFAULT 'split',
  	"tone" "enum__pages_v_blocks_content_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_media_text_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__pages_v_blocks_media_text_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum__pages_v_blocks_media_text_media_position" DEFAULT 'right',
  	"tone" "enum__pages_v_blocks_media_text_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__pages_v_blocks_stats_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__pages_v_blocks_timeline_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'mosaic',
  	"tone" "enum__pages_v_blocks_gallery_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"source" "enum__pages_v_blocks_video_source" DEFAULT 'upload',
  	"file_id" integer,
  	"url" varchar,
  	"poster_id" integer,
  	"caption" varchar,
  	"tone" "enum__pages_v_blocks_video_tone" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum__pages_v_blocks_projects_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_all_link" boolean DEFAULT true,
  	"tone" "enum__pages_v_blocks_projects_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum__pages_v_blocks_services_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__pages_v_blocks_testimonials_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__pages_v_blocks_partners_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ods_goals",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum__pages_v_blocks_ods_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__pages_v_blocks_team_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__pages_v_blocks_downloads_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__pages_v_blocks_faq_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"address" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"zoom" numeric DEFAULT 13,
  	"tone" "enum__pages_v_blocks_map_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum__pages_v_blocks_contact_form_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_cta_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__pages_v_blocks_cta_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum__pages_v_blocks_cta_tone" DEFAULT 'brand',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"partners_id" integer,
  	"team_id" integer,
  	"documents_id" integer
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_deliverables_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_services_blocks_hero_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_services_blocks_hero_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_hero_variant" DEFAULT 'immersive',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_statement_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_services_blocks_statement_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_services_blocks_statement_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"tone" "enum_services_blocks_statement_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"layout" "enum_services_blocks_content_layout" DEFAULT 'split',
  	"tone" "enum_services_blocks_content_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_media_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_services_blocks_media_text_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_services_blocks_media_text_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum_services_blocks_media_text_media_position" DEFAULT 'right',
  	"tone" "enum_services_blocks_media_text_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_services_blocks_stats_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_services_blocks_timeline_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"layout" "enum_services_blocks_gallery_layout" DEFAULT 'mosaic',
  	"tone" "enum_services_blocks_gallery_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"source" "enum_services_blocks_video_source" DEFAULT 'upload',
  	"file_id" integer,
  	"url" varchar,
  	"poster_id" integer,
  	"caption" varchar,
  	"tone" "enum_services_blocks_video_tone" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum_services_blocks_projects_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_all_link" boolean DEFAULT true,
  	"tone" "enum_services_blocks_projects_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum_services_blocks_services_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_services_blocks_testimonials_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_services_blocks_partners_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_services_blocks_ods_goals",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum_services_blocks_ods_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_services_blocks_team_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_services_blocks_downloads_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_services_blocks_faq_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"address" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"zoom" numeric DEFAULT 13,
  	"tone" "enum_services_blocks_map_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum_services_blocks_contact_form_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_services_blocks_cta_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_services_blocks_cta_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum_services_blocks_cta_tone" DEFAULT 'brand',
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum_services_icon" DEFAULT 'territory',
  	"cover_image_id" integer,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"partners_id" integer,
  	"team_id" integer,
  	"documents_id" integer
  );
  
  CREATE TABLE "_services_v_version_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_deliverables_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__services_v_blocks_hero_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__services_v_blocks_hero_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_hero_variant" DEFAULT 'immersive',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_statement_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__services_v_blocks_statement_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__services_v_blocks_statement_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"tone" "enum__services_v_blocks_statement_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"layout" "enum__services_v_blocks_content_layout" DEFAULT 'split',
  	"tone" "enum__services_v_blocks_content_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_media_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__services_v_blocks_media_text_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__services_v_blocks_media_text_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum__services_v_blocks_media_text_media_position" DEFAULT 'right',
  	"tone" "enum__services_v_blocks_media_text_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__services_v_blocks_stats_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__services_v_blocks_timeline_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"layout" "enum__services_v_blocks_gallery_layout" DEFAULT 'mosaic',
  	"tone" "enum__services_v_blocks_gallery_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"source" "enum__services_v_blocks_video_source" DEFAULT 'upload',
  	"file_id" integer,
  	"url" varchar,
  	"poster_id" integer,
  	"caption" varchar,
  	"tone" "enum__services_v_blocks_video_tone" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"mode" "enum__services_v_blocks_projects_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"show_all_link" boolean DEFAULT true,
  	"tone" "enum__services_v_blocks_projects_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum__services_v_blocks_services_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__services_v_blocks_testimonials_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__services_v_blocks_partners_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__services_v_blocks_ods_goals",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum__services_v_blocks_ods_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__services_v_blocks_team_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__services_v_blocks_downloads_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__services_v_blocks_faq_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"address" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"zoom" numeric DEFAULT 13,
  	"tone" "enum__services_v_blocks_map_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"tone" "enum__services_v_blocks_contact_form_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__services_v_blocks_cta_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__services_v_blocks_cta_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum__services_v_blocks_cta_tone" DEFAULT 'brand',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_icon" "enum__services_v_version_icon" DEFAULT 'territory',
  	"version_cover_image_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"partners_id" integer,
  	"team_id" integer,
  	"documents_id" integer
  );
  
  CREATE TABLE "projects_ods" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_projects_ods",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "projects_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"layout" "enum_projects_blocks_content_layout" DEFAULT 'split',
  	"tone" "enum_projects_blocks_content_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_media_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_projects_blocks_media_text_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_projects_blocks_media_text_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum_projects_blocks_media_text_media_position" DEFAULT 'right',
  	"tone" "enum_projects_blocks_media_text_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_statement_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_projects_blocks_statement_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_projects_blocks_statement_links_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "projects_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"tone" "enum_projects_blocks_statement_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "projects_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_projects_blocks_stats_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"layout" "enum_projects_blocks_gallery_layout" DEFAULT 'mosaic',
  	"tone" "enum_projects_blocks_gallery_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"source" "enum_projects_blocks_video_source" DEFAULT 'upload',
  	"file_id" integer,
  	"url" varchar,
  	"poster_id" integer,
  	"caption" varchar,
  	"tone" "enum_projects_blocks_video_tone" DEFAULT 'dark',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_projects_blocks_timeline_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "projects_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum_projects_blocks_testimonials_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_projects_blocks_ods_goals",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum_projects_blocks_ods_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"cover_id" integer
  );
  
  CREATE TABLE "projects_publications_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"client" varchar,
  	"start_year" numeric,
  	"end_year" numeric,
  	"coordinates_lat" numeric,
  	"coordinates_lng" numeric,
  	"featured" boolean DEFAULT false,
  	"accent" "enum_projects_accent" DEFAULT 'blue',
  	"video_id" integer,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"location" varchar,
  	"role" varchar,
  	"body" jsonb,
  	"quote_text" varchar,
  	"quote_source" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"partners_id" integer,
  	"services_id" integer,
  	"pages_id" integer,
  	"projects_id" integer,
  	"news_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_projects_v_version_ods" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_version_ods",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_highlights_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"layout" "enum__projects_v_blocks_content_layout" DEFAULT 'split',
  	"tone" "enum__projects_v_blocks_content_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_media_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__projects_v_blocks_media_text_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__projects_v_blocks_media_text_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"media_id" integer,
  	"media_position" "enum__projects_v_blocks_media_text_media_position" DEFAULT 'right',
  	"tone" "enum__projects_v_blocks_media_text_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_statement_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__projects_v_blocks_statement_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__projects_v_blocks_statement_links_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"tone" "enum__projects_v_blocks_statement_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__projects_v_blocks_stats_tone" DEFAULT 'brand',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"layout" "enum__projects_v_blocks_gallery_layout" DEFAULT 'mosaic',
  	"tone" "enum__projects_v_blocks_gallery_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"source" "enum__projects_v_blocks_video_source" DEFAULT 'upload',
  	"file_id" integer,
  	"url" varchar,
  	"poster_id" integer,
  	"caption" varchar,
  	"tone" "enum__projects_v_blocks_video_tone" DEFAULT 'dark',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__projects_v_blocks_timeline_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"tone" "enum__projects_v_blocks_testimonials_tone" DEFAULT 'alt',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_ods_goals" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_blocks_ods_goals",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_ods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"tone" "enum__projects_v_blocks_ods_tone" DEFAULT 'default',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_version_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"cover_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_publications_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_client" varchar,
  	"version_start_year" numeric,
  	"version_end_year" numeric,
  	"version_coordinates_lat" numeric,
  	"version_coordinates_lng" numeric,
  	"version_featured" boolean DEFAULT false,
  	"version_accent" "enum__projects_v_version_accent" DEFAULT 'blue',
  	"version_video_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_location" varchar,
  	"version_role" varchar,
  	"version_body" jsonb,
  	"version_quote_text" varchar,
  	"version_quote_source" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"partners_id" integer,
  	"services_id" integer,
  	"pages_id" integer,
  	"projects_id" integer,
  	"news_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"category" "enum_news_category" DEFAULT 'noticia',
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_category" "enum__news_v_version_category" DEFAULT 'noticia',
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_jobs_type" DEFAULT 'pj',
  	"opening" "enum_jobs_opening" DEFAULT 'open',
  	"closing_date" timestamp(3) with time zone,
  	"apply_url" varchar,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_jobs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "jobs_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"location" varchar,
  	"description" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_jobs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_type" "enum__jobs_v_version_type" DEFAULT 'pj',
  	"version_opening" "enum__jobs_v_version_opening" DEFAULT 'open',
  	"version_closing_date" timestamp(3) with time zone,
  	"version_apply_url" varchar,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__jobs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__jobs_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_jobs_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_location" varchar,
  	"version_description" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"lattes" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_locales" (
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  	"credit" varchar,
  	"needs_review" boolean DEFAULT false,
  	"legacy_url" varchar,
  	"blur_data_u_r_l" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"_objectkey" varchar,
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
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_wide_url" varchar,
  	"sizes_wide_width" numeric,
  	"sizes_wide_height" numeric,
  	"sizes_wide_mime_type" varchar,
  	"sizes_wide_filesize" numeric,
  	"sizes_wide_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_documents_category" DEFAULT 'publicacao',
  	"order" numeric DEFAULT 100,
  	"prefix" varchar DEFAULT 'documents',
  	"_objectkey" varchar,
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
  	"focal_y" numeric
  );
  
  CREATE TABLE "documents_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  	"meta_locale" varchar,
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
  	"services_id" integer,
  	"projects_id" integer,
  	"news_id" integer,
  	"jobs_id" integer,
  	"team_id" integer,
  	"partners_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
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
  	"url" varchar
  );
  
  CREATE TABLE "navigation_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum_navigation_cta_type" DEFAULT 'internal',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_columns_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_legal_links_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar
  );
  
  CREATE TABLE "footer_legal_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_form_subjects_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Quarau Projetos Socioambientais, Educativos e Culturais',
  	"cnpj" varchar,
  	"email" varchar NOT NULL,
  	"address_street" varchar,
  	"address_district" varchar,
  	"address_city" varchar DEFAULT 'São José dos Campos',
  	"address_state" varchar DEFAULT 'SP',
  	"address_postal_code" varchar,
  	"address_lat" numeric,
  	"address_lng" numeric,
  	"notification_emails" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_locales" (
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"network" "enum_social_profiles_network" NOT NULL,
  	"url" varchar NOT NULL,
  	"handle" varchar
  );
  
  CREATE TABLE "social" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Quarau' NOT NULL,
  	"title_template" varchar DEFAULT '%s — Quarau',
  	"default_og_image_id" integer,
  	"organization_legal_name" varchar,
  	"organization_founding_year" numeric,
  	"organization_area_served" varchar DEFAULT 'Brasil',
  	"analytics_umami_website_id" varchar,
  	"analytics_umami_script_url" varchar DEFAULT '/stats/script.js',
  	"announcement_enabled" boolean,
  	"announcement_link_type" "enum_site_settings_announcement_link_type" DEFAULT 'internal',
  	"announcement_link_new_tab" boolean,
  	"announcement_link_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"default_description" varchar,
  	"announcement_text" varchar,
  	"announcement_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"services_id" integer,
  	"news_id" integer
  );
  
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_links" ADD CONSTRAINT "pages_blocks_statement_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_links" ADD CONSTRAINT "pages_blocks_media_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners" ADD CONSTRAINT "pages_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ods_goals" ADD CONSTRAINT "pages_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ods" ADD CONSTRAINT "pages_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_downloads" ADD CONSTRAINT "pages_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_links" ADD CONSTRAINT "_pages_v_blocks_statement_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text_links" ADD CONSTRAINT "_pages_v_blocks_media_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partners" ADD CONSTRAINT "_pages_v_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ods_goals" ADD CONSTRAINT "_pages_v_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ods" ADD CONSTRAINT "_pages_v_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_downloads" ADD CONSTRAINT "_pages_v_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map" ADD CONSTRAINT "_pages_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables_locales" ADD CONSTRAINT "services_deliverables_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_deliverables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_links" ADD CONSTRAINT "services_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_statement_links" ADD CONSTRAINT "services_blocks_statement_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_statement" ADD CONSTRAINT "services_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_content" ADD CONSTRAINT "services_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_text_links" ADD CONSTRAINT "services_blocks_media_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_text" ADD CONSTRAINT "services_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_media_text" ADD CONSTRAINT "services_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_timeline_items" ADD CONSTRAINT "services_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_timeline" ADD CONSTRAINT "services_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery" ADD CONSTRAINT "services_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_projects" ADD CONSTRAINT "services_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services" ADD CONSTRAINT "services_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_items" ADD CONSTRAINT "services_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_partners" ADD CONSTRAINT "services_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_ods_goals" ADD CONSTRAINT "services_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_ods" ADD CONSTRAINT "services_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_team" ADD CONSTRAINT "services_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_downloads" ADD CONSTRAINT "services_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items" ADD CONSTRAINT "services_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_map" ADD CONSTRAINT "services_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_form" ADD CONSTRAINT "services_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links" ADD CONSTRAINT "services_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_deliverables" ADD CONSTRAINT "_services_v_version_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_deliverables_locales" ADD CONSTRAINT "_services_v_version_deliverables_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_deliverables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_links" ADD CONSTRAINT "_services_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_statement_links" ADD CONSTRAINT "_services_v_blocks_statement_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_statement" ADD CONSTRAINT "_services_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_content" ADD CONSTRAINT "_services_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_text_links" ADD CONSTRAINT "_services_v_blocks_media_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_text" ADD CONSTRAINT "_services_v_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_text" ADD CONSTRAINT "_services_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_timeline_items" ADD CONSTRAINT "_services_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_timeline" ADD CONSTRAINT "_services_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery" ADD CONSTRAINT "_services_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_projects" ADD CONSTRAINT "_services_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services" ADD CONSTRAINT "_services_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials_items" ADD CONSTRAINT "_services_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_partners" ADD CONSTRAINT "_services_v_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_ods_goals" ADD CONSTRAINT "_services_v_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_ods" ADD CONSTRAINT "_services_v_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_team" ADD CONSTRAINT "_services_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_downloads" ADD CONSTRAINT "_services_v_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_items" ADD CONSTRAINT "_services_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq" ADD CONSTRAINT "_services_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_map" ADD CONSTRAINT "_services_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_form" ADD CONSTRAINT "_services_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_links" ADD CONSTRAINT "_services_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_ods" ADD CONSTRAINT "projects_ods_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_highlights" ADD CONSTRAINT "projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_highlights_locales" ADD CONSTRAINT "projects_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_content" ADD CONSTRAINT "projects_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_text_links" ADD CONSTRAINT "projects_blocks_media_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_text" ADD CONSTRAINT "projects_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_media_text" ADD CONSTRAINT "projects_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_statement_links" ADD CONSTRAINT "projects_blocks_statement_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_statement" ADD CONSTRAINT "projects_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_timeline_items" ADD CONSTRAINT "projects_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_timeline" ADD CONSTRAINT "projects_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials_items" ADD CONSTRAINT "projects_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials" ADD CONSTRAINT "projects_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_ods_goals" ADD CONSTRAINT "projects_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_ods" ADD CONSTRAINT "projects_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_publications" ADD CONSTRAINT "projects_publications_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_publications" ADD CONSTRAINT "projects_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_publications_locales" ADD CONSTRAINT "projects_publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_ods" ADD CONSTRAINT "_projects_v_version_ods_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_highlights" ADD CONSTRAINT "_projects_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_highlights_locales" ADD CONSTRAINT "_projects_v_version_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_content" ADD CONSTRAINT "_projects_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_text_links" ADD CONSTRAINT "_projects_v_blocks_media_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_text" ADD CONSTRAINT "_projects_v_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_media_text" ADD CONSTRAINT "_projects_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_statement_links" ADD CONSTRAINT "_projects_v_blocks_statement_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_statement" ADD CONSTRAINT "_projects_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_timeline_items" ADD CONSTRAINT "_projects_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_timeline" ADD CONSTRAINT "_projects_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials_items" ADD CONSTRAINT "_projects_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials" ADD CONSTRAINT "_projects_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_ods_goals" ADD CONSTRAINT "_projects_v_blocks_ods_goals_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v_blocks_ods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_ods" ADD CONSTRAINT "_projects_v_blocks_ods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_publications" ADD CONSTRAINT "_projects_v_version_publications_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_publications" ADD CONSTRAINT "_projects_v_version_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_publications_locales" ADD CONSTRAINT "_projects_v_version_publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_video_id_media_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_jobs_v" ADD CONSTRAINT "_jobs_v_parent_id_jobs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_jobs_v_locales" ADD CONSTRAINT "_jobs_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_jobs_v_locales" ADD CONSTRAINT "_jobs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_jobs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_locales" ADD CONSTRAINT "team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_locales" ADD CONSTRAINT "navigation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_phones" ADD CONSTRAINT "contact_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_form_subjects" ADD CONSTRAINT "contact_form_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_form_subjects_locales" ADD CONSTRAINT "contact_form_subjects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_form_subjects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_profiles" ADD CONSTRAINT "social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_locale_idx" ON "pages_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_statement_links_order_idx" ON "pages_blocks_statement_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_links_parent_id_idx" ON "pages_blocks_statement_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_links_locale_idx" ON "pages_blocks_statement_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_locale_idx" ON "pages_blocks_statement" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_locale_idx" ON "pages_blocks_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_text_links_order_idx" ON "pages_blocks_media_text_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_links_parent_id_idx" ON "pages_blocks_media_text_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_links_locale_idx" ON "pages_blocks_media_text_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_text_order_idx" ON "pages_blocks_media_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_parent_id_idx" ON "pages_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_path_idx" ON "pages_blocks_media_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_locale_idx" ON "pages_blocks_media_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_text_media_idx" ON "pages_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locale_idx" ON "pages_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_locale_idx" ON "pages_blocks_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_items_locale_idx" ON "pages_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_locale_idx" ON "pages_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_locale_idx" ON "pages_blocks_video" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_file_idx" ON "pages_blocks_video" USING btree ("file_id");
  CREATE INDEX "pages_blocks_video_poster_idx" ON "pages_blocks_video" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_projects_order_idx" ON "pages_blocks_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_path_idx" ON "pages_blocks_projects" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_locale_idx" ON "pages_blocks_projects" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_locale_idx" ON "pages_blocks_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_locale_idx" ON "pages_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_locale_idx" ON "pages_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_partners_order_idx" ON "pages_blocks_partners" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_parent_id_idx" ON "pages_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_path_idx" ON "pages_blocks_partners" USING btree ("_path");
  CREATE INDEX "pages_blocks_partners_locale_idx" ON "pages_blocks_partners" USING btree ("_locale");
  CREATE INDEX "pages_blocks_ods_goals_order_idx" ON "pages_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "pages_blocks_ods_goals_parent_idx" ON "pages_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ods_goals_locale_idx" ON "pages_blocks_ods_goals" USING btree ("locale");
  CREATE INDEX "pages_blocks_ods_order_idx" ON "pages_blocks_ods" USING btree ("_order");
  CREATE INDEX "pages_blocks_ods_parent_id_idx" ON "pages_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ods_path_idx" ON "pages_blocks_ods" USING btree ("_path");
  CREATE INDEX "pages_blocks_ods_locale_idx" ON "pages_blocks_ods" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_locale_idx" ON "pages_blocks_team" USING btree ("_locale");
  CREATE INDEX "pages_blocks_downloads_order_idx" ON "pages_blocks_downloads" USING btree ("_order");
  CREATE INDEX "pages_blocks_downloads_parent_id_idx" ON "pages_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_downloads_path_idx" ON "pages_blocks_downloads" USING btree ("_path");
  CREATE INDEX "pages_blocks_downloads_locale_idx" ON "pages_blocks_downloads" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_blocks_map_order_idx" ON "pages_blocks_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_parent_id_idx" ON "pages_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_path_idx" ON "pages_blocks_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_locale_idx" ON "pages_blocks_map" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_locale_idx" ON "pages_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_created_by_idx" ON "pages" USING btree ("created_by_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id","locale");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id","locale");
  CREATE INDEX "pages_rels_news_id_idx" ON "pages_rels" USING btree ("news_id","locale");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id","locale");
  CREATE INDEX "pages_rels_partners_id_idx" ON "pages_rels" USING btree ("partners_id","locale");
  CREATE INDEX "pages_rels_team_id_idx" ON "pages_rels" USING btree ("team_id","locale");
  CREATE INDEX "pages_rels_documents_id_idx" ON "pages_rels" USING btree ("documents_id","locale");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_locale_idx" ON "_pages_v_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_statement_links_order_idx" ON "_pages_v_blocks_statement_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_links_parent_id_idx" ON "_pages_v_blocks_statement_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_links_locale_idx" ON "_pages_v_blocks_statement_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_locale_idx" ON "_pages_v_blocks_statement" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_locale_idx" ON "_pages_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_text_links_order_idx" ON "_pages_v_blocks_media_text_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_links_parent_id_idx" ON "_pages_v_blocks_media_text_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_links_locale_idx" ON "_pages_v_blocks_media_text_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_text_order_idx" ON "_pages_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_parent_id_idx" ON "_pages_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_path_idx" ON "_pages_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_locale_idx" ON "_pages_v_blocks_media_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_text_media_idx" ON "_pages_v_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_locale_idx" ON "_pages_v_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_locale_idx" ON "_pages_v_blocks_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_items_locale_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_locale_idx" ON "_pages_v_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_locale_idx" ON "_pages_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_locale_idx" ON "_pages_v_blocks_video" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_file_idx" ON "_pages_v_blocks_video" USING btree ("file_id");
  CREATE INDEX "_pages_v_blocks_video_poster_idx" ON "_pages_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_projects_order_idx" ON "_pages_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_parent_id_idx" ON "_pages_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_path_idx" ON "_pages_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_locale_idx" ON "_pages_v_blocks_projects" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_locale_idx" ON "_pages_v_blocks_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_locale_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_locale_idx" ON "_pages_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_partners_order_idx" ON "_pages_v_blocks_partners" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partners_parent_id_idx" ON "_pages_v_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partners_path_idx" ON "_pages_v_blocks_partners" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_partners_locale_idx" ON "_pages_v_blocks_partners" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_ods_goals_order_idx" ON "_pages_v_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ods_goals_parent_idx" ON "_pages_v_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ods_goals_locale_idx" ON "_pages_v_blocks_ods_goals" USING btree ("locale");
  CREATE INDEX "_pages_v_blocks_ods_order_idx" ON "_pages_v_blocks_ods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ods_parent_id_idx" ON "_pages_v_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ods_path_idx" ON "_pages_v_blocks_ods" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ods_locale_idx" ON "_pages_v_blocks_ods" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_locale_idx" ON "_pages_v_blocks_team" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_downloads_order_idx" ON "_pages_v_blocks_downloads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_downloads_parent_id_idx" ON "_pages_v_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_downloads_path_idx" ON "_pages_v_blocks_downloads" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_downloads_locale_idx" ON "_pages_v_blocks_downloads" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locale_idx" ON "_pages_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_map_order_idx" ON "_pages_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_parent_id_idx" ON "_pages_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_path_idx" ON "_pages_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_locale_idx" ON "_pages_v_blocks_map" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_locale_idx" ON "_pages_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_locale_idx" ON "_pages_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_locale_idx" ON "_pages_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_created_by_idx" ON "_pages_v" USING btree ("version_created_by_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id","locale");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id","locale");
  CREATE INDEX "_pages_v_rels_news_id_idx" ON "_pages_v_rels" USING btree ("news_id","locale");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id","locale");
  CREATE INDEX "_pages_v_rels_partners_id_idx" ON "_pages_v_rels" USING btree ("partners_id","locale");
  CREATE INDEX "_pages_v_rels_team_id_idx" ON "_pages_v_rels" USING btree ("team_id","locale");
  CREATE INDEX "_pages_v_rels_documents_id_idx" ON "_pages_v_rels" USING btree ("documents_id","locale");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_deliverables_locales_locale_parent_id_unique" ON "services_deliverables_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_hero_links_order_idx" ON "services_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_links_parent_id_idx" ON "services_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_links_locale_idx" ON "services_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_locale_idx" ON "services_blocks_hero" USING btree ("_locale");
  CREATE INDEX "services_blocks_hero_media_idx" ON "services_blocks_hero" USING btree ("media_id");
  CREATE INDEX "services_blocks_statement_links_order_idx" ON "services_blocks_statement_links" USING btree ("_order");
  CREATE INDEX "services_blocks_statement_links_parent_id_idx" ON "services_blocks_statement_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_statement_links_locale_idx" ON "services_blocks_statement_links" USING btree ("_locale");
  CREATE INDEX "services_blocks_statement_order_idx" ON "services_blocks_statement" USING btree ("_order");
  CREATE INDEX "services_blocks_statement_parent_id_idx" ON "services_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_statement_path_idx" ON "services_blocks_statement" USING btree ("_path");
  CREATE INDEX "services_blocks_statement_locale_idx" ON "services_blocks_statement" USING btree ("_locale");
  CREATE INDEX "services_blocks_content_order_idx" ON "services_blocks_content" USING btree ("_order");
  CREATE INDEX "services_blocks_content_parent_id_idx" ON "services_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_content_path_idx" ON "services_blocks_content" USING btree ("_path");
  CREATE INDEX "services_blocks_content_locale_idx" ON "services_blocks_content" USING btree ("_locale");
  CREATE INDEX "services_blocks_media_text_links_order_idx" ON "services_blocks_media_text_links" USING btree ("_order");
  CREATE INDEX "services_blocks_media_text_links_parent_id_idx" ON "services_blocks_media_text_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_media_text_links_locale_idx" ON "services_blocks_media_text_links" USING btree ("_locale");
  CREATE INDEX "services_blocks_media_text_order_idx" ON "services_blocks_media_text" USING btree ("_order");
  CREATE INDEX "services_blocks_media_text_parent_id_idx" ON "services_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_media_text_path_idx" ON "services_blocks_media_text" USING btree ("_path");
  CREATE INDEX "services_blocks_media_text_locale_idx" ON "services_blocks_media_text" USING btree ("_locale");
  CREATE INDEX "services_blocks_media_text_media_idx" ON "services_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_items_locale_idx" ON "services_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE INDEX "services_blocks_stats_locale_idx" ON "services_blocks_stats" USING btree ("_locale");
  CREATE INDEX "services_blocks_timeline_items_order_idx" ON "services_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "services_blocks_timeline_items_parent_id_idx" ON "services_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_timeline_items_locale_idx" ON "services_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "services_blocks_timeline_order_idx" ON "services_blocks_timeline" USING btree ("_order");
  CREATE INDEX "services_blocks_timeline_parent_id_idx" ON "services_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_timeline_path_idx" ON "services_blocks_timeline" USING btree ("_path");
  CREATE INDEX "services_blocks_timeline_locale_idx" ON "services_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "services_blocks_gallery_order_idx" ON "services_blocks_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_parent_id_idx" ON "services_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_path_idx" ON "services_blocks_gallery" USING btree ("_path");
  CREATE INDEX "services_blocks_gallery_locale_idx" ON "services_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "services_blocks_video_order_idx" ON "services_blocks_video" USING btree ("_order");
  CREATE INDEX "services_blocks_video_parent_id_idx" ON "services_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_video_path_idx" ON "services_blocks_video" USING btree ("_path");
  CREATE INDEX "services_blocks_video_locale_idx" ON "services_blocks_video" USING btree ("_locale");
  CREATE INDEX "services_blocks_video_file_idx" ON "services_blocks_video" USING btree ("file_id");
  CREATE INDEX "services_blocks_video_poster_idx" ON "services_blocks_video" USING btree ("poster_id");
  CREATE INDEX "services_blocks_projects_order_idx" ON "services_blocks_projects" USING btree ("_order");
  CREATE INDEX "services_blocks_projects_parent_id_idx" ON "services_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_projects_path_idx" ON "services_blocks_projects" USING btree ("_path");
  CREATE INDEX "services_blocks_projects_locale_idx" ON "services_blocks_projects" USING btree ("_locale");
  CREATE INDEX "services_blocks_services_order_idx" ON "services_blocks_services" USING btree ("_order");
  CREATE INDEX "services_blocks_services_parent_id_idx" ON "services_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_path_idx" ON "services_blocks_services" USING btree ("_path");
  CREATE INDEX "services_blocks_services_locale_idx" ON "services_blocks_services" USING btree ("_locale");
  CREATE INDEX "services_blocks_testimonials_items_order_idx" ON "services_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_items_parent_id_idx" ON "services_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_items_locale_idx" ON "services_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "services_blocks_testimonials_locale_idx" ON "services_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "services_blocks_partners_order_idx" ON "services_blocks_partners" USING btree ("_order");
  CREATE INDEX "services_blocks_partners_parent_id_idx" ON "services_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_partners_path_idx" ON "services_blocks_partners" USING btree ("_path");
  CREATE INDEX "services_blocks_partners_locale_idx" ON "services_blocks_partners" USING btree ("_locale");
  CREATE INDEX "services_blocks_ods_goals_order_idx" ON "services_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "services_blocks_ods_goals_parent_idx" ON "services_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "services_blocks_ods_goals_locale_idx" ON "services_blocks_ods_goals" USING btree ("locale");
  CREATE INDEX "services_blocks_ods_order_idx" ON "services_blocks_ods" USING btree ("_order");
  CREATE INDEX "services_blocks_ods_parent_id_idx" ON "services_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_ods_path_idx" ON "services_blocks_ods" USING btree ("_path");
  CREATE INDEX "services_blocks_ods_locale_idx" ON "services_blocks_ods" USING btree ("_locale");
  CREATE INDEX "services_blocks_team_order_idx" ON "services_blocks_team" USING btree ("_order");
  CREATE INDEX "services_blocks_team_parent_id_idx" ON "services_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_team_path_idx" ON "services_blocks_team" USING btree ("_path");
  CREATE INDEX "services_blocks_team_locale_idx" ON "services_blocks_team" USING btree ("_locale");
  CREATE INDEX "services_blocks_downloads_order_idx" ON "services_blocks_downloads" USING btree ("_order");
  CREATE INDEX "services_blocks_downloads_parent_id_idx" ON "services_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_downloads_path_idx" ON "services_blocks_downloads" USING btree ("_path");
  CREATE INDEX "services_blocks_downloads_locale_idx" ON "services_blocks_downloads" USING btree ("_locale");
  CREATE INDEX "services_blocks_faq_items_order_idx" ON "services_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_items_parent_id_idx" ON "services_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_items_locale_idx" ON "services_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_locale_idx" ON "services_blocks_faq" USING btree ("_locale");
  CREATE INDEX "services_blocks_map_order_idx" ON "services_blocks_map" USING btree ("_order");
  CREATE INDEX "services_blocks_map_parent_id_idx" ON "services_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_map_path_idx" ON "services_blocks_map" USING btree ("_path");
  CREATE INDEX "services_blocks_map_locale_idx" ON "services_blocks_map" USING btree ("_locale");
  CREATE INDEX "services_blocks_contact_form_order_idx" ON "services_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_form_parent_id_idx" ON "services_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_form_path_idx" ON "services_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "services_blocks_contact_form_locale_idx" ON "services_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "services_blocks_cta_links_order_idx" ON "services_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_links_parent_id_idx" ON "services_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_links_locale_idx" ON "services_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_locale_idx" ON "services_blocks_cta" USING btree ("_locale");
  CREATE INDEX "services_cover_image_idx" ON "services" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_created_by_idx" ON "services" USING btree ("created_by_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_meta_meta_image_idx" ON "services_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_locale_idx" ON "services_rels" USING btree ("locale");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id","locale");
  CREATE INDEX "services_rels_projects_id_idx" ON "services_rels" USING btree ("projects_id","locale");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id","locale");
  CREATE INDEX "services_rels_news_id_idx" ON "services_rels" USING btree ("news_id","locale");
  CREATE INDEX "services_rels_media_id_idx" ON "services_rels" USING btree ("media_id","locale");
  CREATE INDEX "services_rels_partners_id_idx" ON "services_rels" USING btree ("partners_id","locale");
  CREATE INDEX "services_rels_team_id_idx" ON "services_rels" USING btree ("team_id","locale");
  CREATE INDEX "services_rels_documents_id_idx" ON "services_rels" USING btree ("documents_id","locale");
  CREATE INDEX "_services_v_version_deliverables_order_idx" ON "_services_v_version_deliverables" USING btree ("_order");
  CREATE INDEX "_services_v_version_deliverables_parent_id_idx" ON "_services_v_version_deliverables" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_deliverables_locales_locale_parent_id_un" ON "_services_v_version_deliverables_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_hero_links_order_idx" ON "_services_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_links_parent_id_idx" ON "_services_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_links_locale_idx" ON "_services_v_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_locale_idx" ON "_services_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_hero_media_idx" ON "_services_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_statement_links_order_idx" ON "_services_v_blocks_statement_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_statement_links_parent_id_idx" ON "_services_v_blocks_statement_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_statement_links_locale_idx" ON "_services_v_blocks_statement_links" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_statement_order_idx" ON "_services_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_statement_parent_id_idx" ON "_services_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_statement_path_idx" ON "_services_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_statement_locale_idx" ON "_services_v_blocks_statement" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_content_order_idx" ON "_services_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_content_parent_id_idx" ON "_services_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_content_path_idx" ON "_services_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_content_locale_idx" ON "_services_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_media_text_links_order_idx" ON "_services_v_blocks_media_text_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_media_text_links_parent_id_idx" ON "_services_v_blocks_media_text_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_media_text_links_locale_idx" ON "_services_v_blocks_media_text_links" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_media_text_order_idx" ON "_services_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_media_text_parent_id_idx" ON "_services_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_media_text_path_idx" ON "_services_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_text_locale_idx" ON "_services_v_blocks_media_text" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_media_text_media_idx" ON "_services_v_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_items_locale_idx" ON "_services_v_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_stats_locale_idx" ON "_services_v_blocks_stats" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_timeline_items_order_idx" ON "_services_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_timeline_items_parent_id_idx" ON "_services_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_timeline_items_locale_idx" ON "_services_v_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_timeline_order_idx" ON "_services_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_timeline_parent_id_idx" ON "_services_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_timeline_path_idx" ON "_services_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_timeline_locale_idx" ON "_services_v_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_gallery_order_idx" ON "_services_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_gallery_parent_id_idx" ON "_services_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_path_idx" ON "_services_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_gallery_locale_idx" ON "_services_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_video_order_idx" ON "_services_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_video_parent_id_idx" ON "_services_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_video_path_idx" ON "_services_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_video_locale_idx" ON "_services_v_blocks_video" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_video_file_idx" ON "_services_v_blocks_video" USING btree ("file_id");
  CREATE INDEX "_services_v_blocks_video_poster_idx" ON "_services_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_services_v_blocks_projects_order_idx" ON "_services_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_projects_parent_id_idx" ON "_services_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_projects_path_idx" ON "_services_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_projects_locale_idx" ON "_services_v_blocks_projects" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_services_order_idx" ON "_services_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_services_parent_id_idx" ON "_services_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_path_idx" ON "_services_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_services_locale_idx" ON "_services_v_blocks_services" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_testimonials_items_order_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_items_parent_id_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_items_locale_idx" ON "_services_v_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_testimonials_locale_idx" ON "_services_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_partners_order_idx" ON "_services_v_blocks_partners" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_partners_parent_id_idx" ON "_services_v_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_partners_path_idx" ON "_services_v_blocks_partners" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_partners_locale_idx" ON "_services_v_blocks_partners" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_ods_goals_order_idx" ON "_services_v_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "_services_v_blocks_ods_goals_parent_idx" ON "_services_v_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "_services_v_blocks_ods_goals_locale_idx" ON "_services_v_blocks_ods_goals" USING btree ("locale");
  CREATE INDEX "_services_v_blocks_ods_order_idx" ON "_services_v_blocks_ods" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_ods_parent_id_idx" ON "_services_v_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_ods_path_idx" ON "_services_v_blocks_ods" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_ods_locale_idx" ON "_services_v_blocks_ods" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_team_order_idx" ON "_services_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_team_parent_id_idx" ON "_services_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_team_path_idx" ON "_services_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_team_locale_idx" ON "_services_v_blocks_team" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_downloads_order_idx" ON "_services_v_blocks_downloads" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_downloads_parent_id_idx" ON "_services_v_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_downloads_path_idx" ON "_services_v_blocks_downloads" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_downloads_locale_idx" ON "_services_v_blocks_downloads" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_faq_items_order_idx" ON "_services_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_items_parent_id_idx" ON "_services_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_items_locale_idx" ON "_services_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_faq_order_idx" ON "_services_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_parent_id_idx" ON "_services_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_path_idx" ON "_services_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_faq_locale_idx" ON "_services_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_map_order_idx" ON "_services_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_map_parent_id_idx" ON "_services_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_map_path_idx" ON "_services_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_map_locale_idx" ON "_services_v_blocks_map" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_contact_form_order_idx" ON "_services_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_form_parent_id_idx" ON "_services_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_form_path_idx" ON "_services_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_contact_form_locale_idx" ON "_services_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_cta_links_order_idx" ON "_services_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_links_parent_id_idx" ON "_services_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_links_locale_idx" ON "_services_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_cta_locale_idx" ON "_services_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_cover_image_idx" ON "_services_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_created_by_idx" ON "_services_v" USING btree ("version_created_by_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_locale_idx" ON "_services_v_rels" USING btree ("locale");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_services_v_rels_projects_id_idx" ON "_services_v_rels" USING btree ("projects_id","locale");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id","locale");
  CREATE INDEX "_services_v_rels_news_id_idx" ON "_services_v_rels" USING btree ("news_id","locale");
  CREATE INDEX "_services_v_rels_media_id_idx" ON "_services_v_rels" USING btree ("media_id","locale");
  CREATE INDEX "_services_v_rels_partners_id_idx" ON "_services_v_rels" USING btree ("partners_id","locale");
  CREATE INDEX "_services_v_rels_team_id_idx" ON "_services_v_rels" USING btree ("team_id","locale");
  CREATE INDEX "_services_v_rels_documents_id_idx" ON "_services_v_rels" USING btree ("documents_id","locale");
  CREATE INDEX "projects_ods_order_idx" ON "projects_ods" USING btree ("order");
  CREATE INDEX "projects_ods_parent_idx" ON "projects_ods" USING btree ("parent_id");
  CREATE INDEX "projects_highlights_order_idx" ON "projects_highlights" USING btree ("_order");
  CREATE INDEX "projects_highlights_parent_id_idx" ON "projects_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_highlights_locales_locale_parent_id_unique" ON "projects_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_content_order_idx" ON "projects_blocks_content" USING btree ("_order");
  CREATE INDEX "projects_blocks_content_parent_id_idx" ON "projects_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_content_path_idx" ON "projects_blocks_content" USING btree ("_path");
  CREATE INDEX "projects_blocks_content_locale_idx" ON "projects_blocks_content" USING btree ("_locale");
  CREATE INDEX "projects_blocks_media_text_links_order_idx" ON "projects_blocks_media_text_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_media_text_links_parent_id_idx" ON "projects_blocks_media_text_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_text_links_locale_idx" ON "projects_blocks_media_text_links" USING btree ("_locale");
  CREATE INDEX "projects_blocks_media_text_order_idx" ON "projects_blocks_media_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_media_text_parent_id_idx" ON "projects_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_media_text_path_idx" ON "projects_blocks_media_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_media_text_locale_idx" ON "projects_blocks_media_text" USING btree ("_locale");
  CREATE INDEX "projects_blocks_media_text_media_idx" ON "projects_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "projects_blocks_statement_links_order_idx" ON "projects_blocks_statement_links" USING btree ("_order");
  CREATE INDEX "projects_blocks_statement_links_parent_id_idx" ON "projects_blocks_statement_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_statement_links_locale_idx" ON "projects_blocks_statement_links" USING btree ("_locale");
  CREATE INDEX "projects_blocks_statement_order_idx" ON "projects_blocks_statement" USING btree ("_order");
  CREATE INDEX "projects_blocks_statement_parent_id_idx" ON "projects_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_statement_path_idx" ON "projects_blocks_statement" USING btree ("_path");
  CREATE INDEX "projects_blocks_statement_locale_idx" ON "projects_blocks_statement" USING btree ("_locale");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_items_locale_idx" ON "projects_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE INDEX "projects_blocks_stats_locale_idx" ON "projects_blocks_stats" USING btree ("_locale");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_gallery_locale_idx" ON "projects_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "projects_blocks_video_order_idx" ON "projects_blocks_video" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_parent_id_idx" ON "projects_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_path_idx" ON "projects_blocks_video" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_locale_idx" ON "projects_blocks_video" USING btree ("_locale");
  CREATE INDEX "projects_blocks_video_file_idx" ON "projects_blocks_video" USING btree ("file_id");
  CREATE INDEX "projects_blocks_video_poster_idx" ON "projects_blocks_video" USING btree ("poster_id");
  CREATE INDEX "projects_blocks_timeline_items_order_idx" ON "projects_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_timeline_items_parent_id_idx" ON "projects_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_timeline_items_locale_idx" ON "projects_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "projects_blocks_timeline_order_idx" ON "projects_blocks_timeline" USING btree ("_order");
  CREATE INDEX "projects_blocks_timeline_parent_id_idx" ON "projects_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_timeline_path_idx" ON "projects_blocks_timeline" USING btree ("_path");
  CREATE INDEX "projects_blocks_timeline_locale_idx" ON "projects_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "projects_blocks_testimonials_items_order_idx" ON "projects_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_items_parent_id_idx" ON "projects_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_items_locale_idx" ON "projects_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "projects_blocks_testimonials_order_idx" ON "projects_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_parent_id_idx" ON "projects_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_path_idx" ON "projects_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "projects_blocks_testimonials_locale_idx" ON "projects_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "projects_blocks_ods_goals_order_idx" ON "projects_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "projects_blocks_ods_goals_parent_idx" ON "projects_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "projects_blocks_ods_goals_locale_idx" ON "projects_blocks_ods_goals" USING btree ("locale");
  CREATE INDEX "projects_blocks_ods_order_idx" ON "projects_blocks_ods" USING btree ("_order");
  CREATE INDEX "projects_blocks_ods_parent_id_idx" ON "projects_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_ods_path_idx" ON "projects_blocks_ods" USING btree ("_path");
  CREATE INDEX "projects_blocks_ods_locale_idx" ON "projects_blocks_ods" USING btree ("_locale");
  CREATE INDEX "projects_publications_order_idx" ON "projects_publications" USING btree ("_order");
  CREATE INDEX "projects_publications_parent_id_idx" ON "projects_publications" USING btree ("_parent_id");
  CREATE INDEX "projects_publications_cover_idx" ON "projects_publications" USING btree ("cover_id");
  CREATE UNIQUE INDEX "projects_publications_locales_locale_parent_id_unique" ON "projects_publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_video_idx" ON "projects" USING btree ("video_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_created_by_idx" ON "projects" USING btree ("created_by_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_locale_idx" ON "projects_rels" USING btree ("locale");
  CREATE INDEX "projects_rels_partners_id_idx" ON "projects_rels" USING btree ("partners_id","locale");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id","locale");
  CREATE INDEX "projects_rels_pages_id_idx" ON "projects_rels" USING btree ("pages_id","locale");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id","locale");
  CREATE INDEX "projects_rels_news_id_idx" ON "projects_rels" USING btree ("news_id","locale");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id","locale");
  CREATE INDEX "_projects_v_version_ods_order_idx" ON "_projects_v_version_ods" USING btree ("order");
  CREATE INDEX "_projects_v_version_ods_parent_idx" ON "_projects_v_version_ods" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_highlights_order_idx" ON "_projects_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_projects_v_version_highlights_parent_id_idx" ON "_projects_v_version_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_highlights_locales_locale_parent_id_uniq" ON "_projects_v_version_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_content_order_idx" ON "_projects_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_content_parent_id_idx" ON "_projects_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_content_path_idx" ON "_projects_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_content_locale_idx" ON "_projects_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_media_text_links_order_idx" ON "_projects_v_blocks_media_text_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_media_text_links_parent_id_idx" ON "_projects_v_blocks_media_text_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_text_links_locale_idx" ON "_projects_v_blocks_media_text_links" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_media_text_order_idx" ON "_projects_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_media_text_parent_id_idx" ON "_projects_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_media_text_path_idx" ON "_projects_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_media_text_locale_idx" ON "_projects_v_blocks_media_text" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_media_text_media_idx" ON "_projects_v_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "_projects_v_blocks_statement_links_order_idx" ON "_projects_v_blocks_statement_links" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_statement_links_parent_id_idx" ON "_projects_v_blocks_statement_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_statement_links_locale_idx" ON "_projects_v_blocks_statement_links" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_statement_order_idx" ON "_projects_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_statement_parent_id_idx" ON "_projects_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_statement_path_idx" ON "_projects_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_statement_locale_idx" ON "_projects_v_blocks_statement" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_items_locale_idx" ON "_projects_v_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_stats_locale_idx" ON "_projects_v_blocks_stats" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_gallery_locale_idx" ON "_projects_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_video_order_idx" ON "_projects_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_video_parent_id_idx" ON "_projects_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_path_idx" ON "_projects_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_locale_idx" ON "_projects_v_blocks_video" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_video_file_idx" ON "_projects_v_blocks_video" USING btree ("file_id");
  CREATE INDEX "_projects_v_blocks_video_poster_idx" ON "_projects_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_projects_v_blocks_timeline_items_order_idx" ON "_projects_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_timeline_items_parent_id_idx" ON "_projects_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_timeline_items_locale_idx" ON "_projects_v_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_timeline_order_idx" ON "_projects_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_timeline_parent_id_idx" ON "_projects_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_timeline_path_idx" ON "_projects_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_timeline_locale_idx" ON "_projects_v_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_testimonials_items_order_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_items_parent_id_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_items_locale_idx" ON "_projects_v_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_testimonials_order_idx" ON "_projects_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_parent_id_idx" ON "_projects_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_path_idx" ON "_projects_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_testimonials_locale_idx" ON "_projects_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_projects_v_blocks_ods_goals_order_idx" ON "_projects_v_blocks_ods_goals" USING btree ("order");
  CREATE INDEX "_projects_v_blocks_ods_goals_parent_idx" ON "_projects_v_blocks_ods_goals" USING btree ("parent_id");
  CREATE INDEX "_projects_v_blocks_ods_goals_locale_idx" ON "_projects_v_blocks_ods_goals" USING btree ("locale");
  CREATE INDEX "_projects_v_blocks_ods_order_idx" ON "_projects_v_blocks_ods" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_ods_parent_id_idx" ON "_projects_v_blocks_ods" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_ods_path_idx" ON "_projects_v_blocks_ods" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_ods_locale_idx" ON "_projects_v_blocks_ods" USING btree ("_locale");
  CREATE INDEX "_projects_v_version_publications_order_idx" ON "_projects_v_version_publications" USING btree ("_order");
  CREATE INDEX "_projects_v_version_publications_parent_id_idx" ON "_projects_v_version_publications" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_publications_cover_idx" ON "_projects_v_version_publications" USING btree ("cover_id");
  CREATE UNIQUE INDEX "_projects_v_version_publications_locales_locale_parent_id_un" ON "_projects_v_version_publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_video_idx" ON "_projects_v" USING btree ("version_video_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_created_by_idx" ON "_projects_v" USING btree ("version_created_by_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_locale_idx" ON "_projects_v_rels" USING btree ("locale");
  CREATE INDEX "_projects_v_rels_partners_id_idx" ON "_projects_v_rels" USING btree ("partners_id","locale");
  CREATE INDEX "_projects_v_rels_services_id_idx" ON "_projects_v_rels" USING btree ("services_id","locale");
  CREATE INDEX "_projects_v_rels_pages_id_idx" ON "_projects_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id","locale");
  CREATE INDEX "_projects_v_rels_news_id_idx" ON "_projects_v_rels" USING btree ("news_id","locale");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id","locale");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_created_by_idx" ON "news" USING btree ("created_by_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "news_meta_meta_image_idx" ON "news_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_projects_id_idx" ON "news_rels" USING btree ("projects_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_created_by_idx" ON "_news_v" USING btree ("version_created_by_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE INDEX "_news_v_version_meta_version_meta_image_idx" ON "_news_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_projects_id_idx" ON "_news_v_rels" USING btree ("projects_id");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "jobs" USING btree ("slug");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "jobs__status_idx" ON "jobs" USING btree ("_status");
  CREATE INDEX "jobs_meta_meta_image_idx" ON "jobs_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "jobs_locales_locale_parent_id_unique" ON "jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_jobs_v_parent_idx" ON "_jobs_v" USING btree ("parent_id");
  CREATE INDEX "_jobs_v_version_version_slug_idx" ON "_jobs_v" USING btree ("version_slug");
  CREATE INDEX "_jobs_v_version_version_updated_at_idx" ON "_jobs_v" USING btree ("version_updated_at");
  CREATE INDEX "_jobs_v_version_version_created_at_idx" ON "_jobs_v" USING btree ("version_created_at");
  CREATE INDEX "_jobs_v_version_version__status_idx" ON "_jobs_v" USING btree ("version__status");
  CREATE INDEX "_jobs_v_created_at_idx" ON "_jobs_v" USING btree ("created_at");
  CREATE INDEX "_jobs_v_updated_at_idx" ON "_jobs_v" USING btree ("updated_at");
  CREATE INDEX "_jobs_v_snapshot_idx" ON "_jobs_v" USING btree ("snapshot");
  CREATE INDEX "_jobs_v_published_locale_idx" ON "_jobs_v" USING btree ("published_locale");
  CREATE INDEX "_jobs_v_latest_idx" ON "_jobs_v" USING btree ("latest");
  CREATE INDEX "_jobs_v_autosave_idx" ON "_jobs_v" USING btree ("autosave");
  CREATE INDEX "_jobs_v_version_meta_version_meta_image_idx" ON "_jobs_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_jobs_v_locales_locale_parent_id_unique" ON "_jobs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_locales_locale_parent_id_unique" ON "team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "media_legacy_url_idx" ON "media" USING btree ("legacy_url");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_wide_sizes_wide_filename_idx" ON "media" USING btree ("sizes_wide_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "documents_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
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
  CREATE UNIQUE INDEX "navigation_items_locales_locale_parent_id_unique" ON "navigation_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_rels_order_idx" ON "navigation_rels" USING btree ("order");
  CREATE INDEX "navigation_rels_parent_idx" ON "navigation_rels" USING btree ("parent_id");
  CREATE INDEX "navigation_rels_path_idx" ON "navigation_rels" USING btree ("path");
  CREATE INDEX "navigation_rels_pages_id_idx" ON "navigation_rels" USING btree ("pages_id");
  CREATE INDEX "navigation_rels_projects_id_idx" ON "navigation_rels" USING btree ("projects_id");
  CREATE INDEX "navigation_rels_services_id_idx" ON "navigation_rels" USING btree ("services_id");
  CREATE INDEX "navigation_rels_news_id_idx" ON "navigation_rels" USING btree ("news_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_legal_links_locales_locale_parent_id_unique" ON "footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
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
  CREATE UNIQUE INDEX "contact_form_subjects_locales_locale_parent_id_unique" ON "contact_form_subjects_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_locales_locale_parent_id_unique" ON "contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "social_profiles_order_idx" ON "social_profiles" USING btree ("_order");
  CREATE INDEX "social_profiles_parent_id_idx" ON "social_profiles" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
  CREATE INDEX "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
  CREATE INDEX "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
  CREATE INDEX "site_settings_rels_pages_id_idx" ON "site_settings_rels" USING btree ("pages_id");
  CREATE INDEX "site_settings_rels_projects_id_idx" ON "site_settings_rels" USING btree ("projects_id");
  CREATE INDEX "site_settings_rels_services_id_idx" ON "site_settings_rels" USING btree ("services_id");
  CREATE INDEX "site_settings_rels_news_id_idx" ON "site_settings_rels" USING btree ("news_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_statement_links" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_text_links" CASCADE;
  DROP TABLE "pages_blocks_media_text" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "pages_blocks_projects" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_partners" CASCADE;
  DROP TABLE "pages_blocks_ods_goals" CASCADE;
  DROP TABLE "pages_blocks_ods" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_downloads" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_map" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_links" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text_links" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_partners" CASCADE;
  DROP TABLE "_pages_v_blocks_ods_goals" CASCADE;
  DROP TABLE "_pages_v_blocks_ods" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_downloads" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_map" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_deliverables_locales" CASCADE;
  DROP TABLE "services_blocks_hero_links" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_statement_links" CASCADE;
  DROP TABLE "services_blocks_statement" CASCADE;
  DROP TABLE "services_blocks_content" CASCADE;
  DROP TABLE "services_blocks_media_text_links" CASCADE;
  DROP TABLE "services_blocks_media_text" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_timeline_items" CASCADE;
  DROP TABLE "services_blocks_timeline" CASCADE;
  DROP TABLE "services_blocks_gallery" CASCADE;
  DROP TABLE "services_blocks_video" CASCADE;
  DROP TABLE "services_blocks_projects" CASCADE;
  DROP TABLE "services_blocks_services" CASCADE;
  DROP TABLE "services_blocks_testimonials_items" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_partners" CASCADE;
  DROP TABLE "services_blocks_ods_goals" CASCADE;
  DROP TABLE "services_blocks_ods" CASCADE;
  DROP TABLE "services_blocks_team" CASCADE;
  DROP TABLE "services_blocks_downloads" CASCADE;
  DROP TABLE "services_blocks_faq_items" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_map" CASCADE;
  DROP TABLE "services_blocks_contact_form" CASCADE;
  DROP TABLE "services_blocks_cta_links" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_deliverables" CASCADE;
  DROP TABLE "_services_v_version_deliverables_locales" CASCADE;
  DROP TABLE "_services_v_blocks_hero_links" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_statement_links" CASCADE;
  DROP TABLE "_services_v_blocks_statement" CASCADE;
  DROP TABLE "_services_v_blocks_content" CASCADE;
  DROP TABLE "_services_v_blocks_media_text_links" CASCADE;
  DROP TABLE "_services_v_blocks_media_text" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_services_v_blocks_timeline" CASCADE;
  DROP TABLE "_services_v_blocks_gallery" CASCADE;
  DROP TABLE "_services_v_blocks_video" CASCADE;
  DROP TABLE "_services_v_blocks_projects" CASCADE;
  DROP TABLE "_services_v_blocks_services" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_partners" CASCADE;
  DROP TABLE "_services_v_blocks_ods_goals" CASCADE;
  DROP TABLE "_services_v_blocks_ods" CASCADE;
  DROP TABLE "_services_v_blocks_team" CASCADE;
  DROP TABLE "_services_v_blocks_downloads" CASCADE;
  DROP TABLE "_services_v_blocks_faq_items" CASCADE;
  DROP TABLE "_services_v_blocks_faq" CASCADE;
  DROP TABLE "_services_v_blocks_map" CASCADE;
  DROP TABLE "_services_v_blocks_contact_form" CASCADE;
  DROP TABLE "_services_v_blocks_cta_links" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "projects_ods" CASCADE;
  DROP TABLE "projects_highlights" CASCADE;
  DROP TABLE "projects_highlights_locales" CASCADE;
  DROP TABLE "projects_blocks_content" CASCADE;
  DROP TABLE "projects_blocks_media_text_links" CASCADE;
  DROP TABLE "projects_blocks_media_text" CASCADE;
  DROP TABLE "projects_blocks_statement_links" CASCADE;
  DROP TABLE "projects_blocks_statement" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_video" CASCADE;
  DROP TABLE "projects_blocks_timeline_items" CASCADE;
  DROP TABLE "projects_blocks_timeline" CASCADE;
  DROP TABLE "projects_blocks_testimonials_items" CASCADE;
  DROP TABLE "projects_blocks_testimonials" CASCADE;
  DROP TABLE "projects_blocks_ods_goals" CASCADE;
  DROP TABLE "projects_blocks_ods" CASCADE;
  DROP TABLE "projects_publications" CASCADE;
  DROP TABLE "projects_publications_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_ods" CASCADE;
  DROP TABLE "_projects_v_version_highlights" CASCADE;
  DROP TABLE "_projects_v_version_highlights_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_content" CASCADE;
  DROP TABLE "_projects_v_blocks_media_text_links" CASCADE;
  DROP TABLE "_projects_v_blocks_media_text" CASCADE;
  DROP TABLE "_projects_v_blocks_statement_links" CASCADE;
  DROP TABLE "_projects_v_blocks_statement" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items" CASCADE;
  DROP TABLE "_projects_v_blocks_stats" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_video" CASCADE;
  DROP TABLE "_projects_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_projects_v_blocks_timeline" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials" CASCADE;
  DROP TABLE "_projects_v_blocks_ods_goals" CASCADE;
  DROP TABLE "_projects_v_blocks_ods" CASCADE;
  DROP TABLE "_projects_v_version_publications" CASCADE;
  DROP TABLE "_projects_v_version_publications_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_locales" CASCADE;
  DROP TABLE "_jobs_v" CASCADE;
  DROP TABLE "_jobs_v_locales" CASCADE;
  DROP TABLE "team" CASCADE;
  DROP TABLE "team_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_locales" CASCADE;
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
  DROP TABLE "navigation_items_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "navigation_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_legal_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "contact_phones" CASCADE;
  DROP TABLE "contact_form_subjects" CASCADE;
  DROP TABLE "contact_form_subjects_locales" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;
  DROP TABLE "social_profiles" CASCADE;
  DROP TABLE "social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "site_settings_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_links_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_statement_links_type";
  DROP TYPE "public"."enum_pages_blocks_statement_links_appearance";
  DROP TYPE "public"."enum_pages_blocks_statement_tone";
  DROP TYPE "public"."enum_pages_blocks_content_layout";
  DROP TYPE "public"."enum_pages_blocks_content_tone";
  DROP TYPE "public"."enum_pages_blocks_media_text_links_type";
  DROP TYPE "public"."enum_pages_blocks_media_text_links_appearance";
  DROP TYPE "public"."enum_pages_blocks_media_text_media_position";
  DROP TYPE "public"."enum_pages_blocks_media_text_tone";
  DROP TYPE "public"."enum_pages_blocks_stats_tone";
  DROP TYPE "public"."enum_pages_blocks_timeline_tone";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_tone";
  DROP TYPE "public"."enum_pages_blocks_video_source";
  DROP TYPE "public"."enum_pages_blocks_video_tone";
  DROP TYPE "public"."enum_pages_blocks_projects_mode";
  DROP TYPE "public"."enum_pages_blocks_projects_tone";
  DROP TYPE "public"."enum_pages_blocks_services_tone";
  DROP TYPE "public"."enum_pages_blocks_testimonials_tone";
  DROP TYPE "public"."enum_pages_blocks_partners_tone";
  DROP TYPE "public"."enum_pages_blocks_ods_goals";
  DROP TYPE "public"."enum_pages_blocks_ods_tone";
  DROP TYPE "public"."enum_pages_blocks_team_tone";
  DROP TYPE "public"."enum_pages_blocks_downloads_tone";
  DROP TYPE "public"."enum_pages_blocks_faq_tone";
  DROP TYPE "public"."enum_pages_blocks_map_tone";
  DROP TYPE "public"."enum_pages_blocks_contact_form_tone";
  DROP TYPE "public"."enum_pages_blocks_cta_links_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_statement_links_type";
  DROP TYPE "public"."enum__pages_v_blocks_statement_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_statement_tone";
  DROP TYPE "public"."enum__pages_v_blocks_content_layout";
  DROP TYPE "public"."enum__pages_v_blocks_content_tone";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_links_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_tone";
  DROP TYPE "public"."enum__pages_v_blocks_stats_tone";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_tone";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_tone";
  DROP TYPE "public"."enum__pages_v_blocks_video_source";
  DROP TYPE "public"."enum__pages_v_blocks_video_tone";
  DROP TYPE "public"."enum__pages_v_blocks_projects_mode";
  DROP TYPE "public"."enum__pages_v_blocks_projects_tone";
  DROP TYPE "public"."enum__pages_v_blocks_services_tone";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_tone";
  DROP TYPE "public"."enum__pages_v_blocks_partners_tone";
  DROP TYPE "public"."enum__pages_v_blocks_ods_goals";
  DROP TYPE "public"."enum__pages_v_blocks_ods_tone";
  DROP TYPE "public"."enum__pages_v_blocks_team_tone";
  DROP TYPE "public"."enum__pages_v_blocks_downloads_tone";
  DROP TYPE "public"."enum__pages_v_blocks_faq_tone";
  DROP TYPE "public"."enum__pages_v_blocks_map_tone";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_tone";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_services_blocks_hero_links_type";
  DROP TYPE "public"."enum_services_blocks_hero_links_appearance";
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  DROP TYPE "public"."enum_services_blocks_statement_links_type";
  DROP TYPE "public"."enum_services_blocks_statement_links_appearance";
  DROP TYPE "public"."enum_services_blocks_statement_tone";
  DROP TYPE "public"."enum_services_blocks_content_layout";
  DROP TYPE "public"."enum_services_blocks_content_tone";
  DROP TYPE "public"."enum_services_blocks_media_text_links_type";
  DROP TYPE "public"."enum_services_blocks_media_text_links_appearance";
  DROP TYPE "public"."enum_services_blocks_media_text_media_position";
  DROP TYPE "public"."enum_services_blocks_media_text_tone";
  DROP TYPE "public"."enum_services_blocks_stats_tone";
  DROP TYPE "public"."enum_services_blocks_timeline_tone";
  DROP TYPE "public"."enum_services_blocks_gallery_layout";
  DROP TYPE "public"."enum_services_blocks_gallery_tone";
  DROP TYPE "public"."enum_services_blocks_video_source";
  DROP TYPE "public"."enum_services_blocks_video_tone";
  DROP TYPE "public"."enum_services_blocks_projects_mode";
  DROP TYPE "public"."enum_services_blocks_projects_tone";
  DROP TYPE "public"."enum_services_blocks_services_tone";
  DROP TYPE "public"."enum_services_blocks_testimonials_tone";
  DROP TYPE "public"."enum_services_blocks_partners_tone";
  DROP TYPE "public"."enum_services_blocks_ods_goals";
  DROP TYPE "public"."enum_services_blocks_ods_tone";
  DROP TYPE "public"."enum_services_blocks_team_tone";
  DROP TYPE "public"."enum_services_blocks_downloads_tone";
  DROP TYPE "public"."enum_services_blocks_faq_tone";
  DROP TYPE "public"."enum_services_blocks_map_tone";
  DROP TYPE "public"."enum_services_blocks_contact_form_tone";
  DROP TYPE "public"."enum_services_blocks_cta_links_type";
  DROP TYPE "public"."enum_services_blocks_cta_links_appearance";
  DROP TYPE "public"."enum_services_blocks_cta_tone";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_hero_links_type";
  DROP TYPE "public"."enum__services_v_blocks_hero_links_appearance";
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  DROP TYPE "public"."enum__services_v_blocks_statement_links_type";
  DROP TYPE "public"."enum__services_v_blocks_statement_links_appearance";
  DROP TYPE "public"."enum__services_v_blocks_statement_tone";
  DROP TYPE "public"."enum__services_v_blocks_content_layout";
  DROP TYPE "public"."enum__services_v_blocks_content_tone";
  DROP TYPE "public"."enum__services_v_blocks_media_text_links_type";
  DROP TYPE "public"."enum__services_v_blocks_media_text_links_appearance";
  DROP TYPE "public"."enum__services_v_blocks_media_text_media_position";
  DROP TYPE "public"."enum__services_v_blocks_media_text_tone";
  DROP TYPE "public"."enum__services_v_blocks_stats_tone";
  DROP TYPE "public"."enum__services_v_blocks_timeline_tone";
  DROP TYPE "public"."enum__services_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__services_v_blocks_gallery_tone";
  DROP TYPE "public"."enum__services_v_blocks_video_source";
  DROP TYPE "public"."enum__services_v_blocks_video_tone";
  DROP TYPE "public"."enum__services_v_blocks_projects_mode";
  DROP TYPE "public"."enum__services_v_blocks_projects_tone";
  DROP TYPE "public"."enum__services_v_blocks_services_tone";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_tone";
  DROP TYPE "public"."enum__services_v_blocks_partners_tone";
  DROP TYPE "public"."enum__services_v_blocks_ods_goals";
  DROP TYPE "public"."enum__services_v_blocks_ods_tone";
  DROP TYPE "public"."enum__services_v_blocks_team_tone";
  DROP TYPE "public"."enum__services_v_blocks_downloads_tone";
  DROP TYPE "public"."enum__services_v_blocks_faq_tone";
  DROP TYPE "public"."enum__services_v_blocks_map_tone";
  DROP TYPE "public"."enum__services_v_blocks_contact_form_tone";
  DROP TYPE "public"."enum__services_v_blocks_cta_links_type";
  DROP TYPE "public"."enum__services_v_blocks_cta_links_appearance";
  DROP TYPE "public"."enum__services_v_blocks_cta_tone";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_projects_ods";
  DROP TYPE "public"."enum_projects_blocks_content_layout";
  DROP TYPE "public"."enum_projects_blocks_content_tone";
  DROP TYPE "public"."enum_projects_blocks_media_text_links_type";
  DROP TYPE "public"."enum_projects_blocks_media_text_links_appearance";
  DROP TYPE "public"."enum_projects_blocks_media_text_media_position";
  DROP TYPE "public"."enum_projects_blocks_media_text_tone";
  DROP TYPE "public"."enum_projects_blocks_statement_links_type";
  DROP TYPE "public"."enum_projects_blocks_statement_links_appearance";
  DROP TYPE "public"."enum_projects_blocks_statement_tone";
  DROP TYPE "public"."enum_projects_blocks_stats_tone";
  DROP TYPE "public"."enum_projects_blocks_gallery_layout";
  DROP TYPE "public"."enum_projects_blocks_gallery_tone";
  DROP TYPE "public"."enum_projects_blocks_video_source";
  DROP TYPE "public"."enum_projects_blocks_video_tone";
  DROP TYPE "public"."enum_projects_blocks_timeline_tone";
  DROP TYPE "public"."enum_projects_blocks_testimonials_tone";
  DROP TYPE "public"."enum_projects_blocks_ods_goals";
  DROP TYPE "public"."enum_projects_blocks_ods_tone";
  DROP TYPE "public"."enum_projects_accent";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_ods";
  DROP TYPE "public"."enum__projects_v_blocks_content_layout";
  DROP TYPE "public"."enum__projects_v_blocks_content_tone";
  DROP TYPE "public"."enum__projects_v_blocks_media_text_links_type";
  DROP TYPE "public"."enum__projects_v_blocks_media_text_links_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_media_text_media_position";
  DROP TYPE "public"."enum__projects_v_blocks_media_text_tone";
  DROP TYPE "public"."enum__projects_v_blocks_statement_links_type";
  DROP TYPE "public"."enum__projects_v_blocks_statement_links_appearance";
  DROP TYPE "public"."enum__projects_v_blocks_statement_tone";
  DROP TYPE "public"."enum__projects_v_blocks_stats_tone";
  DROP TYPE "public"."enum__projects_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__projects_v_blocks_gallery_tone";
  DROP TYPE "public"."enum__projects_v_blocks_video_source";
  DROP TYPE "public"."enum__projects_v_blocks_video_tone";
  DROP TYPE "public"."enum__projects_v_blocks_timeline_tone";
  DROP TYPE "public"."enum__projects_v_blocks_testimonials_tone";
  DROP TYPE "public"."enum__projects_v_blocks_ods_goals";
  DROP TYPE "public"."enum__projects_v_blocks_ods_tone";
  DROP TYPE "public"."enum__projects_v_version_accent";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_jobs_type";
  DROP TYPE "public"."enum_jobs_opening";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum__jobs_v_version_type";
  DROP TYPE "public"."enum__jobs_v_version_opening";
  DROP TYPE "public"."enum__jobs_v_version_status";
  DROP TYPE "public"."enum__jobs_v_published_locale";
  DROP TYPE "public"."enum_partners_kind";
  DROP TYPE "public"."enum_documents_category";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_navigation_items_type";
  DROP TYPE "public"."enum_navigation_cta_type";
  DROP TYPE "public"."enum_footer_columns_links_type";
  DROP TYPE "public"."enum_footer_legal_links_type";
  DROP TYPE "public"."enum_social_profiles_network";
  DROP TYPE "public"."enum_site_settings_announcement_link_type";`)
}
