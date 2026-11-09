"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRoute } from "@/lib/router";
import { researchItems } from "@/data/research";
import { profile, researchCategories } from "@/data/profile";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ResearchCard } from "@/components/shared/cards";
import { Reveal } from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ResearchPage() {
  const { navigate } = useRoute();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return researchItems.filter((r) => {
      const matchesCategory =
        category === "All" ||
        r.category === category ||
        r.domain === category;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.abstract.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="bg-background">
      <PageHero
        kicker="RESEARCH"
        icon="flask"
        title={
          <>
            Exploring the frontiers of{" "}
            <span className="text-gradient">Computer Science research.</span>
          </>
        }
        description="Independent and lab-based research across large language models, causal reasoning, trustworthy AI and applied machine learning — with honest placeholders where results are still in review."
      >
        <div className="flex flex-wrap gap-2">
          {researchCategories.slice(0, 5).map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium text-white/70"
            >
              {c}
            </span>
          ))}
          <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3.5 py-1.5 text-[11px] font-semibold text-brand-gold">
            + 3 more domains
          </span>
        </div>
      </PageHero>

      <Section>
        {/* Research domains */}
        <SectionHeading
          align="left"
          kicker="DOMAINS"
          title="Research categories I work across"
        />
        <Reveal>
          <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {researchCategories.map((c, i) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "group flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition-all",
                  category === c
                    ? "border-brand-deep bg-brand-deep text-white shadow-[0_16px_36px_-16px_rgba(33,16,143,0.6)]"
                    : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-brand-royal/40"
                )}
              >
                <span>{c}</span>
                <span
                  className={cn(
                    "font-mono text-[11px]",
                    category === c ? "text-brand-gold" : "text-muted-foreground"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Search + filters */}
        <Reveal>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search research by title, abstract or keyword…"
                className="h-12 rounded-full border-border bg-card pl-11 text-sm"
                aria-label="Search research"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setCategory("All")}
              className={cn(
                "h-12 gap-2 rounded-full px-5",
                category === "All" && "border-brand-red text-brand-red"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {category === "All" ? "All domains" : category}
            </Button>
          </div>
        </Reveal>

        {/* Results */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <ResearchCard key={r.slug} item={r} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-border p-16 text-center"
            >
              <p className="font-display text-lg font-semibold text-foreground">
                No research matches your filters.
              </p>
              <p className="mt-2 text-sm text-brand-slate">
                Try a different keyword or reset the domain filter.
              </p>
              <Button
                variant="outline"
                className="mt-5 rounded-full"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Reset filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collaboration note */}
        <Reveal className="mt-14">
          <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-gold/[0.07] to-brand-orange/[0.05] p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Interested in research collaboration?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-slate">
                  I&apos;m actively looking for collaborators on LLM evaluation,
                  causal reasoning and trustworthy ML. If any of these directions
                  resonate, I&apos;d love to talk.
                </p>
              </div>
              <Button
                onClick={() => navigate("/contact")}
                className="shrink-0 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-6 text-white hover:opacity-90"
              >
                Contact me
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
