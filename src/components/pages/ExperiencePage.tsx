"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRoute } from "@/lib/router";
import { experienceCategories, experienceItems } from "@/data/experience";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { TechChip } from "@/components/shared/Badges";
import { cn } from "@/lib/utils";

export function ExperiencePage() {
  const { navigate } = useRoute();
  const reduce = useReducedMotion();
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const list =
      category === "All"
        ? experienceItems
        : experienceItems.filter((e) => e.category === category);
    return [...list].sort((a, b) => (a.start < b.start ? 1 : -1));
  }, [category]);

  return (
    <div className="bg-background">
      <PageHero
        kicker="EXPERIENCE"
        icon="briefcase"
        title={
          <>
            Where theory met{" "}
            <span className="text-gradient">practice.</span>
          </>
        }
        description="Research assistantships, engineering internships, technical leadership and volunteering — each role with its own detail page, honest responsibilities and real contributions."
      />

      <Section>
        {/* Category chips */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {["All", ...experienceCategories].map((c) => {
              const count =
                c === "All"
                  ? experienceItems.length
                  : experienceItems.filter((e) => e.category === c).length;
              if (count === 0) return null;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                    category === c
                      ? "border-brand-deep bg-brand-deep text-white shadow-[0_10px_24px_-10px_rgba(33,16,143,0.6)]"
                      : "border-border bg-card text-brand-slate hover:border-brand-royal/40 hover:text-foreground"
                  )}
                >
                  {c} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          <motion.div
            className="absolute bottom-2 left-[22px] top-2 w-px origin-top bg-gradient-to-b from-brand-red via-brand-deep to-brand-royal sm:left-[26px]"
            initial={reduce ? undefined : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {filtered.map((e, i) => (
              <motion.li
                key={e.slug}
                className="relative pl-16 sm:pl-[72px]"
                initial={reduce ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <span className="absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-brand-deep shadow-sm sm:h-[52px] sm:w-[52px]">
                  <DynamicIcon name={e.cover.icon} className="h-5 w-5" />
                </span>
                <button
                  onClick={() => navigate(`/experience/${e.slug}`)}
                  className="group block w-full overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-royal/40 hover:shadow-[0_24px_50px_-20px_rgba(33,16,143,0.3)]"
                >
                  <div
                    className="h-2 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${e.cover.from}, ${e.cover.to})`,
                    }}
                  />
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full bg-brand-deep/[0.06] px-3 py-1 text-[11px] font-bold text-brand-deep dark:bg-white/10 dark:text-[#9aa8f5]">
                        {e.category}
                      </span>
                      <span className="text-xs font-semibold text-brand-red">
                        {e.duration}
                      </span>
                      <span className="text-xs text-muted-foreground">{e.location}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand-royal sm:text-xl">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-royal">
                      {e.organization}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-slate">
                      {e.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.technologies.slice(0, 5).map((t) => (
                        <TechChip key={t} name={t} />
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-royal transition-all group-hover:gap-2.5 group-hover:text-brand-red">
                      View role details <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </motion.li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Leadership / soft-skill strip */}
      <Section className="bg-brand-mist dark:bg-secondary/30 border-y border-border/60">
        <SectionHeading
          kicker="BEYOND ROLES"
          title={
            <>
              What these experiences <span className="text-gradient">taught me</span>
            </>
          }
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Owning outcomes",
              text: "Internships and lab work taught me that deliverables matter more than effort — ship the monitor, the runbook, the eval, not just the attempt.",
            },
            {
              title: "Mentoring multiplies",
              text: "Leading club sessions and bootcamps showed me that teaching a concept is the fastest way to truly understand it.",
            },
            {
              title: "Design for constraints",
              text: "Volunteering on old hardware and flaky Wi-Fi made 'works on real conditions' a permanent habit, not a luxury.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-base font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
