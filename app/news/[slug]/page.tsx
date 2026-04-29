"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

const C = {
  bg:       "#0a0f0a",
  bg2:      "#0f1a0f",
  bg3:      "#111e11",
  border:   "rgba(0,220,130,0.12)",
  borderHi: "rgba(0,220,130,0.3)",
  green:    "#00dc82",
  greenDim: "rgba(0,220,130,0.1)",
  amber:    "#f59e0b",
  red:      "#ef4444",
  white:    "#f0f4f0",
  muted:    "rgba(240,244,240,0.5)",
  faint:    "rgba(240,244,240,0.2)",
};

const F = {
  body:    "'Inter', sans-serif",
  display: "'Space Grotesk', sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

const ARTICLES: Record<string, {
  title: string; category: string; source: string; author: string;
  timestamp: string; readTime: string; icon: string; summary: string;
  body: string[]; tags: string[]; relatedSlugs: string[];
}> = {
  "inec-releases-final-voter-register-2027": {
    title: "INEC Releases Final Voter Register Ahead of 2027 Elections",
    category: "POLITICS", source: "Premium Times", author: "Chukwuemeka Obi",
    timestamp: "April 28, 2026 · 1h ago", readTime: "5 min read", icon: "🗳️",
    summary: "The Independent National Electoral Commission has published the certified voter register with over 95 million registered voters, the largest in Nigeria's democratic history.",
    body: [
      "The Independent National Electoral Commission (INEC) on Monday released the final Continuous Voter Registration (CVR) data ahead of the 2027 general elections, confirming a total of 95.2 million registered voters across Nigeria's 36 states and the Federal Capital Territory.",
      "The figures represent a significant increase from the 93.4 million voters recorded in the 2023 general elections, driven largely by a surge in youth registrations. According to INEC Chairman Prof. Mahmood Yakubu, the commission recorded over 9.5 million new registrants between January 2024 and December 2025, with persons aged 18–35 accounting for 67% of new additions.",
      "\"This is a historic milestone for Nigerian democracy,\" Yakubu said at a press conference in Abuja. \"We have the largest, most diverse voter pool in our nation's history, and our systems are being upgraded to match that scale.\"",
      "The data shows Lagos State retaining its position as the state with the highest number of registered voters at 7.9 million, followed by Kano (5.3 million) and Rivers (4.1 million). The FCT recorded the highest percentage growth at 34%, attributed to the influx of young professionals into the capital.",
      "Civil society organisations have largely welcomed the release. Yiaga Africa's Executive Director, Samson Itodo, described the figures as \"a testament to growing democratic participation\" but cautioned that registration numbers alone do not guarantee voter turnout.",
      "\"We saw in 2023 that high registration did not translate to proportional turnout,\" Itodo noted. \"The commission and all stakeholders must now focus on civic education to ensure these registrants actually exercise their franchise.\"",
      "INEC has also announced the deployment of the Bimodal Voter Accreditation System (BVAS) across all 176,846 polling units. The final register will be available for public inspection at INEC offices nationwide from May 15 to June 30, 2026.",
    ],
    tags: ["#INEC","#2027Elections","#VoterRegistration","#NigerianDemocracy"],
    relatedSlugs: ["tinubu-camp-outreach-middle-belt-governors","peter-obi-youth-summit-electoral-reform","inec-polling-unit-security-northeast"],
  },
  "tinubu-camp-outreach-middle-belt-governors": {
    title: "Tinubu's Camp Begins Quiet Outreach to Middle Belt Governors",
    category: "POLITICS", source: "Vanguard", author: "Fatima Al-Hassan",
    timestamp: "April 28, 2026 · 2h ago", readTime: "4 min read", icon: "🏛️",
    summary: "Political realignments intensify as key presidential aides engage in strategic consultations across Benue, Plateau and Nassarawa states.",
    body: [
      "Key aides to President Bola Ahmed Tinubu have begun a series of quiet but intensifying consultations with governors and political stakeholders across Nigeria's Middle Belt, in what political analysts say is an early bid to consolidate support ahead of the 2027 presidential primaries.",
      "Sources within the APC's campaign structure, who spoke on condition of anonymity, confirmed that at least three governors from the North-Central geopolitical zone have received high-level delegations from the presidency in the past two weeks.",
      "The outreach comes against the backdrop of growing restiveness within the APC over the administration's handling of security challenges in Benue and Plateau states, where farmer-herder clashes have continued to claim lives and displace communities.",
      "Governor Hyacinth Alia of Benue State, who has been vocal in his criticism of federal security responses, is said to be among those approached. His camp neither confirmed nor denied the meetings.",
      "The Middle Belt's electoral significance cannot be overstated. The region contributed critical swing votes in both the 2015 and 2023 presidential elections, and its fragmented political landscape makes it a key battleground for any candidate seeking a broad national mandate.",
      "Political analyst Dr. Bulama Bukarti told Naija Election Watch: \"Presidential camps always begin coalition-building earlier than the public realises. What we're seeing now is the foundation being laid for a very competitive 2027 race.\"",
    ],
    tags: ["#Tinubu","#APC","#MiddleBelt","#2027Elections","#NigerianPolitics"],
    relatedSlugs: ["inec-releases-final-voter-register-2027","labour-party-suit-electoral-guidelines","naira-slides-election-season-spending"],
  },
  "naira-slides-election-season-spending": {
    title: "Naira Slides as Election Season Spending Begins to Heat Up",
    category: "ECONOMY", source: "BusinessDay", author: "Adaeze Nwosu",
    timestamp: "April 28, 2026 · 3h ago", readTime: "4 min read", icon: "💹",
    summary: "Currency volatility increases as campaign spending and political activities drive unprecedented demand for foreign exchange in major cities.",
    body: [
      "The naira fell to ₦1,742 per dollar on the official NAFEM window on Monday, its lowest point in three months, as analysts link the renewed currency pressure to the early onset of election-cycle spending patterns.",
      "Data from the Central Bank of Nigeria shows a 23% spike in dollar demand from the corporate and bureau de change segments over the past six weeks, a trend economists say mirrors patterns observed in the 12 months preceding the 2019 and 2023 elections.",
      "\"Election seasons in Nigeria are effectively fiscal expansionary periods,\" said Dr. Muda Yusuf, CEO of the Centre for the Promotion of Private Enterprise. \"Political spending injects significant liquidity into the economy, but much of it chases dollars and fuels inflation.\"",
      "The CBN has so far held its monetary policy rate at 26.75%, maintaining a tight stance adopted in 2024 to combat inflation. However, with election-related spending expected to accelerate, analysts say the central bank faces a difficult balancing act.",
      "The Nigerian Economic Summit Group has called on the federal government to publish a clear framework for managing election-related fiscal pressures, warning that uncoordinated spending could undermine macroeconomic stability gains.",
    ],
    tags: ["#Naira","#Economy","#CBN","#2027Elections","#NigeriaEconomy"],
    relatedSlugs: ["cbn-warns-inflation-risk-2027-vote","foreign-investors-watch-election-calendar","fuel-subsidy-removal-campaign-costs"],
  },
  "peter-obi-youth-summit-electoral-reform": {
    title: "Peter Obi Addresses Youth Summit on Electoral Reform",
    category: "POLITICS", source: "Guardian NG", author: "Ngozi Adeyemi",
    timestamp: "April 28, 2026 · 5h ago", readTime: "5 min read", icon: "🎙️",
    summary: "The Labour Party leader calls for comprehensive electoral reforms and increased youth participation, drawing a crowd of over 10,000 at the Abuja summit.",
    body: [
      "Labour Party presidential candidate Peter Obi drew a crowd of over 10,000 young Nigerians to the Abuja Continental Hotel on Sunday for the inaugural National Youth Electoral Reform Summit.",
      "Obi called for the full electronic transmission of results, an independent prosecutorial body for electoral offences, and mandatory civic education in secondary school curricula.",
      "\"The youths of this country are not apathetic — they are alienated,\" Obi told the crowd. \"They have watched elections be stolen, votes cancelled, and results manipulated. Our job is to build a system worthy of their participation.\"",
      "The summit, organised by the ObiDatti Foundation and co-sponsored by Yiaga Africa, also featured addresses from electoral reform advocates, legal scholars, and INEC representatives.",
      "Labour Party's national chairman confirmed that the party intends to hold similar events in all six geopolitical zones before the end of 2026, cementing the party's youth-first positioning ahead of the primaries.",
    ],
    tags: ["#PeterObi","#LabourParty","#YouthVote","#ElectoralReform","#2027Elections"],
    relatedSlugs: ["inec-releases-final-voter-register-2027","survey-68-percent-nigerian-youth-vote-2027","labour-party-suit-electoral-guidelines"],
  },
};

function getArticle(slug: string) {
  return ARTICLES[slug] ?? {
    title: "Article Not Found",
    category: "NEWS", source: "Naija Election Watch", author: "Editorial Team",
    timestamp: "April 28, 2026", readTime: "1 min read", icon: "📰",
    summary: "This article could not be found. It may have been moved or removed.",
    body: ["We couldn't find the article you were looking for. Please return to the news feed and try again."],
    tags: ["#NaijaElectionWatch"],
    relatedSlugs: [],
  };
}

const ALL_ARTICLES_LIST = [
  { slug:"inec-releases-final-voter-register-2027",        title:"INEC Releases Final Voter Register Ahead of 2027 Elections",      category:"POLITICS", icon:"🗳️", source:"Premium Times",    time:"1h ago" },
  { slug:"tinubu-camp-outreach-middle-belt-governors",     title:"Tinubu's Camp Begins Quiet Outreach to Middle Belt Governors",     category:"POLITICS", icon:"🏛️", source:"Vanguard",          time:"2h ago" },
  { slug:"naira-slides-election-season-spending",          title:"Naira Slides as Election Season Spending Begins to Heat Up",       category:"ECONOMY",  icon:"💹", source:"BusinessDay",       time:"3h ago" },
  { slug:"army-deploys-units-volatile-states",             title:"Army Deploys Additional Units to Three Volatile States",           category:"SECURITY", icon:"🛡️", source:"Channels TV",       time:"4h ago" },
  { slug:"peter-obi-youth-summit-electoral-reform",        title:"Peter Obi Addresses Youth Summit on Electoral Reform",             category:"POLITICS", icon:"🎙️", source:"Guardian NG",       time:"5h ago" },
  { slug:"cbn-warns-inflation-risk-2027-vote",             title:"CBN Warns of Inflation Risk in Run-Up to 2027 Vote",              category:"ECONOMY",  icon:"📊", source:"ThisDay",            time:"6h ago" },
  { slug:"survey-68-percent-nigerian-youth-vote-2027",     title:"Survey: 68% of Nigerian Youth Say They Will Vote in 2027",        category:"SOCIETY",  icon:"📋", source:"NOIPolls",           time:"11h ago" },
  { slug:"labour-party-suit-electoral-guidelines",         title:"Labour Party Files Suit Challenging New Electoral Guidelines",     category:"POLITICS", icon:"⚖️", source:"Sahara Reporters",  time:"9h ago" },
];

const NAV_LINKS = [
  { label:"Home",       href:"/" },
  { label:"News",       href:"/news" },
  { label:"Education",  href:"/education" },
  { label:"About Us",   href:"/about" },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function NavBar() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position:"fixed", inset:"0 0 auto 0", zIndex:200, background: solid ? "rgba(10,15,10,0.97)" : "rgba(10,15,10,0.9)", backdropFilter:"blur(14px)", borderBottom:`0.5px solid ${C.border}`, padding:"0 5vw", transition:"all 0.25s" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", height:62, gap:8 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0, marginRight:16 }}>
          <div style={{ width:34, height:34, borderRadius:6, border:`1.5px solid ${C.green}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:F.mono, fontWeight:600, fontSize:11, color:C.green }}>NW</div>
          <div style={{ lineHeight:1.1 }}>
            <div style={{ fontFamily:F.display, fontSize:13, color:C.white }}>
              <span style={{ fontWeight:700 }}>Naija</span><span style={{ fontWeight:300 }}> Election</span>
            </div>
            <div style={{ fontFamily:F.mono, fontSize:9, color:C.muted, letterSpacing:"0.18em" }}>WATCH · 2027</div>
          </div>
        </Link>

        <div className="nav-links" style={{ display:"flex", gap:2, flex:1 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{ fontFamily:F.body, fontSize:13, color: label==="News" ? C.green : C.muted, padding:"5px 12px", borderRadius:5, textDecoration:"none", borderBottom: label==="News" ? `2px solid ${C.green}` : "2px solid transparent" }}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display:"flex", gap:10, marginLeft:"auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, background:C.greenDim, border:`0.5px solid ${C.borderHi}`, padding:"7px 14px", borderRadius:6 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:C.red }} />
            <span style={{ fontFamily:F.mono, fontSize:11, letterSpacing:"0.12em", color:C.green }}>LIVE</span>
          </div>
          <button style={{ fontFamily:F.display, fontWeight:600, background:C.green, border:"none", color:"#061006", padding:"7px 16px", borderRadius:6, fontSize:13, cursor:"pointer" }}>Get Alerts</button>
        </div>
      </div>
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:"#060a06", padding:"48px 5vw 24px", borderTop:`0.5px solid ${C.border}` }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:34, height:34, borderRadius:6, border:`1.5px solid ${C.green}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:F.mono, fontWeight:600, fontSize:11, color:C.green }}>NW</div>
              <div style={{ lineHeight:1.1 }}>
                <div style={{ fontFamily:F.display, fontSize:13, color:C.white }}><span style={{ fontWeight:700 }}>Naija</span><span style={{ fontWeight:300 }}> Election</span></div>
                <div style={{ fontFamily:F.mono, fontSize:9, color:C.muted, letterSpacing:"0.18em" }}>WATCH · 2027</div>
              </div>
            </div>
            <p style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.7, maxWidth:260, margin:"0 0 20px" }}>Your trusted source for real-time election updates, in-depth analysis, and data for a better informed Nigeria.</p>
          </div>
          {[
            { title:"EXPLORE",   links:["News","Live Tracker","Data Hub","Education Hub","Videos"] },
            { title:"RESOURCES", links:["Reports","Methodology","Glossary","Press Kit","FAQ"] },
            { title:"COMPANY",   links:["About Us","Careers","Contact","Privacy Policy","Terms"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:F.mono, fontSize:"0.65rem", fontWeight:600, color:C.faint, letterSpacing:"0.18em", marginBottom:16 }}>{col.title}</div>
              {col.links.map(link => (
                <a key={link} href="#" style={{ fontFamily:F.body, display:"block", fontSize:13, color:C.muted, textDecoration:"none", marginBottom:10 }}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:`0.5px solid ${C.border}`, paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontFamily:F.body, fontSize:12, color:C.faint }}>© 2026 Naija Election Watch. All rights reserved.</span>
          <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.faint, letterSpacing:"0.06em" }}>BUILT WITH AI · MADE FOR NIGERIA 🇳🇬</span>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = getArticle(slug);
  const [copied, setCopied] = useState(false);
  const related = ALL_ARTICLES_LIST.filter(a => article.relatedSlugs.includes(a.slug)).slice(0, 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Inter',sans-serif; background:#0a0f0a; color:#f0f4f0; -webkit-font-smoothing:antialiased; }
        input::placeholder { color:rgba(240,244,240,0.3); }
        button:active { transform:scale(0.97); }
        @media(max-width:768px) {
          .nav-links { display:none!important; }
          .article-grid { grid-template-columns:1fr!important; }
          .sidebar { display:none!important; }
          .footer-grid { grid-template-columns:1fr 1fr!important; }
          .footer-grid>div:first-child { grid-column:span 2!important; }
          .share-label { display:none!important; }
        }
      `}</style>

      <NavBar />

      {/* BREADCRUMB */}
      <div style={{ paddingTop:62, background:C.bg, borderBottom:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"12px 5vw", display:"flex", alignItems:"center", gap:8 }}>
          <Link href="/" style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.1em", color:C.muted, textDecoration:"none" }}>HOME</Link>
          <span style={{ color:C.faint, fontSize:10 }}>›</span>
          <Link href="/news" style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.1em", color:C.muted, textDecoration:"none" }}>NEWS</Link>
          <span style={{ color:C.faint, fontSize:10 }}>›</span>
          <span style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.1em", color:C.green }}>{article.category}</span>
        </div>
      </div>

      {/* ARTICLE HERO */}
      <div style={{ background:C.bg, padding:"48px 5vw 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"48px 48px", opacity:0.4, pointerEvents:"none" }} />
        <div style={{ maxWidth:800, margin:"0 auto", position:"relative", paddingBottom:48 }}>

          {/* Meta row */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, flexWrap:"wrap" }}>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.12em", color:C.green, background:C.greenDim, border:`0.5px solid ${C.borderHi}`, padding:"3px 10px", borderRadius:3 }}>{article.category}</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.muted }}>{article.source}</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.faint }}>·</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.faint }}>{article.timestamp}</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.faint }}>·</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.green }}>{article.readTime}</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.8rem,4vw,3rem)", letterSpacing:"-0.03em", lineHeight:1.1, color:C.white, marginBottom:20 }}>
            {article.title}
          </h1>

          {/* Summary standfirst */}
          <p style={{ fontFamily:F.body, fontSize:18, color:C.muted, lineHeight:1.7, marginBottom:28, borderLeft:`3px solid ${C.green}`, paddingLeft:16 }}>
            {article.summary}
          </p>

          {/* Author + share */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, paddingTop:20, borderTop:`0.5px solid ${C.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${C.green},#00aa66)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:F.display, fontWeight:700, fontSize:13, color:"#061006" }}>
                {article.author.split(" ").map((w: string) => w[0]).join("").slice(0,2)}
              </div>
              <div>
                <div style={{ fontFamily:F.display, fontWeight:600, fontSize:14, color:C.white }}>{article.author}</div>
                <div style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.muted, letterSpacing:"0.1em" }}>NAIJA ELECTION WATCH</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {[["𝕏","Share on X"],["f","Facebook"],["🔗","Copy link"]].map(([icon, label]) => (
                <button key={label} onClick={label==="Copy link" ? handleCopy : undefined}
                  style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.08em", background:"transparent", border:`0.5px solid ${C.border}`, color: label==="Copy link" && copied ? C.green : C.muted, padding:"6px 12px", borderRadius:6, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                  <span>{icon}</span>
                  <span className="share-label">{label==="Copy link" && copied ? "Copied!" : label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BODY + SIDEBAR */}
      <div style={{ background:C.bg2, padding:"48px 5vw 64px" }}>
        <div className="article-grid" style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"minmax(0,1fr) 300px", gap:48 }}>

          {/* ARTICLE BODY */}
          <div>
            {/* AI Summary box */}
            <div style={{ background:C.bg3, border:`0.5px solid ${C.borderHi}`, borderRadius:12, padding:20, marginBottom:36 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <span style={{ fontSize:16 }}>✦</span>
                <span style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green }}>AI SUMMARY</span>
              </div>
              <p style={{ fontFamily:F.body, fontSize:14, color:C.muted, lineHeight:1.7, margin:0 }}>{article.summary}</p>
            </div>

            {/* Paragraphs */}
            <div style={{ maxWidth:680 }}>
              {article.body.map((para: string, i: number) => {
                const isQuote = para.startsWith('"') || para.startsWith('\u201c');
                return (
                  <p key={i} style={{ fontFamily:F.body, fontSize:16, color: isQuote ? C.white : C.muted, lineHeight:1.8, marginBottom:24, paddingLeft: isQuote ? 16 : 0, borderLeft: isQuote ? `3px solid ${C.green}` : "none", fontStyle: isQuote ? "italic" : "normal" }}>
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:36, paddingTop:24, borderTop:`0.5px solid ${C.border}` }}>
              {article.tags.map((tag: string) => (
                <span key={tag} style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.1em", color:C.green, border:`0.5px solid ${C.border}`, background:C.greenDim, padding:"4px 12px", borderRadius:20, cursor:"pointer" }}>{tag}</span>
              ))}
            </div>

            {/* Source */}
            <div style={{ marginTop:32, padding:16, background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:10 }}>
              <div style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.1em", color:C.faint, marginBottom:4 }}>SOURCE</div>
              <div style={{ fontFamily:F.body, fontSize:13, color:C.muted }}>
                Originally reported by <span style={{ color:C.white }}>{article.source}</span>. Summary and analysis by Naija Election Watch AI.{" "}
                <a href="#" style={{ color:C.green, textDecoration:"none" }}>Read original →</a>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ marginTop:48 }}>
                <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.green, marginBottom:20 }}>RELATED STORIES</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {related.map(r => (
                    <Link key={r.slug} href={`/news/${r.slug}`} style={{ textDecoration:"none" }}>
                      <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:10, padding:16, display:"flex", gap:14, alignItems:"center", transition:"border-color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor=C.borderHi)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor=C.border)}
                      >
                        <div style={{ fontSize:24, flexShrink:0 }}>{r.icon}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.1em", color:C.green, marginBottom:4 }}>{r.category}</div>
                          <div style={{ fontFamily:F.display, fontWeight:600, fontSize:14, color:C.white, lineHeight:1.35 }}>{r.title}</div>
                          <div style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.faint, marginTop:4 }}>{r.source} · {r.time}</div>
                        </div>
                        <span style={{ color:C.green, fontSize:16, flexShrink:0 }}>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="sidebar" style={{ position:"sticky", top:90, alignSelf:"start", display:"flex", flexDirection:"column", gap:20 }}>

            {/* Newsletter */}
            <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:22 }}>
              <h3 style={{ fontFamily:F.display, fontWeight:700, fontSize:17, color:C.white, margin:"0 0 8px" }}>Get the Daily Brief</h3>
              <p style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.6, margin:"0 0 16px" }}>Top election stories every morning.</p>
              <NewsletterForm compact />
            </div>

            {/* More stories */}
            <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:22 }}>
              <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>MORE STORIES</div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {ALL_ARTICLES_LIST.filter(a => a.slug !== slug).slice(0,5).map(a => (
                  <Link key={a.slug} href={`/news/${a.slug}`} style={{ textDecoration:"none", display:"flex", gap:10, alignItems:"flex-start" }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{a.icon}</span>
                    <div>
                      <div style={{ fontFamily:F.display, fontWeight:600, fontSize:13, color:C.white, lineHeight:1.3, marginBottom:3 }}>{a.title}</div>
                      <div style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.faint }}>{a.source} · {a.time}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/news" style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.1em", color:C.green, textDecoration:"none", display:"block", marginTop:16 }}>VIEW ALL STORIES →</Link>
            </div>

            {/* Trending */}
            <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:22 }}>
              <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:14 }}>TRENDING</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["#2027Elections","#INEC","#PeterObi","#APC","#Tinubu","#LabourParty"].map(tag => (
                  <span key={tag} style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.08em", color:C.green, border:`0.5px solid ${C.border}`, padding:"4px 10px", borderRadius:20, cursor:"pointer" }}>{tag}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}