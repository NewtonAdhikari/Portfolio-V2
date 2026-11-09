"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, BookOpen, GraduationCap } from "lucide-react";
import { useRoute } from "@/lib/router";
import { educationItems } from "@/data/education";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { cn } from "@/lib/utils";

export function EducationPage() {
  const { navigate } = useRoute();
  const reduce = useReducedMotion();

  const grouped = {
    "Undergraduate Education": educationItems.filter((e) => e.level === "Undergraduate Education"),
    "Higher Secondary Education": educationItems.filter((e) => e.level === "Higher Secondary Education"),
    "Secondary Education": educationItems.filter((e) => e.level === "Secondary Education"),
  };

  return (
    <div className="bg-background">
      <PageHero
        kicker="EDUCATION"
        icon="graduation"
        title={
          <>
            The academic foundation behind{" "}
            <span className="text-gradient">the curiosity.</span>
          </>
        }
        description="From foundational schooling to a specialized undergraduate program — institutions, coursework, grades and achievements, each with its own detail page."
      />

      {/* Interactive timeline */}
      <Section>
        <SectionHeading
          kicker="ACADEMIC TIMELINE"
          title={
            <>
              Every chapter of the <span className="text-gradient">learning story</span>
            </>
          }
          description="Click any entry to open its dedicated detail page — institution overview, coursework, achievements and documents."
        />

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            className="absolute bottom-2 left-[22px] top-2 w-px origin-top bg-gradient-to-b from-brand-royal via-brand-deep to-brand-red sm:left-[26px]"
            initial={reduce ? undefined : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {educationItems.map((e, i) => (
              <motion.li
                key={e.slug}
                className="relative pl-16 sm:pl-[72px]"
                initial={reduce ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-royal text-white shadow-md sm:h-[52px] sm:w-[52px]">
                  <DynamicIcon name={e.icon} className="h-5 w-5" />
                </span>
                <button
                  onClick={() => navigate(`/education/${e.slug}`)}
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
                        {e.level}
                      </span>
                      <span className="text-xs font-semibold text-brand-red">
                        {e.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand-royal sm:text-xl">
                      {e.institution}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-royal">
                      {e.degree} — {e.specialization}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-brand-slate">
                        <Award className="h-4 w-4 text-brand-gold" />
                        {e.grade}
                      </span>
                      <span className="flex items-center gap-1.5 text-brand-slate">
                        <BookOpen className="h-4 w-4 text-brand-royal" />
                        {e.coursework.length} courses listed
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-royal transition-all group-hover:gap-2.5 group-hover:text-brand-red">
                      Open detail page <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </motion.li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Sections per level */}
      {Object.entries(grouped).map(([level, items]) => (
        <Section key={level} className="bg-brand-mist dark:bg-secondary/30 border-y border-border/60">
          <SectionHeading
            align="left"
            kicker={level.toUpperCase()}
            title={items[0]?.institution ?? level}
            description={items[0]?.overview}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                  <BookOpen className="h-4.5 w-4.5 text-brand-royal" /> Relevant Coursework
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items[0]?.coursework.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                  <Award className="h-4.5 w-4.5 text-brand-gold" /> Academic Achievements
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {items[0]?.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-sm leading-relaxed text-brand-slate">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-royal to-brand-red" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      {/* Certifications strip */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-ink p-8 text-center sm:p-12">
            <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
            <div className="blob left-[10%] top-[-40%] h-[240px] w-[240px] bg-brand-royal/50" aria-hidden="true" />
            <div className="relative">
              <GraduationCap className="mx-auto h-10 w-10 text-brand-gold" />
              <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                Academic Certifications
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/65">
                Course certificates, workshops and professional programs are
                curated on the Achievements page — with a premium certificate
                gallery.
              </p>
              <button
                onClick={() => navigate("/achievements")}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                View certifications <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
