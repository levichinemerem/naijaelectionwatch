"use client";
import { useState, useEffect, useRef } from "react";
import NewsletterForm from "@/app/components/NewsletterForm";

const C = {
  bg:       "#0a0f0a",
  bg2:      "#0f1a0f",
  bg3:      "#111e11",
  bgNav:    "rgba(10,15,10,0.98)",
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

const BREAKING = [
  "INEC releases new voter distribution data across 36 states",
  "Supreme Court dismisses suit on candidate eligibility",
  "Youth turnout rises in 14 states following registration drive",
  "New security deployment confirmed for FCT and border zones",
  "APC holds emergency NEC meeting in Abuja ahead of primaries",
];

const STORIES = [
  { tag:"POLITICS", title:"What the New Voter Data Means for the 2027 Elections", summary:"INEC's latest figures reveal a 23% surge in youth registrations. We break down what the numbers mean for each geopolitical zone.", source:"Premium Times", time:"2h ago", read:"5 min", icon:"🗳️" },
  { tag:"ECONOMY",  title:"How Elections Influence Nigeria's Economy", summary:"Understanding the spending cycle, naira volatility, and investor sentiment in election years.", source:"Vanguard", time:"4h ago", read:"4 min", icon:"📈" },
  { tag:"SECURITY", title:"Election Security Update: 36 States Under Watch", summary:"Security agencies share deployment strategy and risk assessment ahead of party primaries.", source:"Channels TV", time:"6h ago", read:"3 min", icon:"🛡️" },
  { tag:"POLITICS", title:"Northern Governors Reach Consensus on APC Ticket Strategy", summary:"Closed-door summit in Kaduna produces a unified bloc ahead of the presidential primary.", source:"ThisDay", time:"8h ago", read:"4 min", icon:"🏛️" },
  { tag:"SOCIETY",  title:"Diaspora Nigerians Push for Overseas Voting Rights", summary:"A coalition of 14 civil society groups files a fresh suit at the Federal High Court.", source:"Guardian NG", time:"10h ago", read:"3 min", icon:"🌍" },
  { tag:"ECONOMY",  title:"How Campaign Spending Shapes the Naira Every Election Cycle", summary:"Economists track the predictable currency pressure that follows major party primaries.", source:"Punch", time:"12h ago", read:"4 min", icon:"💰" },
];

const EDUCATION = [
  { label:"HOW IT WORKS",  title:"How Nigerian Elections Work",       desc:"A simple breakdown of INEC's process from registration to declaration.", icon:"🗳️" },
  { label:"VOTING SYSTEM", title:"Understanding the Voting Systems",   desc:"Learn about plurality, majority and proportional representation.", icon:"⚖️" },
  { label:"KEY TERMS",     title:"Key Electoral Terms Explained",      desc:"Essential glossary every Nigerian voter should know before 2027.", icon:"📖" },
];

function Tag({ text, color = C.green }: { text: string; color?: string }) {
  return (
    <span className="font-mono" style={{ fontSize:10, fontWeight:700, letterSpacing:1.2, color, border:`0.5px solid ${color}`, background:`${color}1a`, padding:"2px 9px", borderRadius:3 }}>
      {text}
    </span>
  );
}

function NavBar() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = ["Home","News","Education","About Us"];

  return (
    <>
      <nav style={{ 
        position:"fixed", 
        inset:"0 0 auto 0", 
        zIndex:200, 
        background: solid ? C.bgNav : "rgba(10,15,10,0.85)", 
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `0.5px solid ${C.border}`, 
        transition:"all 0.25s", 
        padding:"0 5vw" 
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", height:72, gap:8 }}>
          {/* Logo */}
          <a href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", flexShrink:0, marginRight:24 }}>
            <div style={{ 
              width:42, 
              height:42, 
              borderRadius:10, 
              background: `linear-gradient(135deg, ${C.green}20, ${C.green}10)`,
              border:`1.5px solid ${C.green}`, 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center",
              boxShadow: `0 0 20px ${C.greenDim}`
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 12 2 2 4-4"/>
                <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
                <path d="M12 2v3"/>
                <path d="M12 19v3"/>
                <path d="M19 12h3"/>
                <path d="M2 12h3"/>
              </svg>
            </div>
            <div style={{ lineHeight:1.2 }}>
              <div className="font-display" style={{ fontSize:15, fontWeight:700, color:C.white, letterSpacing:0.5 }}>Naija Election Watch</div>
              <div className="font-mono" style={{ fontSize:9, color:C.muted, letterSpacing:1.8, marginTop:2 }}>TRACKING DEMOCRACY · 2027</div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop" style={{ display:"flex", gap:4, flex:1, alignItems:"center" }}>
            {navLinks.map((item,i) => (
              <a 
                key={item} 
                href="#" 
                className="font-mono"
                style={{ 
                  color: i===0 ? C.green : C.muted, 
                  fontSize:12, 
                  padding:"8px 16px", 
                  borderRadius:6, 
                  textDecoration:"none", 
                  letterSpacing:0.5,
                  transition:"all 0.2s",
                  background: i===0 ? `${C.green}15` : "transparent",
                }}
                onMouseEnter={e => { if(i!==0) e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { if(i!==0) e.currentTarget.style.color = C.muted; }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-cta-desktop" style={{ display:"flex", gap:10, marginLeft:"auto", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:20, background:`${C.green}10`, border:`0.5px solid ${C.border}` }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, boxShadow:`0 0 8px ${C.green}` }}></span>
              <span className="font-mono" style={{ fontSize:10, color:C.green, letterSpacing:1 }}>LIVE</span>
            </div>
            <button className="font-display" style={{ background:C.green, border:"none", color:"#061006", padding:"10px 20px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", letterSpacing:0.3 }}>
              Get Alerts
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ 
              display:"none", 
              background:"transparent", 
              border:`0.5px solid ${C.border}`, 
              color:C.white, 
              padding:"10px", 
              borderRadius:8, 
              cursor:"pointer",
              marginLeft:"auto"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Side Panel */}
      <div 
        className="mobile-panel"
        style={{
          position:"fixed",
          top:0,
          right:0,
          bottom:0,
          width:"280px",
          background:C.bgNav,
          backdropFilter:"blur(30px)",
          WebkitBackdropFilter:"blur(30px)",
          borderLeft:`0.5px solid ${C.border}`,
          zIndex:300,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition:"transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          display:"flex",
          flexDirection:"column",
          padding:"24px",
          paddingTop:"90px"
        }}
      >
        {/* Close button */}
        <button 
          onClick={() => setMenuOpen(false)}
          style={{
            position:"absolute",
            top:24,
            right:24,
            background:"transparent",
            border:`0.5px solid ${C.border}`,
            color:C.white,
            padding:"8px",
            borderRadius:8,
            cursor:"pointer"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Mobile Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:40 }}>
          <div style={{ 
            width:36, 
            height:36, 
            borderRadius:8, 
            background: `linear-gradient(135deg, ${C.green}20, ${C.green}10)`,
            border:`1.5px solid ${C.green}`, 
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center" 
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 12 2 2 4-4"/>
              <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
            </svg>
          </div>
          <div>
            <div className="font-display" style={{ fontSize:13, fontWeight:700, color:C.white }}>Naija Election Watch</div>
            <div className="font-mono" style={{ fontSize:8, color:C.muted, letterSpacing:1.5 }}>TRACKING DEMOCRACY</div>
          </div>
        </div>

        {/* Mobile Links */}
        <div style={{ display:"flex", flexDirection:"column", gap:4, flex:1 }}>
          {navLinks.map((item,i) => (
            <a 
              key={item} 
              href="#" 
              className="font-mono"
              onClick={() => setMenuOpen(false)}
              style={{ 
                color: i===0 ? C.green : C.white, 
                fontSize:13, 
                padding:"14px 16px", 
                borderRadius:8, 
                textDecoration:"none", 
                letterSpacing:0.5,
                background: i===0 ? `${C.green}15` : "transparent",
                borderLeft: i===0 ? `2px solid ${C.green}` : "2px solid transparent",
                transition:"all 0.2s"
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile CTA */}
        <div style={{ marginTop:"auto", paddingTop:24, borderTop:`0.5px solid ${C.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, boxShadow:`0 0 8px ${C.green}` }}></span>
            <span className="font-mono" style={{ fontSize:10, color:C.green, letterSpacing:1 }}>LIVE TRACKING ACTIVE</span>
          </div>
          <button 
            className="font-display" 
            style={{ 
              background:C.green, 
              border:"none", 
              color:"#061006", 
              padding:"14px", 
              borderRadius:8, 
              fontSize:14, 
              fontWeight:700, 
              cursor:"pointer", 
              width:"100%",
              letterSpacing:0.3
            }}
          >
            Get Alerts
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          style={{
            position:"fixed",
            inset:0,
            background:"rgba(0,0,0,0.6)",
            backdropFilter:"blur(4px)",
            zIndex:250,
            animation:"fadeIn 0.3s ease"
          }}
        />
      )}
    </>
  );
}

function Hero() {
  const [vals, setVals] = useState([0,0,0,0]);
  const targets = [36,774,119,360];
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now-start)/1400,1);
      const ease = 1-Math.pow(1-p,3);
      setVals(targets.map(t => Math.round(t*ease)));
      if (p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);
  const statLabels = ["STATES","LGAS","SENATORIAL","REPS"];
  const statColors = [C.green, C.amber, C.red, C.green];

  return (
    <section style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", justifyContent:"center", padding:"120px 5vw 80px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"48px 48px", opacity:0.5, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:"60vw", height:"40vw", borderRadius:"50%", background:`radial-gradient(ellipse,rgba(0,220,130,0.07) 0%,transparent 65%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:860, margin:"0 auto", width:"100%", textAlign:"center", position:"relative" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:`0.5px solid ${C.borderHi}`, background:C.greenDim, borderRadius:20, padding:"5px 16px", marginBottom:32 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:C.green }} />
          <span className="font-mono" style={{ fontSize:11, color:C.green, letterSpacing:1.5 }}>2027 ELECTION CYCLE — TRACKING DEMOCRACY</span>
        </div>

        <h1 className="font-display" style={{ fontSize:"clamp(54px,9vw,108px)", fontWeight:900, lineHeight:0.92, margin:"0 0 6px", color:C.white, letterSpacing:-4 }}>Democracy</h1>
        <h1 className="font-display" style={{ fontSize:"clamp(54px,9vw,108px)", fontWeight:900, lineHeight:0.92, margin:"0 0 32px", background:`linear-gradient(90deg,${C.green} 0%,#00ffaa 60%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-4 }}>Reimagined</h1>

        <p style={{ fontSize:"clamp(15px,2vw,18px)", color:C.muted, lineHeight:1.75, maxWidth:560, margin:"0 auto 40px" }}>
          Nigeria's most advanced election intelligence platform. Real-time data, verified news, and civic education for the digital age.
        </p>

        <div className="stat-bar" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", border:`0.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", background:C.bg3, maxWidth:700, margin:"0 auto" }}>
          {vals.map((v,i) => (
            <div key={i} style={{ padding:"28px 16px", borderRight: i<3 ? `0.5px solid ${C.border}` : "none", textAlign:"center" }}>
              <div className="font-mono" style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:900, color:statColors[i], lineHeight:1 }}>{v}</div>
              <div className="font-mono" style={{ fontSize:10, color:C.muted, letterSpacing:2, marginTop:8 }}>{statLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const text = BREAKING.join("    ●    ");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = 0;
    const el = ref.current;
    if (!el) return;
    const iv = setInterval(() => {
      x -= 1.2;
      if (x < -el.scrollWidth/2) x = 0;
      el.style.transform = `translateX(${x}px)`;
    }, 16);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ background:C.red, overflow:"hidden", display:"flex", alignItems:"stretch" }}>
      <div className="font-mono" style={{ background:"#b91c1c", padding:"10px 18px", fontWeight:700, fontSize:12, color:"#fff", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        ⚡ BREAKING
      </div>
      <div style={{ overflow:"hidden", flex:1, display:"flex", alignItems:"center" }}>
        <div ref={ref} style={{ whiteSpace:"nowrap", display:"inline-block", willChange:"transform" }}>
          <span style={{ fontSize:13, color:"#fff" }}>&nbsp;&nbsp;{text}&nbsp;&nbsp;{text}&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  );
}

function NewsFeed() {
  const [filter, setFilter] = useState("All");
  const filters = ["All","Politics","Economy","Security","Society"];
  const visible = filter==="All" ? STORIES : STORIES.filter(s => s.tag===filter.toUpperCase());
  return (
    <section style={{ background:C.bg2, padding:"64px 5vw" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:12 }}>
          <h2 className="font-mono" style={{ fontSize:13, fontWeight:700, color:C.white, margin:0, letterSpacing:2 }}>LATEST STORIES</h2>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className="font-mono" style={{ background: filter===f ? C.green : "transparent", border:`0.5px solid ${filter===f ? C.green : C.border}`, color: filter===f ? "#061006" : C.muted, padding:"5px 14px", borderRadius:20, fontSize:12, cursor:"pointer", fontWeight: filter===f ? 700 : 400 }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:16 }}>
          {visible.map((s,i) => (
            <article key={i}
              style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", cursor:"pointer", transition:"border-color 0.2s,transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=C.borderHi; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; }}
            >
              <div style={{ height:110, background:`linear-gradient(135deg,#0a1a0a 0%,#0f240f 100%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, borderBottom:`0.5px solid ${C.border}` }}>{s.icon}</div>
              <div style={{ padding:20 }}>
                <Tag text={s.tag} />
                <h3 className="font-display" style={{ fontSize:15, fontWeight:700, color:C.white, margin:"10px 0 8px", lineHeight:1.35 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:C.muted, margin:"0 0 16px", lineHeight:1.65 }}>{s.summary}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span className="font-mono" style={{ fontSize:11, color:C.faint }}>{s.source} · {s.time}</span>
                  <span className="font-mono" style={{ fontSize:11, color:C.green }}>{s.read} →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:36 }}>
          <button className="font-mono" style={{ background:"transparent", border:`0.5px solid ${C.borderHi}`, color:C.green, padding:"11px 32px", borderRadius:8, fontSize:13, cursor:"pointer" }}>Load More Stories</button>
        </div>
      </div>
    </section>
  );
}

function DataTeaser() {
  const items = [
    { icon:"🗺️", title:"Election Map",      desc:"Live state-by-state results" },
    { icon:"⚖️", title:"Candidate Compare", desc:"Side-by-side policy comparison" },
    { icon:"📊", title:"Historical Trends", desc:"Data from 1999 to present" },
    { icon:"📡", title:"Live Tracker",      desc:"Real-time seat projections" },
  ];
  return (
    <section style={{ background:C.bg, padding:"64px 5vw", borderTop:`0.5px solid ${C.border}` }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10, flexWrap:"wrap" }}>
          <h2 className="font-mono" style={{ fontSize:13, fontWeight:700, color:C.white, margin:0, letterSpacing:2 }}>DATA EXPLORER</h2>
          <span className="font-mono" style={{ fontSize:10, background:C.greenDim, border:`0.5px solid ${C.borderHi}`, color:C.green, padding:"2px 10px", borderRadius:20, letterSpacing:1 }}>COMING SOON</span>
        </div>
        <p style={{ fontSize:14, color:C.muted, margin:"0 0 28px" }}>Powerful election intelligence tools — launching before campaign season.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
          {items.map(item => (
            <div key={item.title} style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:22, opacity:0.5 }}>
              <div style={{ fontSize:26, marginBottom:10 }}>{item.icon}</div>
              <div className="font-display" style={{ fontSize:14, fontWeight:700, color:C.white, marginBottom:5 }}>{item.title}</div>
              <div style={{ fontSize:12, color:C.muted }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationHub() {
  return (
    <section style={{ background:C.bg2, padding:"64px 5vw" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32, flexWrap:"wrap", gap:12 }}>
          <div>
            <div className="font-mono" style={{ fontSize:11, color:C.green, letterSpacing:2, marginBottom:6 }}>EDUCATION HUB</div>
            <h2 className="font-display" style={{ fontSize:22, fontWeight:700, color:C.white, margin:0 }}>Learn. Understand. Participate.</h2>
          </div>
          <a href="#" className="font-mono" style={{ fontSize:13, color:C.green, textDecoration:"none" }}>View All Articles →</a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:16 }}>
          {EDUCATION.map(item => (
            <div key={item.title}
              style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:28, cursor:"pointer", transition:"border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor=C.borderHi)}
              onMouseLeave={e => (e.currentTarget.style.borderColor=C.border)}
            >
              <div className="font-mono" style={{ fontSize:11, color:C.green, letterSpacing:1.5, marginBottom:14 }}>{item.label}</div>
              <div style={{ fontSize:28, marginBottom:12 }}>{item.icon}</div>
              <h3 className="font-display" style={{ fontSize:16, fontWeight:700, color:C.white, margin:"0 0 8px" }}>{item.title}</h3>
              <p style={{ fontSize:13, color:C.muted, margin:0, lineHeight:1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section style={{ background:C.bg, padding:"80px 5vw", borderTop:`0.5px solid ${C.border}`, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"50vw", height:"30vw", borderRadius:"50%", background:`radial-gradient(ellipse,rgba(0,220,130,0.06) 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ fontFamily:F.mono, fontSize:11, color:C.green, letterSpacing:2, marginBottom:14 }}>STAY INFORMED</div>
        <h2 style={{ fontFamily:F.display, fontSize:"clamp(24px,4vw,42px)", fontWeight:900, color:C.white, margin:"0 0 16px", letterSpacing:-1 }}>Stay Ahead of the Election Curve</h2>
        <p style={{ fontSize:15, color:C.muted, margin:"0 0 36px", lineHeight:1.7 }}>Real-time alerts, in-depth analysis, and important updates delivered straight to your inbox.</p>
        <div style={{ maxWidth:460, margin:"0 auto" }}>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer style={{ background:"#060a06", padding:"64px 5vw 32px", borderTop:`0.5px solid ${C.border}` }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        {/* Top Section with Logo */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", marginBottom:48, paddingBottom:40, borderBottom:`0.5px solid ${C.border}` }}>
          <div style={{ 
            width:56, 
            height:56, 
            borderRadius:14, 
            background: `linear-gradient(135deg, ${C.green}20, ${C.green}10)`,
            border:`1.5px solid ${C.green}`, 
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center",
            marginBottom:20,
            boxShadow: `0 0 30px ${C.greenDim}`
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 12 2 2 4-4"/>
              <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
              <path d="M12 2v3"/>
              <path d="M12 19v3"/>
              <path d="M19 12h3"/>
              <path d="M2 12h3"/>
            </svg>
          </div>
          <div className="font-display" style={{ fontSize:20, fontWeight:700, color:C.white, letterSpacing:0.5, marginBottom:6 }}>Naija Election Watch</div>
          <div className="font-mono" style={{ fontSize:10, color:C.muted, letterSpacing:2, marginBottom:16 }}>TRACKING DEMOCRACY · 2027</div>
          <p style={{ fontSize:14, color:C.muted, lineHeight:1.7, maxWidth:400, margin:0 }}>Your trusted source for real-time election updates, in-depth analysis, and data for a better informed Nigeria.</p>
        </div>

        {/* Links Grid */}
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:40, marginBottom:48 }}>
          {[
            { title:"EXPLORE",   links:["News","Live Tracker","Data Hub","Education Hub","Videos"] },
            { title:"RESOURCES", links:["Reports","Methodology","Glossary","Press Kit","FAQ"] },
            { title:"COMPANY",   links:["About Us","Careers","Contact","Privacy Policy","Terms"] },
          ].map(col => (
            <div key={col.title} style={{ textAlign:"center" }}>
              <div className="font-mono" style={{ fontSize:10, fontWeight:700, color:C.faint, letterSpacing:2, marginBottom:20 }}>{col.title}</div>
              {col.links.map(link => (
                <a key={link} href="#" style={{ display:"block", fontSize:13, color:C.muted, textDecoration:"none", marginBottom:12, transition:"color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.white}
                  onMouseLeave={e => e.currentTarget.style.color = C.muted}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Social & Copyright */}
        <div style={{ borderTop:`0.5px solid ${C.border}`, paddingTop:32, display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
          <div style={{ display:"flex", gap:12 }}>
            {["𝕏","f","📷","▶"].map((icon,i) => (
              <div key={i} style={{ 
                width:40, 
                height:40, 
                borderRadius:10, 
                border:`0.5px solid ${C.border}`, 
                display:"flex", 
                alignItems:"center", 
                justifyContent:"center", 
                fontSize:14, 
                cursor:"pointer", 
                color:C.muted,
                transition:"all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
              >{icon}</div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:4, height:4, borderRadius:"50%", background:C.green }}></span>
            <span className="font-mono" style={{ fontSize:11, color:C.faint }}>© 2026 Naija Election Watch. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media(max-width:768px){
          .nav-links-desktop{display:none!important}
          .nav-cta-desktop{display:none!important}
          .nav-hamburger{display:flex!important}
          .stat-bar{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(min-width:769px){
          .mobile-panel{display:none!important}
        }
        @media(max-width:580px){
          .stat-bar{grid-template-columns:repeat(2,1fr)!important}
          .nl-row{flex-direction:column!important}
          .footer-grid{grid-template-columns:1fr!important; gap:32px!important}
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