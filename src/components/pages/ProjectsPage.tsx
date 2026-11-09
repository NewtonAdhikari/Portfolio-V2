"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Search } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { ProjectCard } from "@/components/shared/cards";
import { Reveal } from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "oldest" | "title";

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
    switch (sort) {
      case "oldest":
        return [...list].sort((a, b) => a.year - b.year);
      case "title":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return [...list].sort((a, b) => b.year - a.year);
    }
  }, [query, category, sort]);

  return (
    <div className="bg-background">
      <PageHero
        kicker="PROJECTS"
        icon="code"
        title={
          <>
            Software I&apos;ve designed, built and{" "}
            <span className="text-gradient">shipped.</span>
          </>
        }
        description="AI systems, full-stack platforms, data tooling and academic builds — each with its own detailed case study, architecture notes and honest outcomes."
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
                  placeholder="Search projects by name, description or technology…"
                  className="h-11 rounded-full pl-11 text-sm"
                  aria-label="Search projects"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort projects"
                className="h-11 rounded-full border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              {["All", ...projectCategories].map((c) => (
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

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.slug} item={p} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 rounded-3xl border border-dashed border-border p-16 text-center"
            >
              <p className="font-display text-lg font-semibold text-foreground">
                No projects match your search.
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
      </Section>
    </div>
  );
}
