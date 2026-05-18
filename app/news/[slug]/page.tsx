import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase";

export const revalidate = 300;
export const dynamicParams = true;

type Article = {
  id: string;
  title: string;
  summary: string;
  ai_summary: string | null;
  category: string;
  source: string;
  published_at: string;
  slug: string;
  url: string;
};

async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("id,title,summary,ai_summary,category,source,published_at,slug,url")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return null;
  return (data as Article) ?? null;
}

export async function generateStaticParams() {
  const { data } = await supabaseAdmin
    .from("articles")
    .select("slug")
    .order("published_at", { ascending: false })
    .limit(300);

  return (data ?? []).map((row) => ({ slug: row.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };

  const canonical = `https://naijaelectionwatch.vercel.app/news/${article.slug}`;

  return {
    title: article.title,
    description: article.ai_summary || article.summary,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.ai_summary || article.summary,
      url: canonical,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>
      <article>
        <h1>{article.title}</h1>
        <p><strong>Source:</strong> {article.source}</p>
        <p><strong>Published:</strong> {new Date(article.published_at).toLocaleString("en-NG")}</p>
        <p><strong>Category:</strong> {article.category}</p>
        <h2>Summary</h2>
        <p>{article.ai_summary || article.summary}</p>
        <p>
          Original: <a href={article.url} target="_blank" rel="noreferrer">{article.url}</a>
        </p>
      </article>
    </main>
  );
}
