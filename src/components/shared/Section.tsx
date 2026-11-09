"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  dark = false,
}: {
  kicker?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"
      )}
    >
      {kicker && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em]",
            dark ? "text-brand-orange" : "text-brand-red"
          )}
        >
          <span className="h-1 w-6 rounded-full bg-current" />
          {kicker}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-brand-slate"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
