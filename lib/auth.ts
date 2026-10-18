import { betterAuth } from "better-auth";
import { sso } from "@better-auth/sso";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import * as schema from "@/db/schema";

export type WebAdminGroup = {
  name: string;
  oidcID: number;
};

export const auth = betterAuth({
  appName: "UNOG",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  user: {
    additionalFields: {
      webAdminGroups: {
        type: "json",
        required: false,
        input: false,
      },
    },
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL!, new URL(process.env.AUTHENTIK_ISSUER!).origin],
  plugins: [
    sso({
      provisionUserOnEveryLogin: true,
      provisionUser: async ({ user, userInfo }) => {
        const groups = userInfo.webAdminGroups as WebAdminGroup[];

        await db
          .update(schema.user)
          .set({ webAdminGroups: groups })
          .where(eq(schema.user.id, user.id));
      },
      defaultSSO: [
        {
          providerId: process.env.AUTHENTIK_PROVIDER_ID?.trim() || "authentik",
          domain: process.env.AUTHENTIK_EMAIL_DOMAIN!,
          oidcConfig: {
            issuer: new URL(process.env.AUTHENTIK_ISSUER!).href,
            discoveryEndpoint: `${process.env.AUTHENTIK_ISSUER!.replace(/\/$/, "")}/.well-known/openid-configuration`,
            clientId: process.env.AUTHENTIK_CLIENT_ID!,
            clientSecret: process.env.AUTHENTIK_CLIENT_SECRET,
            scopes: ["openid", "profile", "email", "web-admin"],
            pkce: true,
            mapping: {
              extraFields: {
                webAdminGroups: "web_admin_groups",
              },
            },
          },
        },
      ],
    }),
  ],
});
