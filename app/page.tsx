"use client";
import { useState, useEffect, useRef } from "react";
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

/* ─── DATA ─── */
const BREAKING = [
  "INEC releases new voter distribution data across 36 states",
  "Supreme Court dismisses suit on candidate eligibility",
  "Youth turnout rises in 14 states following registration drive",
  "New security deployment confirmed for FCT and border zones",
  "APC holds emergency NEC meeting in Abuja ahead of primaries",
];

const STORIES = [
  { tag: "POLITICS", title: "What the New Voter Data Means for the 2027 Elections",       summary: "INEC's latest figures reveal a 23% surge in youth registrations. We break down what the numbers mean for each geopolitical zone.", source: "Premium Times", time: "2h ago",  read: "5 min", icon: "🗳️" },
  { tag: "ECONOMY",  title: "How Elections Influence Nigeria's Economy",                   summary: "Understanding the spending cycle, naira volatility, and investor sentiment in election years.",                                       source: "Vanguard",       time: "4h ago",  read: "4 min", icon: "📈" },
  { tag: "SECURITY", title: "Election Security Update: 36 States Under Watch",            summary: "Security agencies share deployment strategy and risk assessment ahead of party primaries.",                                           source: "Channels TV",    time: "6h ago",  read: "3 min", icon: "🛡️" },
  { tag: "POLITICS", title: "Northern Governors Reach Consensus on APC Ticket Strategy",  summary: "Closed-door summit in Kaduna produces a unified bloc ahead of the presidential primary.",                                            source: "ThisDay",        time: "8h ago",  read: "4 min", icon: "🏛️" },
  { tag: "SOCIETY",  title: "Diaspora Nigerians Push for Overseas Voting Rights",          summary: "A coalition of 14 civil society groups files a fresh suit at the Federal High Court.",                                               source: "Guardian NG",    time: "10h ago", read: "3 min", icon: "🌍" },
  { tag: "ECONOMY",  title: "How Campaign Spending Shapes the Naira Every Election Cycle", summary: "Economists track the predictable currency pressure that follows major party primaries.",                                              source: "Punch",          time: "12h ago", read: "4 min", icon: "💰" },
];

const EDUCATION = [
  { label: "HOW IT WORKS",  title: "How Nigerian Elections Work",        desc: "A simple breakdown of INEC's process from registration to declaration.", icon: "🗳️" },
  { label: "VOTING SYSTEM", title: "Understanding the Voting Systems",   desc: "Learn about plurality, majority and proportional representation.",        icon: "⚖️" },
  { label: "KEY TERMS",     title: "Key Electoral Terms Explained",      desc: "Essential glossary every Nigerian voter should know before 2027.",         icon: "📖" },
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

  const navLinks = [
    { label: "Home",      href: "/" },
    { label: "News",      href: "/news" },
    { label: "Education", href: "/education" },
    { label: "About Us",  href: "/about" },
  ];

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
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, marginRight: 32 }}>
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
          </a>

          {/* Desktop nav */}
          <div className="nav-links-desktop" style={{ display: "flex", gap: 2, flex: 1, alignItems: "center" }}>
            {navLinks.map((item, i) => (
              <a key={item.label} href={item.href} style={{
                color: i === 0 ? C.brandMedium : C.body,
                fontSize: 14, fontWeight: 500,
                padding: "8px 16px",
                paddingBottom: i === 0 ? 6 : 8,
                borderRadius: 6, textDecoration: "none", letterSpacing: 0.2,
                transition: "color 0.2s",
                borderBottom: i === 0 ? `2px solid ${C.brandMedium}` : "2px solid transparent",
              }}
              onMouseEnter={e => { if (i !== 0) e.currentTarget.style.color = C.brandMedium; }}
              onMouseLeave={e => { if (i !== 0) e.currentTarget.style.color = C.body; }}>
                {item.label}
              </a>
            ))}
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
          {navLinks.map((item, i) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
              color: i === 0 ? C.brandMedium : C.body,
              fontSize: 20, fontWeight: i === 0 ? 600 : 400,
              padding: "16px 0", textDecoration: "none",
              borderBottom: `1px solid ${C.divider}`,
            }}>
              {item.label}
            </a>
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

/* ─── HERO ─── */
function Hero() {
  const [vals, setVals] = useState([0, 0, 0, 0]);
  const targets = [36, 774, 119, 360];

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVals(targets.map(t => Math.round(t * ease)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const statLabels = ["STATES", "LGAS", "SENATORIAL", "REPS"];

  return (
    <section style={{
      minHeight: "100vh", background: C.brandDark,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px 5vw 80px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "60vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(216,243,220,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", width: "100%", textAlign: "center", position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          border: "1px solid rgba(216,243,220,0.25)",
          background: "rgba(216,243,220,0.08)",
          borderRadius: 999, padding: "5px 16px", marginBottom: 36,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.mint }} />
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.mint, letterSpacing: 1.5 }}>
            2027 ELECTION CYCLE — TRACKING DEMOCRACY
          </span>
        </div>

        <h1 style={{ fontFamily: F.display, fontSize: "clamp(42px, 8vw, 96px)", fontWeight: 900, lineHeight: 0.95, margin: "0 0 6px", color: C.white, letterSpacing: -3 }}>
          Democracy
        </h1>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(42px, 8vw, 96px)", fontWeight: 900, lineHeight: 0.95, margin: "0 0 32px", color: C.mint, letterSpacing: -3 }}>
          Reimagined
        </h1>

        <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: C.white70, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 48px" }}>
          Nigeria's most advanced election intelligence platform. Real-time data, verified news, and civic education for the digital age.
        </p>

        <div className="stat-bar" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12,
          overflow: "hidden", background: "rgba(255,255,255,0.05)",
          maxWidth: 700, margin: "0 auto",
        }}>
          {vals.map((v, i) => (
            <div key={i} style={{
              padding: "28px 16px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: F.mono, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: C.mint, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.white70, letterSpacing: 2, marginTop: 8 }}>{statLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TICKER ─── */
function Ticker() {
  const text = BREAKING.join("    ●    ");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0;
    const el = ref.current;
    if (!el) return;
    const iv = setInterval(() => {
      x -= 1.2;
      if (x < -el.scrollWidth / 2) x = 0;
      el.style.transform = `translateX(${x}px)`;
    }, 16);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: C.red, overflow: "hidden", display: "flex", alignItems: "stretch" }}>
      <div style={{
        background: "#b91c1c", padding: "10px 18px", fontWeight: 700, fontSize: 11,
        color: "#fff", whiteSpace: "nowrap", display: "flex", alignItems: "center",
        gap: 8, flexShrink: 0, letterSpacing: "0.05em", textTransform: "uppercase" as const,
      }}>
        ⚡ BREAKING
      </div>
      <div style={{ overflow: "hidden", flex: 1, display: "flex", alignItems: "center" }}>
        <div ref={ref} style={{ whiteSpace: "nowrap", display: "inline-block", willChange: "transform" }}>
          <span style={{ fontSize: 13, color: "#fff" }}>&nbsp;&nbsp;{text}&nbsp;&nbsp;{text}&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  );
}

/* ─── NEWS FEED ─── */
function NewsFeed() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Politics", "Economy", "Security", "Society"];
  const visible = filter === "All" ? STORIES : STORIES.filter(s => s.tag === filter.toUpperCase());

  return (
    <section style={{ background: C.pageBg, padding: "64px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: C.body, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            LATEST INTELLIGENCE
          </h2>
          <a href="/news" style={{ fontSize: 13, color: C.brandMedium, textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" as const }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? C.brandDark : "transparent",
              border: `1px solid ${filter === f ? C.brandDark : C.divider}`,
              color: filter === f ? C.white : C.secondary,
              padding: "6px 16px", borderRadius: 999, fontSize: 13,
              fontWeight: filter === f ? 700 : 500,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", flexShrink: 0,
            }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {visible.map((s, i) => (
            <article key={i} style={{
              background: C.cardBg, border: `1px solid ${C.cardBorder}`,
              borderRadius: 12, overflow: "hidden", cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{
                height: 180, background: "linear-gradient(135deg, #e8f0eb 0%, #d4e6d9 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 44, borderBottom: `1px solid ${C.divider}`,
              }}>
                {s.icon}
              </div>
              <div style={{ padding: 20 }}>
                <Pill text={s.tag} />
                <h3 style={{
                  fontFamily: F.display, fontSize: 17, fontWeight: 700, color: C.body,
                  margin: "12px 0 8px", lineHeight: 1.35,
                  display: "-webkit-box", WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontSize: 14, color: C.secondary, margin: "0 0 20px", lineHeight: 1.65,
                  display: "-webkit-box", WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {s.summary}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: `1px solid ${C.divider}` }}>
                  <span style={{ fontSize: 12, color: C.tertiary }}>{s.source} · {s.time}</span>
                  <span style={{ fontSize: 12, color: C.brandMedium, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    {s.read}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button style={{
            background: "transparent", border: `1.5px solid ${C.brandDark}`,
            color: C.brandDark, padding: "11px 36px", borderRadius: 8,
            fontSize: 13, cursor: "pointer", fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.brandDark; e.currentTarget.style.color = C.white; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.brandDark; }}>
            Load More Stories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── DATA TEASER ─── */
function DataTeaser() {
  const items = [
    { icon: "🗺️", title: "Election Map",      desc: "Live state-by-state results" },
    { icon: "⚖️", title: "Candidate Compare", desc: "Side-by-side policy comparison" },
    { icon: "📊", title: "Historical Trends", desc: "Data from 1999 to present" },
    { icon: "📡", title: "Live Tracker",      desc: "Real-time seat projections" },
  ];

  return (
    <section style={{ background: C.pageBg, padding: "64px 5vw", borderTop: `1px solid ${C.divider}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, color: C.body, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            DATA EXPLORER
          </h2>
          <Pill text="COMING SOON" />
        </div>
        <p style={{ fontSize: 14, color: C.secondary, margin: "0 0 28px" }}>
          Powerful election intelligence tools — launching before campaign season.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {items.map(item => (
            <div key={item.title} style={{
              background: C.cardBg, border: `1px solid ${C.cardBorder}`,
              borderRadius: 12, padding: 24, opacity: 0.6,
              transition: "opacity 0.2s, box-shadow 0.2s, transform 0.2s", cursor: "default",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, color: C.body, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: C.secondary }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION HUB ─── */
function EducationHub() {
  return (
    <section style={{ background: C.newsletterBg, padding: "64px 5vw", borderTop: `1px solid ${C.divider}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: C.brandMedium, letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700, textTransform: "uppercase" as const }}>
              EDUCATION HUB
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 700, color: C.body, margin: 0 }}>
              Learn. Understand. Participate.
            </h2>
          </div>
          <a href="/education" style={{ fontSize: 13, color: C.brandMedium, textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            View All Articles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {EDUCATION.map(item => (
            <div key={item.title} style={{
              background: C.cardBg, border: `1px solid ${C.cardBorder}`,
              borderRadius: 12, padding: 28, cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 11, color: C.brandMedium, letterSpacing: "0.08em", marginBottom: 14, fontWeight: 700, textTransform: "uppercase" as const }}>
                {item.label}
              </div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontFamily: F.display, fontSize: 17, fontWeight: 700, color: C.body, margin: "0 0 8px" }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: C.secondary, margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── NEWSLETTER ─── */
function Newsletter() {
  return (
    <section style={{ background: C.pageBg, padding: "80px 5vw", borderTop: `1px solid ${C.divider}`, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "50vw", height: "30vw", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(27,67,50,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%", background: C.mint,
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.mintText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <div style={{ fontSize: 11, color: C.brandMedium, letterSpacing: "0.1em", marginBottom: 14, fontWeight: 700, textTransform: "uppercase" as const }}>
          STAY INFORMED
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: C.body, margin: "0 0 14px", letterSpacing: -1 }}>
          Stay Ahead of the Election Curve
        </h2>
        <p style={{ fontSize: 15, color: C.secondary, margin: "0 0 36px", lineHeight: 1.7 }}>
          Real-time alerts, in-depth analysis, and important updates delivered straight to your inbox.
        </p>
        <NewsletterForm />
        <p style={{ fontSize: 12, color: C.tertiary, marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
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

/* ─── PAGE ─── */
export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .stat-bar          { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 769px) {
          .mobile-panel { display: none !important; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
      <NavBar />
      <Hero />
      <Ticker />
      <NewsFeed />
      <DataTeaser />
      <EducationHub />
      <Newsletter />
      <Footer />
    </>
  );
}
