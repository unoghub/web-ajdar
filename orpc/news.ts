import { db } from "@/db";
import { news } from "@/db/schema";
import { auth } from "@/lib/auth";
import { ORPCError, os } from "@orpc/server";
import { and, desc, eq } from "drizzle-orm";
import * as v from "valibot";

const procedure = os.$context<{ headers: Headers }>();

const titleSchema = v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(200));
const slugSchema = v.pipe(
  v.string(),
  v.trim(),
  v.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  v.maxLength(200),
);
const contentSchema = v.object({
  type: v.literal("doc"),
  content: v.array(v.unknown()),
});
const statusSchema = v.picklist(["draft", "published", "archived"]);
const summarySchema = v.nullable(v.pipe(v.string(), v.trim(), v.maxLength(1000)));
const coverImageUrlSchema = v.nullable(v.pipe(v.string(), v.url()));
const coverImageAltSchema = v.nullable(v.pipe(v.string(), v.trim(), v.maxLength(300)));

const createNewsSchema = v.object({
  title: titleSchema,
  slug: slugSchema,
  content: contentSchema,
  summary: v.optional(summarySchema),
  coverImageUrl: v.optional(coverImageUrlSchema),
  coverImageAlt: v.optional(coverImageAltSchema),
  status: v.optional(statusSchema),
});

const updateNewsSchema = v.object({
  id: v.pipe(v.string(), v.uuid()),
  title: v.optional(titleSchema),
  slug: v.optional(slugSchema),
  content: v.optional(contentSchema),
  summary: v.optional(summarySchema),
  coverImageUrl: v.optional(coverImageUrlSchema),
  coverImageAlt: v.optional(coverImageAltSchema),
  status: v.optional(statusSchema),
});

async function requireUserId(requestHeaders: Headers) {
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session?.user) {
    throw new ORPCError("UNAUTHORIZED", { message: "Oturum açmanız gerekiyor." });
  }
  return session.user.id;
}

function serializeContent(content: v.InferOutput<typeof contentSchema>) {
  const serialized = JSON.stringify(content);
  if (serialized.length > 200_000) {
    throw new ORPCError("BAD_REQUEST", { message: "Haber içeriği çok uzun." });
  }
  return serialized;
}

function rethrowSlugConflict(error: unknown): never {
  if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
    throw new ORPCError("CONFLICT", { message: "Bu URL kısa adı zaten kullanılıyor." });
  }
  throw error;
}

export const newsRouter = {
  list: procedure.handler(async ({ context }) => {
    await requireUserId(context.headers);
    const list = await db.select().from(news);

    return list;
  }),

  get: procedure.input(v.string()).handler(async ({ input, context }) => {
    await requireUserId(context.headers);
    const entry = await db.select().from(news).where(eq(news.slug, input));

    return entry;
  }),

  listPublished: procedure.handler(async () => {
    return db
      .select({
        id: news.id,
        title: news.title,
        slug: news.slug,
        summary: news.summary,
        coverImageUrl: news.coverImageUrl,
        coverImageAlt: news.coverImageAlt,
        publishedAt: news.publishedAt,
      })
      .from(news)
      .where(eq(news.status, "published"))
      .orderBy(desc(news.publishedAt));
  }),

  getPublished: procedure.input(v.string()).handler(async ({ input }) => {
    const [entry] = await db
      .select({
        title: news.title,
        slug: news.slug,
        summary: news.summary,
        content: news.content,
        coverImageUrl: news.coverImageUrl,
        coverImageAlt: news.coverImageAlt,
        publishedAt: news.publishedAt,
      })
      .from(news)
      .where(and(eq(news.slug, input), eq(news.status, "published")))
      .limit(1);

    return entry ?? null;
  }),

  create: procedure.input(createNewsSchema).handler(async ({ input, context }) => {
    const authorId = await requireUserId(context.headers);
    const status = input.status ?? "draft";

    try {
      const [created] = await db
        .insert(news)
        .values({
          title: input.title,
          slug: input.slug,
          content: serializeContent(input.content),
          summary: input.summary,
          coverImageUrl: input.coverImageUrl,
          coverImageAlt: input.coverImageAlt,
          status,
          publishedAt: status === "published" ? new Date() : null,
          authorId,
        })
        .returning();

      return created;
    } catch (error) {
      rethrowSlugConflict(error);
    }
  }),

  update: procedure.input(updateNewsSchema).handler(async ({ input, context }) => {
    await requireUserId(context.headers);
    const { id, ...changes } = input;
    if (Object.values(changes).every((value) => value === undefined)) {
      throw new ORPCError("BAD_REQUEST", { message: "Güncellenecek alan belirtilmedi." });
    }

    const [current] = await db.select().from(news).where(eq(news.id, id)).limit(1);
    if (!current) {
      throw new ORPCError("NOT_FOUND", { message: "Haber bulunamadı." });
    }

    const publishedAt =
      changes.status === "published"
        ? (current.publishedAt ?? new Date())
        : changes.status === "draft"
          ? null
          : current.publishedAt;

    try {
      const [updated] = await db
        .update(news)
        .set({
          ...changes,
          content: changes.content === undefined ? undefined : serializeContent(changes.content),
          publishedAt,
          updatedAt: new Date(),
        })
        .where(eq(news.id, id))
        .returning();

      if (!updated) {
        throw new ORPCError("NOT_FOUND", { message: "Haber bulunamadı." });
      }
      return updated;
    } catch (error) {
      rethrowSlugConflict(error);
    }
  }),
};
