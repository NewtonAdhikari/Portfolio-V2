"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRoute } from "@/lib/router";
import { skillCategories } from "@/data/skills";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { ProficiencyBadge } from "@/components/shared/Badges";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export function SkillsPage() {
  const { navigate } = useRoute();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("all");

  const visible =
    active === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === active);

  return (
    <div className="bg-background">
      <PageHero
        kicker="SKILLS"
        icon="wrench"
        title={
          <>
            A toolkit built for{" "}
            <span className="text-gradient">depth, not buzzwords.</span>
          </>
        }
        description="Languages, frameworks, research methods and infrastructure — organized by category with honest proficiency labels instead of vanity percentages."
      />

      <Section>
        {/* Category filter */}
        <Reveal>
          <div className="mb-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActive("all")}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                active === "all"
                  ? "border-brand-deep bg-brand-deep text-white"
                  : "border-border bg-card text-brand-slate hover:border-brand-royal/40 hover:text-foreground"
              )}
            >
              All categories
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                  active === c.id
                    ? "border-brand-deep bg-brand-deep text-white"
                    : "border-border bg-card text-brand-slate hover:border-brand-royal/40 hover:text-foreground"
                )}
              >
                <DynamicIcon name={c.icon} className="h-3.5 w-3.5" />
                {c.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="space-y-14">
          {visible.map((cat) => (
            <div key={cat.id}>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep to-brand-royal text-white shadow-md">
                  <DynamicIcon name={cat.icon} className="h-5.5 w-5.5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    {cat.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-brand-slate">{cat.blurb}</p>
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.skills.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-royal/40 hover:shadow-[0_20px_44px_-20px_rgba(33,16,143,0.28)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-bold text-foreground">
                        {s.name}
                      </h3>
                      <ProficiencyBadge level={s.proficiency} />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-slate">
                      {s.description}
                    </p>
                    {(s.relatedProjects?.length || s.relatedExperience?.length) && (
                      <div className="mt-4 space-y-1.5 border-t border-border/70 pt-3.5">
                        {s.relatedProjects?.map((p) => (
                          <button
                            key={p}
                            onClick={() => navigate("/projects")}
                            className="block text-left text-[12px] font-medium text-brand-royal transition-colors hover:text-brand-red"
                          >
                            <span className="opacity-60">Project ·</span> {p}
                          </button>
                        ))}
                        {s.relatedExperience?.map((e) => (
                          <button
                            key={e}
                            onClick={() => navigate("/experience")}
                            className="block text-left text-[12px] font-medium text-brand-royal transition-colors hover:text-brand-red"
                          >
                            <span className="opacity-60">Experience ·</span> {e}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently learning */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-ink p-8 sm:p-10">
            <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
            <div className="blob right-[10%] top-[-50%] h-[240px] w-[240px] bg-brand-red/30" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-[11px] font-bold tracking-[0.26em] text-brand-gold">
                  CURRENTLY LEARNING
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                  Causal discovery algorithms • GPU optimization • Rust for systems work
                </h3>
              </div>
              <button
                onClick={() => navigate("/projects")}
                className="shrink-0 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <span className="inline-flex items-center gap-2">
                  See skills in action <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
