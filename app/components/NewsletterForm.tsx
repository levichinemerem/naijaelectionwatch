"use client";
import { useState } from "react";

const C = {
  bg3:      "#111e11",
  border:   "rgba(0,220,130,0.12)",
  borderHi: "rgba(0,220,130,0.3)",
  green:    "#00dc82",
  greenDim: "rgba(0,220,130,0.1)",
  white:    "#f0f4f0",
  muted:    "rgba(240,244,240,0.5)",
};

const F = {
  body:    "'Inter', sans-serif",
  display: "'Space Grotesk', sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  async function handleSubmit() {
    if (!email || !email.includes("@")) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
      } else if (data.error === "already_subscribed") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const getMessage = () => {
    switch (status) {
      case "success":   return { text: "✓ You're on the list. Welcome to the movement.", color: C.green };
      case "duplicate": return { text: "↺ You're already subscribed.", color: C.green };
      case "error":     return { text: "✕ Something went wrong. Try again.", color: "#ef4444" };
      default:          return null;
    }
  };

  const msg = getMessage();

  return (
    <div>
      {!compact && (
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
          Get election intelligence delivered to your inbox. No spam — just signal.
        </p>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          disabled={status === "loading" || status === "success"}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "10px 14px",
            background: "rgba(0,220,130,0.05)",
            border: `0.5px solid ${C.border}`,
            borderRadius: 8,
            color: C.white,
            fontFamily: F.body,
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={status === "loading" || status === "success"}
          style={{
            padding: "10px 18px",
            background: status === "success" ? "transparent" : C.green,
            border: status === "success" ? `0.5px solid ${C.green}` : "none",
            borderRadius: 8,
            color: status === "success" ? C.green : "#061006",
            fontFamily: F.display,
            fontSize: 14,
            fontWeight: 700,
            cursor: status === "loading" ? "wait" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed ✓" : "Subscribe"}
        </button>
      </div>

      {msg && (
        <p style={{ fontFamily: F.mono, fontSize: 11, color: msg.color, marginTop: 10, letterSpacing: "0.05em" }}>
          {msg.text}
        </p>
      )}
    </div>
  );
}