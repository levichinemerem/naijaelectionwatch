"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/app/components/NewsletterForm";
import { supabase } from "@/app/lib/supabase";

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

/* ─── TYPES ─── */
type Category = "All" | "Politics" | "Economy" | "Security" | "Society" | "Education";

interface Article {
  id: string;
  title: string;
  summary: string;
  ai_summary: string | null;
  category: Exclude<Category, "All">;
  source: string;
  published_at: string;
  icon: string;
  slug: string;
  url: string;
  image_url: string | null;
  ai_bias: string | null;
}

const SOURCES    = ["Premium Times","Channels TV","Punch","ThisDay","Daily Post","Daily Trust","Sahara Reporters","Leadership"];
const TAGS       = ["#2027Elections","#INEC","#PeterObi","#APC","#Tinubu","#LabourParty"];
const CATEGORIES: Category[] = ["All","Politics","Economy","Security","Society","Education"];

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "News",      href: "/news" },
  { label: "Education", href: "/education" },
  { label: "About Us",  href: "/about" },
];

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

/* ─── NAVBAR ─── */
function NavBar() {
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
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, marginRight: 32 }}>
            <Image src="/logo.png" alt="Naija Election Watch" width={36} height={36} style={{ borderRadius: 8, objectFit: "contain" }} />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, color: C.body, letterSpacing: 0.2 }}>Naija Election Watch</div>
              <div style={{ fontSize: 10, color: C.secondary, letterSpacing: "0.05em" }}>Tracking Democracy</div>
            </div>
          </Link>

          <div className="nav-links-desktop" style={{ display: "flex", gap: 2, flex: 1, alignItems: "center" }}>
            {NAV_LINKS.map((item) => {
              const isActive = item.label === "News";
              return (
                <Link key={item.label} href={item.href} style={{
                  color: isActive ? C.brandMedium : C.body,
                  fontSize: 14, fontWeight: 500,
                  padding: "8px 16px",
                  paddingBottom: isActive ? 6 : 8,
                  borderRadius: 6, textDecoration: "none", letterSpacing: 0.2,
                  transition: "color 0.2s",
                  borderBottom: isActive ? `2px solid ${C.brandMedium}` : "2px solid transparent",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = C.brandMedium; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = C.body; }}>
                  {item.label}
                </Link>
              );
            })}
          </div>

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

/* ─── ARTICLE CARD ─── */
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: 16 }}>
      <article style={{
        background: C.cardBg,
        border: `1px solid ${C.cardBorder}`,
        borderRadius: 12, overflow: "hidden",
        display: "flex",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>

        {/* Thumbnail */}
        <div className="article-thumb" style={{
          width: 110, minHeight: 110, flexShrink: 0,
          background: "linear-gradient(135deg, #e8f0eb 0%, #d4e6d9 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, borderRight: `1px solid ${C.divider}`,
          overflow: "hidden", position: "relative",
        }}>
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
              onError={e => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "block";
              }}
            />
          ) : null}
          <span style={{ display: article.image_url ? "none" : "block" }}>
            {article.icon}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 20px", flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <Pill text={article.category} />
            <span style={{ fontSize: 12, color: C.secondary, fontWeight: 500 }}>{article.source}</span>
            <span style={{ fontSize: 12, color: C.tertiary, marginLeft: "auto" }}>
              {new Date(article.published_at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
            </span>
          </div>
          <h3 style={{
            fontFamily: F.display, fontWeight: 700, fontSize: 15,
            color: C.body, margin: "0 0 6px", lineHeight: 1.4,
          }}>
            {article.title}
          </h3>
          <p style={{
            fontSize: 13, color: C.secondary, margin: "0 0 12px", lineHeight: 1.6,
            overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
          }}>
            {article.ai_summary || article.summary}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 10, borderTop: `1px solid ${C.divider}` }}>
            <span style={{ fontSize: 12, color: C.brandMedium, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              Read full story
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </span>
            {article.ai_bias && article.ai_bias !== "Neutral" && (
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                color: C.amber, background: "rgba(245,158,11,0.1)",
                padding: "2px 8px", borderRadius: 999,
              }}>
                {article.ai_bias.toUpperCase()}
              </span>
            )}
            {article.ai_summary && (
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                color: C.brandMedium, background: C.mint,
                padding: "2px 8px", borderRadius: 999,
              }}>
                AI SUMMARISED
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── SIDEBAR ─── */
function Sidebar() {
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 14 }}>
          Trending
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TAGS.map(tag => (
            <span key={tag} style={{
              fontSize: 11, fontWeight: 600, color: C.brandMedium,
              border: `1px solid ${C.mint}`, background: C.mint,
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

      <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 14 }}>
          Sources We Monitor
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SOURCES.map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.brandMedium, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: C.body }}>{s}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.red }} />
                <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.1em", color: C.brandMedium }}>LIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.newsletterBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 20 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%", background: C.mint,
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.brandDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 6 }}>Stay Informed</div>
        <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.body, margin: "0 0 6px" }}>Get the Daily Brief</h3>
        <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6, margin: "0 0 16px" }}>Top election stories every morning.</p>
        <NewsletterForm compact />
      </div>
    </aside>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: C.brandDark, padding: "64px 5vw 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <Image src="/logo.png" alt="Naija Election Watch" width={36} height={36} style={{ borderRadius: 8, objectFit: "contain" }} />
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
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, cursor: "pointer", color: C.white70, transition: "all 0.2s",
              }}
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

/* ─── MAIN PAGE ─── */
export default function NewsPage() {
  const [filter, setFilter]       = useState<Category>("All");
  const [search, setSearch]       = useState("");
  const [sort, setSort]           = useState<"latest" | "oldest">("latest");
  const [visible, setVisible]     = useState(20);
  const [loading, setLoading]     = useState(false);
  const [articles, setArticles]   = useState<Article[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (data?.length) setArticles(data as Article[]);
        if (error) console.error("Supabase fetch error:", error.message);
        setDbLoading(false);
      });
  }, []);

  const filtered = articles
    .filter(a => filter === "All" || a.category === filter)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const da = new Date(a.published_at).getTime();
      const db = new Date(b.published_at).getTime();
      return sort === "latest" ? db - da : da - db;
    })
    .slice(0, visible);

  const totalFiltered = articles
    .filter(a => filter === "All" || a.category === filter)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase())).length;

  const hasMore = visible < totalFiltered;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisible(v => v + 10); setLoading(false); }, 800);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .main-grid         { grid-template-columns: 1fr !important; }
          .sidebar           { display: none !important; }
          .filter-bar        { flex-direction: column !important; gap: 10px !important; }
        }
        @media (min-width: 769px) {
          .mobile-panel { display: none !important; }
        }
        @media (max-width: 580px) {
          .footer-grid        { grid-template-columns: 1fr !important; gap: 32px !important; }
          .article-thumb      { width: 80px !important; min-height: 80px !important; font-size: 26px !important; }
        }
      `}</style>

      <NavBar />

      {/* ── PAGE HEADER ── */}
      <div style={{ paddingTop: 64, background: C.brandDark, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", padding: "48px 24px 48px", position: "relative" }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: "0.15em", color: C.mint, marginBottom: 16, fontWeight: 700 }}>
            ALL STORIES
          </div>
          <h1 style={{ fontFamily: F.display, fontWeight: 800, fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.03em", color: C.white, marginBottom: 16, lineHeight: 1 }}>
            The Feed
          </h1>
          <p style={{ fontSize: 17, color: C.white70, lineHeight: 1.7, marginBottom: 28 }}>
            Verified, AI-summarised election news from Nigeria's most trusted sources.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              "8 Sources Monitored",
              "Updated Every Hour",
              "100% Independent"
            ].map(s => (
              <div key={s} style={{
                fontFamily: F.mono, fontSize: 11, letterSpacing: "0.1em",
                color: C.mint, background: "rgba(216,243,220,0.12)",
                border: "1px solid rgba(216,243,220,0.25)",
                padding: "5px 14px", borderRadius: 999,
              }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STICKY FILTER BAR ── */}
      <div style={{
        position: "sticky", top: 64, zIndex: 100,
        background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.divider}`, padding: "12px 5vw",
      }}>
        <div className="filter-bar" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 380 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search stories, candidates, parties…"
              style={{
                fontFamily: F.body, width: "100%",
                padding: "9px 12px 9px 34px",
                background: C.pageBg,
                border: `1px solid ${C.divider}`,
                borderRadius: 8, color: C.body, fontSize: 13, outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setFilter(cat); setVisible(20); }} style={{
                fontSize: 12, fontWeight: filter === cat ? 700 : 500,
                background: filter === cat ? C.brandDark : "transparent",
                border: `1px solid ${filter === cat ? C.brandDark : C.divider}`,
                color: filter === cat ? C.white : C.secondary,
                padding: "5px 13px", borderRadius: 999, cursor: "pointer",
                transition: "all 0.2s",
              }}>
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={e => setSort(e.target.value as "latest" | "oldest")}
            style={{
              fontFamily: F.mono, fontSize: 12,
              background: C.pageBg, border: `1px solid ${C.divider}`,
              borderRadius: 8, color: C.body, padding: "8px 12px",
              cursor: "pointer", marginLeft: "auto", outline: "none",
            }}
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ background: C.newsletterBg, padding: "40px 5vw 80px", borderTop: `1px solid ${C.divider}` }}>
        <div className="main-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 32 }}>

          <div>
            {dbLoading ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: C.secondary }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
                <div style={{ fontSize: 16 }}>Loading live stories…</div>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: C.secondary }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16 }}>No stories found for "{search}"</div>
              </div>
            ) : (
              filtered.map(a => <ArticleCard key={a.id} article={a} />)
            )}

            {hasMore && (
              <button onClick={loadMore} disabled={loading} style={{
                width: "100%",
                background: "transparent",
                border: `1.5px solid ${C.brandDark}`,
                borderRadius: 8, padding: 14,
                fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
                color: loading ? C.tertiary : C.brandDark,
                cursor: loading ? "wait" : "pointer",
                marginTop: 8, transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = C.brandDark; e.currentTarget.style.color = C.white; } }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = loading ? C.tertiary : C.brandDark; }}>
                {loading ? "Loading…" : "Load More Stories"}
              </button>
            )}
          </div>

          <div className="sidebar" style={{ position: "sticky", top: 130, alignSelf: "start" }}>
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}