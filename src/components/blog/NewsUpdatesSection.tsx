"use client";

/**
 * Homepage "News & Updates" section — short personal announcements
 * maintained in src/data/news.ts (newest first). Internal links use the
 * portfolio router, external links open in a new tab.
 */

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Megaphone } from "lucide-react";
import { useRoute } from "@/lib/router";
import { newsItems, type NewsTag } from "@/data/news";
import { Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<NewsTag, string> = {
  Milestone: "border-brand-gold/40 bg-brand-gold/10 text-[#8a6d10] dark:text-brand-gold",
  Research: "border-brand-royal/40 bg-brand-royal/10 text-brand-royal dark:text-[#9aa8f5]",
  Publication: "border-brand-deep/40 bg-brand-deep/10 text-brand-deep dark:text-[#9aa8f5]",
  Project: "border-brand-orange/40 bg-brand-orange/10 text-[#b25a10] dark:text-brand-orange",
  Event: "border-brand-red/40 bg-brand-red/10 text-brand-red",
  Update: "border-border bg-secondary text-brand-slate",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function NewsUpdatesSection() {
  const { navigate } = useRoute();

  return (
    <Section>
      <SectionHeading
        kicker="NEWSROOM"
        title={
          <>
            News &amp; <span className="text-gradient">Updates</span>
          </>
        }
        description="Recent milestones, publications, projects and happenings — the running record of what I've been up to."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.slice(0, 6).map((item, i) => {
          const isInternal = item.link?.href.startsWith("/");
          return (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[0_22px_48px_-24px_rgba(33,16,143,0.3)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                      TAG_STYLES[item.tag]
                    )}
                  >
                    {item.tag}
                  </span>
                  <time
                    dateTime={item.date}
                    className="text-[11px] font-semibold text-brand-slate"
                  >
                    {formatDate(item.date)}
                  </time>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                  {item.text}
                </p>

                {item.link && (
                  <button
                    onClick={() =>
                      isInternal ? navigate(item.link!.href) : window.open(item.link!.href, "_blank", "noopener")
                    }
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-bold text-brand-royal transition-colors hover:text-brand-red"
                  >
                    {item.link.label}
                    {isInternal ? (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </button>
                )}
              </motion.article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-8 text-center">
        <p className="inline-flex items-center gap-2 text-xs text-brand-slate">
          <Megaphone className="h-3.5 w-3.5 text-brand-orange" />
          More frequent, article-length updates live on the{" "}
          <button
            onClick={() => navigate("/blog")}
            className="font-bold text-brand-royal underline underline-offset-4 hover:text-brand-red"
          >
            blog
          </button>
          .
        </p>
      </Reveal>
    </Section>
  );
}
