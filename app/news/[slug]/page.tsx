"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/app/components/NewsletterForm";
import { supabase } from "@/app/lib/supabase";

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

// Category banner configs for articles without images
const CATEGORY_BANNERS: Record<string, { gradient: string; pattern: string; label: string }> = {
  Politics: {
    gradient: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)",
    pattern: "🏛️",
    label: "POLITICS",
  },
  Economy: {
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)",
    pattern: "💹",
    label: "ECONOMY",
  },
  Security: {
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)",
    pattern: "🛡️",
    label: "SECURITY",
  },
  Society: {
    gradient: "linear-gradient(135deg, #4a1d96 0%, #7c3aed 50%, #8b5cf6 100%)",
    pattern: "🌍",
    label: "SOCIETY",
  },
};

interface Article {
  id: string;
  title: string;
  summary: string;
  ai_summary: string | null;
  category: string;
  source: string;
  author: string | null;
  published_at: string;
  icon: string;
  slug: string;
  url: string;
  image_url: string | null;
  ai_bias: string | null;
}

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "News",      href: "/news" },
  { label: "Education", href: "/education" },
  { label: "About Us",  href: "/about" },
];

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
            onMouseEnter={e => { e.currentTarget.style.background = C.brandMedium; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.brandDark; }}>
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
          }}>
            Get Alerts
          </button>
        </div>
      </div>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
          zIndex: 250,
        }} />
      )}
    </>
  );
}

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
                  onMouseEnter={e => { e.currentTarget.style.color = C.white; }}
                  onMouseLeave={e => { e.currentTarget.style.color = C.white70; }}>
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

// Category banner shown when no image_url exists
function CategoryBanner({ category, icon }: { category: string; icon: string }) {
  const banner = CATEGORY_BANNERS[category] || CATEGORY_BANNERS["Politics"];
  return (
    <div style={{
      height: 280, borderRadius: 12, overflow: "hidden",
      background: banner.gradient,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      marginBottom: 36, position: "relative",
      border: `1px solid ${C.cardBorder}`,
    }}>
      {/* Subtle grid pattern overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />
      <div style={{ fontSize: 56, marginBottom: 12, position: "relative" }}>{icon || banner.pattern}</div>
      <div style={{
        fontFamily: F.mono, fontSize: 11, fontWeight: 700,
        letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)",
        textTransform: "uppercase" as const, position: "relative",
      }}>
        {banner.label}
      </div>
    </div>
  );
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle]         = useState<Article | null>(null);
  const [related, setRelated]         = useState<Article[]>([]);
  const [moreStories, setMoreStories] = useState<Article[]>([]);
  const [loading, setLoading]         = useState(true);
  const [notFound, setNotFound]       = useState(false);
  const [copied, setCopied]           = useState(false);
  const [imageError, setImageError]   = useState(false);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setArticle(data as Article);
        supabase
          .from("articles")
          .select("*")
          .eq("category", data.category)
          .neq("slug", slug)
          .order("published_at", { ascending: false })
          .limit(3)
          .then(({ data: relData }) => {
            if (relData) setRelated(relData as Article[]);
          });
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .neq("slug", slug)
      .order("published_at", { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data) setMoreStories(data as Article[]);
      });
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div style={{ paddingTop: 64, minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.pageBg }}>
          <div style={{ textAlign: "center", color: C.secondary }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            <div style={{ fontSize: 16 }}>Loading article…</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !article) {
    return (
      <>
        <NavBar />
        <div style={{ paddingTop: 64, minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.pageBg }}>
          <div style={{ textAlign: "center", color: C.secondary }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.body, marginBottom: 8 }}>Article Not Found</div>
            <div style={{ fontSize: 14, marginBottom: 24 }}>This article may have been moved or removed.</div>
            <Link href="/news" style={{
              background: C.brandDark, color: C.white,
              padding: "10px 24px", borderRadius: 8,
              textDecoration: "none", fontSize: 14, fontWeight: 600,
            }}>
              Back to News Feed
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const authorInitials = article.author
    ? article.author.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
    : article.source.slice(0, 2).toUpperCase();

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Use ai_summary if available, otherwise RSS summary
  const displaySummary = decodeHtml(article.ai_summary || article.summary);
  const hasAiSummary = !!article.ai_summary;
  const showImage = article.image_url && !imageError;

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

      <NavBar />

      {/* BREADCRUMB */}
      <div style={{ paddingTop: 64, background: C.pageBg, borderBottom: `1px solid ${C.divider}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 5vw", display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: C.secondary, textDecoration: "none", textTransform: "uppercase" as const }}>Home</Link>
          <span style={{ color: C.tertiary, fontSize: 12 }}>›</span>
          <Link href="/news" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: C.secondary, textDecoration: "none", textTransform: "uppercase" as const }}>News</Link>
          <span style={{ color: C.tertiary, fontSize: 12 }}>›</span>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.brandMedium, textTransform: "uppercase" as const }}>{article.category}</span>
        </div>
      </div>

      {/* ARTICLE HERO */}
      <div style={{ background: C.pageBg, padding: "48px 5vw 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 40 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Pill text={article.category} />
            <span style={{ fontSize: 12, color: C.secondary, fontWeight: 600 }}>{article.source}</span>
            <span style={{ color: C.tertiary, fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: C.tertiary }}>
              {new Date(article.published_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {hasAiSummary && (
              <>
                <span style={{ color: C.tertiary, fontSize: 12 }}>·</span>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.brandMedium, background: C.mint, padding: "2px 8px", borderRadius: 999 }}>
                  AI SUMMARISED
                </span>
              </>
            )}
            {article.ai_bias && article.ai_bias !== "Neutral" && (
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.amber, background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 999 }}>
                {article.ai_bias.toUpperCase()}
              </span>
            )}
          </div>

          <h1 style={{
            fontFamily: F.display, fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.02em", lineHeight: 1.1,
            color: C.body, marginBottom: 20,
          }}>
            {article.title}
          </h1>

          {/* Intro line — just source + date context, no summary text */}
          <p style={{
            fontSize: 15, color: C.secondary, lineHeight: 1.7, marginBottom: 28,
            borderLeft: `3px solid ${C.brandMedium}`, paddingLeft: 16,
          }}>
            Reported by <strong style={{ color: C.body }}>{article.source}</strong> on{" "}
            {new Date(article.published_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}.
            Read the summary below, then continue to the full story.
          </p>

          {/* Author + Share row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
            paddingTop: 20, borderTop: `1px solid ${C.divider}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", background: C.mint,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: F.display, fontWeight: 700, fontSize: 13, color: C.brandDark,
              }}>
                {authorInitials}
              </div>
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 14, color: C.body }}>
                  {article.author || article.source}
                </div>
                <div style={{ fontSize: 10, color: C.tertiary, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginTop: 2 }}>
                  {article.source}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {[["𝕏", "Share on X"], ["f", "Facebook"], ["🔗", "Copy link"]].map(([icon, label]) => (
                <button
                  key={label}
                  onClick={label === "Copy link" ? handleCopy : undefined}
                  style={{
                    fontSize: 12, fontWeight: 500, background: "transparent",
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

      {/* BODY + SIDEBAR */}
      <div style={{ background: C.newsletterBg, padding: "48px 5vw 80px", borderTop: `1px solid ${C.divider}` }}>
        <div className="article-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 48 }}>

          <div>
            {/* AI Summary box — only shown when ai_summary exists */}
            {hasAiSummary && (
              <div style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`,
                borderLeft: `3px solid ${C.brandMedium}`,
                borderRadius: 10, padding: "20px 24px", marginBottom: 36,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 15 }}>✦</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.brandMedium, textTransform: "uppercase" as const }}>
                    AI Summary
                  </span>
                </div>
                <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, margin: 0 }}>{displaySummary}</p>
              </div>
            )}

            {/* RSS summary box — only shown when NO ai_summary */}
            {!hasAiSummary && (
              <div style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`,
                borderLeft: `3px solid ${C.tertiary}`,
                borderRadius: 10, padding: "20px 24px", marginBottom: 36,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.secondary, textTransform: "uppercase" as const }}>
                    Summary
                  </span>
                </div>
                <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, margin: 0 }}>
                  {decodeHtml(article.summary)}
                </p>
              </div>
            )}

            {/* Image or category banner */}
            {showImage ? (
              <div style={{
                height: 280, borderRadius: 12, overflow: "hidden",
                marginBottom: 36, border: `1px solid ${C.cardBorder}`,
                background: "#000",
              }}>
                <img
                  src={article.image_url!}
                  alt={article.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <CategoryBanner category={article.category} icon={article.icon} />
            )}

            {/* Read full story CTA — this is the only place the story link appears */}
            <div style={{
              background: C.cardBg, border: `1px solid ${C.cardBorder}`,
              borderRadius: 10, padding: "24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 12, marginBottom: 48,
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.body, marginBottom: 4 }}>
                  Read the full story
                </div>
                <div style={{ fontSize: 13, color: C.secondary }}>
                  Originally reported by <strong>{article.source}</strong>
                </div>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: C.brandDark, color: C.white,
                  padding: "12px 24px", borderRadius: 8,
                  textDecoration: "none", fontSize: 13, fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: 6,
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.brandMedium; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.brandDark; }}
              >
                Continue on {article.source}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

            {/* Related stories */}
            {related.length > 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 20 }}>
                  Related Stories
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {related.map(r => (
                    <Link key={r.slug} href={`/news/${r.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{
                        background: C.cardBg, border: `1px solid ${C.cardBorder}`,
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
                          <div style={{ fontSize: 11, color: C.tertiary, marginTop: 4 }}>
                            {r.source} · {new Date(r.published_at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                          </div>
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

          {/* SIDEBAR */}
          <aside className="sidebar" style={{ position: "sticky", top: 90, alignSelf: "start", display: "flex", flexDirection: "column", gap: 20 }}>

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

            <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 16 }}>More Stories</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {moreStories.map((a, i, arr) => (
                  <Link key={a.slug} href={`/news/${a.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: i < arr.length - 1 ? `1px solid ${C.divider}` : "none",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
                      <div>
                        <div style={{ marginBottom: 4 }}><Pill text={a.category} /></div>
                        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 13, color: C.body, lineHeight: 1.3, marginBottom: 3 }}>{a.title}</div>
                        <div style={{ fontSize: 11, color: C.tertiary }}>
                          {a.source} · {new Date(a.published_at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                        </div>
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

            <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.body, textTransform: "uppercase" as const, marginBottom: 14 }}>Trending Topics</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["#2027Elections","#INEC","#PeterObi","#APC","#Tinubu","#LabourParty"].map(tag => (
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

          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}