"use client";
import { useState, useEffect } from "react";
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

const GUIDES = [
  {
    id: 1,
    icon: "🗳️",
    label: "VOTING BASICS",
    title: "How to Register and Vote in Nigeria",
    desc: "Everything you need to know about the voter registration process, polling units, and what happens on election day.",
    readTime: "6 min read",
    level: "Beginner",
    topics: ["Voter Registration","PVC Collection","Polling Units","BVAS Machine"],
    body: [
      "Voter registration in Nigeria is conducted by the Independent National Electoral Commission (INEC) through the Continuous Voter Registration (CVR) portal at voters.inec.gov.ng.",
      "To register, you must be a Nigerian citizen aged 18 or older, resident in the area where you wish to register. You will need a valid means of identification such as a birth certificate, national ID, or international passport.",
      "After registration, INEC will issue you a Permanent Voter Card (PVC). This card is your proof of registration and must be collected from your local INEC office. Without your PVC, you cannot vote.",
      "On election day, locate your polling unit — this is printed on your PVC. Arrive early as accreditation begins at 8:30am. You will be verified using the Bimodal Voter Accreditation System (BVAS), which scans your fingerprint and/or facial recognition.",
      "Once accredited, you will be given a ballot paper. Mark your choice clearly, fold the ballot, and deposit it in the ballot box. Results are announced at the polling unit immediately after counting.",
    ],
  },
  {
    id: 2,
    icon: "🏛️",
    label: "GOVERNMENT STRUCTURE",
    title: "Nigeria's Three Tiers of Government Explained",
    desc: "Federal, State, and Local — understand who does what, who you're voting for, and where power actually lies.",
    readTime: "8 min read",
    level: "Beginner",
    topics: ["Federal Government","State Government","Local Government","Separation of Powers"],
    body: [
      "Nigeria operates a federal system of government with three distinct tiers: the Federal Government, 36 State Governments, and 774 Local Government Areas (LGAs).",
      "The Federal Government is responsible for national defence, foreign policy, currency, major infrastructure, and federal universities. It is headed by the President, who is elected every four years.",
      "State Governments handle matters within their boundaries including primary and secondary education, state roads, healthcare, and local security. Each state is headed by a Governor, also elected every four years.",
      "Local Government Areas are the closest tier of government to citizens. They handle primary schools, basic healthcare, local roads, and markets. Each LGA is headed by a Chairman elected by residents of that LGA.",
      "In 2027, Nigerians will vote for the President and National Assembly (Senate and House of Representatives) at the federal level, as well as Governors and State Assembly members at the state level.",
    ],
  },
  {
    id: 3,
    icon: "⚖️",
    label: "ELECTORAL PROCESS",
    title: "From Primaries to Declaration: How Elections Work",
    desc: "Follow the full journey of a Nigerian election — party primaries, campaigns, voting, collation, and the final declaration.",
    readTime: "7 min read",
    level: "Intermediate",
    topics: ["Party Primaries","Campaigns","Collation","Court Challenges"],
    body: [
      "Nigerian elections begin long before election day. Political parties first conduct internal primaries to select their candidates. These primaries must be monitored by INEC officials to be valid.",
      "After primaries, INEC publishes the list of candidates and the official campaign period begins. Campaigns typically run for several months, during which candidates and parties canvass for votes.",
      "On election day, results are first announced at the polling unit level. These are then collated at the ward, local government, state, and finally national levels. Each collation stage must be witnessed by party agents.",
      "The candidate with the highest votes wins — but in presidential elections, the winner must also achieve at least 25% of votes in at least two-thirds of all states (24 states) and the FCT.",
      "Losing candidates can challenge results at the Election Tribunal within 21 days of declaration. Cases can be appealed up to the Supreme Court. This judicial process is a critical part of Nigeria's democratic framework.",
    ],
  },
  {
    id: 4,
    icon: "🎯",
    label: "POLITICAL PARTIES",
    title: "Nigeria's Major Parties: APC, PDP, LP and Beyond",
    desc: "A neutral breakdown of Nigeria's main political parties — their history, ideology, structures, and electoral performance.",
    readTime: "9 min read",
    level: "Intermediate",
    topics: ["APC","PDP","Labour Party","Party Manifestos"],
    body: [
      "Nigeria has over 90 registered political parties, but three dominate the national landscape: the All Progressives Congress (APC), the Peoples Democratic Party (PDP), and the Labour Party (LP).",
      "The APC was formed in 2013 through a merger of several opposition parties. It won the presidency in 2015, ending 16 years of PDP rule. The APC currently holds the presidency under President Bola Tinubu.",
      "The PDP ruled Nigeria from 1999 to 2015 and remains the largest opposition party. It has strong structures across the South-South and parts of the North, and continues to control several state governments.",
      "The Labour Party surged in national prominence during the 2023 elections, driven largely by the 'Obidient' movement supporting Peter Obi. While Obi lost the presidency, the LP won significant seats in the National Assembly.",
      "When evaluating parties, look beyond names and slogans. Study their manifestos, their candidates' track records, and their performance in states they currently govern. This is the most reliable guide to what they will do in office.",
    ],
  },
  {
    id: 5,
    icon: "📊",
    label: "UNDERSTANDING DATA",
    title: "How to Read Election Results and Polling Data",
    desc: "Don't be fooled by misleading statistics. Learn how to interpret polls, results, and election data like an analyst.",
    readTime: "6 min read",
    level: "Intermediate",
    topics: ["Polling","Margins of Error","Collation Sheets","Result Verification"],
    body: [
      "Opinion polls give an indication of voter preference before an election, but they are not predictions. Always check the sample size (anything under 1,000 is unreliable), the methodology, and who commissioned the poll.",
      "Margin of error is critical. A poll showing Candidate A at 48% and Candidate B at 46% with a ±3% margin of error means the race is statistically tied — not that Candidate A is leading.",
      "On election day, every polling unit posts its results publicly on a Form EC8A. Citizens and party agents can photograph this form. Comparing these forms with official collation results is the most powerful tool for detecting manipulation.",
      "When results are announced, look at the total valid votes versus registered voters in each area. Turnout above 90% in any polling unit is a significant red flag worth investigating.",
      "Platforms like Yiaga Africa's WYV (Watch Your Vote) and INEC's own result portal allow citizens to cross-check announced results with polling unit data in real time.",
    ],
  },
  {
    id: 6,
    icon: "🌍",
    label: "CIVIC RIGHTS",
    title: "Your Rights as a Nigerian Voter",
    desc: "Know what you are legally entitled to on election day — and what to do if those rights are violated.",
    readTime: "5 min read",
    level: "Beginner",
    topics: ["Voter Rights","Electoral Offences","Reporting Violations","INEC Complaints"],
    body: [
      "As a registered voter in Nigeria, you have the right to vote without interference, intimidation, or inducement. Offering or accepting money or goods in exchange for your vote is a criminal offence under the Electoral Act.",
      "You have the right to a secret ballot. No one — including party agents, security personnel, or INEC officials — can compel you to show them your ballot or tell them how you voted.",
      "If you are turned away from your polling unit despite having a valid PVC, you can report this to the INEC Situation Room at 0804-534-8080 or via the INEC mobile app.",
      "Electoral offences including ballot snatching, destruction of election materials, and violence can be reported to the police, the Independent Corrupt Practices Commission (ICPC), or directly to INEC.",
      "Civil society organisations like Yiaga Africa and the Transition Monitoring Group (TMG) deploy observers across the country. Their hotlines are available on election day to receive reports of violations.",
    ],
  },
];

const GLOSSARY = [
  { term:"INEC",       def:"Independent National Electoral Commission — Nigeria's official electoral body responsible for conducting elections." },
  { term:"PVC",        def:"Permanent Voter Card — the card issued to registered voters, required to vote on election day." },
  { term:"BVAS",       def:"Bimodal Voter Accreditation System — electronic device used to verify voters via fingerprint and facial recognition." },
  { term:"Governorship", def:"The position of Governor — the chief executive of a Nigerian state, elected every four years." },
  { term:"FCT",        def:"Federal Capital Territory — Abuja, Nigeria's capital, which has special status in presidential election rules." },
  { term:"Tribunal",   def:"Election Petition Tribunal — the court where election results can be legally challenged after declaration." },
  { term:"Collation",  def:"The process of gathering and tallying results from polling units up through ward, LGA, state and national levels." },
  { term:"Form EC8A",  def:"The official result sheet posted at each polling unit after counting — the primary document for result verification." },
  { term:"Primary",    def:"An internal party election to choose candidates who will represent the party in the general election." },
  { term:"Zoning",     def:"The informal practice of rotating political offices between Nigeria's geopolitical zones to ensure regional balance." },
  { term:"APC",        def:"All Progressives Congress — Nigeria's ruling party, formed in 2013 from a merger of opposition parties." },
  { term:"PDP",        def:"Peoples Democratic Party — Nigeria's main opposition party, which ruled from 1999 to 2015." },
];

const NAV_LINKS = [
  { label:"Home",      href:"/" },
  { label:"News",      href:"/news" },
  { label:"Education", href:"/education" },
  { label:"About Us",  href:"/about" },
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
    <nav style={{ position:"fixed", inset:"0 0 auto 0", zIndex:200, background: solid ? "rgba(10,15,10,0.97)" : "rgba(10,15,10,0.85)", backdropFilter:"blur(14px)", borderBottom:`0.5px solid ${C.border}`, padding:"0 5vw", transition:"all 0.25s" }}>
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
            <Link key={label} href={href} style={{ fontFamily:F.body, fontSize:13, color: label==="Education" ? C.green : C.muted, padding:"5px 12px", borderRadius:5, textDecoration:"none", borderBottom: label==="Education" ? `2px solid ${C.green}` : "2px solid transparent" }}>
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

// ─── GUIDE MODAL ─────────────────────────────────────────────────────────────
function GuideModal({ guide, onClose }: { guide: typeof GUIDES[0]; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:C.bg2, border:`0.5px solid ${C.borderHi}`, borderRadius:16, width:"100%", maxWidth:680, maxHeight:"85vh", overflow:"auto", position:"relative" }}>
        {/* Modal header */}
        <div style={{ padding:"28px 32px 20px", borderBottom:`0.5px solid ${C.border}`, position:"sticky", top:0, background:C.bg2, zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ fontSize:24 }}>{guide.icon}</span>
                <span style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.12em", color:C.green, background:C.greenDim, border:`0.5px solid ${C.border}`, padding:"2px 8px", borderRadius:3 }}>{guide.label}</span>
                <span style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.muted, background:`rgba(240,244,240,0.05)`, border:`0.5px solid ${C.border}`, padding:"2px 8px", borderRadius:3 }}>{guide.level}</span>
              </div>
              <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.2rem,3vw,1.6rem)", letterSpacing:"-0.02em", color:C.white, margin:0, lineHeight:1.2 }}>{guide.title}</h2>
            </div>
            <button onClick={onClose} style={{ background:"transparent", border:`0.5px solid ${C.border}`, color:C.muted, width:36, height:36, borderRadius:8, cursor:"pointer", fontSize:16, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
          {/* Topic pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:14 }}>
            {guide.topics.map(t => (
              <span key={t} style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.08em", color:C.green, border:`0.5px solid ${C.border}`, background:C.greenDim, padding:"3px 10px", borderRadius:20 }}>{t}</span>
            ))}
          </div>
        </div>
        {/* Modal body */}
        <div style={{ padding:"28px 32px 32px" }}>
          <p style={{ fontFamily:F.body, fontSize:15, color:C.muted, lineHeight:1.7, marginBottom:24, borderLeft:`3px solid ${C.green}`, paddingLeft:16 }}>{guide.desc}</p>
          {guide.body.map((para, i) => (
            <p key={i} style={{ fontFamily:F.body, fontSize:15, color:C.muted, lineHeight:1.8, marginBottom:20 }}>{para}</p>
          ))}
          <div style={{ marginTop:32, padding:16, background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:10 }}>
            <div style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.1em", color:C.faint, marginBottom:6 }}>WANT TO LEARN MORE?</div>
            <div style={{ fontFamily:F.body, fontSize:13, color:C.muted }}>Visit <a href="https://www.inec.gov.ng" target="_blank" rel="noopener noreferrer" style={{ color:C.green, textDecoration:"none" }}>inec.gov.ng</a> for official electoral guidelines, or <a href="https://www.yiaga.org" target="_blank" rel="noopener noreferrer" style={{ color:C.green, textDecoration:"none" }}>yiaga.org</a> for citizen education resources.</div>
          </div>
        </div>
      </div>
    </div>
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
export default function EducationPage() {
  const [activeGuide, setActiveGuide] = useState<typeof GUIDES[0] | null>(null);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"All"|"Beginner"|"Intermediate">("All");

  const filteredGuides = GUIDES.filter(g =>
    levelFilter === "All" || g.level === levelFilter
  );

  const filteredGlossary = GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Inter',sans-serif; background:#0a0f0a; color:#f0f4f0; -webkit-font-smoothing:antialiased; }
        input::placeholder { color:rgba(240,244,240,0.3); }
        button:active { transform:scale(0.97); }
        @media(max-width:768px) {
          .nav-links { display:none!important; }
          .edu-grid { grid-template-columns:1fr!important; }
          .footer-grid { grid-template-columns:1fr 1fr!important; }
          .footer-grid>div:first-child { grid-column:span 2!important; }
          .stats-row { grid-template-columns:repeat(2,1fr)!important; }
        }
      `}</style>

      <NavBar />

      {/* HERO */}
      <div style={{ paddingTop:62, background:C.bg, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"48px 48px", opacity:0.5, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:"60vw", height:"40vw", borderRadius:"50%", background:`radial-gradient(ellipse,rgba(0,220,130,0.07) 0%,transparent 65%)`, pointerEvents:"none" }} />
        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center", padding:"64px 24px 56px", position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:`0.5px solid ${C.borderHi}`, background:C.greenDim, borderRadius:20, padding:"5px 16px", marginBottom:28 }}>
            <span style={{ fontSize:14 }}>📚</span>
            <span style={{ fontFamily:F.mono, fontSize:11, color:C.green, letterSpacing:"0.12em" }}>CIVIC EDUCATION HUB</span>
          </div>
          <h1 style={{ fontFamily:F.display, fontWeight:900, fontSize:"clamp(2.4rem,6vw,5rem)", letterSpacing:"-0.03em", lineHeight:0.95, color:C.white, marginBottom:8 }}>
            Know Your
          </h1>
          <h1 style={{ fontFamily:F.display, fontWeight:900, fontSize:"clamp(2.4rem,6vw,5rem)", letterSpacing:"-0.03em", lineHeight:0.95, background:`linear-gradient(90deg,${C.green} 0%,#00ffaa 60%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:28 }}>
            Democracy
          </h1>
          <p style={{ fontFamily:F.body, fontSize:"clamp(15px,2vw,18px)", color:C.muted, lineHeight:1.75, maxWidth:540, margin:"0 auto 40px" }}>
            Free, plain-language guides to Nigerian elections, voting rights, and civic participation. Built for every Nigerian, regardless of education level.
          </p>
          {/* Stats row */}
          <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", border:`0.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", background:C.bg3, maxWidth:600, margin:"0 auto" }}>
            {[["6","Guides"],["12","Key Terms"],["3","Levels"],["100%","Free"]].map(([val, label], i) => (
              <div key={label} style={{ padding:"20px 12px", borderRight: i<3 ? `0.5px solid ${C.border}` : "none", textAlign:"center" }}>
                <div style={{ fontFamily:F.mono, fontSize:"clamp(22px,3vw,32px)", fontWeight:900, color:C.green, lineHeight:1 }}>{val}</div>
                <div style={{ fontFamily:F.mono, fontSize:10, color:C.muted, letterSpacing:"0.15em", marginTop:6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEVEL FILTER + GUIDES */}
      <div style={{ background:C.bg2, padding:"56px 5vw 64px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>

          {/* Section header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:8 }}>VOTER GUIDES</div>
              <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.4rem,3vw,2rem)", letterSpacing:"-0.02em", color:C.white, margin:0 }}>Everything You Need to Know</h2>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {(["All","Beginner","Intermediate"] as const).map(l => (
                <button key={l} onClick={() => setLevelFilter(l)}
                  style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.08em", background: levelFilter===l ? C.green : "transparent", border:`0.5px solid ${levelFilter===l ? C.green : C.border}`, color: levelFilter===l ? "#061006" : C.muted, padding:"5px 14px", borderRadius:20, cursor:"pointer", fontWeight: levelFilter===l ? 700 : 400 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Guide cards grid */}
          <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {filteredGuides.map(guide => (
              <div key={guide.id}
                onClick={() => setActiveGuide(guide)}
                style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:24, cursor:"pointer", transition:"border-color 0.2s,transform 0.2s", display:"flex", flexDirection:"column" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.borderHi; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                  <span style={{ fontSize:28 }}>{guide.icon}</span>
                  <span style={{ fontFamily:F.mono, fontSize:"0.55rem", letterSpacing:"0.1em", color: guide.level==="Beginner" ? C.green : C.amber, border:`0.5px solid ${guide.level==="Beginner" ? C.borderHi : "rgba(245,158,11,0.3)"}`, background: guide.level==="Beginner" ? C.greenDim : "rgba(245,158,11,0.1)", padding:"2px 8px", borderRadius:20 }}>{guide.level.toUpperCase()}</span>
                </div>
                <div style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.12em", color:C.green, marginBottom:10 }}>{guide.label}</div>
                <h3 style={{ fontFamily:F.display, fontWeight:700, fontSize:15, letterSpacing:"-0.01em", color:C.white, margin:"0 0 10px", lineHeight:1.35, flex:1 }}>{guide.title}</h3>
                <p style={{ fontFamily:F.body, fontSize:13, color:C.muted, margin:"0 0 18px", lineHeight:1.65 }}>{guide.desc}</p>
                {/* Topic pills */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:16 }}>
                  {guide.topics.slice(0,3).map(t => (
                    <span key={t} style={{ fontFamily:F.mono, fontSize:"0.55rem", letterSpacing:"0.06em", color:C.faint, border:`0.5px solid ${C.border}`, padding:"2px 7px", borderRadius:10 }}>{t}</span>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, borderTop:`0.5px solid ${C.border}` }}>
                  <span style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.faint }}>{guide.readTime}</span>
                  <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.green }}>Read Guide →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK FACTS BANNER */}
      <div style={{ background:C.bg, borderTop:`0.5px solid ${C.border}`, borderBottom:`0.5px solid ${C.border}`, padding:"48px 5vw" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:24, textAlign:"center" }}>QUICK FACTS FOR 2027</div>
          <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[
              { icon:"📅", fact:"Election Date", val:"Q1 2027", note:"Presidential & NASS elections" },
              { icon:"🗺️", fact:"States Voting", val:"36 + FCT", note:"All 37 electoral units" },
              { icon:"👥", fact:"Registered Voters", val:"95.2M", note:"Largest in Nigerian history" },
              { icon:"🏛️", fact:"Senate Seats", val:"109", note:"3 per state + 1 FCT" },
              { icon:"📋", fact:"Reps Seats", val:"360", note:"Based on population" },
              { icon:"⏰", fact:"Polls Open", val:"8:30am", note:"Close when last voter votes" },
            ].map(item => (
              <div key={item.fact} style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:10, padding:18, display:"flex", alignItems:"center", gap:14 }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.1em", color:C.muted, marginBottom:3 }}>{item.fact}</div>
                  <div style={{ fontFamily:F.display, fontWeight:700, fontSize:16, color:C.green }}>{item.val}</div>
                  <div style={{ fontFamily:F.mono, fontSize:"0.55rem", color:C.faint, marginTop:2 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GLOSSARY */}
      <div style={{ background:C.bg2, padding:"64px 5vw" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ maxWidth:720, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:36 }}>
              <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:10 }}>ELECTORAL GLOSSARY</div>
              <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.4rem,3vw,2rem)", letterSpacing:"-0.02em", color:C.white, margin:"0 0 12px" }}>Key Terms Explained</h2>
              <p style={{ fontFamily:F.body, fontSize:15, color:C.muted, lineHeight:1.7 }}>No jargon, no confusion. Plain definitions for every term you'll encounter during election season.</p>
            </div>

            {/* Search */}
            <div style={{ position:"relative", marginBottom:24 }}>
              <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:14, pointerEvents:"none" }}>🔍</span>
              <input value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)} placeholder="Search terms…"
                style={{ fontFamily:F.body, width:"100%", padding:"11px 14px 11px 38px", background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:8, color:C.white, fontSize:14, outline:"none" }} />
            </div>

            {/* Terms list */}
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {filteredGlossary.length === 0 ? (
                <div style={{ textAlign:"center", padding:"32px", color:C.muted, fontFamily:F.body }}>No terms found for "{glossarySearch}"</div>
              ) : filteredGlossary.map((item, i) => (
                <div key={item.term} style={{ background: i%2===0 ? C.bg3 : "transparent", border:`0.5px solid ${i%2===0 ? C.border : "transparent"}`, borderRadius:8, padding:"14px 18px", display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ fontFamily:F.mono, fontWeight:700, fontSize:13, color:C.green, minWidth:120, flexShrink:0, paddingTop:1 }}>{item.term}</div>
                  <div style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.65 }}>{item.def}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TRUSTED SOURCES */}
      <div style={{ background:C.bg, borderTop:`0.5px solid ${C.border}`, padding:"56px 5vw" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:10 }}>LEARN MORE FROM</div>
          <h2 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(1.2rem,2.5vw,1.8rem)", letterSpacing:"-0.02em", color:C.white, margin:"0 0 32px" }}>Trusted Civic Organisations</h2>
          <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, maxWidth:860, margin:"0 auto" }}>
            {[
              { name:"INEC", full:"Independent National Electoral Commission", url:"inec.gov.ng", icon:"🏛️", desc:"Official electoral body — voter registration, results, guidelines." },
              { name:"Yiaga Africa", full:"Yiaga Africa", url:"yiaga.org", icon:"👁️", desc:"Election observation, civic education, and youth participation." },
              { name:"BudgIT", full:"BudgIT Nigeria", url:"budgit.org", icon:"📊", desc:"Government budget tracking and public accountability data." },
            ].map(org => (
              <a key={org.name} href={`https://www.${org.url}`} target="_blank" rel="noopener noreferrer"
                style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:22, textDecoration:"none", display:"block", transition:"border-color 0.2s,transform 0.2s", textAlign:"left" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=C.borderHi; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=C.border; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}
              >
                <div style={{ fontSize:24, marginBottom:12 }}>{org.icon}</div>
                <div style={{ fontFamily:F.display, fontWeight:700, fontSize:15, color:C.white, marginBottom:4 }}>{org.name}</div>
                <div style={{ fontFamily:F.mono, fontSize:"0.6rem", color:C.green, letterSpacing:"0.08em", marginBottom:10 }}>{org.url}</div>
                <div style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.6 }}>{org.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER CTA */}
      <div style={{ background:C.bg2, borderTop:`0.5px solid ${C.border}`, padding:"72px 5vw", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"50vw", height:"30vw", borderRadius:"50%", background:`radial-gradient(ellipse,rgba(0,220,130,0.06) 0%,transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <div style={{ fontFamily:F.mono, fontSize:11, color:C.green, letterSpacing:"0.15em", marginBottom:14 }}>STAY INFORMED</div>
          <h2 style={{ fontFamily:F.display, fontWeight:900, fontSize:"clamp(1.6rem,4vw,2.6rem)", letterSpacing:"-0.03em", color:C.white, margin:"0 0 14px" }}>Get Election Updates in Your Inbox</h2>
          <p style={{ fontFamily:F.body, fontSize:15, color:C.muted, lineHeight:1.7, margin:"0 0 32px" }}>New guides, breaking news, and civic education tools — delivered weekly.</p>
          <div style={{ maxWidth:440, margin:"0 auto" }}>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <Footer />

      {/* GUIDE MODAL */}
      {activeGuide && <GuideModal guide={activeGuide} onClose={() => setActiveGuide(null)} />}
    </>
  );
}