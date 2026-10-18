import { db } from "@/db";
import { news } from "@/db/schema";
import { os } from "@orpc/server";

export const newsRouter = {
  list: os.handler(async () => {
    const list = await db.select().from(news);

    return list;
  }),
};
