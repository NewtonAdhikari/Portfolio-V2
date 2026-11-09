"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ExternalLink, FileText, Search, Star } from "lucide-react";
import { useRoute } from "@/lib/router";
import {
  publications,
  pubCategories,
  pubYears,
} from "@/data/publications";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { StatusBadge } from "@/components/shared/Badges";
import { Reveal } from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicationsPage() {
  const { navigate } = useRoute();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications
      .filter((p) => {
        const matchesCategory = category === "All" || p.category === category;
        const matchesYear = year === "All" || String(p.year) === year;
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q)) ||
          p.abstract.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q));
        return matchesCategory && matchesYear && matchesQuery;
      })
      .sort((a, b) => b.year - a.year);
  }, [query, category, year]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const p of filtered) {
      const list = map.get(p.category) ?? [];
      list.push(p);
      map.set(p.category, list);
    }
    // keep canonical category order
    return pubCategories
      .filter((c) => map.has(c))
      .map((c) => ({ category: c, items: map.get(c)! }));
  }, [filtered]);

  return (
    <div className="bg-background">
      <PageHero
        kicker="PUBLICATIONS"
        icon="bookOpen"
        title={
          <>
            An honest, growing{" "}
            <span className="text-gradient">publication record.</span>
          </>
        }
        description="Journal papers, conference submissions, preprints, patents and works in progress — with statuses stated exactly as they are."
      />

      <Section>
        {/* Controls */}
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles, authors, abstracts, keywords…"
                  className="h-11 rounded-full pl-11 text-sm"
                  aria-label="Search publications"
                />
              </div>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Filter by year"
                className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All years</option>
                {pubYears.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["All", ...pubCategories].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold transition-colors",
                    category === c
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-border bg-background text-brand-slate hover:border-brand-royal/40 hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Results grouped by category */}
        <AnimatePresence mode="popLayout">
          {grouped.length > 0 ? (
            <div className="mt-12 space-y-14">
              {grouped.map(({ category: cat, items }) => (
                <div key={cat}>
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                      {cat}
                    </h2>
                    <span className="rounded-full bg-brand-deep/[0.06] px-3 py-1 text-xs font-bold text-brand-deep dark:bg-white/10 dark:text-[#9aa8f5]">
                      {items.length}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="space-y-4">
                    {items.map((p, i) => (
                      <Reveal key={p.slug} delay={i * 0.04}>
                        <article
                          className={cn(
                            "group relative rounded-3xl border p-6 transition-all duration-300 sm:p-7",
                            p.featured
                              ? "border-brand-gold/45 bg-gradient-to-r from-brand-gold/[0.06] to-transparent hover:border-brand-gold/70"
                              : "border-border bg-card hover:border-brand-royal/40"
                          )}
                        >
                          {p.featured && (
                            <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-gold to-brand-orange px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-md">
                              <Star className="h-3 w-3" /> KEY PUBLICATION
                            </span>
                          )}
                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <StatusBadge status={p.status} />
                                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5" /> {p.year}
                                </span>
                                <span className="text-xs font-medium text-brand-royal">
                                  {p.domain}
                                </span>
                              </div>
                              <button
                                onClick={() => navigate(`/publications/${p.slug}`)}
                                className="mt-3 block text-left"
                              >
                                <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand-royal sm:text-xl">
                                  {p.title}
                                </h3>
                              </button>
                              <p className="mt-2 text-sm text-brand-slate">
                                <span className="font-medium text-foreground">
                                  {p.authors.join(", ")}
                                </span>
                                {" — "}
                                {p.venue}
                              </p>
                              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-slate">
                                {p.abstract}
                              </p>
                              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <span className="rounded-md bg-secondary px-2.5 py-1 font-mono">
                                  DOI: {p.doi}
                                </span>
                                <span className="hidden sm:inline">{p.citation.slice(0, 80)}…</span>
                              </div>
                            </div>

                            <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
                              <Button
                                onClick={() => navigate(`/publications/${p.slug}`)}
                                className="gap-2 rounded-full bg-brand-deep px-5 text-white hover:bg-brand-royal"
                              >
                                <FileText className="h-4 w-4" /> Details
                              </Button>
                              {p.doiUrl && (
                                <Button
                                  variant="outline"
                                  onClick={() => window.open(p.doiUrl, "_blank")}
                                  className="gap-2 rounded-full"
                                >
                                  <ExternalLink className="h-4 w-4" /> DOI
                                </Button>
                              )}
                            </div>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 rounded-3xl border border-dashed border-border p-16 text-center"
            >
              <p className="font-display text-lg font-semibold text-foreground">
                No publications match your filters.
              </p>
              <Button
                variant="outline"
                className="mt-5 rounded-full"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setYear("All");
                }}
              >
                Reset all filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  );
}
