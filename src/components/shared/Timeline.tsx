"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { cn } from "@/lib/utils";

export type TimelineEntry = {
  period: string;
  title: string;
  org?: string;
  text?: string;
  icon?: string;
  href?: string;
  tag?: string;
};

/**
 * Interactive vertical timeline with animated connecting line, used by
 * Education, Experience and the About journey.
 */
export function Timeline({
  entries,
  dark = false,
  onSelect,
  ctaLabel = "View details",
}: {
  entries: TimelineEntry[];
  dark?: boolean;
  onSelect?: (index: number) => void;
  ctaLabel?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* connecting line */}
      <motion.div
        className={cn(
          "absolute left-[22px] top-2 bottom-2 w-px origin-top sm:left-[26px]",
          dark ? "bg-white/15" : "bg-border"
        )}
        initial={reduce ? undefined : { scaleY: 0 }}
        whileInView={reduce ? undefined : { scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden="true"
      />

      <ol className="space-y-8">
        {entries.map((e, i) => (
          <motion.li
            key={`${e.title}-${i}`}
            className="relative pl-16 sm:pl-[72px]"
            initial={reduce ? false : { opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            {/* node */}
            <span
              className={cn(
                "absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-xl border sm:h-[52px] sm:w-[52px]",
                dark
                  ? "border-white/15 bg-white/[0.06] text-brand-gold"
                  : "border-border bg-background text-brand-deep shadow-sm"
              )}
              aria-hidden="true"
            >
              <DynamicIcon name={e.icon ?? "sparkles"} className="h-5 w-5" />
            </span>

            <div
              className={cn(
                "group rounded-2xl border p-5 transition-all duration-300 sm:p-6",
                dark
                  ? "border-white/10 bg-white/[0.04] hover:border-brand-gold/40"
                  : "border-border bg-card hover:-translate-y-0.5 hover:border-brand-royal/40 hover:shadow-[0_18px_40px_-18px_rgba(33,16,143,0.25)]",
                onSelect && "cursor-pointer"
              )}
              onClick={onSelect ? () => onSelect(i) : undefined}
              onKeyDown={
                onSelect
                  ? (ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        onSelect(i);
                      }
                    }
                  : undefined
              }
              role={onSelect ? "button" : undefined}
              tabIndex={onSelect ? 0 : undefined}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.18em]",
                    dark ? "text-brand-gold" : "text-brand-red"
                  )}
                >
                  {e.period}
                </span>
                {e.tag && (
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
                      dark
                        ? "border-white/15 text-white/60"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {e.tag}
                  </span>
                )}
              </div>
              <h3
                className={cn(
                  "mt-1.5 text-lg font-bold leading-snug",
                  dark ? "text-white" : "text-foreground"
                )}
              >
                {e.title}
              </h3>
              {e.org && (
                <p
                  className={cn(
                    "mt-0.5 text-sm font-medium",
                    dark ? "text-white/60" : "text-brand-royal"
                  )}
                >
                  {e.org}
                </p>
              )}
              {e.text && (
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    dark ? "text-white/65" : "text-brand-slate"
                  )}
                >
                  {e.text}
                </p>
              )}
              {onSelect && (
                <span
                  className={cn(
                    "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-0.5",
                    dark ? "text-brand-orange" : "text-brand-royal"
                  )}
                >
                  {ctaLabel} <span aria-hidden="true">→</span>
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
