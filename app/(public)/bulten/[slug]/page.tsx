import type { JSONContent } from "@tiptap/core";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { NewsContent } from "@/components/news-content";
import { client } from "@/lib/orpc.server";

type Props = { params: Promise<{ slug: string }> };

const getEntry = cache((slug: string) => client.newsRouter.getPublished(slug));

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeZone: "Europe/Istanbul",
});

function safeImageUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry(slug);
  if (!entry) return { title: "Bülten bulunamadı" };

  const image = safeImageUrl(entry.coverImageUrl);
  return {
    title: `${entry.title} | ÜNOG`,
    description: entry.summary ?? undefined,
    openGraph: {
      title: entry.title,
      description: entry.summary ?? undefined,
      type: "article",
      publishedTime: entry.publishedAt?.toISOString(),
      images: image ? [{ url: image, alt: entry.coverImageAlt || entry.title }] : undefined,
    },
  };
}

export default async function BulletinDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getEntry(slug);
  if (!entry) notFound();

  let content: JSONContent;
  try {
    content = JSON.parse(entry.content) as JSONContent;
  } catch {
    notFound();
  }
  if (content?.type !== "doc" || !Array.isArray(content.content)) notFound();

  const coverImageUrl = safeImageUrl(entry.coverImageUrl);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10 md:py-14">
      <Link
        href="/bulten"
        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Tüm bültenler
      </Link>
      <article className="mt-8">
        <header className="border-b border-border pb-8">
          {entry.publishedAt && (
            <time
              dateTime={entry.publishedAt.toISOString()}
              className="text-sm text-muted-foreground"
            >
              {dateFormatter.format(entry.publishedAt)}
            </time>
          )}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{entry.title}</h1>
          {entry.summary && <p className="mt-4 text-lg text-muted-foreground">{entry.summary}</p>}
        </header>

        {coverImageUrl && (
          <figure className="mt-8 overflow-hidden rounded-xl">
            <img
              src={coverImageUrl}
              alt={entry.coverImageAlt || entry.title}
              className="h-auto w-full object-cover"
            />
          </figure>
        )}

        <div className="typeset typeset-article mx-auto mt-10">
          <NewsContent content={content} />
        </div>
      </article>
    </main>
  );
}
