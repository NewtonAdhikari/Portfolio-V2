"use client";

import { BadgeCheck, ExternalLink } from "lucide-react";
import { getAchievementBySlug } from "@/data/achievements";
import { profile } from "@/data/profile";
import { DetailShell } from "@/components/shared/DetailShell";
import { CertificateMock } from "@/components/shared/CertificateMock";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "./NotFoundPage";

export function AchievementDetailPage({ slug }: { slug: string }) {
  const item = getAchievementBySlug(slug);
  if (!item) return <NotFoundPage />;

  const meta = [
    { label: "Category", value: item.category },
    { label: "Issued by", value: item.organization },
    { label: "Date", value: item.date },
  ];

  const aside = (
    <div className="space-y-5">
      <CertificateMock
        title={item.title}
        organization={item.organization}
        date={item.date}
        name={profile.name}
        className="aspect-[4/3] w-full"
      />

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
          Verification
        </h3>
        <dl className="mt-4 space-y-3 text-sm">
          {item.credentialId && (
            <div>
              <dt className="text-muted-foreground">Credential ID</dt>
              <dd className="mt-0.5 font-mono text-[13px] text-foreground">
                {item.credentialId}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-muted-foreground">Issuing organization</dt>
            <dd className="mt-0.5 font-medium text-foreground">{item.organization}</dd>
          </div>
        </dl>
        {item.verificationUrl && (
          <Button
            variant="outline"
            onClick={() => window.open(item.verificationUrl, "_blank")}
            className="mt-4 w-full gap-2 rounded-full"
          >
            <ExternalLink className="h-4 w-4" /> Verify credential
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/[0.06] p-6">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a8861d] dark:text-brand-gold">
          <BadgeCheck className="h-3.5 w-3.5" /> Note
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-slate">
          This is a stylized certificate preview. Swap in the real certificate
          image and verification link in src/data/achievements.ts.
        </p>
      </div>
    </div>
  );

  return (
    <DetailShell
      backTo="/achievements"
      backLabel="Back to Achievements"
      kicker={item.category}
      title={item.title}
      meta={meta}
      icon="award"
      aside={aside}
      sections={item.sections}
    />
  );
}
