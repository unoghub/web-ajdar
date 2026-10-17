CREATE TABLE "ssoProvider" (
	"id" text PRIMARY KEY NOT NULL,
	"issuer" text NOT NULL,
	"oidcConfig" text,
	"samlConfig" text,
	"userId" text,
	"providerId" text NOT NULL,
	"organizationId" text,
	"domain" text NOT NULL,
	CONSTRAINT "ssoProvider_providerId_unique" UNIQUE("providerId")
);
--> statement-breakpoint
ALTER TABLE "ssoProvider" ADD CONSTRAINT "ssoProvider_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
