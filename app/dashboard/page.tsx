import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "./_components/sign-out-button";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fdashboard");
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Signed in as {session.user.name || session.user.email}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOutButton />
    </main>
  );
}
