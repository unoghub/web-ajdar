"use client";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  async function signOut() {
    await authClient.signOut();
    window.location.assign("/");
  }

  return (
    <button
      type="button"
      className="mt-6 rounded-lg border px-4 py-2"
      onClick={signOut}
    >
      Sign out
    </button>
  );
}
