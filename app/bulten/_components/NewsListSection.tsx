import { client } from "@/lib/orpc";
import { EmptyNewsSection } from "./EmptyNewsSection";

export async function NewsListSection() {
    const news = await client.newsRouter.list();

    if (news.length <= 0) return <EmptyNewsSection />

    return (
        <div>
            {news.map((news) => (
                <div className="border border-amber-200 p-4 rounded-md">
                    <div>
                        <p>{news.title}</p>
                        <p>{news.summary}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}