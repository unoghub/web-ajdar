import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const newsStatus = pgEnum("news_status", [
  "draft",
  "published",
  "archived",
]);

export const news = pgTable(
  "news",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    summary: text("summary"),
    content: text("content").notNull(),
    coverImageUrl: text("coverImageUrl"),
    coverImageAlt: text("coverImageAlt"),
    status: newsStatus("status").notNull().default("draft"),
    publishedAt: timestamp("publishedAt", { withTimezone: true }),
    authorId: text("authorId").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("news_status_publishedAt_idx").on(
      table.status,
      table.publishedAt.desc(),
    ),
    index("news_authorId_idx").on(table.authorId),
  ],
);
