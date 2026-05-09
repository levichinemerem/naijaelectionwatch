import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import * as cheerio from "cheerio";

const SOURCES = [
  { name: "Premium Times", url: "https://www.premiumtimesng.com/feed", icon: "🗞️" },
  { name: "Leadership", url: "https://leadership.ng/feed/", icon: "🏆" },
  { name: "Channels TV", url: "https://www.channelstv.com/feed", icon: "📺" },
  { name: "Punch", url: "https://punchng.com/feed", icon: "👊" },
  { name: "ThisDay", url: "https://www.thisdaylive.com/feed", icon: "📄" },
  { name: "Daily Post", url: "https://dailypost.ng/feed", icon: "📝" },
  { name: "Daily Trust", url: "https://dailytrust.com/feed", icon: "✅" },
  { name: "Sahara Reporters", url: "https://saharareporters.com/feed", icon: "🔍" },
];

const CATEGORY_KEYWORDS = {
  Politics: ["election", "apc", "pdp", "atiku", "tinubu", "obi", "inec", "vote", "ballot"],
  Economy: ["economy", "naira", "inflation", "recession", "budget"],
  Security: ["security", "bandit", "kidnap", "boko haram", "herdsmen"],
  Society: ["protest", "court", "judge", "police"]
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

async function fetchFullArticle(url: string): Promise<{ content: string; image: string }> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "NaijaElectionWatch/1.0 (+https://naijaelectionwatch.vercel.app)",
      },
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) return { content: "", image: "" };

    const html = await res.text();
    const $ = cheerio.load(html);

    // FULL CONTENT
    let content = "";

    const contentSelectors = [
      'article', '.article-body', '.post-content', '.entry-content',
      '.story-content', '.single-post-content', 'div[itemprop="articleBody"]',
      '.premium-content', '.post-body', '.news-content', '.article__content'
    ];

    for (const selector of contentSelectors) {
      const el = $(selector);
      if (el.length) {
        el.find('script, style, .ad, .ads, .share-buttons, .related-posts, .comments').remove();
        content = el.text().trim();
        if (content.length > 600) break;
      }
    }

    // Fallback to paragraphs
    if (content.length < 800) {
      content = $('p')
        .map((_, el) => $(el).text().trim())
        .get()
        .filter(p => p.length > 40)
        .join('\n\n');
    }

    content = content
      .replace(/\s+/g, ' ')
      .replace(/Read also:|Share this|Follow us on|Tags:/gi, '')
      .trim()
      .slice(0, 20000);

    // HEADLINE IMAGE
    let image = 
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('.featured-image img, article img, .post-featured img').first().attr('src') ||
      $('img').filter((_, el) => {
        const src = $(el).attr('src') || '';
        return src.includes('wp-content') || src.includes('uploads');
      }).first().attr('src') || "";

    if (image && !image.startsWith('http')) {
      try {
        image = new URL(image, url).href;
      } catch {}
    }

    return { content, image: image || "" };

  } catch (err) {
    console.error(`[FULL SCRAPE FAILED] ${url}:`, err);
    return { content: "", image: "" };
  }
}

// TODO: Keep or merge your original parseRSS function here
// For now using a placeholder - replace with your actual one if different
async function parseRSS(feedUrl: string, sourceName: string) {
  try {
    const res = await fetch(feedUrl);
    const xml = await res.text();
    // Simple RSS parsing logic - you can improve this
    // ... (add your original parsing code here)
    return []; // placeholder
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  try {
    console.log("🚀 Starting full content scrape...");

    for (const [index, source] of SOURCES.entries()) {
      try {
        const items = await parseRSS(source.url, source.name);

        for (const item of items.slice(0, 10)) {
          const category = detectCategory(item.title + " " + (item.summary || ""));

          const { content: fullContent, image: betterImage } = await fetchFullArticle(item.url);

          const finalImage = betterImage || item.image || null;

          const { error } = await supabaseAdmin
            .from("articles")
            .upsert({
              title: item.title,
              summary: item.summary || "",
              content: fullContent || null,
              category,
              source: source.name,
              url: item.url,
              image_url: finalImage,
              published_at: item.published ? new Date(item.published).toISOString() : new Date().toISOString(),
              slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
              icon: detectIcon(category),
            }, { onConflict: "url" });

          if (error) console.error("Supabase error:", error);
        }

        // Polite delay between sources
        if (index < SOURCES.length - 1) {
          await new Promise(r => setTimeout(r, 2000));
        }
      } catch (e) {
        console.error(`Failed ${source.name}:`, e);
      }
    }

    return NextResponse.json({ success: true, message: "Full content scraping completed" });
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
