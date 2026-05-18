import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

// ── Sources ───────────────────────────────────────────────────────────────────

const SOURCES = [
  { name: "Premium Times",    url: "https://www.premiumtimesng.com/feed"           },
  { name: "Leadership",       url: "https://leadership.ng/feed/"                   },
  { name: "Channels TV",      url: "https://www.channelstv.com/feed"               },
  { name: "Punch",            url: "https://punchng.com/feed"                      },
  { name: "ThisDay",          url: "https://www.thisdaylive.com/feed"              },
  { name: "Daily Post",       url: "https://dailypost.ng/feed"                     },
  { name: "Daily Trust",      url: "https://dailytrust.com/feed"                   },
  { name: "Sahara Reporters", url: "https://saharareporters.com/articles/rss-feed" },
];

// ── Category detection ────────────────────────────────────────────────────────
// Multi-word phrases prevent false positives — "labour party" won't match
// labour union stories, "oil price" won't match oil spill/security stories, etc.

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Politics: [
    "election", "inec", "apc", "pdp", "labour party", "tinubu", "peter obi",
    "atiku", "governor", "senate", "house of reps", "presidency", "minister",
    "ballot", "campaign rally", "2027", "political party", "lawmaker",
    "constituency", "ward congress", "primary election", "governorship",
    "state assembly", "national assembly", "aso rock", "state house",
    "political crisis", "impeachment", "defection", "party primaries",
  ],
  Economy: [
    "economy", "naira", "cbn", "inflation", "budget", "oil price", "gdp",
    "forex", "revenue", "debt", "fiscal", "banking", "investment", "trade",
  ],
  Security: [
    "boko haram", "bandits", "kidnap", "military operation", "troops deployed",
    "terrorist", "insecurity", "massacre", "abduction", "gunmen", "attack on",
  ],
  Society: [
    "education", "health", "women", "youth", "diaspora", "protest", "flood",
    "environment", "religion", "church", "mosque", "community",
  ],
};

const CATEGORY_ICONS: Record<string, string> = {
  Politics: "🏛️", Economy: "💹", Security: "🛡️", Society: "🌍",
};

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return cat;
  }
  return "General";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateSlug(title: string, url: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
  const hash = Buffer.from(url).toString("base64").slice(0, 6).replace(/[^a-z0-9]/gi, "");
  return `${base}-${hash}`;
}

function extractUrl(item: string, fallback: string): string {
  return (
    item.match(/<link>(https?:\/\/[^<]+)<\/link>/)?.[1]?.trim() ||
    item.match(/<link>\s*<!\[CDATA\[(https?:\/\/[^\]]+)\]\]>\s*<\/link>/)?.[1]?.trim() ||
    item.match(/<guid[^>]*isPermaLink="true"[^>]*>(https?:\/\/[^<]+)<\/guid>/)?.[1]?.trim() ||
    item.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/)?.[1]?.trim() ||
    item.match(/<feedburner:origLink>(https?:\/\/[^<]+)<\/feedburner:origLink>/)?.[1]?.trim() ||
    fallback
  );
}

function cleanText(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ── RSS Parser ────────────────────────────────────────────────────────────────

interface RSSItem {
  title: string;
  url: string;
  summary: string;
  image: string;
  published: string;
  author: string;
}

async function parseRSS(feedUrl: string, sourceName: string): Promise<RSSItem[]> {
  console.log(`[SCRAPE] Fetching ${sourceName}`);

  const res = await fetch(feedUrl, {
    headers: { "User-Agent": "NaijaElectionWatch/1.0 (+https://naijaelectionwatch.vercel.app)" },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const xml = await res.text();
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  const items: RSSItem[] = [];

  for (const match of itemMatches.slice(0, 20)) {
    const item = match[1];

    const title =
      item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ||
      item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";

    const rawLink = item.match(/<link>(https?:\/\/[^<]+)<\/link>/)?.[1] || "";
    const url = extractUrl(item, rawLink);

    const desc =
      item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
      item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "";

    const pubDate =
      item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ||
      item.match(/<dc:date>([\s\S]*?)<\/dc:date>/)?.[1] || "";

    const author =
      item.match(/<dc:creator><!\[CDATA\[([\s\S]*?)\]\]><\/dc:creator>/)?.[1] ||
      item.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/)?.[1] ||
      item.match(/<author>([\s\S]*?)<\/author>/)?.[1] || "";

    const image =
      item.match(/<media:content[^>]*url="([^"]+)"/)?.[1] ||
      item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ||
      item.match(/<media:thumbnail[^>]*url="([^"]+)"/)?.[1] ||
      desc.match(/<img[^>]+src="([^"]+)"/)?.[1] || "";

    if (!title.trim() || !url.startsWith("http")) continue;

    items.push({
      title:     cleanText(title.trim()),
      url,
      summary:   cleanText(desc.replace(/<[^>]*>/g, "")).slice(0, 400),
      image,
      published: pubDate,
      author:    cleanText(author.replace(/<[^>]*>/g, "").trim()),
    });
  }

  console.log(`[SCRAPE] ${sourceName}: ${items.length} articles parsed`);
  return items;
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("secret") !== process.env.SCRAPE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  console.log(`[SCRAPE] 🚀 Starting at ${new Date().toISOString()}`);

  let totalSaved = 0;
  let totalSkipped = 0;
  const updatedSlugs = new Set<string>();

  const errors: string[] = [];
  const perSource: Record<string, number> = {};

  for (const [index, source] of SOURCES.entries()) {
    try {
      const items = await parseRSS(source.url, source.name);

      for (const item of items.slice(0, 15)) {
        const category = detectCategory(item.title + " " + item.summary);
        const slug = generateSlug(item.title, item.url);

        const { error, status } = await supabaseAdmin
          .from("articles")
          .upsert(
            {
              title:        item.title,
              summary:      item.summary,
              category,
              source:       source.name,
              author:       item.author || null,
              url:          item.url,
              image_url:    item.image || null,
              published_at: item.published
                ? new Date(item.published).toISOString()
                : new Date().toISOString(),
              slug,
              icon: CATEGORY_ICONS[category] || "📰",
            },
            { onConflict: "url", ignoreDuplicates: true }
          );

        if (error && error.code !== "23505") {
          errors.push(`${source.name}: ${error.message}`);
        } else if (status === 201) {
          totalSaved++;
          perSource[source.name] = (perSource[source.name] || 0) + 1;
          updatedSlugs.add(slug);
        } else {
          totalSkipped++;
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${source.name}: ${msg}`);
      console.error(`[SCRAPE] Failed ${source.name}:`, msg);
    }

    // Polite delay between sources
    if (index < SOURCES.length - 1) {
      await new Promise(r => setTimeout(r, 1200));
    }
  }

  const duration = Date.now() - startTime;
  console.log(`[SCRAPE] ✅ Done in ${duration}ms | Saved: ${totalSaved} | Skipped: ${totalSkipped} | Errors: ${errors.length}`);

  if (totalSaved > 0) {
    revalidatePath("/news");
    for (const slug of updatedSlugs) revalidatePath(`/news/${slug}`);
  }

  return NextResponse.json({
    success: true,
    saved: totalSaved,
    skipped: totalSkipped,
    duration_ms: duration,
    per_source: perSource,
    errors: errors.slice(0, 10),
  });
}