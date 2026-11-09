"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { getExperienceBySlug } from "@/data/experience";
import { DetailShell } from "@/components/shared/DetailShell";
import { TechChip } from "@/components/shared/Badges";
import { NotFoundPage } from "./NotFoundPage";

export function ExperienceDetailPage({ slug }: { slug: string }) {
  const item = getExperienceBySlug(slug);
  if (!item) return <NotFoundPage />;

  const meta = [
    { label: "Role", value: item.role },
    { label: "Organization", value: item.organization },
    { label: "Duration", value: item.duration },
    {
      label: "Location",
      value: (
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-brand-orange" /> {item.location}
        </span>
      ),
    },
  ];

  const aside = (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Technologies Used
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.technologies.map((t) => (
            <TechChip key={t} name={t} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Achievements
        </h3>
        <ul className="mt-4 space-y-2.5">
          {item.achievements.map((a) => (
            <li key={a} className="flex gap-3 text-sm leading-relaxed text-brand-slate">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
              {a}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Supporting Documents
        </h3>
        <ul className="mt-4 space-y-2.5">
          {item.documents.map((d) => (
            <li key={d.label}>
              <a
                href={d.href}
                target={d.external ? "_blank" : undefined}
                rel={d.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2.5 rounded-xl border border-border px-4 py-3 text-[13px] font-medium text-brand-slate transition-colors hover:border-brand-royal/40 hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4 text-brand-royal" />
                {d.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Compose the role sections from structured lists.
  const sections = [
    ...item.sections,
    {
      id: "responsibilities",
      heading: "Responsibilities",
      bullets: item.responsibilities,
    },
    {
      id: "contributions-detail",
      heading: "Key Contributions",
      bullets: item.contributions,
    },
  ];

  return (
    <DetailShell
      backTo="/experience"
      backLabel="Back to Experience"
      kicker={`${item.category} • ${item.duration}`}
      title={item.role}
      meta={meta}
      icon="briefcase"
      aside={aside}
      sections={sections}
      heroNode={
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <p className="text-sm font-semibold text-brand-royal">{item.organization}</p>
          <p className="mt-3 leading-relaxed text-brand-slate">{item.summary}</p>
        </div>
      }
    />
  );
}
