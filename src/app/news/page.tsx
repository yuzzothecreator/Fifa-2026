"use client";

import * as React from "react";
import { Search, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { NewsCard } from "@/components/cards/news-card";
import { Input } from "@/components/ui/input";
import { news } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Breaking", "Match Report", "Analysis", "Feature", "Transfer"] as const;

export default function NewsPage() {
  const [query, setQuery] = React.useState("");
  const [cat, setCat] = React.useState<(typeof categories)[number]>("All");

  const filtered = news
    .filter((n) => (cat === "All" ? true : n.category === cat))
    .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()) || n.description.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const featured = filtered.find((n) => n.featured) ?? filtered[0];
  const rest = filtered.filter((n) => n.id !== featured?.id);
  const trending = [...news].sort((a, b) => b.readTime - a.readTime).slice(0, 4);

  return (
    <>
      <PageHeader
        label="Newsroom"
        title="World Cup News"
        description="Breaking stories, match reports, tactical analysis and exclusive features from across the tournament."
      />

      <section className="container py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search news..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-11" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  cat === c ? "border-electric bg-electric/15 text-electric" : "border-border bg-foreground/5 text-foreground/70 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            {featured && <NewsCard article={featured} featured />}
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((n, i) => (
                <NewsCard key={n.id} article={n} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="glass rounded-2xl p-12 text-center text-white/50">No articles found.</div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-heading text-2xl tracking-wide text-white">
                <TrendingUp className="h-5 w-5 text-pitch" /> Trending
              </h3>
              <ol className="mt-4 space-y-4">
                {trending.map((n, i) => (
                  <li key={n.id} className="flex gap-3">
                    <span className="font-display text-3xl leading-none text-white/20">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium leading-snug text-white transition-colors hover:text-electric">{n.title}</p>
                      <p className="mt-1 text-xs text-white/40">{n.category} · {n.readTime} min</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
