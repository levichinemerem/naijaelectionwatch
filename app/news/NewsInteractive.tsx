"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/app/components/NewsletterForm";
import type { Article } from "./page";

/* ─── paste your full design system (C, F constants) here ─── */
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

type Category = "All" | "Politics" | "Economy" | "Security" | "Society" | "Education";

const SOURCES    = ["Premium Times","Channels TV","Punch","ThisDay","Daily Post","Daily Trust","Sahara Reporters","Leadership"];
const TAGS       = ["#2027Elections","#INEC","#PeterObi","#APC","#Tinubu","#LabourParty"];
const CATEGORIES: Category[] = ["All","Politics","Economy","Security","Society","Education"];

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "News",      href: "/news" },
  { label: "Education", href: "/education" },
  { label: "About Us",  href: "/about" },
];

/* ─── keep all your existing sub-components exactly as-is ─── */
/* Pill, NavBar, ArticleCard, Sidebar, Footer — paste them here unchanged */

/* ─── MAIN INTERACTIVE COMPONENT ─── */
export default function NewsInteractive({ articles }: { articles: Article[] }) {
  const [filter, setFilter]   = useState<Category>("All");
  const [search, setSearch]   = useState("");
  const [sort, setSort]       = useState<"latest" | "oldest">("latest");
  const [visible, setVisible] = useState(20);
  const [loading, setLoading] = useState(false);

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
          .footer-grid   { grid-template-columns: 1fr !important; gap: 32px !important; }
          .article-thumb { width: 80px !important; min-height: 80px !important; font-size: 26px !important; }
        }
      `}</style>

      <NavBar />

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
                background: C.pageBg, border: `1px solid ${C.divider}`,
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
                padding: "5px 13px", borderRadius: 999, cursor: "pointer", transition: "all 0.2s",
              }}>
                {cat}
              </button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value as "latest" | "oldest")} style={{
            fontFamily: F.mono, fontSize: 12,
            background: C.pageBg, border: `1px solid ${C.divider}`,
            borderRadius: 8, color: C.body, padding: "8px 12px",
            cursor: "pointer", marginLeft: "auto", outline: "none",
          }}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ background: C.newsletterBg, padding: "40px 5vw 80px", borderTop: `1px solid ${C.divider}` }}>
        <div className="main-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 32 }}>
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: C.secondary }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16 }}>No stories found for &quot;{search}&quot;</div>
              </div>
            ) : (
              filtered.map(a => <ArticleCard key={a.id} article={a} />)
            )}
            {hasMore && (
              <button onClick={loadMore} disabled={loading} style={{
                width: "100%", background: "transparent",
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