"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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

const NAV_LINKS = [
  { label:"Home",      href:"/" },
  { label:"News",      href:"/news" },
  { label:"Education", href:"/education" },
  { label:"About Us",  href:"/about" },
];

const SOURCES = [
  { name:"Premium Times",    beat:"Politics, Governance",    url:"#" },
  { name:"Vanguard",         beat:"Politics, Economy",       url:"#" },
  { name:"Channels TV",      beat:"Breaking News, Security", url:"#" },
  { name:"The Punch",        beat:"Politics, Society",       url:"#" },
  { name:"ThisDay",          beat:"Economy, Business",       url:"#" },
  { name:"Guardian Nigeria", beat:"Society, Education",      url:"#" },
  { name:"Daily Trust",      beat:"Northern Nigeria, Policy",url:"#" },
  { name:"Sahara Reporters", beat:"Investigative, Politics", url:"#" },
];

const HOW_IT_WORKS = [
  { step:"01", title:"We Aggregate", desc:"Our system continuously monitors Nigeria's most trusted news outlets, pulling in political stories as they break — 24 hours a day, 7 days a week, across all 36 states and the FCT.", icon:"📡" },
  { step:"02", title:"We Summarise", desc:"Every article is processed through our AI engine, which distills complex political stories into clear, accurate summaries — without spin, without agenda, and without losing the substance.", icon:"✦" },
  { step:"03", title:"We Contextualise", desc:"Stories are tagged by category, region, political party, and relevance to the 2027 election cycle — so you always know exactly what you're reading and why it matters.", icon:"🗂️" },
  { step:"04", title:"We Deliver", desc:"You get clean, structured, verified political intelligence — whether you're a first-time voter, a policy analyst, a journalist, or just a Nigerian who gives a damn about what happens next.", icon:"🇳🇬" },
];

const FAQS = [
  { q:"Is Naija Election Watch affiliated with any political party?", a:"Absolutely not. We have zero affiliation with any political party, candidate, campaign, or government body. We cover everyone — APC, PDP, Labour Party, and all others — with the same critical lens." },
  { q:"Who funds this platform?", a:"Naija Election Watch is an independent platform. We are funded through advertising, newsletter sponsorships, and reader support — not by political actors or government agencies." },
  { q:"How do you ensure your AI summaries are accurate?", a:"Our AI engine is trained to summarise, not editorialize. Every summary is grounded in the source article. We include a link to the original report so you can always verify what you're reading." },
  { q:"Can I report an error or inaccuracy?", a:"Yes — and we encourage it. If you spot something wrong, email us immediately at hello@naijaelectionwatch.ng. Corrections are published transparently." },
  { q:"Do you cover state-level elections too?", a:"Yes. While the 2027 presidential election is our primary focus, we cover governorship races, senatorial contests, and state house elections across all 36 states." },
  { q:"How often is the site updated?", a:"Our news feed updates continuously. Major stories are processed and published within minutes of breaking. Daily briefing newsletters go out every morning at 7am WAT." },
];

const WHAT_WE_ARE_NOT = [
  { title:"Not a political party",        desc:"We do not campaign for or against any candidate or party. Our job is to inform, not to mobilise votes for anyone.", icon:"🚫" },
  { title:"Not a propaganda outlet",      desc:"We are not funded by political interests and we do not publish sponsored political content disguised as news.", icon:"🚫" },
  { title:"Not a replacement for voting", desc:"We exist to make you a more informed citizen — but democracy requires your actual participation. Register. Show up. Vote.", icon:"🚫" },
  { title:"Not infallible",               desc:"We use advanced technology, but technology makes mistakes. We correct errors when they are identified, publicly and without excuse.", icon:"🚫" },
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
            <div style={{ fontFamily:F.display, fontSize:13, color:C.white }}><span style={{ fontWeight:700 }}>Naija</span><span style={{ fontWeight:300 }}> Election</span></div>
            <div style={{ fontFamily:F.mono, fontSize:9, color:C.muted, letterSpacing:"0.18em" }}>WATCH · 2027</div>
          </div>
        </Link>
        <div className="nav-links" style={{ display:"flex", gap:2, flex:1 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{ fontFamily:F.body, fontSize:13, color: label==="About Us" ? C.green : C.muted, padding:"5px 12px", borderRadius:5, textDecoration:"none", borderBottom: label==="About Us" ? `2px solid ${C.green}` : "2px solid transparent" }}>
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
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Inter',sans-serif; background:#0a0f0a; color:#f0f4f0; -webkit-font-smoothing:antialiased; }
        input::placeholder, textarea::placeholder { color:rgba(240,244,240,0.3); }
        button:active { transform:scale(0.97); }
        a { transition:color 0.2s; }
        @media(max-width:768px) {
          .nav-links { display:none!important; }
          .how-grid { grid-template-columns:1fr!important; }
          .sources-grid { grid-template-columns:1fr 1fr!important; }
          .not-grid { grid-template-columns:1fr!important; }
          .footer-grid { grid-template-columns:1fr 1fr!important; }
          .footer-grid>div:first-child { grid-column:span 2!important; }
          .contact-grid { grid-template-columns:1fr!important; }
        }
        @media(max-width:480px) {
          .sources-grid { grid-template-columns:1fr!important; }
          .stat-row { grid-template-columns:1fr 1fr!important; }
        }
      `}</style>

      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ minHeight:"70vh", background:C.bg, display:"flex", alignItems:"center", padding:"100px 5vw 64px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"48px 48px", opacity:0.5, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:"60vw", height:"40vw", borderRadius:"50%", background:`radial-gradient(ellipse,rgba(0,220,130,0.07) 0%,transparent 65%)`, pointerEvents:"none" }} />

        <div style={{ maxWidth:860, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:`0.5px solid ${C.borderHi}`, background:C.greenDim, borderRadius:20, padding:"5px 16px", marginBottom:32 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:C.green }} />
            <span style={{ fontFamily:F.mono, fontSize:"0.7rem", color:C.green, letterSpacing:"0.12em" }}>ABOUT NAIJA ELECTION WATCH</span>
          </div>

          <h1 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(2.4rem,6vw,5.5rem)", letterSpacing:"-0.03em", lineHeight:0.95, color:C.white, marginBottom:24 }}>
            Nigeria Deserves<br />
            <span style={{ background:`linear-gradient(90deg,${C.green},#00ffaa)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Better Information.
            </span>
          </h1>

          <p style={{ fontFamily:F.body, fontSize:"clamp(16px,2vw,20px)", color:C.muted, lineHeight:1.75, maxWidth:640, marginBottom:40 }}>
            Nigerian political news is scattered, biased, and buried in noise. Election data exists — but nobody makes it accessible. We built Naija Election Watch to change that. One platform. Every story. No agenda.
          </p>

          {/* Stats row */}
          <div className="stat-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:C.border, borderRadius:12, overflow:"hidden", border:`0.5px solid ${C.border}`, maxWidth:640 }}>
            {[
              { value:"8+",   label:"Sources Monitored" },
              { value:"24/7", label:"Coverage" },
              { value:"36",   label:"States Covered" },
              { value:"2027", label:"Our Focus" },
            ].map((s,i) => (
              <div key={i} style={{ background:C.bg3, padding:"18px 12px", textAlign:"center" }}>
                <div style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(20px,3vw,28px)", color:C.green, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.muted, letterSpacing:"0.12em", marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ──────────────────────────────────────────────────── */}
      <section style={{ background:C.bg2, padding:"80px 5vw", borderTop:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>OUR MISSION</div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} className="how-grid">
            <div>
              <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.8rem,4vw,3rem)", letterSpacing:"-0.03em", lineHeight:1.05, color:C.white, marginBottom:24 }}>
                Make political data accessible to every Nigerian.
              </h2>
              <p style={{ fontFamily:F.body, fontSize:16, color:C.muted, lineHeight:1.8, marginBottom:20 }}>
                There are millions of Nigerians who want to be informed before they vote. They want to know what candidates stand for, how their representatives voted, what INEC is actually doing, and what the numbers mean for their community.
              </p>
              <p style={{ fontFamily:F.body, fontSize:16, color:C.muted, lineHeight:1.8, marginBottom:20 }}>
                But political intelligence in Nigeria is locked behind paywalls, buried in partisan commentary, scattered across dozens of websites, or written in language that assumes you already have a political science degree.
              </p>
              <p style={{ fontFamily:F.body, fontSize:16, color:C.white, lineHeight:1.8, fontWeight:500 }}>
                We exist to close that gap. No spin. No allegiance. Just the information you need to participate in your democracy with confidence.
              </p>
            </div>

            {/* Mission pillars */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { icon:"🔍", title:"Clarity over noise",      desc:"We cut through the daily storm of Nigerian political content to surface what actually matters — explained in plain language." },
                { icon:"⚖️", title:"Balance over bias",       desc:"Every party, every candidate, every region gets the same treatment. We don't have a preferred winner. Nigeria does." },
                { icon:"📲", title:"Access over exclusivity", desc:"This platform is built to work on a ₦30,000 Android with a 3G connection. Political intelligence isn't a luxury." },
                { icon:"🇳🇬", title:"Nigeria first",          desc:"We are not a foreign outlet covering Nigeria. We are a Nigerian platform built for Nigerians, from the ground up." },
              ].map(item => (
                <div key={item.title} style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:10, padding:18, display:"flex", gap:14, alignItems:"flex-start" }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily:F.display, fontWeight:600, fontSize:14, color:C.white, marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{ background:C.bg, padding:"80px 5vw", borderTop:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.8rem,3vw,2.5rem)", letterSpacing:"-0.03em", color:C.white, marginBottom:12 }}>Technology in service of truth.</h2>
          <p style={{ fontFamily:F.body, fontSize:16, color:C.muted, lineHeight:1.7, maxWidth:580, marginBottom:52 }}>
            We use advanced technology to do the heavy lifting — so you get clean, structured political intelligence without wading through the noise yourself.
          </p>

          <div className="how-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:24, position:"relative", overflow:"hidden" }}>
                <div style={{ fontFamily:F.mono, fontSize:"3rem", fontWeight:700, color:C.border, position:"absolute", top:12, right:16, lineHeight:1, userSelect:"none" }}>{item.step}</div>
                <div style={{ fontSize:28, marginBottom:16 }}>{item.icon}</div>
                <div style={{ fontFamily:F.display, fontWeight:700, fontSize:16, color:C.white, marginBottom:10 }}>{item.title}</div>
                <div style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Methodology note */}
          <div style={{ marginTop:40, background:C.bg3, border:`0.5px solid ${C.borderHi}`, borderRadius:12, padding:24 }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:14, flexWrap:"wrap" }}>
              <span style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, background:C.greenDim, border:`0.5px solid ${C.border}`, padding:"3px 10px", borderRadius:3, flexShrink:0, marginTop:2 }}>METHODOLOGY</span>
              <p style={{ fontFamily:F.body, fontSize:14, color:C.muted, lineHeight:1.75, flex:1, minWidth:280 }}>
                All articles on Naija Election Watch are sourced from established Nigerian media outlets. Our AI engine summarises and categorises content — it does not generate original reporting. Every summary links to the original source article. We do not alter quotes, fabricate events, or editorialize beyond categorisation. When we make a mistake, we correct it publicly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR SOURCES ──────────────────────────────────────────────────── */}
      <section style={{ background:C.bg2, padding:"80px 5vw", borderTop:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>OUR SOURCES</div>
          <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.8rem,3vw,2.5rem)", letterSpacing:"-0.03em", color:C.white, marginBottom:12 }}>We only pull from outlets we trust.</h2>
          <p style={{ fontFamily:F.body, fontSize:16, color:C.muted, lineHeight:1.7, maxWidth:580, marginBottom:40 }}>
            Our source list is curated — not exhaustive. We monitor Nigeria's most established outlets across regions, languages, and editorial perspectives. New sources are added only after review.
          </p>

          <div className="sources-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {SOURCES.map(s => (
              <div key={s.name} style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:10, padding:18, transition:"border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor=C.borderHi)}
                onMouseLeave={e => (e.currentTarget.style.borderColor=C.border)}
              >
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:C.green, flexShrink:0 }} />
                  <div style={{ fontFamily:F.display, fontWeight:600, fontSize:14, color:C.white }}>{s.name}</div>
                </div>
                <div style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.08em", color:C.muted }}>{s.beat}</div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily:F.body, fontSize:13, color:C.faint, marginTop:24, lineHeight:1.6 }}>
            We do not pay for stories, accept sponsored editorial content, or allow sources to influence how their reporting is presented on this platform.
          </p>
        </div>
      </section>

      {/* ── WHAT WE ARE NOT ──────────────────────────────────────────────── */}
      <section style={{ background:C.bg, padding:"80px 5vw", borderTop:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.red, marginBottom:16 }}>WHAT WE ARE NOT</div>
          <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.8rem,3vw,2.5rem)", letterSpacing:"-0.03em", color:C.white, marginBottom:12 }}>Let's be completely clear.</h2>
          <p style={{ fontFamily:F.body, fontSize:16, color:C.muted, lineHeight:1.7, maxWidth:580, marginBottom:40 }}>
            In a country where media is frequently weaponised for political ends, we think it's important to say explicitly what this platform is not.
          </p>

          <div className="not-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
            {WHAT_WE_ARE_NOT.map(item => (
              <div key={item.title} style={{ background:C.bg3, border:`0.5px solid rgba(239,68,68,0.15)`, borderRadius:12, padding:24, display:"flex", gap:16, alignItems:"flex-start" }}>
                <div style={{ width:36, height:36, borderRadius:8, background:"rgba(239,68,68,0.1)", border:"0.5px solid rgba(239,68,68,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:F.display, fontWeight:700, fontSize:15, color:C.white, marginBottom:6 }}>{item.title}</div>
                  <div style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ background:C.bg2, padding:"80px 5vw", borderTop:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>FAQ</div>
          <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.8rem,3vw,2.5rem)", letterSpacing:"-0.03em", color:C.white, marginBottom:40 }}>Questions we get asked.</h2>

          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background:C.bg3, border:`0.5px solid ${openFaq===i ? C.borderHi : C.border}`, borderRadius:10, overflow:"hidden", transition:"border-color 0.2s" }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  style={{ width:"100%", background:"transparent", border:"none", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", gap:16, textAlign:"left" }}>
                  <span style={{ fontFamily:F.display, fontWeight:600, fontSize:15, color:C.white, lineHeight:1.3 }}>{faq.q}</span>
                  <span style={{ fontFamily:F.mono, fontSize:18, color:C.green, flexShrink:0, transition:"transform 0.2s", transform: openFaq===i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:"0 24px 20px" }}>
                    <p style={{ fontFamily:F.body, fontSize:14, color:C.muted, lineHeight:1.75, margin:0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section style={{ background:C.bg, padding:"80px 5vw", borderTop:`0.5px solid ${C.border}`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"50vw", height:"30vw", borderRadius:"50%", background:`radial-gradient(ellipse,rgba(0,220,130,0.06) 0%,transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>GET IN TOUCH</div>
          <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.8rem,3vw,2.5rem)", letterSpacing:"-0.03em", color:C.white, marginBottom:12 }}>We want to hear from you.</h2>
          <p style={{ fontFamily:F.body, fontSize:16, color:C.muted, lineHeight:1.7, maxWidth:500, marginBottom:48 }}>
            Spotted an error? Have a tip? Want to partner with us? Reach out — we read everything.
          </p>

          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }}>
            {/* Left — contact info */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Email */}
              <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:24 }}>
                <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:12 }}>EMAIL</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
                  <a href="mailto:hello@naijaelectionwatch.ng" style={{ fontFamily:F.display, fontWeight:600, fontSize:16, color:C.white, textDecoration:"none" }}>
                    hello@naijaelectionwatch.ng
                  </a>
                  <button onClick={handleEmailCopy}
                    style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.1em", background:"transparent", border:`0.5px solid ${C.border}`, color: emailCopied ? C.green : C.muted, padding:"5px 12px", borderRadius:6, cursor:"pointer" }}>
                    {emailCopied ? "COPIED!" : "COPY"}
                  </button>
                </div>
                <p style={{ fontFamily:F.body, fontSize:13, color:C.muted, margin:"10px 0 0", lineHeight:1.6 }}>For corrections, tips, press enquiries, and partnership requests.</p>
              </div>

              {/* Social */}
              <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:24 }}>
                <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>FOLLOW US</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {[
                    { platform:"X (Twitter)", handle:"@naijaelectionwatch", icon:"𝕏", url:"#" },
                    { platform:"Instagram",   handle:"@naijaelectionwatch", icon:"📷", url:"#" },
                    { platform:"Facebook",    handle:"Naija Election Watch", icon:"f",  url:"#" },
                    { platform:"Telegram",    handle:"NaijaElectionWatch",   icon:"✈️", url:"#" },
                  ].map(s => (
                    <a key={s.platform} href={s.url} style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}
                      onMouseEnter={e => (e.currentTarget.querySelector(".sh") as HTMLElement).style.color=C.white}
                      onMouseLeave={e => (e.currentTarget.querySelector(".sh") as HTMLElement).style.color=C.muted}
                    >
                      <div style={{ width:32, height:32, borderRadius:8, background:C.bg, border:`0.5px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{s.icon}</div>
                      <div>
                        <div style={{ fontFamily:F.display, fontWeight:600, fontSize:13, color:C.white }}>{s.platform}</div>
                        <div className="sh" style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.muted, letterSpacing:"0.08em", transition:"color 0.2s" }}>{s.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — closing statement */}
            <div style={{ background:C.bg3, border:`0.5px solid ${C.borderHi}`, borderRadius:12, padding:32, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:32, marginBottom:20 }}>🇳🇬</div>
                <h3 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.4rem,2.5vw,2rem)", letterSpacing:"-0.02em", color:C.white, lineHeight:1.2, marginBottom:16 }}>
                  This platform exists because Nigeria deserves better.
                </h3>
                <p style={{ fontFamily:F.body, fontSize:15, color:C.muted, lineHeight:1.8, marginBottom:16 }}>
                  Not better politicians. Not better promises. Better information. Because an informed electorate is the only thing that makes democracy real.
                </p>
                <p style={{ fontFamily:F.body, fontSize:15, color:C.muted, lineHeight:1.8 }}>
                  We are not here to tell you who to vote for. We are here to make sure that when you decide — you decide knowing the facts.
                </p>
              </div>
              <div style={{ marginTop:32, paddingTop:24, borderTop:`0.5px solid ${C.border}` }}>
                <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green }}>NAIJA ELECTION WATCH · EST. 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}