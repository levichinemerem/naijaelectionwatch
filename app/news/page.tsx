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

type Category = "All" | "Politics" | "Economy" | "Security" | "Society" | "Education";

interface Article {
  id: number;
  title: string;
  summary: string;
  category: Exclude<Category, "All">;
  source: string;
  timestamp: string;
  icon: string;
  slug: string;
}

const ALL_ARTICLES: Article[] = [
  { id:1,  category:"Politics",  icon:"🗳️", source:"Premium Times",   timestamp:"1h ago",  title:"INEC Releases Final Voter Register Ahead of 2027 Elections",         summary:"The Independent National Electoral Commission has published the certified voter register with over 95 million registered voters, the largest in Nigeria's democratic history.", slug:"inec-releases-final-voter-register-2027" },
  { id:2,  category:"Politics",  icon:"🏛️", source:"Vanguard",         timestamp:"2h ago",  title:"Tinubu's Camp Begins Quiet Outreach to Middle Belt Governors",        summary:"Political realignments intensify as key presidential aides engage in strategic consultations across Benue, Plateau and Nassarawa states.", slug:"tinubu-camp-outreach-middle-belt-governors" },
  { id:3,  category:"Economy",   icon:"💹", source:"BusinessDay",       timestamp:"3h ago",  title:"Naira Slides as Election Season Spending Begins to Heat Up",          summary:"Currency volatility increases as campaign spending and political activities drive unprecedented demand for foreign exchange in major cities.", slug:"naira-slides-election-season-spending" },
  { id:4,  category:"Security",  icon:"🛡️", source:"Channels TV",       timestamp:"4h ago",  title:"Army Deploys Additional Units to Three Volatile States",              summary:"Security reinforcement aims to ensure peaceful electoral processes in states with history of pre-election violence and community clashes.", slug:"army-deploys-units-volatile-states" },
  { id:5,  category:"Politics",  icon:"🎙️", source:"Guardian NG",       timestamp:"5h ago",  title:"Peter Obi Addresses Youth Summit on Electoral Reform",                summary:"The Labour Party leader calls for comprehensive electoral reforms and increased youth participation, drawing a crowd of over 10,000 at the Abuja summit.", slug:"peter-obi-youth-summit-electoral-reform" },
  { id:6,  category:"Economy",   icon:"📊", source:"ThisDay",            timestamp:"6h ago",  title:"CBN Warns of Inflation Risk in Run-Up to 2027 Vote",                  summary:"Central Bank issues formal advisory on potential inflationary pressures as election-related spending is projected to inject ₦2.3 trillion into circulation.", slug:"cbn-warns-inflation-risk-2027-vote" },
  { id:7,  category:"Society",   icon:"🌍", source:"Punch",              timestamp:"7h ago",  title:"Civil Society Groups Launch Voter Education Campaign Across 10 States", summary:"A coalition of 47 non-governmental organisations has launched a coordinated campaign to increase voter awareness and combat election misinformation.", slug:"civil-society-voter-education-campaign" },
  { id:8,  category:"Security",  icon:"🔒", source:"Daily Trust",        timestamp:"8h ago",  title:"INEC Assesses Polling Unit Security in Northeast",                    summary:"Commission evaluates security arrangements across 4,200 polling units in states affected by insurgency, with new biometric verification systems being tested.", slug:"inec-polling-unit-security-northeast" },
  { id:9,  category:"Politics",  icon:"⚖️", source:"Sahara Reporters",  timestamp:"9h ago",  title:"Labour Party Files Suit Challenging New Electoral Guidelines",         summary:"Legal challenge filed at the Federal High Court against recently introduced electoral regulations deemed to disadvantage opposition parties in primaries.", slug:"labour-party-suit-electoral-guidelines" },
  { id:10, category:"Economy",   icon:"🌐", source:"BusinessDay",        timestamp:"10h ago", title:"Foreign Investors Watch Nigerian Election Calendar Closely",           summary:"International investors from the UK, UAE and US are monitoring political developments as election season approaches, with $4.2bn in FDI decisions on hold.", slug:"foreign-investors-watch-election-calendar" },
  { id:11, category:"Society",   icon:"📋", source:"NOIPolls",           timestamp:"11h ago", title:"Survey: 68% of Nigerian Youth Say They Will Vote in 2027",            summary:"Landmark poll of 12,000 Nigerians aged 18-35 shows record voter intention, potentially reshaping electoral outcomes in urban constituencies.", slug:"survey-68-percent-nigerian-youth-vote-2027" },
  { id:12, category:"Education", icon:"📖", source:"INEC",               timestamp:"12h ago", title:"How to Check If You Are Registered to Vote — Step by Step Guide",     summary:"Comprehensive official guide explaining the process of verifying voter registration status online via the INEC portal and via SMS short code.", slug:"how-to-check-voter-registration" },
  { id:13, category:"Politics",  icon:"🎯", source:"Premium Times",      timestamp:"1d ago",  title:"APC Announces National Convention Date for Party Primaries",          summary:"Nigeria's ruling party sets October date for national convention to elect new leadership and screen presidential aspirants.", slug:"apc-national-convention-date" },
  { id:14, category:"Politics",  icon:"🤝", source:"Vanguard",           timestamp:"1d ago",  title:"PDP Governors Meet in Abuja Over Presidential Zoning Formula",        summary:"Opposition governors hold closed-door session to deliberate on contentious zoning formula for the 2027 presidential ticket.", slug:"pdp-governors-abuja-zoning" },
  { id:15, category:"Economy",   icon:"⛽", source:"BusinessDay",        timestamp:"1d ago",  title:"Fuel Subsidy Removal Projected to Raise Campaign Costs by 40%",       summary:"Economic analysts project significantly higher campaign logistics costs following subsidy removal, potentially favouring well-funded incumbents.", slug:"fuel-subsidy-removal-campaign-costs" },
  { id:16, category:"Security",  icon:"💻", source:"Channels TV",        timestamp:"2d ago",  title:"New Cybercrime Act Raises Concerns for Online Election Campaigns",     summary:"Digital campaign strategists flag provisions in the amended cybercrime legislation that could restrict social media election activities.", slug:"cybercrime-act-online-campaigns" },
  { id:17, category:"Society",   icon:"👩", source:"Guardian NG",        timestamp:"2d ago",  title:"Women Groups Demand 35% Representation in Party Tickets",             summary:"Coalition of women's organisations presents formal demands to INEC and party chairmen for legally binding representation quotas.", slug:"women-groups-35-percent-representation" },
  { id:18, category:"Education", icon:"📝", source:"INEC",               timestamp:"2d ago",  title:"Election Observers Get New Online Accreditation Portal",              summary:"New digital system streamlines accreditation for 15,000 domestic and international observers ahead of 2027 general elections.", slug:"election-observers-accreditation-portal" },
];

const SOURCES = ["Premium Times","Vanguard","Channels TV","Punch","ThisDay","Guardian NG","Daily Trust","Sahara Reporters"];
const TAGS = ["#2027Elections","#INEC","#PeterObi","#APC","#Tinubu","#LabourParty"];
const CATEGORIES: Category[] = ["All","Politics","Economy","Security","Society","Education"];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function NavBar() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed", inset:"0 0 auto 0", zIndex:200, background: solid ? "rgba(10,15,10,0.97)" : "rgba(10,15,10,0.8)", backdropFilter:"blur(14px)", borderBottom:`0.5px solid ${C.border}`, padding:"0 5vw", transition:"all 0.25s" }}>
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
          {["Home","News","Education","About"].map((item,i) => (
            <Link key={item} href={i===0?"/":`/${item.toLowerCase().replace(" ","")}`} style={{ fontFamily:F.body, fontSize:13, color: item==="News" ? C.green : C.muted, padding:"5px 12px", borderRadius:5, textDecoration:"none", borderBottom: item==="News" ? `2px solid ${C.green}` : "2px solid transparent" }}>{item}</Link>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, marginLeft:"auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(0,220,130,0.1)", border:`0.5px solid ${C.borderHi}`, padding:"7px 14px", borderRadius:6 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:C.red, boxShadow:`0 0 6px ${C.red}` }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.12em", color:C.green }}>LIVE</span>
          </div>
          <button style={{ background:C.green, border:"none", color:"#061006", padding:"7px 16px", borderRadius:6, fontSize:13, fontWeight:700, cursor:"pointer" }}>Get Alerts</button>
        </div>
      </div>
    </nav>
  );
}

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} style={{ textDecoration:"none", display:"block", marginBottom:12 }}>
      <article
        style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, overflow:"hidden", transition:"border-color 0.2s,transform 0.2s", display:"flex" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor=C.borderHi; e.currentTarget.style.transform="translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; }}
      >
        {/* Thumb */}
        <div style={{ width:110, minHeight:110, flexShrink:0, background:"linear-gradient(135deg,#0f2a0f,#0a1a0a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, borderRight:`0.5px solid ${C.border}` }}>
          {article.icon}
        </div>
        {/* Content */}
        <div style={{ padding:"14px 18px", flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, flexWrap:"wrap" }}>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.1em", color:C.green, background:C.greenDim, border:`0.5px solid ${C.border}`, padding:"2px 7px", borderRadius:3 }}>{article.category.toUpperCase()}</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.muted }}>{article.source}</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.faint, marginLeft:"auto" }}>{article.timestamp}</span>
          </div>
          <h3 style={{ fontFamily:F.display, fontWeight:600, fontSize:15, letterSpacing:"-0.01em", color:C.white, margin:"0 0 6px", lineHeight:1.35 }}>{article.title}</h3>
          <p style={{ fontFamily:F.body, fontSize:13, color:C.muted, margin:"0 0 10px", lineHeight:1.6, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as const }}>{article.summary}</p>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontFamily:F.mono, fontSize:"0.65rem", color:C.green }}>Read full story →</span>
            <span style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.08em", color:C.green, background:C.greenDim, border:`0.5px solid ${C.border}`, padding:"1px 6px", borderRadius:3 }}>AI SUMMARISED</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <aside style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Trending */}
      <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:14 }}>TRENDING</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {TAGS.map(tag => (
            <span key={tag} style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.08em", color:C.green, border:`0.5px solid ${C.border}`, padding:"4px 10px", borderRadius:20, cursor:"pointer" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.15em", color:C.green, marginBottom:14 }}>SOURCES WE MONITOR</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {SOURCES.map(s => (
            <div key={s} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:C.green, flexShrink:0 }} />
                <span style={{ fontFamily:F.body, fontSize:13, color:C.white }}>{s}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:C.red }} />
                <span style={{ fontFamily:F.mono, fontSize:"0.6rem", letterSpacing:"0.1em", color:C.red }}>LIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <h3 style={{ fontFamily:F.display, fontWeight:700, fontSize:17, color:C.white, margin:"0 0 6px" }}>Get the Daily Brief</h3>
        <p style={{ fontFamily:F.body, fontSize:13, color:C.muted, lineHeight:1.6, margin:"0 0 16px" }}>Top election stories every morning.</p>
        <NewsletterForm compact />
      </div>
    </aside>
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
export default function NewsPage() {
  const [filter, setFilter]   = useState<Category>("All");
  const [search, setSearch]   = useState("");
  const [sort, setSort]       = useState<"latest"|"oldest">("latest");
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(false);

  const filtered = ALL_ARTICLES
    .filter(a => filter === "All" || a.category === filter)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, visible);

  const hasMore = visible < ALL_ARTICLES.filter(a => filter === "All" || a.category === filter).length;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisible(v => v + 6); setLoading(false); }, 800);
  };

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#0a0f0a;color:#f0f4f0;-webkit-font-smoothing:antialiased}
        input::placeholder{color:rgba(240,244,240,0.3)}
        button:active{transform:scale(0.97)}
        @media(max-width:768px){
          .nav-links{display:none!important}
          .main-grid{grid-template-columns:1fr!important}
          .sidebar{display:none!important}
          .footer-grid{grid-template-columns:1fr 1fr!important}
          .footer-grid>div:first-child{grid-column:span 2!important}
        }
        @media(max-width:480px){
          .filter-bar{flex-direction:column!important;gap:10px!important}
          .article-thumb{width:80px!important;min-height:80px!important;font-size:26px!important}
        }
      `}</style>

      <NavBar />

      {/* PAGE HEADER */}
      <div style={{ paddingTop:100, background:C.bg, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"48px 48px", opacity:0.5, pointerEvents:"none" }} />
        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center", padding:"48px 24px 40px", position:"relative" }}>
          <div style={{ fontFamily:F.mono, fontSize:"0.7rem", letterSpacing:"0.15em", color:C.green, marginBottom:16 }}>ALL STORIES</div>
          <h1 style={{ fontFamily:F.display, fontWeight:700, fontSize:"clamp(3rem,6vw,5rem)", letterSpacing:"-0.03em", color:C.white, marginBottom:16 }}>The Feed</h1>
          <p style={{ fontFamily:F.body, fontSize:17, color:C.muted, lineHeight:1.7, marginBottom:28 }}>Verified, AI-summarised election news from Nigeria's most trusted sources.</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            {["247 Stories Published","12 Sources Monitored","Updated Every Hour"].map(s => (
              <div key={s} style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.1em", color:C.green, background:C.greenDim, border:`0.5px solid ${C.borderHi}`, padding:"5px 14px", borderRadius:20 }}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* STICKY FILTER BAR */}
      <div style={{ position:"sticky", top:62, zIndex:100, background:"rgba(10,15,10,0.97)", backdropFilter:"blur(12px)", borderBottom:`0.5px solid ${C.border}`, padding:"12px 5vw" }}>
        <div className="filter-bar" style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          {/* Search */}
          <div style={{ position:"relative", flex:1, minWidth:200, maxWidth:380 }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, pointerEvents:"none" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stories, candidates, parties…"
              style={{ fontFamily:F.body, width:"100%", padding:"9px 12px 9px 34px", background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:8, color:C.white, fontSize:13, outline:"none" }} />
          </div>
          {/* Category pills */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setFilter(cat); setVisible(12); }} style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.08em", background: filter===cat ? C.green : "transparent", border:`0.5px solid ${filter===cat ? C.green : C.border}`, color: filter===cat ? "#061006" : C.muted, padding:"5px 13px", borderRadius:20, cursor:"pointer", fontWeight: filter===cat ? 700 : 400 }}>{cat}</button>
            ))}
          </div>
          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value as "latest"|"oldest")}
            style={{ fontFamily:F.mono, fontSize:"0.65rem", letterSpacing:"0.08em", background:C.bg3, border:`0.5px solid ${C.border}`, borderRadius:8, color:C.white, padding:"8px 12px", cursor:"pointer", marginLeft:"auto" }}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ background:C.bg2, padding:"40px 5vw 64px" }}>
        <div className="main-grid" style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"minmax(0,1fr) 300px", gap:32 }}>

          {/* ARTICLES */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 20px", color:C.muted, fontFamily:F.body }}>
                <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
                <div style={{ fontSize:16 }}>No stories found for "{search}"</div>
              </div>
            ) : (
              filtered.map(a => <ArticleCard key={a.id} article={a} />)
            )}

            {hasMore && (
              <button onClick={loadMore} disabled={loading}
                style={{ width:"100%", background:"transparent", border:`0.5px solid ${C.borderHi}`, borderRadius:8, padding:14, fontFamily:F.mono, fontSize:"0.75rem", letterSpacing:"0.1em", color: loading ? C.muted : C.green, cursor: loading ? "wait" : "pointer", marginTop:8 }}>
                {loading ? "Loading…" : "LOAD MORE STORIES"}
              </button>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="sidebar" style={{ position:"sticky", top:130, alignSelf:"start" }}>
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}