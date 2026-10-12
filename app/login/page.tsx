import { safeDestination } from "@/lib/utils";
import { LoginButton } from "./_components/sign-in-button";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { callbackUrl, error } = await searchParams;
  const destination = safeDestination(
    typeof callbackUrl === "string" ? callbackUrl : undefined,
  );

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-start justify-center gap-6 px-6 py-16">
      <h1 className="text-3xl font-bold">Sign in</h1>
      {error && <p role="alert">Sign in failed. Please try again.</p>}
      <LoginButton callbackURL={destination} />
    </main>
  );
}
