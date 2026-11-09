"use client";

import { ShieldCheck, Database, Mail, UserCheck, Lock } from "lucide-react";
import { profile } from "@/data/profile";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";

const policies = [
  {
    icon: Database,
    title: "What we collect",
    text: "When you use the contact form, we collect the information you provide: your name, email address, optional phone number, subject, inquiry category and message. Nothing else — no tracking pixels, no third-party analytics scripts, no advertising identifiers.",
  },
  {
    icon: Mail,
    title: "How it is stored",
    text: "Form submissions are transmitted over HTTPS to a Google Apps Script backend and appended as rows to a private Google Spreadsheet controlled by the site owner. Access is restricted to the owner's Google account; the spreadsheet is never shared publicly.",
  },
  {
    icon: UserCheck,
    title: "How it is used",
    text: "Your message is used exclusively to respond to your inquiry. It is never sold, rented, shared with third parties, or used for marketing lists. If your message relates to a collaboration, relevant excerpts may be quoted back to you in replies — nothing more.",
  },
  {
    icon: Lock,
    title: "Data retention & deletion",
    text: "Messages are retained only as long as needed to handle your inquiry. Write to the email below and any record of your submission will be deleted from the spreadsheet within 72 hours, no questions asked.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    text: "Submissions pass browser-side validation and server-side sanitization. The Apps Script deployment validates an origin token, rejects oversized payloads, and applies rate/duplicate checks. No credentials, API keys or administrative access exist in frontend code.",
  },
];

export function PrivacyPage() {
  return (
    <div className="bg-background">
      <PageHero
        kicker="PRIVACY POLICY"
        icon="shield"
        title={
          <>
            Privacy, handled with{" "}
            <span className="text-gradient">respect and restraint.</span>
          </>
        }
        description={`This policy explains exactly what data this portfolio collects through its contact form, where it goes, and how it is protected. Last updated: November 2025.`}
      />

      <Section>
        <SectionHeading
          align="left"
          kicker="THE DETAILS"
          title="Plain-language privacy commitments"
        />
        <div className="mx-auto max-w-3xl space-y-5">
          {policies.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="flex gap-5 rounded-3xl border border-border bg-card p-6 sm:p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-royal text-white">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="rounded-3xl border border-brand-gold/30 bg-brand-gold/[0.06] p-7">
              <h3 className="font-display text-lg font-bold text-foreground">
                Contact about privacy
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                Questions, data-access requests or deletion requests: email{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="font-semibold text-brand-royal hover:text-brand-red"
                >
                  {profile.email}
                </a>
                . This site is a personal portfolio operated by{" "}
                {profile.name}, {profile.location}.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
