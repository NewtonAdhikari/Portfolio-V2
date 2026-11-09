"use client";

/**
 * Shared blog article presentation used on the home page and /blog.
 * Cards always deep-link to the ORIGINAL DEV.to article — the portfolio
 * only ever shows previews, never reproduces article content.
 */

import { ArrowUpRight, CalendarDays, Clock3, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatReadingTime, type BlogArticle } from "@/lib/devto";

/* Branded fallback when an article has no cover image. */
function CoverFallback({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-deep via-[#2a1a9e] to-brand-royal",
        tall ? "h-full min-h-[220px]" : "aspect-[16/9]"
      )}
    >
      <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
      <div className="blob left-[-10%] top-[-30%] h-40 w-40 bg-brand-red/40" aria-hidden="true" />
      <div className="blob bottom-[-40%] right-[-5%] h-44 w-44 bg-brand-gold/30" aria-hidden="true" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-sm">
        <span className="font-display text-xl font-bold text-white/90">DEV</span>
      </span>
    </div>
  );
}

export function ArticleCover({
  article,
  className,
  tall = false,
}: {
  article: BlogArticle;
  className?: string;
  tall?: boolean;
}) {
  if (!article.coverImage) return <CoverFallback tall={tall} />;
  return (
    <div className={cn("overflow-hidden bg-brand-mist dark:bg-secondary", tall ? "h-full min-h-[220px]" : "aspect-[16/9]")}>
      <img
        src={article.coverImage}
        alt={`Cover image for “${article.title}”`}
        loading="lazy"
        className={cn(
          "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
          className
        )}
      />
    </div>
  );
}

function TagChips({ tags, max = 3 }: { tags: string[]; max?: number }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, max).map((t) => (
        <span
          key={t}
          className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-brand-slate dark:bg-white/10 dark:text-white/70"
        >
          #{t}
        </span>
      ))}
    </div>
  );
}

/* ── Standard card (grid usage) ────────────────────────────────────────── */
export function BlogArticleCard({ article }: { article: BlogArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-royal/40 hover:shadow-[0_24px_50px_-22px_rgba(33,16,143,0.35)]"
    >
      <div className="relative">
        <ArticleCover article={article} />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-deep shadow-sm dark:bg-brand-ink/90 dark:text-[#9aa8f5]">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand-royal line-clamp-2">
          {article.title}
        </h3>
        {article.description && (
          <p className="mt-2 text-sm leading-relaxed text-brand-slate line-clamp-3">
            {article.description}
          </p>
        )}

        <div className="mt-4">
          <TagChips tags={article.tags} />
        </div>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-brand-slate">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-brand-royal" />
              {article.publishedLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-brand-orange" />
              {formatReadingTime(article.readingTimeMinutes)}
            </span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gradient">
            Read Article
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ── Featured card (large, horizontal on desktop) ──────────────────────── */
export function FeaturedArticleCard({ article }: { article: BlogArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_70px_-40px_rgba(16,16,20,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_36px_80px_-40px_rgba(33,16,143,0.45)] lg:grid-cols-2"
    >
      <div className="relative min-h-[240px]">
        <ArticleCover article={article} tall />
        <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-brand-gold to-brand-orange px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
          ★ Featured
        </span>
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-9">
        <span className="inline-flex w-fit items-center rounded-full border border-brand-deep/15 bg-brand-mist px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-deep dark:border-white/15 dark:bg-white/10 dark:text-[#9aa8f5]">
          {article.category}
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-brand-royal sm:text-3xl">
          {article.title}
        </h3>
        {article.description && (
          <p className="mt-3 text-sm leading-relaxed text-brand-slate sm:text-base line-clamp-3">
            {article.description}
          </p>
        )}

        <div className="mt-5">
          <TagChips tags={article.tags} max={4} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-brand-slate">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-brand-royal" />
            {article.publishedLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4 text-brand-orange" />
            {formatReadingTime(article.readingTimeMinutes)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-brand-red" />
            {article.reactions}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4 text-brand-royal" />
            {article.comments}
          </span>
        </div>

        <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_rgba(229,36,54,0.65)] transition-transform group-hover:scale-[1.03]">
          Read the full article on DEV.to
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

/* ── Loading skeleton ──────────────────────────────────────────────────── */
export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <motion.div
        className="aspect-[16/9] w-full bg-gradient-to-r from-brand-mist via-secondary to-brand-mist bg-[length:200%_100%] dark:from-secondary dark:via-accent dark:to-secondary"
        animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="space-y-3 p-5">
        <div className="h-3.5 w-1/4 rounded-full bg-secondary" />
        <div className="h-5 w-full rounded-full bg-secondary" />
        <div className="h-5 w-4/5 rounded-full bg-secondary" />
        <div className="h-3 w-2/3 rounded-full bg-secondary/70" />
      </div>
    </div>
  );
}
