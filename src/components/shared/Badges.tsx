"use client";

import { cn } from "@/lib/utils";

const statusTones: Record<string, string> = {
  Published: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  Accepted: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  Maintained: "bg-brand-royal/10 text-brand-royal dark:text-[#8fa4f2] border-brand-royal/25",
  "Under Review": "bg-brand-gold/10 text-[#a8861d] dark:text-brand-gold border-brand-gold/30",
  Preprint: "bg-brand-gold/10 text-[#a8861d] dark:text-brand-gold border-brand-gold/30",
  Ongoing: "bg-brand-orange/10 text-[#c26110] dark:text-brand-orange border-brand-orange/30",
  "In Progress": "bg-brand-orange/10 text-[#c2610f] dark:text-brand-orange border-brand-orange/30",
  Archived: "bg-muted text-muted-foreground border-border",
};

const categoryTones: Record<string, string> = {
  default: "bg-brand-deep/[0.06] text-brand-deep border-brand-deep/15",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide",
        statusTones[status] ?? statusTones.Archived,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function CategoryBadge({
  category,
  className,
  tone = "default",
}: {
  category: string;
  className?: string;
  tone?: "default" | "gold";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide",
        tone === "gold"
          ? "border-brand-gold/40 bg-brand-gold/10 text-[#a8861d] dark:text-brand-gold"
          : categoryTones.default,
        className
      )}
    >
      {category}
    </span>
  );
}

export function TechChip({ name }: { name: string }) {
  return (
    <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
      {name}
    </span>
  );
}

export function ProficiencyBadge({
  level,
}: {
  level: "Beginner" | "Intermediate" | "Advanced";
}) {
  const tones = {
    Beginner: "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-400/30",
    Intermediate: "bg-brand-royal/10 text-brand-royal dark:text-[#8fa4f2] border-brand-royal/30",
    Advanced: "bg-brand-deep/10 text-brand-deep dark:text-[#9aa8f5] border-brand-deep/30",
  };
  const dots = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold",
        tones[level]
      )}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < dots[level] ? "bg-current" : "bg-current/25"
          )}
        />
      ))}
      {level}
    </span>
  );
}
