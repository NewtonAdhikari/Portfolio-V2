"use client";

/**
 * /blog — Daily articles synced automatically from DEV.to (frontend-only).
 * DEV.to is the publishing platform & single source of truth; this page
 * renders previews and links back to the original articles.
 */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Filter,
  RefreshCw,
  Rss,
  Search,
  SearchX,
  ServerCrash,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  BLOG_CATEGORIES,
  formatReadingTime,
  useDevtoArticles,
  type BlogArticle,
} from "@/lib/devto";
import { devtoConfig, devtoProfileUrl, devtoFeedUrl } from "@/data/profile";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import {
  BlogArticleCard,
  BlogCardSkeleton,
  FeaturedArticleCard,
} from "@/components/shared/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type DateRange = "all" | "30d" | "6m" | "1y";

const DATE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "30d", label: "Last 30 days" },
  { value: "6m", label: "Last 6 months" },
  { value: "1y", label: "Last year" },
];

function matchesDate(article: BlogArticle, range: DateRange): boolean {
  if (range === "all" || !article.publishedAt) return true;
  const published = new Date(article.publishedAt).getTime();
  if (Number.isNaN(published)) return true;
  const days =
    range === "30d" ? 30 : range === "6m" ? 182 : range === "1y" ? 365 : 0;
  return Date.now() - published <= days * 24 * 60 * 60 * 1000;
}

export function BlogPage() {
  const { articles, fetchedAt, state, refreshing, refresh } =
    useDevtoArticles(30);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [visible, setVisible] = useState(devtoConfig.pageSize);

  const hasActiveFilters =
    query.trim() !== "" || category !== "All" || tag !== null || dateRange !== "all";

  const featured = articles[0] ?? null;
  const rest = useMemo(() => articles.slice(1), [articles]);

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles)
      for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([t]) => t);
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (tag && !a.tags.includes(tag)) return false;
      if (!matchesDate(a, dateRange)) return false;
      if (q) {
        const haystack = `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [rest, query, category, tag, dateRange]);

  const visiblePosts = filtered.slice(0, visible);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setTag(null);
    setDateRange("all");
    setVisible(devtoConfig.pageSize);
  };

  const lastUpdatedLabel = fetchedAt
    ? new Date(fetchedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="bg-background">
      <PageHero
        kicker="DAILY BLOG • KNOWLEDGE SHARING"
        icon="feather"
        title={
          <>
            Insights, Ideas &amp; My{" "}
            <span className="text-gradient">Learning Journey.</span>
          </>
        }
        description="Sharing knowledge, exploring emerging technologies, documenting research, and learning something new every day. Articles are written and published on DEV.to — this page mirrors them automatically."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={devtoProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_rgba(229,36,54,0.65)] transition-transform hover:scale-[1.03]"
          >
            Visit My DEV.to Profile
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={devtoFeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            <Rss className="h-4 w-4" />
            Follow My Articles (RSS)
          </a>
        </div>
      </PageHero>

      <Section>
        {/* ── Sync status strip ─────────────────────────────────────── */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3.5">
            <p className="flex items-center gap-2.5 text-xs text-brand-slate">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-60",
                    state.status === "error"
                      ? "bg-destructive"
                      : "animate-ping bg-emerald-500"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-2.5 w-2.5 rounded-full",
                    state.status === "error" ? "bg-destructive" : "bg-emerald-500"
                  )}
                />
              </span>
              Auto-synced from{" "}
              <span className="font-semibold text-foreground">
                @{devtoConfig.username}
              </span>{" "}
              on {devtoConfig.platformLabel}
              {lastUpdatedLabel && (
                <span className="hidden sm:inline">
                  • last update {lastUpdatedLabel}
                </span>
              )}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              disabled={state.status === "loading"}
              className="h-8 gap-2 rounded-full text-xs"
            >
              <RefreshCw
                className={cn("h-3.5 w-3.5", refreshing && "animate-spin")}
              />
              {refreshing ? "Refreshing…" : "Refresh now"}
            </Button>
          </div>
        </Reveal>

        {/* ── Stale / error notices ─────────────────────────────────── */}
        <AnimatePresence>
          {state.status === "stale" && articles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-orange/40 bg-brand-orange/[0.08] px-5 py-4 text-sm text-[#9a5a10] dark:text-brand-orange"
            >
              <span>{state.message}</span>
              <button
                onClick={refresh}
                className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Featured article ──────────────────────────────────────── */}
        {state.status === "loading" ? (
          <div className="grid overflow-hidden rounded-3xl border border-border lg:grid-cols-2">
            <div className="aspect-[16/9] w-full animate-pulse bg-secondary lg:aspect-auto lg:min-h-[320px]" />
            <div className="space-y-4 p-8">
              <div className="h-6 w-28 rounded-full bg-secondary" />
              <div className="h-8 w-5/6 rounded-full bg-secondary" />
              <div className="h-8 w-2/3 rounded-full bg-secondary" />
              <div className="h-4 w-full rounded-full bg-secondary/70" />
              <div className="h-4 w-4/5 rounded-full bg-secondary/70" />
              <div className="h-11 w-48 rounded-full bg-secondary" />
            </div>
          </div>
        ) : featured ? (
          <Reveal>
            <FeaturedArticleCard article={featured} />
          </Reveal>
        ) : null}

        {/* ── Error state ───────────────────────────────────────────── */}
        {state.status === "error" && (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-destructive/25 bg-destructive/[0.05] px-6 py-14 text-center">
            <ServerCrash className="h-12 w-12 text-destructive" />
            <h3 className="mt-4 font-display text-xl font-bold text-foreground">
              Couldn&apos;t load articles
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-slate">
              {state.message}
            </p>
            <Button
              onClick={refresh}
              className="mt-6 gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-white"
            >
              <RefreshCw className="h-4 w-4" />
              Retry now
            </Button>
          </div>
        )}

        {/* ── Completely empty account ──────────────────────────────── */}
        {state.status === "empty" && (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-border bg-card px-6 py-14 text-center">
            <Sparkles className="h-12 w-12 text-brand-gold" />
            <h3 className="mt-4 font-display text-xl font-bold text-foreground">
              No articles published yet
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-slate">
              Once the first article goes live on{" "}
              <span className="font-semibold text-foreground">
                @{devtoConfig.username}
              </span>
              , it will appear here automatically — no code changes needed.
              Writing on a different account? Update{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-[11px]">
                devtoConfig.username
              </code>{" "}
              in <code className="rounded bg-secondary px-1.5 py-0.5 text-[11px]">src/data/profile.ts</code>.
            </p>
            <a
              href={devtoProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand-royal px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Open DEV.to profile
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* ── Filters + grid (only when data exists) ────────────────── */}
        {articles.length > 0 && (
          <>
            <Reveal className="mt-14">
              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
                <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
                  {/* search */}
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate" />
                    <Input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setVisible(devtoConfig.pageSize);
                      }}
                      placeholder="Search articles, topics, tags…"
                      aria-label="Search articles"
                      className="h-11 rounded-xl pl-10"
                    />
                  </div>
                  {/* category */}
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setVisible(devtoConfig.pageSize);
                    }}
                    aria-label="Filter by category"
                    className="h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                  >
                    <option value="All">All categories</option>
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {/* date */}
                  <select
                    value={dateRange}
                    onChange={(e) => {
                      setDateRange(e.target.value as DateRange);
                      setVisible(devtoConfig.pageSize);
                    }}
                    aria-label="Filter by publication date"
                    className="h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                  >
                    {DATE_OPTIONS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* popular topics */}
                {topTags.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-slate">
                      <Tag className="h-3.5 w-3.5 text-brand-orange" />
                      Popular topics
                    </span>
                    {topTags.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setTag(tag === t ? null : t);
                          setVisible(devtoConfig.pageSize);
                        }}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                          tag === t
                            ? "border-transparent bg-gradient-to-r from-brand-deep to-brand-royal text-white"
                            : "border-border bg-secondary/60 text-brand-slate hover:border-brand-royal/40 hover:text-foreground"
                        )}
                      >
                        #{t}
                      </button>
                    ))}
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="ml-auto inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <X className="h-3.5 w-3.5" />
                        Clear filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Reveal>

            {/* results heading */}
            <div className="mb-8 mt-12 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {hasActiveFilters ? "Filtered results" : "Latest articles"}
                </h2>
                <p className="mt-1 text-sm text-brand-slate">
                  {filtered.length} article{filtered.length === 1 ? "" : "s"}
                  {hasActiveFilters ? " match your filters" : " from my DEV.to feed"}
                </p>
              </div>
              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-slate">
                <Filter className="h-3.5 w-3.5 text-brand-royal" />
                search • category • tag • date
              </p>
            </div>

            {/* grid / no-match / all-caught-up states */}
            {visiblePosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((a, i) => (
                  <Reveal key={a.id} delay={Math.min(i, 6) * 0.05}>
                    <BlogArticleCard article={a} />
                  </Reveal>
                ))}
              </div>
            ) : hasActiveFilters ? (
              <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
                <SearchX className="h-12 w-12 text-brand-slate" />
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                  No articles match your filters
                </h3>
                <p className="mt-2 max-w-sm text-sm text-brand-slate">
                  Try a different keyword, widen the date range or clear the
                  active filters.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-6 gap-2 rounded-full"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
                <Sparkles className="h-12 w-12 text-brand-gold" />
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                  You&apos;re all caught up
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-slate">
                  The most recent article is featured above. New posts appear
                  here automatically the next time they are published on{" "}
                  {devtoConfig.platformLabel}.
                </p>
              </div>
            )}

            {/* load more */}
            {visible < filtered.length && (
              <div className="mt-12 text-center">
                <Button
                  onClick={() => setVisible((v) => v + devtoConfig.pageSize)}
                  className="h-12 gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand-royal px-8 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_rgba(33,16,143,0.7)] transition-transform hover:scale-[1.03]"
                >
                  Load more articles
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                    {filtered.length - visible} left
                  </span>
                </Button>
              </div>
            )}
          </>
        )}

        {/* ── Publishing workflow note ──────────────────────────────── */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-brand-ink px-6 py-10 sm:px-10">
            <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
            <div className="blob left-[5%] top-[-50%] h-[220px] w-[220px] bg-brand-royal/50" aria-hidden="true" />
            <div className="blob bottom-[-60%] right-[10%] h-[200px] w-[200px] bg-brand-red/30" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold tracking-[0.28em] text-brand-gold">
                  HOW THIS WORKS
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">
                  Published on DEV.to — live here in minutes.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  I write and publish every article on my {devtoConfig.platformLabel}{" "}
                  account. This portfolio fetches the public API, caches it
                  briefly, and refreshes automatically — so new posts appear on
                  the homepage and this page without any redeployment. Full
                  reading, comments and claps all live on the original article.
                </p>
              </div>
              <a
                href={devtoProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-ink transition-transform hover:scale-[1.04]"
              >
                Read on {devtoConfig.platformLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
