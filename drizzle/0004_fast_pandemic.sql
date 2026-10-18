CREATE TYPE "public"."news_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"summary" text,
	"content" text NOT NULL,
	"coverImageUrl" text,
	"coverImageAlt" text,
	"status" "news_status" DEFAULT 'draft' NOT NULL,
	"publishedAt" timestamp with time zone,
	"authorId" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "news_status_publishedAt_idx" ON "news" USING btree ("status","publishedAt" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "news_authorId_idx" ON "news" USING btree ("authorId");