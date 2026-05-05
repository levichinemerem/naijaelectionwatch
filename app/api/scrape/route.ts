import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

const SOURCES = [
  { name:"Premium Times",  url:"https://www.premiumtimesng.com/feed", category:"Politics" },
  { name:"Vanguard",       url:"https://www.vanguardngr.com/feed",    category:"Politics" },
  { name:"Punch",          url:"https://punchng.com/feed",            category:"Politics" },
  { name:"Daily Trust",    url:"https://dailytrust.com/feed",         category:"Politics" },
  { name:"Channels TV",    url:"https://www.channelstv.com/feed",     category:"Politics" },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Economy:  ["economy","naira","cbn","inflation","budget","oil","gdp","trade"],
  Security: ["army","police","boko","bandits","kidnap","military","attack","troops"],
  Society:  ["education","health","women","youth","diaspora","protest","civil"],
  Politics: ["election","inec","apc","pdp","labour","tinubu","obi","governor","senate"],
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
    Politics: "🏛️", Economy: "💹", Security: "🛡️", Society: "🌍", Education: "📖"
  };
  return icons[category] || "📰";
}

function generateSlug(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

async function parseRSS(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": "NaijaElectionWatch/1.0" } });
  const xml = await res.text();
  const items: Array<{ title: string; url: string; summary: string; image: string; published: string }> = [];

  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
  for (const match of itemMatches) {
    const item = match[1];
    const title   = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || item.match(/<title>(.*?)<\/title>/)?.[1] || "";
    const link    = item.match(/<link>(.*?)<\/link>/)?.[1] || item.match(/<guid>(.*?)<\/guid>/)?.[1] || "";
    const desc    = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || item.match(/<description>(.*?)<\/description>/)?.[1] || "";
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
    const image   = item.match(/<media:content[^>]*url="([^"]*)"/) ?.[1] || item.match(/<enclosure[^>]*url="([^"]*)"/) ?.[1] || "";

    const cleanDesc = desc.replace(/<[^>]*>/g, "").slice(0, 300);
    if (title && link) items.push({ title, url: link, summary: cleanDesc, image, published: pubDate });
  }
  return items;
}

export async function GET(req: Request) {
  // Secure the endpoint
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== process.env.SCRAPE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let totalSaved = 0;
  const errors: string[] = [];

  for (const source of SOURCES) {
    try {
      const items = await parseRSS(source.url);
      for (const item of items.slice(0, 10)) {
        const category = detectCategory(item.title + " " + item.summary);
        const slug = generateSlug(item.title);

        const { error } = await supabaseAdmin.from("articles").upsert({
          title:        item.title,
          summary:      item.summary,
          category,
          source:       source.name,
          url:          item.url,
          image_url:    item.image,
          published_at: item.published ? new Date(item.published).toISOString() : new Date().toISOString(),
          slug,
          icon:         detectIcon(category),
        }, { onConflict: "url" });

        if (!error) totalSaved++;
      }
    } catch (e) {
      errors.push(`${source.name}: ${e}`);
    }
  }

  return NextResponse.json({ success: true, saved: totalSaved, errors });
}