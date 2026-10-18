import { os } from "@orpc/server";
import { newsRouter } from "./news";

export const router = {
  newsRouter,
  healthCheck: os.handler(async () => {
    return "Healthy";
  }),
};
