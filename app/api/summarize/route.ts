import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== process.env.SCRAPE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get articles without AI summaries
  const { data: articles, error: fetchError } = await supabaseAdmin
    .from("articles")
    .select("id, slug, title, summary, source, category")
    .is("ai_summary", null)
    .order("scraped_at", { ascending: false })
    .limit(10);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!articles?.length) {
    return NextResponse.json({ message: "Nothing to summarize", summarized: 0 });
  }

  let count = 0;
  const errors: string[] = [];
  const updatedSlugs = new Set<string>();

  for (const article of articles) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: `You are a Nigerian political news editor. Summarize this article in exactly 2 clear, factual, neutral sentences. Focus on the key political facts. Return only the summary — no preamble, no labels, no quotation marks.

Source: ${article.source}
Category: ${article.category}
Title: ${article.title}
Content: ${article.summary}`,
            },
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        errors.push(`Article ${article.id}: HTTP ${res.status} — ${errText}`);
        continue;
      }

      const data = await res.json();
      const aiSummary = data.content?.[0]?.text?.trim();

      if (!aiSummary) {
        errors.push(`Article ${article.id}: Empty response from Claude`);
        continue;
      }

      // Detect bias signal from title + summary
      const combinedText = (article.title + " " + article.summary).toLowerCase();
      const aiBias = detectBias(combinedText);

      const { error: updateError } = await supabaseAdmin
        .from("articles")
        .update({
          ai_summary: aiSummary,
          ai_bias: aiBias,
        })
        .eq("id", article.id);

      if (updateError) {
        errors.push(`Article ${article.id}: ${updateError.message}`);
      } else {
        count++;
        if (article.slug) updatedSlugs.add(article.slug);
      }
    } catch (e: unknown) {
      errors.push(`Article ${article.id}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (count > 0) {
    revalidatePath("/news");
    for (const slug of updatedSlugs) revalidatePath(`/news/${slug}`);
  }

  return NextResponse.json({
    success: true,
    summarized: count,
    errors,
  });
}

function detectBias(text: string): string {
  const partySignals: Record<string, string[]> = {
    "APC-leaning":  ["apc", "tinubu", "shettima", "all progressives congress", "ruling party"],
    "PDP-leaning":  ["pdp", "atiku", "peoples democratic party", "opposition pdp"],
    "LP-leaning":   ["labour party", "julius abure"],
    "NDC-leaning":  ["ndc", "peter obi", "new democratic party", "obidient"],
    "NNPP-leaning": ["nnpp", "kwankwaso", "new nigeria peoples party"],
    "SDP-leaning":  ["sdp", "social democratic party"],
    "ADC-leaning":  ["adc", "african democratic congress"],
  };

  const scores: Record<string, number> = {};

  for (const [party, terms] of Object.entries(partySignals)) {
    scores[party] = terms.filter(t => text.includes(t)).length;
  }

  const topParty = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  if (!topParty || topParty[1] === 0) return "Neutral";
  return topParty[0];
}