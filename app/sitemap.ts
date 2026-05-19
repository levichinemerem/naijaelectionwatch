import { MetadataRoute } from "next";
import { supabaseAdmin } from "@/app/lib/supabase";

const BASE_URL = "https://www.naijaelectionwatch.com";

// Static pages with realistic lastModified dates
const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/news`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/education`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date("2026-04-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all article slugs + published_at from Supabase
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("slug, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[sitemap] Failed to fetch articles:", error.message);
    // Degrade gracefully — return static pages only rather than a broken sitemap
    return STATIC_PAGES;
  }

  const articleEntries: MetadataRoute.Sitemap = (data ?? []).map(
  (row: { slug: string; published_at: string }) => ({
    url: `${BASE_URL}/news/${row.slug}`,
    lastModified: new Date(row.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })
);

  return [...STATIC_PAGES, ...articleEntries];
}