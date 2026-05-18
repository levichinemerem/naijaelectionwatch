"use client";

import { useMemo, useState } from "react";

type Article = {
  id: string;
  title: string;
  summary: string;
  ai_summary: string | null;
  category: string;
  source: string;
  published_at: string;
  slug: string;
};

export default function NewsInteractive({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category))).sort()],
    [articles]
  );

  const filteredCount = useMemo(
    () =>
      articles.filter((a) => {
        const categoryMatch = category === "All" || a.category === category;
        const queryMatch = a.title.toLowerCase().includes(query.toLowerCase());
        return categoryMatch && queryMatch;
      }).length,
    [articles, category, query]
  );

  return (
    <section style={{ marginTop: 24, padding: "0 20px 20px" }}>
      <h2 style={{ marginBottom: 12 }}>Explore stories</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title"
          style={{ padding: 10, minWidth: 240 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 10 }}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <p style={{ marginTop: 8, color: "#666" }}>{filteredCount} matching stories.</p>
    </section>
  );
}
