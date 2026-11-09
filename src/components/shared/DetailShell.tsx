"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useRoute } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { DynamicIcon } from "./DynamicIcon";
import type { DocSection } from "@/data/types";
import { cn } from "@/lib/utils";

function SectionBlock({
  section,
  index,
}: {
  section: DocSection;
  index: number;
}) {
  return (
    <Reveal delay={Math.min(index * 0.03, 0.15)}>
      <section
        id={section.id}
        className="scroll-mt-28 border-t border-border/70 pt-8 first:border-t-0 first:pt-0"
      >
        <h2 className="flex items-baseline gap-3 text-xl font-bold text-foreground sm:text-2xl">
          <span className="font-mono text-sm font-semibold text-brand-red">
            {String(index + 1).padStart(2, "0")}
          </span>
          {section.heading}
        </h2>

        <div className="mt-4 space-y-4">
          {section.paragraphs?.map((p, i) => (
            <p key={i} className="leading-relaxed text-brand-slate">
              {p}
            </p>
          ))}

          {section.bullets && (
            <ul className="space-y-2.5">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-brand-slate">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-royal to-brand-red" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {section.table && (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary">
                  <tr>
                    {section.table.headers.map((h) => (
                      <th
                        key={h}
                        className="whitespace-nowrap px-4 py-3 font-semibold text-secondary-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-t border-border/60 odd:bg-white even:bg-brand-mist dark:odd:bg-card dark:even:bg-secondary/50"
                    >
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 text-brand-slate">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section.callout && (
            <div
              className={cn(
                "rounded-xl border p-4 text-sm leading-relaxed",
                section.callout.tone === "gold" &&
                  "border-brand-gold/40 bg-brand-gold/[0.07] text-[#8a6d14] dark:text-brand-gold",
                section.callout.tone === "warn" &&
                  "border-brand-orange/40 bg-brand-orange/[0.07] text-[#b25a10] dark:text-brand-orange",
                section.callout.tone === "info" &&
                  "border-brand-royal/30 bg-brand-royal/[0.06] text-brand-royal dark:text-[#9db0f5]"
              )}
            >
              {section.callout.text}
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}

/**
 * Reusable detail-page template. Every portfolio item type (research,
 * publications, projects, education, experience, achievements) renders
 * through this shell so detail pages stay consistent site-wide.
 */
export function DetailShell({
  backTo,
  backLabel,
  kicker,
  title,
  meta,
  icon,
  actions,
  aside,
  sections,
  heroNode,
}: {
  backTo: string;
  backLabel: string;
  kicker: string;
  title: string;
  meta?: { label: string; value: ReactNode }[];
  icon?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  sections: DocSection[];
  heroNode?: ReactNode;
}) {
  const { navigate } = useRoute();

  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-brand-ink">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/70 via-brand-ink/50 to-brand-ink" aria-hidden="true" />
        <div className="blob left-[-6%] top-[-35%] h-[380px] w-[380px] bg-brand-royal/40" aria-hidden="true" />
        <div className="blob bottom-[-50%] right-[-5%] h-[340px] w-[340px] bg-brand-red/25" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pt-36 lg:px-8">
          <button
            onClick={() => navigate(backTo)}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </button>

          <Reveal className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-brand-orange">
              {icon && <DynamicIcon name={icon} className="h-3.5 w-3.5" />}
              {kicker}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
              {title}
            </h1>

            {meta && meta.length > 0 && (
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                      {m.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-white/85">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-background" aria-hidden="true" />
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className={cn("grid gap-10", aside ? "lg:grid-cols-[1fr_320px]" : "")}>
          <article className="min-w-0 space-y-10">
            {heroNode}
            {sections.map((s, i) => (
              <SectionBlock key={s.id} section={s} index={i} />
            ))}
          </article>

          {aside && (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {aside}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
