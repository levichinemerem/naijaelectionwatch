"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

/* ─── DESIGN SYSTEM ─── */
const C = {
  brandDark:    "#1B4332",
  brandMedium:  "#2D6A4F",
  mint:         "#D8F3DC",
  mintText:     "#1B4332",
  pageBg:       "#FFFFFF",
  cardBg:       "#FFFFFF",
  cardBorder:   "#E8E8E8",
  divider:      "#E5E7EB",
  body:         "#111827",
  secondary:    "#6B7280",
  tertiary:     "#9CA3AF",
  white:        "#FFFFFF",
  white70:      "rgba(255,255,255,0.7)",
  red:          "#ef4444",
  amber:        "#f59e0b",
  newsletterBg: "#F0FAF4",
};

const F = {
  body:    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

/* ─── DATA (unchanged) ─── */
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
  { label: "Home",      href: "/" },
  { label: "News",      href: "/news" },
  { label: "Education", href: "/education" },
  { label: "About Us",  href: "/about" },
];

/* ─── NAVBAR ─── */
function NavBar({ activeLabel }: { activeLabel?: string }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", inset: "0 0 auto 0", zIndex: 200,
        background: solid ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.divider}`,
        transition: "all 0.25s", padding: "0 5vw",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 64, gap: 8 }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, marginRight: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: C.brandDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 12 2 2 4-4"/>
                <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
              </svg>
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, color: C.body, letterSpacing: 0.2 }}>Naija Election Watch</div>
              <div style={{ fontSize: 10, color: C.secondary, letterSpacing: "0.05em" }}>Tracking Democracy</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="nav-links-desktop" style={{ display: "flex", gap: 2, flex: 1, alignItems: "center" }}>
            {NAV_LINKS.map((item) => {
              const isActive = activeLabel ? item.label === activeLabel : item.label === "News";
              return (
                <Link key={item.label} href={item.href} style={{
                  color: isActive ? C.brandMedium : C.body,
                  fontSize: 14, fontWeight: 500,
                  padding: "8px 16px",
                  paddingBottom: isActive ? 6 : 8,
                  borderRadius: 6, textDecoration: "none",
                  letterSpacing: 0.2, transition: "color 0.2s",
                  borderBottom: isActive ? `2px solid ${C.brandMedium}` : "2px solid transparent",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = C.brandMedium; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = C.body; }}>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="nav-cta-desktop" style={{ display: "flex", marginLeft: "auto" }}>
            <button style={{
              background: C.brandDark, border: "none", color: C.white,
              padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
              cursor: "pointer", letterSpacing: 0.3,
              display: "flex", alignItems: "center", gap: 7, transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.brandMedium}
            onMouseLeave={e => e.currentTarget.style.background = C.brandDark}>
              Get Alerts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "transparent",
            border: `1px solid ${C.divider}`, color: C.body,
            padding: "9px", borderRadius: 8, cursor: "pointer", marginLeft: "auto",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div className="mobile-panel" style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 280,
        background: C.pageBg, borderLeft: `1px solid ${C.divider}`,
        zIndex: 300,
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex", flexDirection: "column", padding: "24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, paddingTop: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.body }}>Menu</span>
          <button onClick={() => setMenuOpen(false)} style={{ background: "transparent", border: "none", color: C.body, padding: 8, borderRadius: 8, cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {NAV_LINKS.map((item, i) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              color: i === 0 ? C.brandMedium : C.body,
              fontSize: 20, fontWeight: i === 0 ? 600 : 400,
              padding: "16px 0", textDecoration: "none",
              borderBottom: `1px solid ${C.divider}`,
            }}>
              {item.label}
            </Link>
          ))}
        </div>
        <div style={{ paddingTop: 24 }}>
          <button style={{
            background: C.brandDark, border: "none", color: C.white,
            padding: 14, borderRadius: 8, fontSize: 14, fontWeight: 700,
            cursor: "pointer", width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            Get Alerts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
          zIndex: 250, animation: "fadeIn 0.3s ease",
        }} />
      )}
    </>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: C.brandDark, padding: "64px 5vw 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 12 2 2 4-4"/>
                <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
              </svg>
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: C.white }}>Naija Election Watch</div>
              <div style={{ fontSize: 10, color: C.white70, letterSpacing: 1.5, marginTop: 2 }}>TRACKING DEMOCRACY · 2027</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: C.white70, lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
            Independent. In-depth. Real time. Your trusted source for election intelligence for a better informed Nigeria.
          </p>
        </div>

        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginBottom: 48 }}>
          {[
            { title: "EXPLORE",   links: ["News", "Live Tracker", "Data Hub", "Education Hub", "Videos"] },
            { title: "RESOURCES", links: ["Reports", "Methodology", "Glossary", "Press Kit", "FAQ"] },
            { title: "COMPANY",   links: ["About Us", "Careers", "Contact", "Privacy Policy", "Terms"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.white70, letterSpacing: "0.1em", marginBottom: 20, textTransform: "uppercase" as const }}>{col.title}</div>
              {col.links.map(link => (
                <a key={link} href="#" style={{ display: "block", fontSize: 13, color: C.white70, textDecoration: "none", marginBottom: 12, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.white}
                  onMouseLeave={e => e.currentTarget.style.color = C.white70}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {["𝕏", "in", "f", "▶"].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer", color: C.white70, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.white; e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = C.white70; }}>
                {icon}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.white70 }}>© 2026 Naija Election Watch. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── PILL ─── */
function Pill({ text }: { text: string }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      color: C.mintText, background: C.mint,
      padding: "3px 10px", borderRadius: 999, display: "inline-block",
    }}>
      {text}
    </span>
  );
}

/* ─── MAIN PAGE ─── */
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
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .article-grid      { grid-template-columns: 1fr !important; }
          .sidebar           { display: none !important; }
          .share-label       { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-panel { display: none !important; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>

      <NavBar activeLabel="News" />

      {/* ── BREADCRUMB ── */}
      <div style={{ paddingTop: 64, background: C.pageBg, borderBottom: `1px solid ${C.divider}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 5vw", display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: C.secondary, textDecoration: "none", textTransform: "uppercase" as const }}>Home</Link>
          <span style={{ color: C.tertiary, fontSize: 12 }}>›</span>
          <Link href="/news" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: C.secondary, textDecoration: "none", textTransform: "uppercase" as const }}>News</Link>
          <span style={{ color: C.tertiary, fontSize: 12 }}>›</span>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.brandMedium, textTransform: "uppercase" as const }}>{article.category}</span>
        </div>
      </div>

      {/* ── ARTICLE HERO ── */}
      <div style={{ background: C.pageBg, padding: "48px 5vw 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 40 }}>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Pill text={article.category} />
            <span style={{ fontSize: 12, color: C.secondary, fontWeight: 600 }}>{article.source}</span>
            <span style={{ color: C.tertiary, fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: C.tertiary }}>{article.timestamp}</span>
            <span style={{ color: C.tertiary, fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: C.brandMedium, fontWeight: 600 }}>{article.readTime}</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: F.display,
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: C.body,
            marginBottom: 20,
          }}>
            {article.title}
          </h1>

          {/* Summary standfirst */}
          <p style={{
            fontSize: 18,
            color: C.secondary,
            lineHeight: 1.7,
            marginBottom: 28,
            borderLeft: `3px solid ${C.brandMedium}`,
            paddingLeft: 16,
          }}>
            {article.summary}
          </p>

          {/* Author + share row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
            paddingTop: 20, borderTop: `1px solid ${C.divider}`,
          }}>
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: C.mint,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: F.display, fontWeight: 700, fontSize: 13, color: C.brandDark,
              }}>
                {article.author.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 14, color: C.body }}>{article.author}</div>
                <div style={{ fontSize: 10, color: C.tertiary, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginTop: 2 }}>Naija Election Watch</div>
              </div>
            </div>

            {/* Share buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              {[["𝕏", "Share on X"], ["f", "Facebook"], ["🔗", "Copy link"]].map(([icon, label]) => (
                <button key={label}
                  onClick={label === "Copy link" ? handleCopy : undefined}
                  style={{
                    fontSize: 12, fontWeight: 500,
                    background: "transparent",
                    border: `1px solid ${C.divider}`,
                    color: label === "Copy link" && copied ? C.brandMedium : C.secondary,
                    padding: "7px 12px", borderRadius: 7,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.brandDark; e.currentTarget.style.color = C.brandDark; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.divider; e.currentTarget.style.color = label === "Copy link" && copied ? C.brandMedium : C.secondary; }}>
                  <span>{icon}</span>
                  <span className="share-label">{label === "Copy link" && copied ? "Copied!" : label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY + SIDEBAR ── */}
      <div style={{ background: C.newsletterBg, padding: "48px 5vw 80px", borderTop: `1px solid ${C.divider}` }}>
        <div className="article-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 48 }}>

          {/* ── ARTICLE BODY ── */}
          <div>
            {/* AI Summary box */}
            <div style={{
              background: C.cardBg,
              border: `1px solid ${C.cardBorder}`,
              borderLeft: `3px solid ${C.brandMedium}`,
              borderRadius: 10,
              padding: "20px 24px",
              marginBottom: 36,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 15 }}>✦</span>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.brandMedium, textTransform: "uppercase" as const }}>AI Summary</span>
              </div>
              <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, margin: 0 }}>{article.summary}</p>
            </div>

            {/* Article image placeholder */}
            <div style={{
              height: 280,
              background: `linear-gradient(135deg, #e8f0eb 0%, #d4e6d9 100%)`,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              marginBottom: 36,
              border: `1px solid ${C.cardBorder}`,
            }}>
              {article.icon}
            </div>

            {/* Body paragraphs */}
            <div style={{ maxWidth: 680 }}>
              {article.body.map((para: string, i: number) => {
                const isQuote = para.startsWith('"') || para.startsWith('\u201c');
                return (
                  <p key={i} style={{
                    fontSize: 16,
                    color: isQuote ? C.body : C.secondary,
                    lineHeight: 1.85,
                    marginBottom: 24,
                    paddingLeft: isQuote ? 16 : 0,
                    borderLeft: isQuote ? `3px solid ${C.brandMedium}` : "none",
                    fontStyle: isQuote ? "italic" : "normal",
                    fontWeight: isQuote ? 500 : 400,
                  }}>
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 36, paddingTop: 24, borderTop: `1px solid ${C.divider}` }}>
              {article.tags.map((tag: string) => (
                <span key={tag} style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                  color: C.brandMedium,
                  border: `1px solid ${C.mint}`,
                  background: C.mint,
                  padding: "5px 12px", borderRadius: 999, cursor: "pointer",
                  transition: "background 0.2s",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Source attribution */}
            <div style={{ marginTop: 28, padding: "16px 20px", background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.tertiary, textTransform: "uppercase" as const, marginBottom: 6 }}>Source</div>
              <div style={{ fontSize: 13, color: C.secondary }}>
                Originally reported by <span style={{ color: C.body, fontWeight: 600 }}>{article.source}</span>. Summary and analysis by Naija Election Watch.{" "}
                <a href="#" style={{ color: C.brandMedium, textDecoration: "none", fontWeight: 600 }}>Read original →</a>
              </div>
            </div>

            {/* Related stories */}
            {related.length > 0 && (
              <div style={{ marginTop: 48 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 20 }}>Related Stories</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {related.map(r => (
                    <Link key={r.slug} href={`/news/${r.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{
                        background: C.cardBg,
                        border: `1px solid ${C.cardBorder}`,
                        borderRadius: 10, padding: 16,
                        display: "flex", gap: 14, alignItems: "center",
                        transition: "box-shadow 0.2s, transform 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ fontSize: 28, flexShrink: 0 }}>{r.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ marginBottom: 4 }}><Pill text={r.category} /></div>
                          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 14, color: C.body, lineHeight: 1.35 }}>{r.title}</div>
                          <div style={{ fontSize: 11, color: C.tertiary, marginTop: 4 }}>{r.source} · {r.time}</div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.brandMedium} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="sidebar" style={{ position: "sticky", top: 90, alignSelf: "start", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Newsletter */}
            <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 22 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: C.mint,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.brandDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 6 }}>Stay Informed</div>
              <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.body, margin: "0 0 8px" }}>Get the Daily Brief</h3>
              <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6, margin: "0 0 16px" }}>Top election stories every morning.</p>
              <NewsletterForm compact />
            </div>

            {/* More stories */}
            <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 16 }}>More Stories</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {ALL_ARTICLES_LIST.filter(a => a.slug !== slug).slice(0, 5).map((a, i, arr) => (
                  <Link key={a.slug} href={`/news/${a.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: i < arr.length - 1 ? `1px solid ${C.divider}` : "none",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
                      <div>
                        <div style={{ marginBottom: 4 }}><Pill text={a.category} /></div>
                        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 13, color: C.body, lineHeight: 1.3, marginBottom: 3 }}>{a.title}</div>
                        <div style={{ fontSize: 11, color: C.tertiary }}>{a.source} · {a.time}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/news" style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
                color: C.brandMedium, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 4, marginTop: 16,
              }}>
                View all stories
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Trending topics */}
            <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 14 }}>Trending Topics</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["#2027Elections","#INEC","#PeterObi","#APC","#Tinubu","#LabourParty"].map(tag => (
                  <span key={tag} style={{
                    fontSize: 11, fontWeight: 600,
                    color: C.brandMedium,
                    border: `1px solid ${C.mint}`,
                    background: C.mint,
                    padding: "5px 10px", borderRadius: 999, cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.brandMedium; (e.currentTarget as HTMLElement).style.color = C.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.mint; (e.currentTarget as HTMLElement).style.color = C.brandMedium; }}>
                    {tag}
                  </span>
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
