import { client } from "@/lib/orpc.server";
import Link from "next/link";
import { EmptyNewsSection } from "./EmptyNewsSection";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeZone: "Europe/Istanbul",
});

export async function NewsListSection() {
  const entries = await client.newsRouter.listPublished();

  if (entries.length === 0) return <EmptyNewsSection />;

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 px-6 py-10 md:py-14">
      <h1 className="mb-2 text-3xl font-semibold">Bültenler</h1>
      {entries.map((entry) => (
        <article key={entry.id} className="rounded-xl border border-border bg-background p-6">
          {entry.publishedAt && (
            <time
              dateTime={entry.publishedAt.toISOString()}
              className="text-sm text-muted-foreground"
            >
              {dateFormatter.format(entry.publishedAt)}
            </time>
          )}
          <h2 className="mt-2 text-xl font-semibold">
            <Link href={`/bulten/${encodeURIComponent(entry.slug)}`} className="hover:underline">
              {entry.title}
            </Link>
          </h2>
          {entry.summary && <p className="mt-2 text-muted-foreground">{entry.summary}</p>}
        </article>
      ))}
    </div>
  );
}
