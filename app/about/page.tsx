"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "News",      href: "/news" },
  { label: "Education", href: "/education" },
  { label: "About Us",  href: "/about" },
];

const SOURCES = [
  { name: "Premium Times",    beat: "Politics, Governance" },
  { name: "Vanguard",         beat: "Politics, Economy" },
  { name: "Channels TV",      beat: "Breaking News, Security" },
  { name: "The Punch",        beat: "Politics, Society" },
  { name: "ThisDay",          beat: "Economy, Business" },
  { name: "Guardian Nigeria", beat: "Society, Education" },
  { name: "Daily Trust",      beat: "Northern Nigeria, Policy" },
  { name: "Sahara Reporters", beat: "Investigative, Politics" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "We Aggregate",     icon: "📡", desc: "Our system continuously monitors Nigeria's most trusted news outlets, pulling in political stories as they break — 24 hours a day, 7 days a week, across all 36 states and the FCT." },
  { step: "02", title: "We Summarise",     icon: "✦",  desc: "Every article is processed through our AI engine, which distills complex political stories into clear, accurate summaries — without spin, without agenda, and without losing the substance." },
  { step: "03", title: "We Contextualise", icon: "🗂️", desc: "Stories are tagged by category, region, political party, and relevance to the 2027 election cycle — so you always know exactly what you're reading and why it matters." },
  { step: "04", title: "We Deliver",       icon: "🇳🇬", desc: "You get clean, structured, verified political intelligence — whether you're a first-time voter, a policy analyst, a journalist, or just a Nigerian who gives a damn about what happens next." },
];

const FAQS = [
  { q: "Is Naija Election Watch affiliated with any political party?",  a: "Absolutely not. We have zero affiliation with any political party, candidate, campaign, or government body. We cover everyone — APC, PDP, Labour Party, and all others — with the same critical lens." },
  { q: "Who funds this platform?",                                       a: "Naija Election Watch is an independent platform. We are funded through advertising, newsletter sponsorships, and reader support — not by political actors or government agencies." },
  { q: "How do you ensure your AI summaries are accurate?",              a: "Our AI engine is trained to summarise, not editorialize. Every summary is grounded in the source article. We include a link to the original report so you can always verify what you're reading." },
  { q: "Can I report an error or inaccuracy?",                           a: "Yes — and we encourage it. If you spot something wrong, email us immediately at hello@naijaelectionwatch.ng. Corrections are published transparently." },
  { q: "Do you cover state-level elections too?",                        a: "Yes. While the 2027 presidential election is our primary focus, we cover governorship races, senatorial contests, and state house elections across all 36 states." },
  { q: "How often is the site updated?",                                 a: "Our news feed updates continuously. Major stories are processed and published within minutes of breaking. Daily briefing newsletters go out every morning at 7am WAT." },
];

const WHAT_WE_ARE_NOT = [
  { title: "Not a political party",        desc: "We do not campaign for or against any candidate or party. Our job is to inform, not to mobilise votes for anyone." },
  { title: "Not a propaganda outlet",      desc: "We are not funded by political interests and we do not publish sponsored political content disguised as news." },
  { title: "Not a replacement for voting", desc: "We exist to make you a more informed citizen — but democracy requires your actual participation. Register. Show up. Vote." },
  { title: "Not infallible",               desc: "We use advanced technology, but technology makes mistakes. We correct errors when they are identified, publicly and without excuse." },
];

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

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, marginRight: 32 }}>
            <Image src="/logo.png" alt="Naija Election Watch" width={36} height={36} style={{ borderRadius: 8, objectFit: "contain" }} />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, color: C.body, letterSpacing: 0.2 }}>Naija Election Watch</div>
              <div style={{ fontSize: 10, color: C.secondary, letterSpacing: "0.05em" }}>Tracking Democracy</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="nav-links-desktop" style={{ display: "flex", gap: 2, flex: 1, alignItems: "center" }}>
            {NAV_LINKS.map((item) => {
              const isActive = item.label === "About Us";
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
export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("hello@naijaelectionwatch.ng");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .how-grid          { grid-template-columns: 1fr !important; }
          .sources-grid      { grid-template-columns: 1fr 1fr !important; }
          .not-grid          { grid-template-columns: 1fr !important; }
          .contact-grid      { grid-template-columns: 1fr !important; }
          .footer-grid       { grid-template-columns: 1fr !important; gap: 32px !important; }
          .mission-grid      { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .mobile-panel { display: none !important; }
        }
        @media (max-width: 480px) {
          .sources-grid { grid-template-columns: 1fr !important; }
          .stat-row     { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <NavBar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: "70vh", background: C.brandDark,
        display: "flex", alignItems: "center",
        padding: "120px 5vw 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
          width: "60vw", height: "40vw", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(216,243,220,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(216,243,220,0.25)",
            background: "rgba(216,243,220,0.08)",
            borderRadius: 999, padding: "5px 16px", marginBottom: 32,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.mint }} />
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.mint, letterSpacing: "0.12em" }}>
              ABOUT NAIJA ELECTION WATCH
            </span>
          </div>

          <h1 style={{
            fontFamily: F.display, fontWeight: 800,
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            letterSpacing: "-0.03em", lineHeight: 0.95,
            color: C.white, marginBottom: 8,
          }}>
            Nigeria Deserves
          </h1>
          <h1 style={{
            fontFamily: F.display, fontWeight: 800,
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            letterSpacing: "-0.03em", lineHeight: 0.95,
            color: C.mint, marginBottom: 28,
          }}>
            Better Information.
          </h1>

          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: C.white70, lineHeight: 1.75, maxWidth: 640, marginBottom: 48 }}>
            Nigerian political news is scattered, biased, and buried in noise. Election data exists — but nobody makes it accessible. We built Naija Election Watch to change that. One platform. Every story. No agenda.
          </p>

          {/* Stats row */}
          <div className="stat-row" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12,
            overflow: "hidden", background: "rgba(255,255,255,0.05)",
            maxWidth: 640,
          }}>
            {[
              { value: "8+",   label: "Sources Monitored" },
              { value: "24/7", label: "Coverage" },
              { value: "36",   label: "States Covered" },
              { value: "2027", label: "Our Focus" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "20px 12px", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontFamily: F.mono, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, color: C.mint, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.white70, letterSpacing: "0.12em", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section style={{ background: C.pageBg, padding: "80px 5vw", borderTop: `1px solid ${C.divider}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 16 }}>
            OUR MISSION
          </div>

          <div className="mission-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: C.body, marginBottom: 24 }}>
                Make political data accessible to every Nigerian.
              </h2>
              <p style={{ fontSize: 16, color: C.secondary, lineHeight: 1.8, marginBottom: 20 }}>
                There are millions of Nigerians who want to be informed before they vote. They want to know what candidates stand for, how their representatives voted, what INEC is actually doing, and what the numbers mean for their community.
              </p>
              <p style={{ fontSize: 16, color: C.secondary, lineHeight: 1.8, marginBottom: 20 }}>
                But political intelligence in Nigeria is locked behind paywalls, buried in partisan commentary, scattered across dozens of websites, or written in language that assumes you already have a political science degree.
              </p>
              <p style={{ fontSize: 16, color: C.body, lineHeight: 1.8, fontWeight: 600 }}>
                We exist to close that gap. No spin. No allegiance. Just the information you need to participate in your democracy with confidence.
              </p>
            </div>

            {/* Mission pillars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "🔍", title: "Clarity over noise",      desc: "We cut through the daily storm of Nigerian political content to surface what actually matters — explained in plain language." },
                { icon: "⚖️", title: "Balance over bias",       desc: "Every party, every candidate, every region gets the same treatment. We don't have a preferred winner. Nigeria does." },
                { icon: "📲", title: "Access over exclusivity", desc: "This platform is built to work on a ₦30,000 Android with a 3G connection. Political intelligence isn't a luxury." },
                { icon: "🇳🇬", title: "Nigeria first",          desc: "We are not a foreign outlet covering Nigeria. We are a Nigerian platform built for Nigerians, from the ground up." },
              ].map(item => (
                <div key={item.title} style={{
                  background: C.newsletterBg, border: `1px solid ${C.cardBorder}`,
                  borderRadius: 10, padding: 18,
                  display: "flex", gap: 14, alignItems: "flex-start",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 14, color: C.body, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: C.newsletterBg, padding: "80px 5vw", borderTop: `1px solid ${C.divider}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 16 }}>
            HOW IT WORKS
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", color: C.body, marginBottom: 12 }}>
            Technology in service of truth.
          </h2>
          <p style={{ fontSize: 16, color: C.secondary, lineHeight: 1.7, maxWidth: 580, marginBottom: 52 }}>
            We use advanced technology to do the heavy lifting — so you get clean, structured political intelligence without wading through the noise yourself.
          </p>

          <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`,
                borderRadius: 12, padding: 24, position: "relative", overflow: "hidden",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontFamily: F.mono, fontSize: "3rem", fontWeight: 700, color: C.divider, position: "absolute", top: 12, right: 16, lineHeight: 1, userSelect: "none" as const }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.body, marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Methodology note */}
          <div style={{
            marginTop: 40, background: C.cardBg,
            border: `1px solid ${C.cardBorder}`,
            borderLeft: `3px solid ${C.brandMedium}`,
            borderRadius: 12, padding: 24,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                color: C.brandMedium, background: C.mint,
                padding: "3px 10px", borderRadius: 999, flexShrink: 0, marginTop: 2,
                textTransform: "uppercase" as const,
              }}>
                METHODOLOGY
              </span>
              <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, flex: 1, minWidth: 280, margin: 0 }}>
                All articles on Naija Election Watch are sourced from established Nigerian media outlets. Our AI engine summarises and categorises content — it does not generate original reporting. Every summary links to the original source article. We do not alter quotes, fabricate events, or editorialize beyond categorisation. When we make a mistake, we correct it publicly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR SOURCES ── */}
      <section style={{ background: C.pageBg, padding: "80px 5vw", borderTop: `1px solid ${C.divider}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 16 }}>
            OUR SOURCES
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", color: C.body, marginBottom: 12 }}>
            We only pull from outlets we trust.
          </h2>
          <p style={{ fontSize: 16, color: C.secondary, lineHeight: 1.7, maxWidth: 580, marginBottom: 40 }}>
            Our source list is curated — not exhaustive. We monitor Nigeria's most established outlets across regions, languages, and editorial perspectives. New sources are added only after review.
          </p>

          <div className="sources-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {SOURCES.map(s => (
              <div key={s.name} style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`,
                borderRadius: 10, padding: 18,
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.brandMedium; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.cardBorder; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.brandMedium, flexShrink: 0 }} />
                  <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 14, color: C.body }}>{s.name}</div>
                </div>
                <div style={{ fontSize: 11, color: C.tertiary, letterSpacing: "0.04em" }}>{s.beat}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: C.tertiary, marginTop: 24, lineHeight: 1.6 }}>
            We do not pay for stories, accept sponsored editorial content, or allow sources to influence how their reporting is presented on this platform.
          </p>
        </div>
      </section>

      {/* ── WHAT WE ARE NOT ── */}
      <section style={{ background: C.newsletterBg, padding: "80px 5vw", borderTop: `1px solid ${C.divider}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.red, textTransform: "uppercase" as const, marginBottom: 16 }}>
            WHAT WE ARE NOT
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", color: C.body, marginBottom: 12 }}>
            Let's be completely clear.
          </h2>
          <p style={{ fontSize: 16, color: C.secondary, lineHeight: 1.7, maxWidth: 580, marginBottom: 40 }}>
            In a country where media is frequently weaponised for political ends, we think it's important to say explicitly what this platform is not.
          </p>

          <div className="not-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {WHAT_WE_ARE_NOT.map(item => (
              <div key={item.title} style={{
                background: C.cardBg,
                border: `1px solid rgba(239,68,68,0.2)`,
                borderLeft: `3px solid ${C.red}`,
                borderRadius: 12, padding: 24,
                display: "flex", gap: 16, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0, color: C.red, fontWeight: 700,
                }}>
                  ✕
                </div>
                <div>
                  <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15, color: C.body, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: C.pageBg, padding: "80px 5vw", borderTop: `1px solid ${C.divider}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 16 }}>
            FAQ
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", color: C.body, marginBottom: 40 }}>
            Questions we get asked.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background: C.cardBg,
                border: `1px solid ${openFaq === i ? C.brandMedium : C.cardBorder}`,
                borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s",
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", background: "transparent", border: "none",
                  padding: "20px 24px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", gap: 16, textAlign: "left" as const,
                }}>
                  <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 15, color: C.body, lineHeight: 1.3 }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontSize: 20, color: C.brandMedium, flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                    display: "inline-block",
                  }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", borderTop: `1px solid ${C.divider}` }}>
                    <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, margin: "16px 0 0" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: C.newsletterBg, padding: "80px 5vw", borderTop: `1px solid ${C.divider}`, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "50vw", height: "30vw", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(27,67,50,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 16 }}>
            GET IN TOUCH
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", color: C.body, marginBottom: 12 }}>
            We want to hear from you.
          </h2>
          <p style={{ fontSize: 16, color: C.secondary, lineHeight: 1.7, maxWidth: 500, marginBottom: 48 }}>
            Spotted an error? Have a tip? Want to partner with us? Reach out — we read everything.
          </p>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

            {/* Left — contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Email */}
              <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 12 }}>
                  EMAIL
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <a href="mailto:hello@naijaelectionwatch.ng" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15, color: C.body, textDecoration: "none" }}>
                    hello@naijaelectionwatch.ng
                  </a>
                  <button onClick={handleEmailCopy} style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                    background: "transparent",
                    border: `1px solid ${emailCopied ? C.brandMedium : C.divider}`,
                    color: emailCopied ? C.brandMedium : C.secondary,
                    padding: "5px 12px", borderRadius: 6, cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                    {emailCopied ? "COPIED!" : "COPY"}
                  </button>
                </div>
                <p style={{ fontSize: 13, color: C.secondary, margin: "10px 0 0", lineHeight: 1.6 }}>
                  For corrections, tips, press enquiries, and partnership requests.
                </p>
              </div>

              {/* Social */}
              <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 16 }}>
                  FOLLOW US
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { platform: "X (Twitter)", handle: "@naijaelectionwatch", icon: "𝕏" },
                    { platform: "Instagram",   handle: "@naijaelectionwatch", icon: "📷" },
                    { platform: "Facebook",    handle: "Naija Election Watch", icon: "f" },
                    { platform: "Telegram",    handle: "NaijaElectionWatch",   icon: "✈️" },
                  ].map(s => (
                    <a key={s.platform} href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: C.newsletterBg, border: `1px solid ${C.divider}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, flexShrink: 0,
                      }}>
                        {s.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 13, color: C.body }}>{s.platform}</div>
                        <div style={{ fontSize: 11, color: C.tertiary, letterSpacing: "0.06em" }}>{s.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — closing statement */}
            <div style={{
              background: C.brandDark,
              border: `1px solid ${C.brandDark}`,
              borderRadius: 12, padding: 32,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: 32, marginBottom: 20 }}>🇳🇬</div>
                <h3 style={{
                  fontFamily: F.display, fontWeight: 700,
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  letterSpacing: "-0.02em", color: C.white,
                  lineHeight: 1.2, marginBottom: 16,
                }}>
                  This platform exists because Nigeria deserves better.
                </h3>
                <p style={{ fontSize: 15, color: C.white70, lineHeight: 1.8, marginBottom: 16 }}>
                  Not better politicians. Not better promises. Better information. Because an informed electorate is the only thing that makes democracy real.
                </p>
                <p style={{ fontSize: 15, color: C.white70, lineHeight: 1.8 }}>
                  We are not here to tell you who to vote for. We are here to make sure that when you decide — you decide knowing the facts.
                </p>
              </div>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: C.mint, textTransform: "uppercase" as const }}>
                  NAIJA ELECTION WATCH · EST. 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}