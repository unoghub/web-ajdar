import { client } from "@/lib/orpc.server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageTemplate } from "../../_components/PageTemplate";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const statusLabels = {
  draft: "Taslak",
  published: "Yayında",
  archived: "Arşivlendi",
} as const;

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeZone: "Europe/Istanbul",
});

export async function NewsListSection() {
  const news = await client.newsRouter.list();
  news.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <PageTemplate
      title="Bülten"
      description="Tüm bültenlerin listesi"
      action={
        <Link href="/dashboard/news/create">
          <Button>Yeni bülten</Button>
        </Link>
      }
    >
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Oluşturulma</TableHead>
              <TableHead>Yayınlanma</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                  Henüz bülten eklenmemiş.
                </TableCell>
              </TableRow>
            ) : (
              news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="min-w-64 max-w-xl">
                    <Link
                      href={`/dashboard/news/${encodeURIComponent(item.slug)}/edit`}
                      className="font-medium hover:underline"
                    >
                      {item.title}
                    </Link>
                    {item.summary && (
                      <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {item.summary}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{statusLabels[item.status]}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {dateFormatter.format(item.createdAt)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.publishedAt ? dateFormatter.format(item.publishedAt) : "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </PageTemplate>
  );
}
