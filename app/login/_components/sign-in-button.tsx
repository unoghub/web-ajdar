"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function LoginButton({ callbackURL }: { callbackURL: string }) {
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function signIn() {
    setPending(true);
    setError(false);
    try {
      const result = await authClient.signIn.sso({
        providerId: process.env.NEXT_PUBLIC_AUTHENTIK_PROVIDER_ID || "authentik",
        callbackURL,
        errorCallbackURL: "/login?error=auth",
        scopes: ["openid", "profile", "email", "web-admin"],
      });
      if (result.error) setError(true);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={signIn}
        className="rounded-lg bg-[#0090C6] px-5 py-3 font-semibold text-white disabled:opacity-50"
      >
        Sign in with Authentik
      </button>
      {error && <p role="alert">Could not start sign in. Please try again.</p>}
    </>
  );
}
