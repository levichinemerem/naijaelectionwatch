import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

const SOURCES = [
  { name: "Premium Times",   url: "https://www.premiumtimesng.com/feed",              icon: "🗞️" },
  { name: "Vanguard",        url: "https://www.vanguardngr.com/feed",                 icon: "📰" },
  { name: "Channels TV",     url: "https://www.channelstv.com/feed",                  icon: "📺" },
  { name: "Punch",           url: "https://punchng.com/feed",                         icon: "👊" },
  { name: "ThisDay",         url: "https://www.thisdaylive.com/feed",                 icon: "📄" },
  { name: "Guardian NG",     url: "https://guardian.ng/feed/",                        icon: "🛡️" },
  { name: "Daily Trust",     url: "https://dailytrust.com/feed",                      icon: "✅" },
  { name: "Sahara Reporters", url: "https://saharareporters.com/articles/rss-feed",   icon: "🔍" },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Politics:  ["election","inec","apc","pdp","labour","tinubu","obi","atiku","governor","senate","reps","presidency","minister","party","vote","ballot","campaign","2027"],
  Economy:   ["economy","naira","cbn","inflation","budget","oil","gdp","trade","forex","revenue","debt","fiscal","banking","investment"],
  Security:  ["army","police","boko","bandits","kidnap","military","attack","troops","terrorist","insecurity","massacre","abduction","gunmen"],
  Society:   ["education","health","women","youth","diaspora","protest","civil","community","flood","environment","religion","church","mosque"],
};

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return cat;
  }
  return "Politics";
}

function detectIcon(category: string): string {
  const icons: Record<string, string> = {
    Politics: "🏛️", Economy: "💹", Security: "🛡️", Society: "🌍",
  };
  return icons[category] || "📰";
}

function generateSlug(title: string, url: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
  // append short hash from URL to guarantee uniqueness
  const hash = Buffer.from(url).toString("base64").slice(0, 6).replace(/[^a-z0-9]/gi, "");
  return `${base}-${hash}`;
}

function extractUrl(item: string, fallbackLink: string): string {
  // Priority 1: <link> tag (most reliable)
  const linkMatch =
    item.match(/<link>(https?:\/\/[^<]+)<\/link>/) ||
    item.match(/<link>\s*<!\[CDATA\[(https?:\/\/[^\]]+)\]\]>\s*<\/link>/);
  if (linkMatch?.[1]) return linkMatch[1].trim();

  // Priority 2: <guid isPermaLink="true">
  const guidPerma = item.match(/<guid[^>]*isPermaLink="true"[^>]*>(https?:\/\/[^<]+)<\/guid>/);
  if (guidPerma?.[1]) return guidPerma[1].trim();

  // Priority 3: any <guid> that looks like a URL
  const guidUrl = item.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/);
  if (guidUrl?.[1]) return guidUrl[1].trim();

  // Priority 4: origLink (some feeds use this)
  const origLink = item.match(/<feedburner:origLink>(https?:\/\/[^<]+)<\/feedburner:origLink>/);
  if (origLink?.[1]) return origLink[1].trim();

  return fallbackLink;
}

async function parseRSS(feedUrl: string, sourceName: string) {
  const res = await fetch(feedUrl, {
    headers: { "User-Agent": "NaijaElectionWatch/1.0 (+https://naijaelectionwatch.vercel.app)" },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const xml = await res.text();
  const items: Array<{
    title: string;
    url: string;
    summary: string;
    image: string;
    published: string;
    author: string;
  }> = [];

  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  for (const match of itemMatches) {
    const item = match[1];

    const title =
      item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1] ||
      item.match(/<title>(.*?)<\/title>/s)?.[1] ||
      "";

    const rawLink =
      item.match(/<link>(https?:\/\/[^<]+)<\/link>/)?.[1] || "";

    const url = extractUrl(item, rawLink);

    const desc =
      item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
      item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ||
      "";

    const pubDate =
      item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ||
      item.match(/<dc:date>(.*?)<\/dc:date>/)?.[1] ||
      "";

    const author =
      item.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/)?.[1] ||
      item.match(/<dc:creator>(.*?)<\/dc:creator>/)?.[1] ||
      item.match(/<author>(.*?)<\/author>/)?.[1] ||
      "";

    const image =
      item.match(/<media:content[^>]*url="([^"]+)"/)?.[1] ||
      item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ||
      item.match(/<media:thumbnail[^>]*url="([^"]+)"/)?.[1] ||
      desc.match(/<img[^>]+src="([^"]+)"/)?.[1] ||
      "";

    const cleanDesc = desc.replace(/<[^>]*>/g, "").trim().slice(0, 400);

    if (title.trim() && url.startsWith("http")) {
      items.push({
        title: title.trim(),
        url,
        summary: cleanDesc,
        image,
        published: pubDate,
        author: author.replace(/<[^>]*>/g, "").trim(),
      });
    }
  }

  return items;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== process.env.SCRAPE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let totalSaved = 0;
  let totalSkipped = 0;
  const errors: string[] = [];
  const results: Record<string, number> = {};

  for (const source of SOURCES) {
    try {
      const items = await parseRSS(source.url, source.name);

      for (const item of items.slice(0, 15)) {
        const category = detectCategory(item.title + " " + item.summary);
        const slug = generateSlug(item.title, item.url);

        const { error } = await supabaseAdmin
          .from("articles")
          .upsert(
            {
              title:        item.title,
              summary:      item.summary,
              category,
              source:       source.name,
              author:       item.author || null,
              url:          item.url,           // ← original article URL always saved
              image_url:    item.image || null,
              published_at: item.published
                ? new Date(item.published).toISOString()
                : new Date().toISOString(),
              slug,
              icon: detectIcon(category),
            },
            { onConflict: "url" }              // ← deduplicate by original URL
          );

        if (error) {
          if (error.code === "23505") {
            totalSkipped++; // duplicate, already exists
          } else {
            errors.push(`${source.name}: ${error.message}`);
          }
        } else {
          totalSaved++;
          results[source.name] = (results[source.name] || 0) + 1;
        }
      }
    } catch (e: unknown) {
      errors.push(`${source.name}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return NextResponse.json({
    success: true,
    saved: totalSaved,
    skipped: totalSkipped,
    per_source: results,
    errors,
  });
}