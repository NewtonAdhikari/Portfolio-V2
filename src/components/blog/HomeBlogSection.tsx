"use client";

/**
 * Homepage section — "Insights, Ideas & My Learning Journey".
 * Shows the three most recent DEV.to articles, auto-synced, with a
 * graceful skeleton / error / empty experience.
 */

import { ArrowRight, Feather, RefreshCw, ServerCrash } from "lucide-react";
import { useRoute } from "@/lib/router";
import { useDevtoArticles } from "@/lib/devto";
import { devtoConfig, devtoProfileUrl } from "@/data/profile";
import { Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import {
  BlogArticleCard,
  BlogCardSkeleton,
} from "@/components/shared/BlogCard";

export function HomeBlogSection() {
  const { navigate } = useRoute();
  const { articles, state, refresh } = useDevtoArticles(10);
  const preview = articles.slice(0, 3);

  return (
    <Section className="relative bg-brand-mist dark:bg-secondary/30">
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            kicker="LEARNING IN PUBLIC"
            title={
              <>
                Insights, Ideas &amp; My{" "}
                <span className="text-gradient">Learning Journey</span>
              </>
            }
            description="Sharing knowledge, exploring emerging technologies, documenting research, and learning something new every day."
          />
          <Reveal>
            <button
              onClick={() => navigate("/blog")}
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-brand-deep/20 px-5 py-2.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-deep hover:text-white dark:border-white/20 dark:text-[#9aa8f5] md:mb-14"
            >
              Explore All Articles
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>

        {/* ── Content states ────────────────────────────────────────── */}
        {state.status === "loading" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : state.status === "error" ? (
          <div className="flex flex-col items-center rounded-3xl border border-destructive/25 bg-destructive/[0.05] px-6 py-12 text-center">
            <ServerCrash className="h-10 w-10 text-destructive" />
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">
              Blog feed unavailable right now
            </h3>
            <p className="mt-2 max-w-md text-sm text-brand-slate">
              {state.message}
            </p>
            <button
              onClick={refresh}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-destructive/40 px-5 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        ) : state.status === "empty" ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center">
            <Feather className="h-10 w-10 text-brand-gold" />
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">
              First article coming soon
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-slate">
              Articles are published on{" "}
              <span className="font-semibold text-foreground">
                @{devtoConfig.username}
              </span>{" "}
              and appear here automatically the moment they go live.
            </p>
            <a
              href={devtoProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand-royal px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Visit my DEV.to profile
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {preview.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <BlogArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
