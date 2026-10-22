import { router } from "@/orpc";
import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";

export const client = createRouterClient(router, {
  context: async () => ({
    headers: await headers(),
  }),
});
