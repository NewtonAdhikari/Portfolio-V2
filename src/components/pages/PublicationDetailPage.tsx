"use client";

import { useState } from "react";
import { BookOpen, Download, ExternalLink, GraduationCap, Quote } from "lucide-react";
import { useRoute } from "@/lib/router";
import { getPublicationBySlug } from "@/data/publications";
import { DetailShell } from "@/components/shared/DetailShell";
import { StatusBadge } from "@/components/shared/Badges";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "./NotFoundPage";
import { profile } from "@/data/profile";

export function PublicationDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRoute();
  const item = getPublicationBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!item) return <NotFoundPage />;

  const meta = [
    { label: "Status", value: <StatusBadge status={item.status} /> },
    { label: "Category", value: item.category },
    { label: "Year", value: String(item.year) },
    { label: "Domain", value: item.domain },
  ];

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(item.citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  const actions = (
    <>
      <Button
        onClick={() =>
          item.pdfUrl
            ? window.open(item.pdfUrl, "_blank")
            : navigate("/contact")
        }
        className="gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-white hover:opacity-90"
      >
        <Download className="h-4 w-4" /> Download PDF
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          item.doiUrl
            ? window.open(item.doiUrl, "_blank")
            : window.open(
                "https://scholar.google.com/scholar?q=" +
                  encodeURIComponent(item.title),
                "_blank"
              )
        }
        className="gap-2 rounded-full"
      >
        <ExternalLink className="h-4 w-4" /> {item.doiUrl ? "View DOI" : "Find on Scholar"}
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          window.open(
            "https://scholar.google.com/citations?user=" +
              encodeURIComponent(profile.name),
            "_blank"
          )
        }
        className="gap-2 rounded-full"
      >
        <GraduationCap className="h-4 w-4" /> Google Scholar
      </Button>
    </>
  );

  const aside = (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Authors
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
          Publication Info
        </h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Venue</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.venue}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">DOI</dt>
            <dd className="mt-0.5 font-mono text-[13px] text-foreground">{item.doi}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Keywords</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {item.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                >
                  {k}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          <Quote className="h-3.5 w-3.5" /> Citation
        </h3>
        <p className="mt-3 rounded-xl bg-brand-mist p-3.5 text-[13px] leading-relaxed text-brand-slate dark:bg-secondary/60">
          {item.citation}
        </p>
        <button
          onClick={copyCitation}
          className="mt-3 w-full rounded-full border border-border py-2 text-xs font-semibold text-foreground transition-colors hover:border-brand-gold hover:text-[#a8861d]"
        >
          {copied ? "Copied ✓" : "Copy citation"}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <DetailShell
        backTo="/publications"
        backLabel="Back to Publications"
        kicker={`${item.category} • ${item.year}`}
        title={item.title}
        meta={meta}
        icon="bookOpen"
        actions={actions}
        aside={aside}
        sections={item.sections}
        heroNode={
          <div className="rounded-3xl border border-brand-deep/10 bg-gradient-to-r from-brand-deep/[0.04] to-brand-royal/[0.03] p-6 sm:p-8">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground">
              <BookOpen className="h-5 w-5 text-brand-red" /> Abstract at a glance
            </h2>
            <p className="mt-3 leading-relaxed text-brand-slate">{item.abstract}</p>
          </div>
        }
      />
    </div>
  );
}
