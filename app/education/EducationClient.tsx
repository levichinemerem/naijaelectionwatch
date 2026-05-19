"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
const GUIDES = [
  {
    id: 1, icon: "🗳️", label: "VOTING BASICS", level: "Beginner", readTime: "6 min read",
    title: "How to Register and Vote in Nigeria",
    desc: "Everything you need to know about the voter registration process, polling units, and what happens on election day.",
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
    id: 2, icon: "🏛️", label: "GOVERNMENT STRUCTURE", level: "Beginner", readTime: "8 min read",
    title: "Nigeria's Three Tiers of Government Explained",
    desc: "Federal, State, and Local — understand who does what, who you're voting for, and where power actually lies.",
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
    id: 3, icon: "⚖️", label: "ELECTORAL PROCESS", level: "Intermediate", readTime: "7 min read",
    title: "From Primaries to Declaration: How Elections Work",
    desc: "Follow the full journey of a Nigerian election — party primaries, campaigns, voting, collation, and the final declaration.",
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
    id: 4, icon: "🎯", label: "POLITICAL PARTIES", level: "Intermediate", readTime: "9 min read",
    title: "Nigeria's Major Parties: APC, PDP, LP and Beyond",
    desc: "A neutral breakdown of Nigeria's main political parties — their history, ideology, structures, and electoral performance.",
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
    id: 5, icon: "📊", label: "UNDERSTANDING DATA", level: "Intermediate", readTime: "6 min read",
    title: "How to Read Election Results and Polling Data",
    desc: "Don't be fooled by misleading statistics. Learn how to interpret polls, results, and election data like an analyst.",
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
    id: 6, icon: "🌍", label: "CIVIC RIGHTS", level: "Beginner", readTime: "5 min read",
    title: "Your Rights as a Nigerian Voter",
    desc: "Know what you are legally entitled to on election day — and what to do if those rights are violated.",
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
  { term: "INEC",         def: "Independent National Electoral Commission — Nigeria's official electoral body responsible for conducting elections." },
  { term: "PVC",          def: "Permanent Voter Card — the card issued to registered voters, required to vote on election day." },
  { term: "BVAS",         def: "Bimodal Voter Accreditation System — electronic device used to verify voters via fingerprint and facial recognition." },
  { term: "Governorship", def: "The position of Governor — the chief executive of a Nigerian state, elected every four years." },
  { term: "FCT",          def: "Federal Capital Territory — Abuja, Nigeria's capital, which has special status in presidential election rules." },
  { term: "Tribunal",     def: "Election Petition Tribunal — the court where election results can be legally challenged after declaration." },
  { term: "Collation",    def: "The process of gathering and tallying results from polling units up through ward, LGA, state and national levels." },
  { term: "Form EC8A",    def: "The official result sheet posted at each polling unit after counting — the primary document for result verification." },
  { term: "Primary",      def: "An internal party election to choose candidates who will represent the party in the general election." },
  { term: "Zoning",       def: "The informal practice of rotating political offices between Nigeria's geopolitical zones to ensure regional balance." },
  { term: "APC",          def: "All Progressives Congress — Nigeria's ruling party, formed in 2013 from a merger of opposition parties." },
  { term: "PDP",          def: "Peoples Democratic Party — Nigeria's main opposition party, which ruled from 1999 to 2015." },
];

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "News",      href: "/news" },
  { label: "Education", href: "/education" },
  { label: "About Us",  href: "/about" },
];

/* ─── PILL ─── */
function Pill({ text, variant = "mint" }: { text: string; variant?: "mint" | "amber" }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      color: variant === "amber" ? "#92400e" : C.mintText,
      background: variant === "amber" ? "#fef3c7" : C.mint,
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
              const isActive = item.label === "Education";
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

/* ─── GUIDE MODAL ─── */
function GuideModal({ guide, onClose }: { guide: typeof GUIDES[0]; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.pageBg,
        border: `1px solid ${C.cardBorder}`,
        borderRadius: 16, width: "100%", maxWidth: 680,
        maxHeight: "85vh", overflow: "auto", position: "relative",
        boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
      }}>
        {/* Modal header */}
        <div style={{
          padding: "28px 32px 20px",
          borderBottom: `1px solid ${C.divider}`,
          position: "sticky", top: 0,
          background: C.pageBg, zIndex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{guide.icon}</span>
                <Pill text={guide.label} />
                <Pill text={guide.level} variant={guide.level === "Beginner" ? "mint" : "amber"} />
              </div>
              <h2 style={{
                fontFamily: F.display, fontWeight: 800,
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                letterSpacing: "-0.02em", color: C.body, margin: 0, lineHeight: 1.2,
              }}>
                {guide.title}
              </h2>
            </div>
            <button onClick={onClose} style={{
              background: "transparent", border: `1px solid ${C.divider}`,
              color: C.secondary, width: 36, height: 36, borderRadius: 8,
              cursor: "pointer", fontSize: 16, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.brandDark}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.divider}>
              ✕
            </button>
          </div>
          {/* Topic pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {guide.topics.map(t => (
              <span key={t} style={{
                fontSize: 11, fontWeight: 600, color: C.secondary,
                border: `1px solid ${C.divider}`, background: C.newsletterBg,
                padding: "3px 10px", borderRadius: 999,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal body */}
        <div style={{ padding: "28px 32px 32px" }}>
          <p style={{
            fontSize: 15, color: C.secondary, lineHeight: 1.7,
            marginBottom: 24,
            borderLeft: `3px solid ${C.brandMedium}`,
            paddingLeft: 16,
          }}>
            {guide.desc}
          </p>
          {guide.body.map((para, i) => (
            <p key={i} style={{ fontSize: 15, color: C.body, lineHeight: 1.85, marginBottom: 20 }}>{para}</p>
          ))}
          <div style={{
            marginTop: 32, padding: "16px 20px",
            background: C.newsletterBg,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.tertiary, textTransform: "uppercase" as const, marginBottom: 6 }}>
              Want to Learn More?
            </div>
            <div style={{ fontSize: 13, color: C.secondary }}>
              Visit{" "}
              <a href="https://www.inec.gov.ng" target="_blank" rel="noopener noreferrer" style={{ color: C.brandMedium, textDecoration: "none", fontWeight: 600 }}>inec.gov.ng</a>
              {" "}for official electoral guidelines, or{" "}
              <a href="https://www.yiaga.org" target="_blank" rel="noopener noreferrer" style={{ color: C.brandMedium, textDecoration: "none", fontWeight: 600 }}>yiaga.org</a>
              {" "}for citizen education resources.
            </div>
          </div>
        </div>
      </div>
    </div>
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
export default function EducationPage() {
  const [activeGuide, setActiveGuide] = useState<typeof GUIDES[0] | null>(null);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"All" | "Beginner" | "Intermediate">("All");

  const filteredGuides = GUIDES.filter(g => levelFilter === "All" || g.level === levelFilter);
  const filteredGlossary = GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .edu-grid          { grid-template-columns: 1fr !important; }
          .stats-row         { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid       { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (min-width: 769px) {
          .mobile-panel { display: none !important; }
        }
      `}</style>

      <NavBar />

      {/* ── HERO ── */}
      <div style={{ paddingTop: 64, background: C.brandDark, position: "relative", overflow: "hidden" }}>
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
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", padding: "64px 24px 56px", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(216,243,220,0.25)",
            background: "rgba(216,243,220,0.08)",
            borderRadius: 999, padding: "5px 16px", marginBottom: 28,
          }}>
            <span style={{ fontSize: 14 }}>📚</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.mint, letterSpacing: "0.12em" }}>CIVIC EDUCATION HUB</span>
          </div>
          <h1 style={{ fontFamily: F.display, fontWeight: 900, fontSize: "clamp(2.4rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 0.95, color: C.white, marginBottom: 8 }}>
            Know Your
          </h1>
          <h1 style={{ fontFamily: F.display, fontWeight: 900, fontSize: "clamp(2.4rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 0.95, color: C.mint, marginBottom: 28 }}>
            Democracy
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: C.white70, lineHeight: 1.75, maxWidth: 540, margin: "0 auto 40px" }}>
            Free, plain-language guides to Nigerian elections, voting rights, and civic participation. Built for every Nigerian, regardless of education level.
          </p>

          {/* Stats row */}
          <div className="stats-row" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12,
            overflow: "hidden", background: "rgba(255,255,255,0.05)",
            maxWidth: 600, margin: "0 auto",
          }}>
            {[["6","Guides"],["12","Key Terms"],["3","Levels"],["100%","Free"]].map(([val, label], i) => (
              <div key={label} style={{
                padding: "20px 12px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: F.mono, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: C.mint, lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.white70, letterSpacing: "0.15em", marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GUIDES SECTION ── */}
      <div style={{ background: C.pageBg, padding: "64px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 6 }}>
                VOTER GUIDES
              </div>
              <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: C.body, margin: 0 }}>
                Everything You Need to Know
              </h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {(["All", "Beginner", "Intermediate"] as const).map(l => (
                <button key={l} onClick={() => setLevelFilter(l)} style={{
                  fontSize: 12, fontWeight: levelFilter === l ? 700 : 500,
                  background: levelFilter === l ? C.brandDark : "transparent",
                  border: `1px solid ${levelFilter === l ? C.brandDark : C.divider}`,
                  color: levelFilter === l ? C.white : C.secondary,
                  padding: "5px 14px", borderRadius: 999, cursor: "pointer", transition: "all 0.2s",
                }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Guide cards */}
          <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {filteredGuides.map(guide => (
              <div key={guide.id} onClick={() => setActiveGuide(guide)} style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`,
                borderRadius: 12, padding: 24, cursor: "pointer",
                transition: "box-shadow 0.2s, transform 0.2s",
                display: "flex", flexDirection: "column",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{guide.icon}</span>
                  <Pill text={guide.level} variant={guide.level === "Beginner" ? "mint" : "amber"} />
                </div>

                <div style={{ fontSize: 11, color: C.brandMedium, letterSpacing: "0.1em", marginBottom: 8, fontWeight: 700, textTransform: "uppercase" as const }}>
                  {guide.label}
                </div>
                <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.body, margin: "0 0 10px", lineHeight: 1.35, flex: 1 }}>
                  {guide.title}
                </h3>
                <p style={{ fontSize: 13, color: C.secondary, margin: "0 0 16px", lineHeight: 1.65 }}>
                  {guide.desc}
                </p>

                {/* Topic pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                  {guide.topics.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontSize: 10, fontWeight: 600, color: C.secondary,
                      border: `1px solid ${C.divider}`, background: C.newsletterBg,
                      padding: "2px 8px", borderRadius: 999,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${C.divider}` }}>
                  <span style={{ fontSize: 11, color: C.tertiary, fontFamily: F.mono }}>{guide.readTime}</span>
                  <span style={{ fontSize: 12, color: C.brandMedium, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    Read Guide
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK FACTS BANNER ── */}
      <div style={{ background: C.newsletterBg, borderTop: `1px solid ${C.divider}`, borderBottom: `1px solid ${C.divider}`, padding: "56px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 28, textAlign: "center" }}>
            QUICK FACTS FOR 2027
          </div>
          <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "📅", fact: "Election Date",      val: "Q1 2027",  note: "Presidential & NASS elections" },
              { icon: "🗺️", fact: "States Voting",      val: "36 + FCT", note: "All 37 electoral units" },
              { icon: "👥", fact: "Registered Voters",  val: "95.2M",    note: "Largest in Nigerian history" },
              { icon: "🏛️", fact: "Senate Seats",       val: "109",      note: "3 per state + 1 FCT" },
              { icon: "📋", fact: "Reps Seats",          val: "360",      note: "Based on population" },
              { icon: "⏰", fact: "Polls Open",          val: "8:30am",   note: "Close when last voter votes" },
            ].map(item => (
              <div key={item.fact} style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`,
                borderRadius: 12, padding: 20,
                display: "flex", alignItems: "center", gap: 16,
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.tertiary, textTransform: "uppercase" as const, marginBottom: 3 }}>{item.fact}</div>
                  <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 18, color: C.brandMedium }}>{item.val}</div>
                  <div style={{ fontSize: 11, color: C.tertiary, marginTop: 2 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GLOSSARY ── */}
      <div style={{ background: C.pageBg, padding: "64px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 10 }}>
                ELECTORAL GLOSSARY
              </div>
              <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: C.body, margin: "0 0 12px" }}>
                Key Terms Explained
              </h2>
              <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.7 }}>
                No jargon, no confusion. Plain definitions for every term you'll encounter during election season.
              </p>
            </div>

            {/* Glossary search */}
            <div style={{ position: "relative", marginBottom: 24 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none" }}>🔍</span>
              <input
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
                placeholder="Search terms…"
                style={{
                  fontFamily: F.body, width: "100%",
                  padding: "11px 14px 11px 38px",
                  background: C.pageBg, border: `1px solid ${C.divider}`,
                  borderRadius: 8, color: C.body, fontSize: 14, outline: "none",
                }}
              />
            </div>

            {/* Terms list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredGlossary.length === 0 ? (
                <div style={{ textAlign: "center", padding: 32, color: C.secondary }}>
                  No terms found for "{glossarySearch}"
                </div>
              ) : filteredGlossary.map((item, i) => (
                <div key={item.term} style={{
                  background: i % 2 === 0 ? C.newsletterBg : C.pageBg,
                  border: `1px solid ${i % 2 === 0 ? C.cardBorder : "transparent"}`,
                  borderRadius: 8, padding: "14px 18px",
                  display: "flex", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 13, color: C.brandMedium, minWidth: 120, flexShrink: 0, paddingTop: 1 }}>
                    {item.term}
                  </div>
                  <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.65 }}>{item.def}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TRUSTED SOURCES ── */}
      <div style={{ background: C.newsletterBg, borderTop: `1px solid ${C.divider}`, padding: "56px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 10 }}>
            LEARN MORE FROM
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", letterSpacing: "-0.02em", color: C.body, margin: "0 0 32px" }}>
            Trusted Civic Organisations
          </h2>
          <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 860, margin: "0 auto" }}>
            {[
              { name: "INEC",       full: "Independent National Electoral Commission", url: "inec.gov.ng",  icon: "🏛️", desc: "Official electoral body — voter registration, results, guidelines." },
              { name: "Yiaga Africa", full: "Yiaga Africa",                            url: "yiaga.org",    icon: "👁️", desc: "Election observation, civic education, and youth participation." },
              { name: "BudgIT",     full: "BudgIT Nigeria",                            url: "budgit.org",   icon: "📊", desc: "Government budget tracking and public accountability data." },
            ].map(org => (
              <a key={org.name} href={`https://www.${org.url}`} target="_blank" rel="noopener noreferrer" style={{
                background: C.cardBg, border: `1px solid ${C.cardBorder}`,
                borderRadius: 12, padding: 24, textDecoration: "none",
                display: "block", textAlign: "left",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{org.icon}</div>
                <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 15, color: C.body, marginBottom: 4 }}>{org.name}</div>
                <div style={{ fontSize: 11, color: C.brandMedium, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 10 }}>{org.url}</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6 }}>{org.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER CTA ── */}
      <div style={{ background: C.pageBg, borderTop: `1px solid ${C.divider}`, padding: "80px 5vw", position: "relative", overflow: "hidden" }}>
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.brandDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.brandMedium, textTransform: "uppercase" as const, marginBottom: 14 }}>
            STAY INFORMED
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 900, fontSize: "clamp(1.6rem, 4vw, 2.6rem)", letterSpacing: "-0.03em", color: C.body, margin: "0 0 14px" }}>
            Get Election Updates in Your Inbox
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.7, margin: "0 0 36px" }}>
            New guides, breaking news, and civic education tools — delivered weekly.
          </p>
          <NewsletterForm />
          <p style={{ fontSize: 12, color: C.tertiary, marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      <Footer />

      {/* Guide Modal */}
      {activeGuide && <GuideModal guide={activeGuide} onClose={() => setActiveGuide(null)} />}
    </>
  );
}