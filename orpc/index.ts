import { os } from "@orpc/server";

export const router = {
    healthCheck: os.handler(async () => {
        return "Healthy"
    })
}