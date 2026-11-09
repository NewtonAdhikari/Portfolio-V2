"use client";

import { GraduationCap } from "lucide-react";

/**
 * Elegant SVG certificate mock used in the Achievements gallery until real
 * certificate images are added. Replace by referencing real images in the
 * data file if preferred.
 */
export function CertificateMock({
  title,
  organization,
  date,
  name,
  className,
}: {
  title: string;
  organization: string;
  date: string;
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-brand-gold/50 bg-gradient-to-br from-white via-brand-mist to-white shadow-lg ${className ?? ""}`}
      role="img"
      aria-label={`Certificate: ${title}`}
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
      <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-brand-deep via-brand-red to-brand-gold" aria-hidden="true" />
      <div className="absolute inset-3 rounded-lg border border-brand-gold/30" aria-hidden="true" />

      <div className="relative flex h-full flex-col items-center justify-between p-6 text-center">
        <div>
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-deep to-brand-royal text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-deep">
            Certificate of Achievement
          </p>
        </div>

        <div className="px-2">
          <p className="text-[11px] uppercase tracking-widest text-brand-slate">
            Awarded to
          </p>
          <p className="font-display text-lg font-bold text-brand-ink">{name}</p>
          <p className="mt-1.5 line-clamp-2 text-[13px] font-semibold leading-snug text-brand-deep">
            {title}
          </p>
          <p className="mt-1 text-[11px] text-brand-slate">{organization}</p>
        </div>

        <div className="flex w-full items-end justify-between text-[10px] text-brand-slate">
          <span>{date}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/60 bg-brand-gold/15 text-[9px] font-bold text-[#a8861d]">
            SEAL
          </span>
        </div>
      </div>
    </div>
  );
}
