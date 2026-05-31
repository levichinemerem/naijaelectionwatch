import type { Metadata } from "next";
import { supabaseAdmin } from "@/app/lib/supabase";
import NewsInteractive from "./NewsInteractive";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";

export const revalidate = 28800;

export const metadata: Metadata = {
  title: "Election News Nigeria — Latest 2027 Election Updates | Naija Election Watch",
  description:
    "Verified, AI-summarised election news from Nigeria's most trusted outlets. Updated every 8 hours. Independent coverage across all parties, states, and issues.",
  alternates: { canonical: "https://www.naijaelectionwatch.com/news" },
  openGraph: {
    title: "Election News Nigeria — Latest 2027 Election Updates | Naija Election Watch",
    description:
      "Verified, AI-summarised election news from Nigeria's most trusted outlets. Updated every 8 hours. Independent coverage across all parties, states, and issues.",
    url: "https://www.naijaelectionwatch.com/news",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naija Election Watch — Nigeria Election News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Election News Nigeria — Latest 2027 Election Updates | Naija Election Watch",
    description:
      "Verified, AI-summarised election news from Nigeria's most trusted outlets. Updated every 8 hours. Independent coverage across all parties, states, and issues.",
    images: ["/og-image.png"],
  },
};

export type Article = {
  id: string;
  title: string;
  summary: string;
  ai_summary: string | null;
  category: string;
  source: string;
  published_at: string;
  icon: string;
  slug: string;
  url: string;
  image_url: string | null;
  ai_bias: string | null;
};

async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("id,title,summary,ai_summary,category,source,published_at,icon,slug,url,image_url,ai_bias")
    .order("published_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }

  return (data ?? []) as Article[];
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <main>
      <BreadcrumbSchema pathname="/news" />

      {/* ── PAGE HEADER: server-rendered, fully crawlable ── */}
      <div style={{ paddingTop: 64, background: "#1B4332", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", padding: "48px 24px", position: "relative" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "#D8F3DC", marginBottom: 16, fontWeight: 700 }}>
            ALL STORIES
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: 16, lineHeight: 1 }}>
            The Feed
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 28 }}>
            Verified, AI-summarised election news from Nigeria&apos;s most trusted sources.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {["8 Sources Monitored", "Updated Every 8 Hours", "100% Independent"].map(s => (
              <div key={s} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.1em",
                color: "#D8F3DC", background: "rgba(216,243,220,0.12)",
                border: "1px solid rgba(216,243,220,0.25)",
                padding: "5px 14px", borderRadius: 999,
              }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CRAWLABLE ARTICLE LIST (hidden visually, visible to bots) ── */}
      <ul style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }} aria-hidden="true">
        {articles.map(a => (
          <li key={a.id}>
            <a href={`/news/${a.slug}`}>{a.title}</a>
            <p>{a.ai_summary || a.summary}</p>
          </li>
        ))}
      </ul>

      {/* ── INTERACTIVE FEED (client component) ── */}
      <NewsInteractive articles={articles} />
    </main>
  );
}