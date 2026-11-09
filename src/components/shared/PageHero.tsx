"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { cn } from "@/lib/utils";

/**
 * Dark, premium hero band used at the top of every inner page — deep blue to
 * black gradient, grid texture, geometric accents and golden/ red highlights.
 */
export function PageHero({
  kicker,
  title,
  description,
  icon,
  children,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  icon?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden bg-brand-ink">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/80 via-brand-ink/40 to-brand-ink" aria-hidden="true" />
      <div
        className="blob left-[-8%] top-[-30%] h-[420px] w-[420px] bg-brand-royal/40"
        aria-hidden="true"
      />
      <div
        className="blob bottom-[-45%] right-[-6%] h-[380px] w-[380px] bg-brand-red/25"
        aria-hidden="true"
      />
      <div
        className="blob right-[22%] top-[-20%] h-[220px] w-[220px] bg-brand-gold/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 md:pb-24 md:pt-40 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-brand-orange">
            {icon && <DynamicIcon name={icon} className="h-3.5 w-3.5" />}
            {kicker}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>

      {/* bottom fade into page background */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
