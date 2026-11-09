"use client";

import { BookOpen, ExternalLink, FileBadge, MapPin } from "lucide-react";
import { getEducationBySlug } from "@/data/education";
import { DetailShell } from "@/components/shared/DetailShell";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "./NotFoundPage";

export function EducationDetailPage({ slug }: { slug: string }) {
  const item = getEducationBySlug(slug);
  if (!item) return <NotFoundPage />;

  const meta = [
    { label: "Level", value: item.level },
    { label: "Duration", value: item.duration },
    { label: "Grade", value: item.grade },
    {
      label: "Location",
      value: (
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-brand-orange" /> {item.location}
        </span>
      ),
    },
  ];

  const actions = (
    <Button
      variant="outline"
      onClick={() => item.documents[0] && window.open(item.documents[0].href, "_blank")}
      className="gap-2 rounded-full"
    >
      <FileBadge className="h-4 w-4" /> Official Documents
    </Button>
  );

  const aside = (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Program Card
        </h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Institution</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.institution}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Degree</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.degree}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Department</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.department}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Specialization</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.specialization}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Documents
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

  return (
    <DetailShell
      backTo="/education"
      backLabel="Back to Education"
      kicker={item.level}
      title={item.institution}
      meta={meta}
      icon="graduation"
      actions={actions}
      aside={aside}
      sections={item.sections}
      heroNode={
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground">
            <BookOpen className="h-5 w-5 text-brand-red" /> Overview
          </h2>
          <p className="mt-3 leading-relaxed text-brand-slate">{item.overview}</p>
        </div>
      }
    />
  );
}
