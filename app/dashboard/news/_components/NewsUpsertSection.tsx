"use client";

import type { JSONContent } from "@tiptap/core";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor } from "@/components/editor";
import { NewsContent } from "@/components/news-content";
import { client } from "@/lib/orpc";
import { PageTemplate } from "../../_components/PageTemplate";

type NewsStatus = "draft" | "published" | "archived";

export interface NewsFormEntry {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: JSONContent;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  status: NewsStatus;
}

const emptyDocument: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

function makeSlug(title: string) {
  return title
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function NewsUpsertSection({ initialNews }: { initialNews?: NewsFormEntry }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialNews?.title ?? "");
  const [slug, setSlug] = useState(initialNews?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(initialNews));
  const [summary, setSummary] = useState(initialNews?.summary ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialNews?.coverImageUrl ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(initialNews?.coverImageAlt ?? "");
  const [status, setStatus] = useState<NewsStatus>(initialNews?.status ?? "draft");
  const [content, setContent] = useState<JSONContent>(initialNews?.content ?? emptyDocument);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setError("");
    setSuccess("");

    if (content.type !== "doc" || !Array.isArray(content.content)) {
      setError("Geçerli bir haber içeriği girin.");
      return;
    }

    setSaving(true);
    try {
      const values = {
        title: title.trim(),
        slug: slug.trim(),
        summary: summary.trim() || null,
        coverImageUrl: coverImageUrl.trim() || null,
        coverImageAlt: coverImageAlt.trim() || null,
        content: { type: "doc" as const, content: content.content },
        status,
      };

      if (initialNews) {
        const updated = await client.newsRouter.update({ id: initialNews.id, ...values });
        setSuccess("Bülten kaydedildi.");
        if (updated.slug !== initialNews.slug) {
          router.replace(`/dashboard/news/${encodeURIComponent(updated.slug)}/edit`);
        }
      } else {
        const created = await client.newsRouter.create(values);
        router.replace(`/dashboard/news/${encodeURIComponent(created.slug)}/edit`);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Bülten kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageTemplate
      title={initialNews ? "Bülteni düzenle" : "Yeni bülten"}
      description="Bülten bilgilerini ve içeriğini düzenleyin."
      action={
        <Button type="submit" form="news-form" disabled={saving}>
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      }
    >
      <form id="news-form" onSubmit={save} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="news-title" className="text-sm font-medium">
              Başlık
            </label>
            <Input
              id="news-title"
              value={title}
              onChange={(event) => {
                const nextTitle = event.target.value;
                setTitle(nextTitle);
                if (!slugEdited) setSlug(makeSlug(nextTitle));
              }}
              maxLength={200}
              required
              disabled={saving}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="news-slug" className="text-sm font-medium">
              URL kısa adı
            </label>
            <Input
              id="news-slug"
              value={slug}
              onChange={(event) => {
                setSlug(event.target.value);
                setSlugEdited(true);
              }}
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              title="Küçük harf, rakam ve tire kullanın."
              maxLength={200}
              required
              disabled={saving}
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label htmlFor="news-summary" className="text-sm font-medium">
              Özet
            </label>
            <textarea
              id="news-summary"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              maxLength={1000}
              rows={3}
              disabled={saving}
              className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="news-cover-url" className="text-sm font-medium">
              Kapak görseli URL'si
            </label>
            <Input
              id="news-cover-url"
              type="url"
              value={coverImageUrl}
              onChange={(event) => setCoverImageUrl(event.target.value)}
              disabled={saving}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="news-cover-alt" className="text-sm font-medium">
              Kapak görseli açıklaması
            </label>
            <Input
              id="news-cover-alt"
              value={coverImageAlt}
              onChange={(event) => setCoverImageAlt(event.target.value)}
              maxLength={300}
              disabled={saving}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="news-status" className="text-sm font-medium">
              Durum
            </label>
            <select
              id="news-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as NewsStatus)}
              disabled={saving}
              className="h-9 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
              <option value="archived">Arşivlendi</option>
            </select>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="text-sm text-green-700">
            {success}
          </p>
        )}
      </form>

      <Tabs defaultValue="editor" className="mt-6">
        <TabsList>
          <TabsTrigger value="editor">Editör</TabsTrigger>
          <TabsTrigger value="preview">Önizleme</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <Editor value={content} onChange={setContent} disabled={saving} className="min-h-150" />
        </TabsContent>
        <TabsContent value="preview">
          <div className="typeset typeset-article mx-auto max-w-[37em]">
            <h1>{title || "Başlıksız bülten"}</h1>
            {summary && <p>{summary}</p>}
            <NewsContent content={content} />
          </div>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
}
