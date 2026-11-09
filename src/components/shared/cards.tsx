"use client";

import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useRoute } from "@/lib/router";
import { CoverArt } from "./CoverArt";
import { StatusBadge } from "./Badges";
import { TechChip } from "./Badges";
import type { ResearchItem, Project } from "@/data/types";
import { motion, useReducedMotion } from "framer-motion";

export function ResearchCard({ item }: { item: ResearchItem }) {
  const { navigate } = useRoute();
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-royal/40 hover:shadow-[0_24px_50px_-20px_rgba(33,16,143,0.3)]"
    >
      <CoverArt from={item.cover.from} to={item.cover.to} icon={item.cover.icon} className="h-40" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-deep/[0.06] px-3 py-1 text-[11px] font-semibold text-brand-deep dark:bg-white/10 dark:text-[#9aa8f5]">
            {item.category}
          </span>
          <StatusBadge status={item.status} />
        </div>
        <h3 className="mt-3.5 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand-royal">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-brand-slate">
          {item.abstract}
        </p>
        <div className="mt-4 text-[12px] font-medium text-muted-foreground">
          {item.authors.join(" • ")}
        </div>
        <div className="mt-auto pt-5">
          <button
            onClick={() => navigate(`/research/${item.slug}`)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-royal transition-all group-hover:gap-2.5 group-hover:text-brand-red"
          >
            View Research <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectCard({ item }: { item: Project }) {
  const { navigate } = useRoute();
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-royal/40 hover:shadow-[0_24px_50px_-20px_rgba(33,16,143,0.3)]"
    >
      <div className="relative">
        <CoverArt from={item.cover.from} to={item.cover.to} icon={item.cover.icon} className="h-40" />
        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
        {item.demo && item.demo !== "#" && (
          <a
            href={item.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live demo"
            className="absolute right-14 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-deep/[0.06] px-3 py-1 text-[11px] font-semibold text-brand-deep dark:bg-white/10 dark:text-[#9aa8f5]">
            {item.category}
          </span>
          <StatusBadge status={item.status} />
          <span className="text-[11px] font-medium text-muted-foreground">{item.year}</span>
        </div>
        <h3 className="mt-3.5 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand-royal">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-brand-slate">
          {item.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.technologies.slice(0, 4).map((t) => (
            <TechChip key={t} name={t} />
          ))}
          {item.technologies.length > 4 && (
            <TechChip name={`+${item.technologies.length - 4}`} />
          )}
        </div>
        <div className="mt-auto pt-5">
          <button
            onClick={() => navigate(`/projects/${item.slug}`)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-royal transition-all group-hover:gap-2.5 group-hover:text-brand-red"
          >
            View Details <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
