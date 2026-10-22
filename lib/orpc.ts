import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { router } from "@/orpc";

const link = new RPCLink({
  url: "/rpc",
  origin: () => {
    if (typeof window === "undefined") {
      throw new Error("This link is not allowed on the server side.");
    }

    return window.location.origin;
  },
});

export const client: RouterClient<typeof router> = createORPCClient(link);
