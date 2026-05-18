import type { Metadata } from "next";
import Link from "next/link";
import NewsInteractive from "./NewsInteractive";
import { supabaseAdmin } from "@/app/lib/supabase";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Latest Nigerian Election News",
  description: "Server-rendered Nigerian election headlines and summaries from trusted monitored sources.",
  alternates: { canonical: "https://naijaelectionwatch.vercel.app/news" },
};

type Article = {
  id: string;
  title: string;
  summary: string;
  ai_summary: string | null;
  category: string;
  source: string;
  published_at: string;
  slug: string;
};

async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("id,title,summary,ai_summary,category,source,published_at,slug")
    .order("published_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("Failed to fetch news articles", error.message);
    return [];
  }

  return (data ?? []) as Article[];
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
      <h1>Latest Nigerian Election News</h1>
      <p>Server-rendered latest headlines and summaries from monitored sources.</p>

      <section>
        {articles.map((article) => (
          <article key={article.id} style={{ borderBottom: "1px solid #ddd", padding: "16px 0" }}>
            <h2 style={{ margin: "0 0 8px" }}>
              <Link href={`/news/${article.slug}`}>{article.title}</Link>
            </h2>
            <p style={{ margin: "0 0 8px" }}>{article.ai_summary || article.summary}</p>
            <p style={{ margin: 0, fontSize: 14, color: "#555" }}>
              {article.source} · {article.category} · {new Date(article.published_at).toLocaleDateString("en-NG")}
            </p>
          </article>
        ))}
      </section>

      <NewsInteractive articles={articles} />
    </main>
  );
}
