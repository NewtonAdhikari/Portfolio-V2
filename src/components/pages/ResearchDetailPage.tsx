"use client";

import { BookOpen, Code2, Download, Mail, ExternalLink } from "lucide-react";
import { useRoute } from "@/lib/router";
import { getResearchBySlug } from "@/data/research";
import { getPublicationBySlug } from "@/data/publications";
import { DetailShell } from "@/components/shared/DetailShell";
import { StatusBadge } from "@/components/shared/Badges";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "./NotFoundPage";
import { profile } from "@/data/profile";

export function ResearchDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRoute();
  const item = getResearchBySlug(slug);

  if (!item) return <NotFoundPage />;

  // Map research projects to their associated publication records.
  const assocPubSlug: Record<string, string> = {
    "causal-llm-evaluation": "causal-llm-eval-2025",
    "rag-campus-assistant": "rag-campus-report-2025",
    "trustworthy-ml-survey": "trustworthy-survey-preprint-2024",
  };
  const associatedPub = getPublicationBySlug(assocPubSlug[item.slug] ?? "");

  const meta = [
    { label: "Status", value: <StatusBadge status={item.status} /> },
    { label: "Category", value: item.category },
    { label: "Domain", value: item.domain },
    { label: "Year", value: String(item.year) },
    { label: "Venue", value: item.venue },
  ];

  const actions = (
    <>
      <Button
        onClick={() => navigate("/contact")}
        className="gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-white hover:opacity-90"
      >
        <Download className="h-4 w-4" /> Download Research Paper
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          item.links?.publication
            ? window.open(item.links.publication.href, "_blank")
            : navigate("/publications")
        }
        className="gap-2 rounded-full"
      >
        <BookOpen className="h-4 w-4" /> View Publication
      </Button>
      {item.links?.code && (
        <Button
          variant="outline"
          onClick={() => window.open(item.links!.code!.href, "_blank")}
          className="gap-2 rounded-full"
        >
          <Code2 className="h-4 w-4" /> View Source Code
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={() => navigate("/contact")}
        className="gap-2 rounded-full text-brand-royal hover:text-brand-red"
      >
        <Mail className="h-4 w-4" /> Contact Researcher
      </Button>
    </>
  );

  const aside = (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Research Team
        </h3>
        <ul className="mt-4 space-y-3">
          {item.authors.map((a) => (
            <li key={a} className="flex items-center gap-3 text-sm text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-deep to-brand-royal text-[10px] font-bold text-white">
                {a
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Keywords
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/[0.06] p-6">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a8861d] dark:text-brand-gold">
          <ExternalLink className="h-3.5 w-3.5" /> Open Science Note
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-slate">
          Where results are still under review, this page deliberately shows
          placeholders instead of invented numbers. Full data ships with the
          publication.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Associated Publication
        </h3>
        <p className="mt-3 text-sm text-brand-slate">
          {associatedPub
            ? associatedPub.title
            : "Publication record pending — see the Publications page for current status."}
        </p>
        <button
          onClick={() => navigate("/publications")}
          className="mt-3 text-sm font-semibold text-brand-royal hover:text-brand-red"
        >
          Browse publications →
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <DetailShell
        backTo="/research"
        backLabel="Back to Research"
        kicker={`${item.category} • ${item.year}`}
        title={item.title}
        meta={meta}
        icon="flask"
        actions={actions}
        aside={aside}
        sections={item.sections}
      />
      {/* Contact strip */}
      <div className="border-t border-border bg-brand-mist py-10 dark:bg-secondary/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p className="text-sm text-brand-slate">
            Questions about this research? Reach{" "}
            <span className="font-semibold text-foreground">{profile.name}</span>{" "}
            directly.
          </p>
          <Button
            onClick={() => navigate("/contact")}
            className="rounded-full bg-brand-deep px-6 text-white hover:bg-brand-royal"
          >
            Contact Researcher
          </Button>
        </div>
      </div>
    </div>
  );
}
