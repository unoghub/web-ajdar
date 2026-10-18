import { db } from "@/db";
import { news } from "@/db/schema";
import { os } from "@orpc/server";
import { eq } from "drizzle-orm";
import * as v from "valibot";

export const newsRouter = {
  list: os.handler(async () => {
    const list = await db.select().from(news);

    return list;
  }),

  get: os.input(v.string()).handler(async ({ input }) => {
    const entry = await db.select().from(news).where(eq(news.slug, input));

    return entry;
  }),
};
