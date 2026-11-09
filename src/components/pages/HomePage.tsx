"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Compass,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  MapPin,
  MoveUpRight,
  Sparkles,
  Trophy,
  Twitter,
  Globe2,
  FlaskConical,
  Terminal,
} from "lucide-react";

import { useRoute } from "@/lib/router";
import { profile, stats, whatDrivesMe } from "@/data/profile";
import { researchItems } from "@/data/research";
import { projects } from "@/data/projects";

import { StatCounter } from "@/components/shared/StatCounter";
import { Reveal } from "@/components/shared/Reveal";
import { ResearchCard, ProjectCard } from "@/components/shared/cards";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { HomeBlogSection } from "@/components/blog/HomeBlogSection";
import { NewsUpdatesSection } from "@/components/blog/NewsUpdatesSection";

/* =========================================================
   DESIGN SYSTEM
========================================================= */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  graduation: GraduationCap,
  trophy: Trophy,
  twitter: Twitter,
};

const focusAreas = [
  "Artificial Intelligence",
  "Machine Learning",
  "Software Engineering",
  "Research & Innovation",
];

const technologies = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "TensorFlow",
  "Scikit-learn",
  "OpenAI API",
];

const researchFocus = [
  "Intelligent Systems",
  "Machine Learning",
  "Causal Reasoning",
  "Applied AI",
  "Software Research",
];

const currentlyExploring = [
  "LLM Evaluation",
  "Multimodal AI",
  "Applied Causal Inference",
  "Developer Tooling",
  "Research-grade Software Systems",
];

const workingPrinciples = [
  {
    title: "Research-first thinking",
    text: "I approach problems with curiosity, rigor, and a preference for evidence-driven decisions.",
  },
  {
    title: "Engineering for impact",
    text: "Ideas matter most when they become reliable systems people can actually use.",
  },
  {
    title: "Clarity over complexity",
    text: "I value simple explanations, clean architecture, and documentation that helps others move faster.",
  },
  {
    title: "Continuous learning",
    text: "Technology and research evolve quickly, so I stay curious, adaptive, and intentional.",
  },
];

const processSteps = [
  {
    title: "Define",
    text: "Clarify the problem, constraints, users, and success metrics before writing code.",
    icon: Compass,
  },
  {
    title: "Prototype",
    text: "Build fast experiments to validate assumptions, explore feasibility, and learn early.",
    icon: BrainCircuit,
  },
  {
    title: "Refine",
    text: "Improve performance, reliability, usability, and maintainability through iteration.",
    icon: Layers3,
  },
  {
    title: "Ship",
    text: "Deliver polished solutions with documentation, testing, and real-world readiness.",
    icon: Code2,
  },
];

const featuredResearch = researchItems.slice(0, 3);
const featuredProjects = projects.slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/* =========================================================
   SHARED UI PRIMITIVES
========================================================= */

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${
        light ? "text-[#E2C48C]" : "text-[#9B7844]"
      }`}
    >
      <span
        className={`h-px w-10 ${light ? "bg-[#E2C48C]/70" : "bg-[#9B7844]/60"}`}
      />
      {children}
    </div>
  );
}

function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  action,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  action?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
      <div>
        <Eyebrow light={light}>
          {index} / {eyebrow}
        </Eyebrow>
        <h2
          className={`mt-6 max-w-4xl font-display text-[2.85rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.65rem] ${
            light ? "text-white" : "text-[#111418]"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-6">
        <p
          className={`max-w-sm text-[15.5px] leading-7.5 ${
            light ? "text-white/55" : "text-[#6B6A64]"
          }`}
        >
          {description}
        </p>
        {action}
      </div>
    </div>
  );
}

function EditorialLink({
  children,
  onClick,
  light = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 border-b pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
        light
          ? "border-white/25 text-white hover:border-[#E2C48C] hover:text-[#E2C48C]"
          : "border-[#111418]/20 text-[#111418] hover:border-[#9B7844] hover:text-[#9B7844]"
      }`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function Pill({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
        light
          ? "border-white/15 bg-white/5 text-white/70 hover:border-[#E2C48C]/50 hover:text-[#E2C48C]"
          : "border-[#111418]/10 bg-white/70 text-[#55544F] hover:border-[#9B7844]/50 hover:text-[#9B7844] hover:bg-white"
      }`}
    >
      {children}
    </span>
  );
}

/* =========================================================
   HERO
========================================================= */

function HeroSection({ reduce }: { reduce: boolean | null }) {
  const { navigate } = useRoute();

  return (
    <section className="relative z-10 overflow-hidden border-b border-[#111418]/08 bg-[#FAF8F5] text-[#111418]">
      {/* Ambient light */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#B9975B]/[0.09] blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 top-[25%] h-[520px] w-[520px] rounded-full bg-[#294C82]/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-[12%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.05] blur-[130px]" />

      {/* Top status bar */}
      <Container className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#111418]/08 py-4">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B9975B]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#444]">
              Newton Adhikari
            </span>
          </div>
          <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-[#6B6A64] md:block">
            Research · Engineering · Development
          </span>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#444]">
              Faith in my heart, logic in my mind, God's grace in every line of code.
            </span>
          </div>
        </div>
      </Container>

      {/* Main content */}
      <Container className="relative grid items-center gap-14 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-20 xl:py-24">
        {/* Left column */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={stagger}
          className="relative z-10 order-2 lg:order-1"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>From Nepal, Beyond Boundaries</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 font-display text-[clamp(3.75rem,9vw,7.25rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-[#111418]"
          >
            Newton
            <span className="mt-1.5 block font-serif text-[0.76em] font-normal italic tracking-[-0.03em] text-[#9B7844]">
              Adhikari
              <span className="text-[#294C82]">.</span>
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-9 flex items-start gap-4">
            <span className="mt-1.5 h-14 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-[#9B7844] to-[#294C82]" />
            <div>
              <h2 className="text-[18px] font-semibold tracking-tight text-[#111418] sm:text-[19px]">
                {profile.designation}
              </h2>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#6B6A64]">
                Artificial Intelligence · Research · Software Development
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-[15.5px] leading-8 text-[#66655F]"
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {focusAreas.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-medium text-[#6B6A64]"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#9B7844]" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-[#9B7844]" />
              Himalayan Roots, Global Ambition
            </span>
            <span className="flex items-center gap-1.5">
              <FlaskConical className="h-3.5 w-3.5 text-[#9B7844]" />
              Research-minded Builder
            </span>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3.5">
            <button
              type="button"
              onClick={() => navigate("/research")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#111418] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_32px_-12px_rgba(17,20,24,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#9B7844] hover:shadow-[0_20px_48px_-16px_rgba(155,120,68,0.55)]"
            >
              Explore Research
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#111418]/12 bg-white/80 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#111418] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9B7844]/50 hover:text-[#9B7844] hover:shadow-[0_12px_32px_-16px_rgba(17,20,24,0.15)]"
            >
              <Code2 className="h-3.5 w-3.5" />
              View Projects
            </button>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#111418]/12 bg-white/80 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#111418] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9B7844]/50 hover:text-[#9B7844]"
            >
              <Download className="h-3.5 w-3.5" />
              CV
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-3">
            <span className="mr-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#99958C]">
              Connect
            </span>
            {profile.socials.slice(0, 4).map((social) => {
              const Icon = socialIcons[social.icon] ?? Github;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111418]/10 bg-white/80 text-[#55544F] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#111418] hover:bg-[#111418] hover:text-white hover:shadow-[0_8px_24px_-8px_rgba(17,20,24,0.35)]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right — portrait */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="relative order-1 mx-auto w-full max-w-[540px] lg:order-2"
        >
          <div className="pointer-events-none absolute -right-6 -top-12 z-0 select-none font-serif text-[110px] italic leading-none text-[#B9975B]/[0.14] sm:text-[150px]">
            N.
          </div>

          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[32px] border border-[#111418]/08 bg-[#DCD6C9] shadow-[0_40px_100px_-36px_rgba(17,20,24,0.45)]">
            <img
              src="/newton-adhikari.png"
              alt="Portrait of Newton Adhikari"
              className="h-full w-full object-cover object-top transition-transform duration-[1800ms] ease-out hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111418]/85 via-[#111418]/20 to-transparent" />
            <div className="pointer-events-none absolute inset-5 rounded-[26px] border border-white/25" />

            <div className="absolute left-6 top-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            </div>

            <div className="absolute right-0 top-[30%] flex h-[80px] w-[80px] items-center justify-center rounded-l-[22px] bg-[#9B7844] text-white shadow-[0_20px_50px_-18px_rgba(155,120,68,0.75)] sm:h-[92px] sm:w-[92px]">
              <span className="font-serif text-3xl italic sm:text-4xl">N.</span>
            </div>

            <div className="absolute bottom-7 left-7 right-7 text-white">
              <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#E2C48C]">
                Independent Mind · Limitless Vision
              </span>
              <h2 className="mt-3.5 font-serif text-[2rem] italic leading-tight sm:text-[2.35rem]">
                Per Aspera
                <span className="block text-[#E2C48C]">Ad Astra.</span>
              </h2>
              <div className="mt-5 flex items-center gap-3 border-t border-white/25 pt-4">
                <span className="text-[8px] uppercase tracking-[0.2em]">Think</span>
                <span className="h-1 w-1 rounded-full bg-[#E2C48C]" />
                <span className="text-[8px] uppercase tracking-[0.2em]">Create</span>
                <span className="h-1 w-1 rounded-full bg-[#E2C48C]" />
                <span className="text-[8px] uppercase tracking-[0.2em]">Innovate</span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 -z-0 h-[58%] w-[68%] rounded-[32px] border border-[#B9975B]/35" />

          <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[#111418]/08 pt-4">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6A64]">
              Rooted in Nepal
            </span>
            <span className="font-serif text-[15px] italic text-[#9B7844]">
              Beyond Boundaries.
            </span>
          </div>
        </motion.div>
      </Container>

      {/* Motivational marquee strip */}
<Container className="relative">
  <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#111418]/08 py-6">

    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6A64]">
      Beyond Code
    </span>

    <div className="min-w-0 flex-1 overflow-hidden">
      <marquee behavior="scroll" direction="left" scrollamount="3" className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#55544F]" >
        Driven by curiosity ✳ Building intelligent systems ✳ Exploring the future of AI ✳ Turning research into innovation ✳ Engineering ideas that matter ✳ Develop the future ✳ Advancing knowledge through research ✳ Creating software that empowers ✳ Bridging theory and practice ✳ Innovating with purpose ✳ Pushing the boundaries of technology ✳ Designing solutions for real-world impact ✳ Learning, building, and sharing knowledge ✳ Crafting intelligent applications ✳ Transforming ideas into reality ✳ Exploring the frontiers of AI research ✳ Building systems that make a difference ✳ Advancing the state of the art in software engineering ✳ Driving progress through innovation.
      </marquee>
    </div>

    <button
      type="button"
      onClick={() =>
        document.getElementById("journal")?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
        })
      }
      className="group flex shrink-0 items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#111418] transition-colors hover:text-[#9B7844]"
    >
      Scroll to explore
      <ArrowRight className="h-3.5 w-3.5 rotate-90 transition-transform group-hover:translate-y-1" />
    </button>

  </div>
</Container>
    </section>
  );
}

/* =========================================================
   PROFESSIONAL SNAPSHOT
========================================================= */

function SnapshotSection({ reduce }: { reduce: boolean | null }) {
  return (
    <section className="relative z-10 overflow-hidden bg-[#111418] text-white">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#B9975B]/[0.09] blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#294C82]/[0.14] blur-[130px]" />

      <Container className="relative py-20 lg:py-28">
        <SectionHeader
          light
          index="00"
          eyebrow="Professional Snapshot"
          title={
            <>
              Progress is a collection of
              <span className="text-[#E2C48C]"> meaningful milestones.</span>
            </>
          }
          description="An evolving journey across academic research, software development, intelligent systems, and innovation."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease }}
              className="group relative bg-[#111418] p-7 transition-colors duration-400 hover:bg-[#171C22] sm:p-8"
            >
              <div className="mb-7 h-[2.5px] w-8 bg-[#B9975B] transition-all duration-500 group-hover:w-16" />
              <StatCounter
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E2C48C]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Always Learning · Always Building
          </span>
          <span className="font-serif text-[15px] italic text-[#E2C48C]">
            The journey continues.
          </span>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function AboutSection({ reduce }: { reduce: boolean | null }) {
  const { navigate } = useRoute();

  return (
    <section className="relative z-10 overflow-hidden bg-[#FAF8F5] py-20 text-[#111418] lg:py-28">
      <div className="pointer-events-none absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-[#B9975B]/[0.07] blur-[120px]" />

      <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="relative">
            <Eyebrow>Beyond the Code</Eyebrow>
            <h2 className="mt-7 font-display text-[2.85rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#111418] sm:text-5xl lg:text-[3.4rem]">
              Curiosity
              <span className="block font-serif italic font-normal text-[#9B7844]">
                drives.
              </span>
              Innovation
              <span className="block font-serif italic font-normal text-[#294C82]">
                follows.
              </span>
            </h2>
            <p className="mt-7 max-w-md text-[15.5px] leading-8 text-[#6B6A64]">
              I enjoy exploring challenging problems at the intersection of
              computing, artificial intelligence, academic research, and
              real-world software engineering. My goal is to build systems that
              are intelligent, useful, and understandable.
            </p>
            <div className="mt-8">
              <EditorialLink onClick={() => navigate("/about")}>
                Discover my story
              </EditorialLink>
            </div>

            <div className="mt-12 space-y-3.5">
              {workingPrinciples.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease }}
                  className="group flex gap-4 rounded-2xl border border-[#111418]/06 bg-white/80 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#9B7844]/30 hover:bg-white hover:shadow-[0_12px_32px_-20px_rgba(17,20,24,0.15)]"
                >
                  <span className="mt-0.5 font-serif text-[17px] italic text-[#9B7844]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-[#111418]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-6.5 text-[#6B6A64]">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pointer-events-none absolute -bottom-24 right-0 hidden font-serif text-[180px] italic leading-none text-[#B9975B]/[0.07] lg:block">
              N
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {whatDrivesMe.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <motion.div
                whileHover={reduce ? undefined : { y: -8 }}
                className="group relative h-full min-h-[250px] overflow-hidden rounded-[28px] border border-[#111418]/06 bg-white p-7 shadow-[0_16px_48px_-32px_rgba(17,20,24,0.22)] transition-all duration-500 hover:border-[#B9975B]/35 hover:shadow-[0_28px_64px_-32px_rgba(17,20,24,0.3)]"
              >
                <span className="absolute right-5 top-4 font-serif text-5xl italic text-[#B9975B]/[0.12]">
                  0{index + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF8F5] text-[#9B7844] transition-all duration-500 group-hover:bg-[#111418] group-hover:text-[#E2C48C]">
                  <DynamicIcon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-[18px] font-semibold text-[#111418]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-6.5 text-[#6B6A64]">
                  {item.text}
                </p>
                <div className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-gradient-to-r from-[#B9975B] to-[#294C82] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   RESEARCH
========================================================= */

function ResearchSection({ reduce }: { reduce: boolean | null }) {
  const { navigate } = useRoute();

  return (
    <section className="relative z-10 overflow-hidden bg-[#F1EDE5] py-20 text-[#111418] lg:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#294C82]/[0.07] blur-[120px]" />

      <Container className="relative">
        <SectionHeader
          index="01"
          eyebrow="Research & Publications"
          title={
            <>
              Exploring ideas.
              <span className="block font-serif italic font-normal text-[#9B7844]">
                Advancing knowledge.
              </span>
            </>
          }
          description="Academic research and scholarly work exploring intelligent systems, machine learning, causal reasoning, and emerging computing technologies."
          action={
            <Reveal>
              <EditorialLink onClick={() => navigate("/research")}>
                All Research
              </EditorialLink>
            </Reveal>
          }
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="mt-9 flex flex-wrap gap-2"
        >
          {researchFocus.map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredResearch.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.08}>
              <ResearchCard item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#111418]/08 pt-6">
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6B6A64]">
            Knowledge · Investigation · Discovery
          </span>
          <EditorialLink onClick={() => navigate("/publications")}>
            Browse Publications
          </EditorialLink>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

function ProjectsSection({ reduce }: { reduce: boolean | null }) {
  const { navigate } = useRoute();

  return (
    <section className="relative z-10 overflow-hidden bg-white py-20 text-[#111418] lg:py-28">
      <Container className="relative">
        <SectionHeader
          index="02"
          eyebrow="Selected Engineering Work"
          title={
            <>
              Ideas into action.
              <span className="block font-serif italic font-normal text-[#294C82]">
                Technology into impact.
              </span>
            </>
          }
          description="Selected engineering projects showcasing intelligent applications, modern web technologies, and practical problem-solving."
          action={
            <Reveal>
              <EditorialLink onClick={() => navigate("/projects")}>
                All Projects
              </EditorialLink>
            </Reveal>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <ProjectCard item={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease }}
                className="group relative overflow-hidden rounded-[24px] border border-[#111418]/06 bg-[#FAF8F5] p-6 transition-all duration-500 hover:border-[#294C82]/25 hover:bg-white hover:shadow-[0_24px_56px_-32px_rgba(17,20,24,0.3)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111418] text-white transition-colors duration-500 group-hover:bg-[#294C82]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-serif text-[15px] italic text-[#9B7844]">
                    Step 0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold text-[#111418]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-6.5 text-[#6B6A64]">
                  {step.text}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#294C82]/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   EXPERTISE
========================================================= */

function ExpertiseSection({ reduce }: { reduce: boolean | null }) {
  const { navigate } = useRoute();

  const groups = [
    {
      label: "Programming & Development",
      icon: Code2,
      items: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
    },
    {
      label: "AI & Machine Learning",
      icon: BrainCircuit,
      items: ["TensorFlow", "Scikit-learn", "OpenAI API", "Prompt Engineering"],
    },
    {
      label: "Data & Infrastructure",
      icon: Layers3,
      items: ["PostgreSQL", "SQL", "REST API", "Git", "GitHub", "Deployment"],
    },
  ];

  return (
    <section className="relative z-10 overflow-hidden bg-[#111418] text-white">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#294C82]/[0.16] blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#B9975B]/[0.09] blur-[130px]" />

      <Container className="relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <Eyebrow light>Technology & Expertise</Eyebrow>
              <h2 className="mt-7 font-display text-[2.85rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3rem]">
                Building with purpose.
                <span className="mt-2.5 block font-serif italic font-normal text-[#E2C48C]">
                  Creating with technology.
                </span>
              </h2>
              <p className="mt-7 max-w-md text-[15.5px] leading-8 text-white/50">
                A growing collection of technologies, frameworks, and tools used
                to develop software, investigate research problems, and build
                intelligent solutions.
              </p>
              <div className="mt-9">
                <EditorialLink light onClick={() => navigate("/skills")}>
                  Explore All Skills
                </EditorialLink>
              </div>

              <div className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-[#E2C48C]" />
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                    Currently Exploring
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currentlyExploring.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] text-white/60 transition-all duration-300 hover:border-[#E2C48C]/40 hover:text-[#E2C48C]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-7 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-9">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E2C48C]/30 bg-[#E2C48C]/10 text-[#E2C48C]">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-white">
                    Technology Stack
                  </h3>
                  <p className="mt-1 text-[10px] text-white/40">
                    Tools, frameworks & platforms
                  </p>
                </div>
              </div>
              <Sparkles className="h-4.5 w-4.5 text-[#E2C48C]" />
            </div>

            <div className="mt-8 space-y-8">
              {groups.map((group, index) => {
                const Icon = group.icon;
                return (
                  <div key={group.label}>
                    <div className="mb-3.5 flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 text-[#E2C48C]" />
                      <h4 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                        {group.label}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, itemIndex) => (
                        <motion.span
                          key={item}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.08 + itemIndex * 0.035,
                          }}
                          whileHover={reduce ? undefined : { y: -3 }}
                          className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[10px] font-medium text-white/60 transition-all duration-300 hover:border-[#E2C48C]/45 hover:bg-[#E2C48C]/10 hover:text-[#E2C48C]"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                Continuous Learning
              </span>
              <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-widest text-[#E2C48C]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                Exploring
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   JOURNAL / BLOG
========================================================= */

function JournalSection() {
  return (
    <section
      id="journal"
      className="relative z-10 overflow-hidden border-b border-[#111418]/06 bg-[#FAF8F5] py-20 text-[#111418] lg:py-28"
    >
      <Container className="relative">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Ideas · Perspectives · Knowledge</Eyebrow>
            <h2 className="mt-5 font-display text-[2.85rem] font-semibold tracking-[-0.04em] text-[#111418] sm:text-[3rem]">
              The Journal
              <span className="text-[#9B7844]">.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[15.5px] leading-8 text-[#6B6A64]">
              Thoughts, discoveries, technical explorations, and perspectives
              from my ongoing learning journey in AI, software, and research.
            </p>
          </div>
          <div className="hidden items-center gap-2.5 rounded-full border border-[#111418]/08 bg-white/80 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9B7844] backdrop-blur-sm md:flex">
            <BookOpen className="h-3.5 w-3.5" />
            Research & Writing
          </div>
        </div>
        <HomeBlogSection />
      </Container>
    </section>
  );
}

/* =========================================================
   NEWS & UPDATES
========================================================= */

function UpdatesSection() {
  return (
    <section className="relative z-10 overflow-hidden bg-white py-20 text-[#111418] lg:py-24">
      <Container className="relative">
        <div className="mb-11">
          <Eyebrow>What is happening</Eyebrow>
          <h2 className="mt-5 font-display text-[2.85rem] font-semibold tracking-[-0.04em] text-[#111418] sm:text-[3rem]">
            Latest Updates
            <span className="text-[#9B7844]">.</span>
          </h2>
          <p className="mt-4 max-w-lg text-[15.5px] leading-8 text-[#6B6A64]">
            Recent developments, academic milestones, announcements, and other
            noteworthy updates from my journey.
          </p>
        </div>
        <NewsUpdatesSection />
      </Container>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function ContactSection({ reduce }: { reduce: boolean | null }) {
  const { navigate } = useRoute();

  return (
    <section className="relative z-10 overflow-hidden bg-[#111418] text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#294C82]/[0.16] blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-20 h-[520px] w-[520px] rounded-full bg-[#B9975B]/[0.09] blur-[130px]" />

      <Container className="relative py-24 lg:py-32">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.48fr] lg:items-end">
            <div>
              <Eyebrow light>Collaboration Beyond Boundaries</Eyebrow>
              <h2 className="mt-7 max-w-3xl font-display text-[2.85rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.65rem]">
                Have an idea?
                <span className="mt-3.5 block font-serif italic font-normal text-[#E2C48C]">
                  Let&apos;s build something meaningful.
                </span>
              </h2>
              <p className="mt-7 max-w-lg text-[15.5px] leading-8 text-white/50">
                Whether it&apos;s a research collaboration, software engineering
                project, academic opportunity, or a meaningful conversation, I
                would love to connect.
              </p>

              <div className="mt-10 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#E2C48C] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#111418] shadow-[0_12px_32px_-12px_rgba(226,196,140,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_48px_-16px_rgba(226,196,140,0.5)]"
                >
                  Start a Conversation
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/achievements")}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#E2C48C] hover:text-[#E2C48C]"
                >
                  <Trophy className="h-3.5 w-3.5" />
                  Achievements
                  <MoveUpRight className="h-3 w-3" />
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="mr-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Find me online
                </span>
                {profile.socials.slice(0, 6).map((social) => {
                  const Icon = socialIcons[social.icon] ?? Github;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65 transition-all duration-300 hover:-translate-y-1 hover:border-[#E2C48C] hover:bg-[#E2C48C] hover:text-[#111418]"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease }}
              className="relative rounded-[30px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E2C48C]/40 to-transparent" />
              <Globe2 className="h-8 w-8 text-[#E2C48C]" />
              <p className="mt-6 font-serif text-[1.75rem] italic leading-relaxed text-white sm:text-[2rem]">
                Per Aspera
                <span className="block text-[#E2C48C]">Ad Astra.</span>
              </p>
              <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                From Nepal, Beyond Boundaries.
              </p>
              <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <span>Focus</span>
                  <span className="text-white/100">AI · Research · Engineering</span>
                </div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <span>Location</span>
                  <span className="text-white/75">{profile.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-7">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Newton Adhikari 
          </span>
          <span className="font-serif text-[15px] italic text-[#E2C48C]">
            THINK · CREATE · DEVELOP
          </span>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   MAIN HOMEPAGE
========================================================= */

export function HomePage() {
  const reduce = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5] text-[#111418] selection:bg-[#B9975B]/25">
      <HeroSection reduce={reduce} />
      <SnapshotSection reduce={reduce} />
      <AboutSection reduce={reduce} />
      <ResearchSection reduce={reduce} />
      <ProjectsSection reduce={reduce} />
      <ExpertiseSection reduce={reduce} />
      <JournalSection />
      <UpdatesSection />
      <ContactSection reduce={reduce} />
    </main>
  );
}

export default HomePage;