"use client";

import { Github, GraduationCap, Linkedin, Mail, Trophy, Twitter,} from "lucide-react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { FaResearchgate, FaOrcid } from "react-icons/fa6";
import type { ComponentType } from "react";
import { useRoute } from "@/lib/router";
import { profile, devtoProfileUrl } from "@/data/profile";
import { NAV_ITEMS } from "./Navbar";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  graduation: GraduationCap,
  trophy: Trophy,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  mail: Mail,
  message: MessageCircle,
  researchgate: FaResearchgate,
  orcid: FaOrcid,
};

export function Footer() {
  const { navigate, path } = useRoute();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-brand-ink text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden="true" />
      <div className="blob left-[10%] top-[-60%] h-[300px] w-[300px] bg-brand-deep/60" aria-hidden="true" />
      <div className="blob right-[5%] bottom-[-70%] h-[280px] w-[280px] bg-brand-red/20" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5"
              aria-label="Go to home"
            >
              <img src="/favicon.svg" alt="Newton Adhikari Logo" className="h-10 w-12 rounded-lg object-contain transition-transform group-hover:scale-105"/>
              <span className="font-display text-lg font-bold">{profile.name}</span>
            </button>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {profile.headline} Passionate about AI, machine learning and
              building technology that genuinely helps people.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.socials.map((s) => {
                const Icon = socialIcons[s.icon] ?? Github;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={`https://www.instagram.com/${profile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                  >
                 <Instagram className="h-4 w-4" />
                </a>
              <a
                href={`https://www.facebook.com/${profile.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                  >
                 <Facebook className="h-4 w-4" />
                </a>
              <a
                 href={`https://wa.me/${profile.whatsapp}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="WhatsApp"
                 className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                >
                 <MessageCircle className="h-4 w-4" />
              </a>
              <a
                 href={`https://www.researchgate.net/profile/${profile.researchgate}`}
                 target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ResearchGate"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                >
               <FaResearchgate className="h-4 w-4" />
              </a>
              <a
                 href={`https://orcid.org/${profile.orcid}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="ORCID"
                 className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                >
               <FaOrcid className="h-4 w-4" />
              </a>
              
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => navigate(item.href)}
                    className={`text-sm transition-colors hover:text-brand-orange ${
                      path === item.href ? "text-white" : "text-white/60"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all transition-colors hover:text-brand-orange"
                >
                  {profile.email}
                </a>
              </li>
              <li>{profile.location}</li>
              <li>
                <a
                  href={devtoProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-orange"
                >
                  Blog on DEV.to ↗
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="transition-colors hover:text-brand-orange"
                >
                  Contact form →
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/privacy")}
                  className="transition-colors hover:text-brand-orange"
                >
                  Privacy policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Designed and built by {profile.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
