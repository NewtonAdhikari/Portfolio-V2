"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, ExternalLink, X } from "lucide-react";
import { useRoute } from "@/lib/router";
import { achievementCategories, achievements } from "@/data/achievements";
import { profile } from "@/data/profile";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { CertificateMock } from "@/components/shared/CertificateMock";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, string> = {
  "Academic Achievements": "graduation",
  "Research Achievements": "flask",
  "Awards and Recognition": "award",
  "Technical Competitions": "trophy",
  Hackathons: "code",
  "Professional Certifications": "bookOpen",
  "Leadership Activities": "users",
};

export function AchievementsPage() {
  const { navigate } = useRoute();
  const reduce = useReducedMotion();
  const [category, setCategory] = useState("All");
  const [viewer, setViewer] = useState<(typeof achievements)[number] | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? achievements
        : achievements.filter((a) => a.category === category),
    [category]
  );

  return (
    <div className="bg-background">
      <PageHero
        kicker="ACHIEVEMENTS & CERTIFICATIONS"
        icon="award"
        title={
          <>
            Milestones earned,{" "}
            <span className="text-gradient-gold">moments remembered.</span>
          </>
        }
        description="Academic honors, research wins, hackathons, professional certifications and leadership recognition — with a premium certificate gallery."
      />

      <Section>
        {/* Category chips */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {["All", ...achievementCategories].map((c) => {
              const count =
                c === "All"
                  ? achievements.length
                  : achievements.filter((a) => a.category === c).length;
              if (count === 0) return null;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                    category === c
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-border bg-card text-brand-slate hover:border-brand-royal/40 hover:text-foreground"
                  )}
                >
                  {c} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Gallery grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-[0_24px_50px_-22px_rgba(212,175,55,0.45)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold to-brand-orange text-white shadow-md">
                  <DynamicIcon
                    name={categoryIcons[a.category] ?? "award"}
                    className="h-5 w-5"
                  />
                </span>
                <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-[10.5px] font-bold text-[#a8861d] dark:text-brand-gold">
                  {a.category}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
                {a.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-brand-royal">
                {a.organization} · {a.date}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-slate">
                {a.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => navigate(`/achievements/${a.slug}`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-deep px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-royal"
                >
                  Details <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewer(a)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-brand-gold hover:text-[#a8861d]"
                >
                  <BadgeCheck className="h-3.5 w-3.5" /> Certificate
                </button>
                {a.verificationUrl && (
                  <a
                    href={a.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Verify credential"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-brand-slate transition-colors hover:border-brand-royal hover:text-brand-royal"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Verify
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Certificate viewer modal */}
      {viewer && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-ink/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate preview: ${viewer.title}`}
          onClick={() => setViewer(null)}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewer(null)}
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-ink shadow-lg"
              aria-label="Close certificate viewer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <CertificateMock
              title={viewer.title}
              organization={viewer.organization}
              date={viewer.date}
              name={profile.name}
              className="aspect-[4/3] w-full"
            />
            <p className="mt-4 text-center text-xs text-white/60">
              {viewer.credentialId
                ? `Credential ID: ${viewer.credentialId}`
                : "Stylized certificate preview — replace with the real certificate image in the data file."}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
