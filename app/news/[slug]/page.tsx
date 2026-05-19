import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase";
import ArticleInteractive from "./ArticleInteractive";

export const revalidate = 28800;
export const dynamicParams = true;

export type Article = {
  id: string;
  title: string;
  summary: string;
  ai_summary: string | null;
  category: string;
  source: string;
  author: string | null;
  published_at: string;
  icon: string;
  slug: string;
  url: string;
  image_url: string | null;
  ai_bias: string | null;
};

async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as Article;
}

async function getRelated(category: string, slug: string): Promise<Article[]> {
  const { data } = await supabaseAdmin
    .from("articles")
    .select("id,title,summary,ai_summary,category,source,author,published_at,icon,slug,url,image_url,ai_bias")
    .eq("category", category)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(3);
  return (data ?? []) as Article[];
}

async function getMoreStories(slug: string): Promise<Article[]> {
  const { data } = await supabaseAdmin
    .from("articles")
    .select("id,title,summary,ai_summary,category,source,author,published_at,icon,slug,url,image_url,ai_bias")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(5);
  return (data ?? []) as Article[];
}

export async function generateStaticParams() {
  const { data } = await supabaseAdmin
    .from("articles")
    .select("slug")
    .order("published_at", { ascending: false })
    .limit(300);
  return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };

  const canonical = `https://www.naijaelectionwatch.com/news/${article.slug}`;
  const description = article.ai_summary || article.summary;

  return {
    title: `${article.title} | Naija Election Watch`,
    description,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description,
      url: canonical,
      type: "article",
      publishedTime: article.published_at,
      authors: [article.author || article.source],
      ...(article.image_url && { images: [{ url: article.image_url, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      ...(article.image_url && { images: [article.image_url] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, moreStories] = await Promise.all([
    getArticle(slug),
    getMoreStories(slug),
  ]);

  if (!article) notFound();

  const related = await getRelated(article.category, slug);

  return <ArticleInteractive article={article} related={related} moreStories={moreStories} />;
}