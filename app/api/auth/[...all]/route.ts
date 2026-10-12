import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth"

// The configured provider is server-owned; its mutation endpoints are unavailable.
const blocked = new Set([
  "/api/auth/sso/register",
  "/api/auth/sso/update-provider",
  "/api/auth/sso/delete-provider",
  "/api/auth/sso/request-domain-verification",
  "/api/auth/sso/verify-domain",
  "/api/auth/sign-in/email",
  "/api/auth/sign-up/email",
]);

async function handle(request: Request) {
  const pathname = new URL(request.url).pathname;

  if (blocked.has(pathname)) {
    return new Response("Not found", { status: 404 });
  }

  const handler = toNextJsHandler(auth);

  if (request.method === "GET") {
    return handler.GET(request);
  }

  return handler.POST(request);
}

export const GET = handle;
export const POST = handle;
