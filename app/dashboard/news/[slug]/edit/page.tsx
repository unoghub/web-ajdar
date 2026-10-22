import type { JSONContent } from "@tiptap/core";
import { notFound } from "next/navigation";
import { client } from "@/lib/orpc.server";
import { NewsUpsertSection } from "../../_components/NewsUpsertSection";

export default async function NewsEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [entry] = await client.newsRouter.get(slug);
  if (!entry) notFound();

  let content: JSONContent;
  try {
    content = JSON.parse(entry.content) as JSONContent;
  } catch {
    notFound();
  }
  if (content?.type !== "doc" || !Array.isArray(content.content)) notFound();

  return <NewsUpsertSection initialNews={{ ...entry, content }} />;
}
