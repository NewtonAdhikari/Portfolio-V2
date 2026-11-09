"use client";

import { Code2, ExternalLink, Github, Layers } from "lucide-react";
import { useRoute } from "@/lib/router";
import { getProjectBySlug } from "@/data/projects";
import { DetailShell } from "@/components/shared/DetailShell";
import { StatusBadge, TechChip } from "@/components/shared/Badges";
import { CoverArt } from "@/components/shared/CoverArt";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "./NotFoundPage";
import { profile } from "@/data/profile";

export function ProjectDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRoute();
  const item = getProjectBySlug(slug);

  if (!item) return <NotFoundPage />;

  const meta = [
    { label: "Status", value: <StatusBadge status={item.status} /> },
    { label: "Category", value: item.category },
    { label: "Year", value: String(item.year) },
    {
      label: "Stack",
      value: `${item.technologies.length} technologies`,
    },
  ];

  const actions = (
    <>
      {item.github && (
        <Button
          onClick={() => window.open(item.github, "_blank")}
          className="gap-2 rounded-full bg-brand-ink text-white hover:bg-brand-deep"
        >
          <Github className="h-4 w-4" /> GitHub Repository
        </Button>
      )}
      {item.demo && (
        <Button
          variant="outline"
          onClick={() =>
            item.demo !== "#" ? window.open(item.demo, "_blank") : navigate("/contact")
          }
          className="gap-2 rounded-full"
        >
          <ExternalLink className="h-4 w-4" /> Live Application
        </Button>
      )}
    </>
  );

  const aside = (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-border">
        <CoverArt
          from={item.cover.from}
          to={item.cover.to}
          icon={item.cover.icon}
          className="h-36"
        />
        <div className="bg-card p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
            Project Snapshot
          </p>
          <ul className="mt-3 space-y-2">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-brand-slate">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-royal to-brand-red" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Technology Stack
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.technologies.map((t) => (
            <TechChip key={t} name={t} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          <Layers className="h-3.5 w-3.5" /> Quick Facts
        </h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Timeline</dt>
            <dd className="font-medium text-foreground">{item.year}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Type</dt>
            <dd className="font-medium text-foreground">{item.category}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Stage</dt>
            <dd className="font-medium text-foreground">{item.status}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-brand-royal/25 bg-brand-royal/[0.05] p-6">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-royal">
          <Code2 className="h-3.5 w-3.5" /> Like this build?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-slate">
          Source links above are sample placeholders. Reach out to discuss the
          implementation or collaborate on the next iteration.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="mt-3 text-sm font-semibold text-brand-royal hover:text-brand-red"
        >
          Start a conversation →
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <DetailShell
        backTo="/projects"
        backLabel="Back to Projects"
        kicker={`${item.category} • ${item.year}`}
        title={item.title}
        meta={meta}
        icon="code"
        actions={actions}
        aside={aside}
        sections={item.sections}
        heroNode={
          <div className="overflow-hidden rounded-3xl border border-border">
            <CoverArt
              from={item.cover.from}
              to={item.cover.to}
              icon={item.cover.icon}
              className="h-52 sm:h-64"
              iconClassName="h-16 w-16"
            />
            <div className="bg-card p-6 sm:p-8">
              <p className="leading-relaxed text-brand-slate">{item.description}</p>
            </div>
          </div>
        }
      />

      <div className="border-t border-border bg-brand-mist py-10 dark:bg-secondary/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p className="text-sm text-brand-slate">
            Want the technical deep-dive on{" "}
            <span className="font-semibold text-foreground">{item.title}</span>?
          </p>
          <Button
            onClick={() => navigate("/contact")}
            className="rounded-full bg-brand-deep px-6 text-white hover:bg-brand-royal"
          >
            Discuss with {profile.firstName}
          </Button>
        </div>
      </div>
    </div>
  );
}
