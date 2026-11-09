"use client";

import {
  ArrowRight,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
  Twitter,
} from "lucide-react";
import { useRoute } from "@/lib/router";
import { profile, journey, whatDrivesMe, philosophy } from "@/data/profile";
import { Section, SectionHeading } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Timeline } from "@/components/shared/Timeline";
import { DynamicIcon } from "@/components/shared/DynamicIcon";

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  graduation: GraduationCap,
  trophy: Trophy,
  twitter: Twitter,
};

export function AboutPage() {
  const { navigate } = useRoute();

  return (
    <div className="bg-background">
      <PageHero
        kicker="ABOUT ME"
        icon="users"
        title={
          <>
            Curious mind, careful engineer,{" "}
            <span className="text-gradient">permanent student.</span>
          </>
        }
        description="A Computer Science Engineering undergraduate figuring out how intelligent systems should be built — and how to build them responsibly."
      />

      {/* Professional introduction + personal info card */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Professional Introduction
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-brand-slate">
                <p>
                  I&apos;m {profile.name}, a Computer Science Engineering
                  undergraduate. My work sits at the intersection of research and
                  engineering: I like taking ideas from papers — retrieval
                  augmentation, causal evaluation, trustworthy ML — and turning
                  them into systems that real people can actually use.
                </p>
                <p>
                  As an undergraduate research assistant at my institute&apos;s
                  applied machine learning lab, I spend most weeks running
                  controlled experiments on large language model reasoning,
                  building evaluation tooling, and writing up what we learn.
                  Outside the lab, I build full-stack applications, contribute
                  to developer tooling, and mentor first-year students through
                  their first serious projects.
                </p>
                <p>
                  I care about rigor over hype: honest baselines, reproducible
                  experiments, and claims that survive scrutiny. The most
                  exciting part of this field is that it rewards both deep
                  curiosity and practical craftsmanship — I try to bring both
                  every day.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Personal Background
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-brand-slate">
                <p>
                  I grew up in Janakpur, Nepal, where my curiosity about technology gradually turned into a passion for building things. What started as an interest in computers evolved into a journey through programming, software development, and artificial intelligence. As a Computer Science student, I began exploring how ideas could become real applications and how technology could solve meaningful problems. Today, I build full-stack projects and explore research in machine learning, decision intelligence, and trustworthy AI. For me, coding is more than writing instructions—it's about turning curiosity into something useful.
                </p>
                <p>
                  Outside of academics, I play badminton badly but
                  enthusiastically, collect engineering-postmortem writeups,
                  and enjoy explaining complicated ideas with too many
                  whiteboard diagrams. Volunteering as a weekend computing
                  instructor at a community center keeps me grounded — teaching
                  a twelve-year-old their first loop is a humbling masterclass
                  in communication.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Career Objectives
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-brand-slate">
                <p>
                  Short term, I&apos;m looking for research collaborations,
                  challenging internships, and graduate school opportunities
                  where I can work on language-model reliability and evaluation
                  — the problem space I find most consequential.
                </p>
                <p>
                  Long term, I want to help build AI systems that are provably
                  trustworthy: systems whose capabilities are measured honestly,
                  whose failures are understood, and whose benefits reach people
                  beyond the technical bubble. Whether that happens in a
                  research lab, a startup, or a company that hasn&apos;t been
                  founded yet — the goal stays the same.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Personal info sidebar */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative bg-brand-ink p-8 text-center">
                <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
                <div className="blob left-[20%] top-[-40%] h-40 w-40 bg-brand-royal/60" aria-hidden="true" />
                <div className="relative">
                  <img
                      src="/newton-adhikari.png"
                      alt="Portrait of Newton Adhikari"
                      className="h-full w-full object-cover object-top transition-transform duration-[1600ms] hover:scale-[1.03]"
                   />
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{profile.designation}</p>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-brand-gold">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.location}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-brand-slate transition-colors hover:border-brand-royal/40 hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-brand-red" />
                  <span className="break-all">{profile.email}</span>
                </a>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {profile.socials.map((s) => {
                    const Icon = socialIcons[s.icon] ?? Github;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 rounded-xl border border-border px-3.5 py-3 text-[13px] font-medium text-brand-slate transition-colors hover:border-brand-royal/40 hover:text-foreground"
                      >
                        <Icon className="h-4 w-4 text-brand-royal" />
                        {s.label}
                      </a>
                    );
                  })}
                </div>
                <button
                  onClick={() => navigate("/contact")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(229,36,54,0.6)] transition-transform hover:scale-[1.02]"
                >
                  Let&apos;s Connect <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={profile.resumeUrl}
                  download
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-gold hover:text-[#a8861d]"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Academic journey timeline */}
      <Section className="bg-brand-mist dark:bg-secondary/30">
        <SectionHeading
          kicker="ACADEMIC JOURNEY"
          title={
            <>
              The road <span className="text-gradient">so far</span>
            </>
          }
          description="Every step compounded — from Scratch games to research submissions."
        />
        <div className="mx-auto max-w-3xl">
          <Timeline entries={journey.map((j) => ({ ...j }))} />
        </div>
      </Section>

      {/* What drives me */}
      <Section>
        <SectionHeading
          kicker="WHAT DRIVES ME"
          title={
            <>
              Technical &amp; <span className="text-gradient">research interests</span>
            </>
          }
          description="The problem spaces where I keep coming back — in the lab, in coursework and in side projects."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatDrivesMe.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-royal/40 hover:shadow-[0_20px_44px_-20px_rgba(33,16,143,0.28)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-royal text-white shadow-md transition-transform group-hover:scale-110">
                  <DynamicIcon name={d.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section className="relative overflow-hidden bg-brand-ink">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div className="blob right-[5%] top-[-30%] h-[320px] w-[320px] bg-brand-deep/60" aria-hidden="true" />
        <div className="relative">
          <SectionHeading
            dark
            kicker="PROFESSIONAL PHILOSOPHY"
            title={
              <>
                Principles I <span className="text-gradient-gold">work by</span>
              </>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-brand-gold/40">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-brand-gold">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <p className="inline-flex items-center gap-2 text-sm text-white/50">
              <Sparkles className="h-4 w-4 text-brand-gold" />
              <GraduationCap className="h-4 w-4 text-brand-gold" />
              Always learning — always building.
            </p>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
