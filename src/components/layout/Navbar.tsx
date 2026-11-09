"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  ChevronDown,
  CornerDownLeft,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";

import { useRoute } from "@/lib/router";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/* =========================================================
   NAVIGATION DATA — PRESERVED EXPORTS
========================================================= */

export type NavLink = {
  label: string;
  href: string;
  hint?: string;
};

export const NAV_PRIMARY: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const NAV_MORE: NavLink[] = [
  {
    label: "Publications",
    href: "/publications",
    hint: "Research and published work",
  },
  {
    label: "Education",
    href: "/education",
    hint: "Academic background",
  },
  {
    label: "Experience",
    href: "/experience",
    hint: "Professional journey",
  },
  {
    label: "Skills",
    href: "/skills",
    hint: "Technical capabilities",
  },
  {
    label: "Achievements",
    href: "/achievements",
    hint: "Awards and recognition",
  },
  {
    label: "Contact",
    href: "/contact",
    hint: "Get in touch",
  },
];

export const NAV_ITEMS: NavLink[] = [
  ...NAV_PRIMARY.slice(0, 3),
  NAV_MORE[0],
  ...NAV_PRIMARY.slice(3),
  ...NAV_MORE.slice(1),
];

/* =========================================================
   THEME COLORS
========================================================= */

const RED = "#C8102E";
const GOLD = "#C9A45C";

const LINK_COLORS: Record<string, string> = {
  "/": RED,
  "/about": GOLD,
  "/research": RED,
  "/projects": GOLD,
  "/blog": RED,
  "/publications": GOLD,
  "/education": RED,
  "/experience": GOLD,
  "/skills": RED,
  "/achievements": GOLD,
  "/contact": RED,
};

const TAGLINES = [
  "RESEARCHER",
  "ENGINEER",
  "BUILDER",
  "WRITER",
];

/* =========================================================
   HELPERS
========================================================= */

function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

function useLocalTime() {
  const [time, setTime] = useState("--:--:-- --");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const update = () => {
      setTime(formatter.format(new Date()));
    };

    update();

    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function useTagline(active: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % TAGLINES.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [active]);

  return TAGLINES[index];
}

function colorFor(href: string) {
  return LINK_COLORS[href] ?? RED;
}

/* =========================================================
   LOGO COMPONENT
========================================================= */

function BrandLogo({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <span
      className={cn(
        "group relative flex shrink-0 items-center justify-center",
        "overflow-hidden rounded-xl border border-[#C9A45C]/50",
        "bg-white shadow-[0_5px_18px_rgba(0,0,0,0.12)]",
        "transition-all duration-300",
        "group-hover:border-[#C8102E]/60",
        "group-hover:shadow-[0_0_22px_rgba(201,164,92,0.3)]",
        size === "sm" ? "h-9 w-9" : "h-11 w-11"
      )}
    >
      {!imageError ? (
        <img
          src="/favicon.ico"
          alt="Newton Adhikari"
          className="h-full w-full object-contain p-1"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-display text-sm font-black text-[#C8102E]">
          NA
        </span>
      )}

      <span className="pointer-events-none absolute inset-[3px] rounded-lg border border-[#C9A45C]/20" />
    </span>
  );
}

/* =========================================================
   CENTERED MASTHEAD
========================================================= */

function Masthead({
  scrolled,
  tagline,
  onHome,
}: {
  scrolled: boolean;
  tagline: string;
  onHome: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onHome}
      aria-label="Newton Adhikari homepage"
      className="group flex min-w-0 flex-col items-center justify-center text-center"
    >
      <span className="flex items-center justify-center gap-2 sm:gap-3">
        <span className="hidden h-px w-5 bg-gradient-to-r from-transparent to-[#C9A45C] sm:block lg:w-9" />

        <span
          className={cn(
            "whitespace-nowrap font-display font-black uppercase",
            "leading-none tracking-[0.045em] text-[#C8102E]",
            "transition-all duration-300",
            scrolled
              ? "text-[15px] sm:text-[18px] lg:text-[20px]"
              : "text-[15px] sm:text-[20px] lg:text-[25px] xl:text-[27px]"
          )}
        >
          {profile.name}
        </span>

        <span className="hidden h-px w-5 bg-gradient-to-l from-transparent to-[#C9A45C] sm:block lg:w-9" />
      </span>

      <span className="mt-2 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.35em] text-[#9B7B3D] sm:text-[9px]">
        <span className="h-1 w-1 rotate-45 bg-[#C8102E]" />

        <AnimatePresence mode="wait">
          <motion.span
            key={tagline}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
          >
            {tagline}
          </motion.span>
        </AnimatePresence>

        <span className="h-1 w-1 rotate-45 bg-[#C8102E]" />
      </span>
    </button>
  );
}

/* =========================================================
   MAIN NAVBAR
========================================================= */

export function Navbar() {
  const { path, navigate } = useRoute();
  const { resolvedTheme, setTheme } = useTheme();

  const dark = resolvedTheme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const closeTimer = useRef<number | null>(null);

  const time = useLocalTime();
  const tagline = useTagline(!scrolled);

  const commandItems = useMemo(
    () => [...NAV_PRIMARY, ...NAV_MORE],
    []
  );

  const moreActive = NAV_MORE.some((item) =>
    isActive(path, item.href)
  );

  const go = (href: string) => {
    setMoreOpen(false);
    setMobileOpen(false);
    setCommandOpen(false);
    navigate(href);
  };

  /* Scroll state */

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 25);

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Close navigation on route change */

  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
  }, [path]);

  /* Keyboard shortcuts and scroll locking */

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen || commandOpen ? "hidden" : "";

    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        setMobileOpen(false);
        setCommandOpen(false);
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen, commandOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const openMore = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    setMoreOpen(true);
  };

  const closeMore = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }

    closeTimer.current = window.setTimeout(() => {
      setMoreOpen(false);
    }, 180);
  };

  return (
    <>
      <ScrollProgress />

      <header
        className={cn(
          "sticky top-0 z-50 w-full",
          "border-b border-[#C9A45C]/30",
          "bg-white/95 text-[#171717]",
          "shadow-[0_8px_30px_rgba(0,0,0,0.07)]",
          "backdrop-blur-2xl transition-all duration-300",
          "dark:bg-[#101010]/95 dark:text-white"
        )}
      >
        {/* Top luxury accent */}

        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#C8102E] via-[#C9A45C] to-[#C8102E]" />

        {/* ================================================
            DESKTOP — SYMMETRICAL THREE-COLUMN DESIGN
        ================================================= */}

        <div
          className={cn(
            "mx-auto hidden w-full max-w-[1720px]",
            "grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
            "items-center gap-5 px-6 xl:grid 2xl:px-10",
            "transition-all duration-300",
            scrolled ? "min-h-[76px] py-2" : "min-h-[94px] py-3"
          )}
        >
          {/* LEFT COLUMN: LOGO + NAVIGATION */}

          <div className="flex min-w-0 items-center justify-start gap-5 2xl:gap-8">
            <button
              type="button"
              onClick={() => go("/")}
              aria-label="Homepage"
              className="group shrink-0 rounded-xl"
            >
              <BrandLogo />
            </button>

            <nav aria-label="Primary navigation">
              <ul className="flex items-center gap-1 2xl:gap-2">
                {NAV_PRIMARY.slice(0, 3).map((item) => (
                  <li key={item.href}>
                    <EditorialLink
                      item={item}
                      active={isActive(path, item.href)}
                      onClick={() => go(item.href)}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* CENTER COLUMN: EXACT CENTER */}

          <div className="flex items-center justify-center px-2">
            <Masthead
              scrolled={scrolled}
              tagline={tagline}
              onHome={() => go("/")}
            />
          </div>

          {/* RIGHT COLUMN: NAVIGATION + CONTROLS + LOGO */}

          <div className="flex min-w-0 items-center justify-end gap-3 2xl:gap-5">
            <nav aria-label="Secondary navigation">
              <ul className="flex items-center gap-1 2xl:gap-2">
                {NAV_PRIMARY.slice(3).map((item) => (
                  <li key={item.href}>
                    <EditorialLink
                      item={item}
                      active={isActive(path, item.href)}
                      onClick={() => go(item.href)}
                    />
                  </li>
                ))}

                {/* MORE MENU */}

                <li
                  className="relative"
                  onMouseEnter={openMore}
                  onMouseLeave={closeMore}
                >
                  <button
                    type="button"
                    onClick={() => setMoreOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={moreOpen}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-3",
                      "text-[11px] font-bold uppercase tracking-[0.15em]",
                      "transition-all hover:bg-[#C9A45C]/10",
                      moreActive || moreOpen
                        ? "text-[#C8102E] dark:text-[#E5BD75]"
                        : "text-[#444] dark:text-white/75"
                    )}
                  >
                    More
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        moreOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {moreOpen && (
                      <MoreDropdown
                        items={NAV_MORE}
                        path={path}
                        onNavigate={go}
                        onMouseEnter={openMore}
                        onMouseLeave={closeMore}
                      />
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </nav>

            <span className="h-8 w-px bg-[#C9A45C]/35" />

            {/* SEARCH + THEME */}

            <div className="flex shrink-0 items-center gap-2">
              <UtilityButton
                label="Search pages (Ctrl/⌘ + K)"
                onClick={() => setCommandOpen(true)}
              >
                <Search className="h-4 w-4" />
              </UtilityButton>

              <UtilityButton
                label={dark ? "Light mode" : "Dark mode"}
                onClick={() => setTheme(dark ? "light" : "dark")}
              >
                {dark ? (
                  <Sun className="h-4 w-4 text-[#C9A45C]" />
                ) : (
                  <Moon className="h-4 w-4 text-[#C8102E]" />
                )}
              </UtilityButton>
            </div>

            {/* RIGHT-SIDE LOGO — MATCHES LEFT LOGO */}

            <button
              type="button"
              onClick={() => go("/")}
              aria-label="Homepage"
              className="group shrink-0 rounded-xl"
            >
              <BrandLogo />
            </button>
          </div>
        </div>
          {/* DESKTOP LOCAL CLOCK */}

          {/* DESKTOP CENTERED LOCAL CLOCK */}

          <div className="relative hidden w-full items-center justify-center border-t border-[#C9A45C]/20 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#777] dark:text-white/60 xl:flex">
             <div className="flex items-center justify-center gap-3">
               <span className="h-1.5 w-1.5 rotate-45 bg-[#C8102E]" />

                  <span className="tabular-nums text-[#C8102E]">
                   {time}
                  </span>
               <span className="h-1.5 w-1.5 rotate-45 bg-[#C8102E]" />
              </div>
            </div>

        {/* ================================================
            TABLET / MOBILE HEADER
        ================================================= */}

        <div className="flex min-h-[76px] items-center justify-between gap-2 px-3 py-3 xl:hidden sm:px-5">
          {/* LEFT LOGO */}

          <button
            type="button"
            onClick={() => go("/")}
            aria-label="Homepage"
            className="group shrink-0 rounded-xl"
          >
            <BrandLogo size="sm" />
          </button>

          {/* CENTERED NAME */}

          <div className="flex min-w-0 flex-1 justify-center">
            <Masthead
              scrolled={scrolled}
              tagline={tagline}
              onHome={() => go("/")}
            />
          </div>

          {/* RIGHT LOGO + MENU */}

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => go("/")}
              aria-label="Homepage"
              className="group hidden rounded-xl sm:block"
            >
              <BrandLogo size="sm" />
            </button>

            <UtilityButton
              label="Search pages"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="h-4 w-4" />
            </UtilityButton>

            <UtilityButton
              label={dark ? "Light mode" : "Dark mode"}
              onClick={() => setTheme(dark ? "light" : "dark")}
            >
              {dark ? (
                <Sun className="h-4 w-4 text-[#C9A45C]" />
              ) : (
                <Moon className="h-4 w-4 text-[#C8102E]" />
              )}
            </UtilityButton>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C9A45C]/40 transition hover:bg-[#C9A45C]/10"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* MOBILE LOCAL CLOCK */}
        <div className="relative flex w-full items-center justify-center border-t border-[#C9A45C]/20 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#777] dark:text-white/60 xl:hidden">
          <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap tabular-nums text-[#C8102E]">
             {time}
          </span>
        </div>
      </header>

      {/* ================================================
          MOBILE NAVIGATION DRAWER
      ================================================= */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-white text-[#171717] dark:bg-[#101010] dark:text-white xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex min-h-[76px] items-center justify-between border-b border-[#C9A45C]/30 px-5">
              <div className="flex items-center gap-3">
                <BrandLogo />
                <span className="font-display text-sm font-black uppercase tracking-wide text-[#C8102E]">
                  {profile.name}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C9A45C]/35"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mx-auto max-w-xl px-5 py-7">
              <div className="mb-5 flex justify-between font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#9B7B3D]">
                <span>Navigation index</span>
                <span>{NAV_ITEMS.length} pages</span>
              </div>

              <ul className="space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const active = isActive(path, item.href);

                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => go(item.href)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all",
                          active
                            ? "border-[#C9A45C]/50 bg-[#C9A45C]/10"
                            : "border-transparent hover:border-[#C9A45C]/25 hover:bg-[#C9A45C]/5"
                        )}
                      >
                        <span className="w-6 font-mono text-[10px] text-[#9B7B3D]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className="h-1.5 w-1.5 rotate-45"
                          style={{ backgroundColor: colorFor(item.href) }}
                        />

                        <span className="flex-1 text-[15px] font-semibold">
                          {item.label}
                        </span>

                        {active && (
                          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#C8102E] dark:text-[#E5BD75]">
                            Current
                          </span>
                        )}

                        <ArrowUpRight className="h-4 w-4 text-[#9B7B3D]" />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => go("/contact")}
                className="mt-7 flex w-full items-center justify-between rounded-xl bg-[#C8102E] px-5 py-4 text-white shadow-lg shadow-[#C8102E]/20 transition hover:bg-[#A90D26]"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  Get in touch
                </span>
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH COMMAND PALETTE */}

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        items={commandItems}
        onSelect={go}
        path={path}
      />
    </>
  );
}

/* =========================================================
   UTILITY BUTTON
========================================================= */

function UtilityButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg",
        "border border-[#C9A45C]/35 bg-transparent",
        "text-[#333] transition-all duration-200",
        "hover:border-[#C8102E]/45 hover:bg-[#C8102E]/5 hover:text-[#C8102E]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]",
        "dark:text-white"
      )}
    >
      {children}
    </button>
  );
}

/* =========================================================
   SCROLL PROGRESS — FIXED RED
========================================================= */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;

      setProgress(max > 0 ? root.scrollTop / max : 0);
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[90] h-[3px] pointer-events-none">
      <motion.div
        className="h-full origin-left bg-[#C8102E]"
        style={{ scaleX: progress }}
      />
    </div>
  );
}

/* =========================================================
   EDITORIAL NAVIGATION LINK
========================================================= */

function EditorialLink({
  item,
  active,
  onClick,
}: {
  item: NavLink;
  active: boolean;
  onClick: () => void;
}) {
  const color = colorFor(item.href);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative whitespace-nowrap rounded-lg px-3 py-3",
        "text-[10px] font-extrabold uppercase tracking-[0.14em]",
        "transition-all duration-200 2xl:px-3.5 2xl:text-[11px]",
        active
          ? "text-[#C8102E] dark:text-[#E5BD75]"
          : "text-[#444] hover:bg-[#C9A45C]/10 hover:text-[#C8102E] dark:text-white/75 dark:hover:text-[#E5BD75]"
      )}
    >
      {item.label}

      <span
        className={cn(
          "absolute inset-x-3 bottom-1 h-[2px] rounded-full",
          "origin-center transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
        style={{ backgroundColor: color }}
      />
    </button>
  );
}

/* =========================================================
   MORE DROPDOWN
========================================================= */

function MoreDropdown({
  items,
  path,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: {
  items: NavLink[];
  path: string;
  onNavigate: (href: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute right-0 top-full z-[80] w-[min(420px,calc(100vw-2rem))] pt-3"
    >
      <div className="overflow-hidden rounded-2xl border border-[#C9A45C]/40 bg-white text-[#171717] shadow-[0_24px_70px_rgba(0,0,0,0.2)] dark:bg-[#171717] dark:text-white">
        <div className="flex items-center justify-between border-b border-[#C9A45C]/25 bg-[#C9A45C]/[0.07] px-5 py-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7B3D]">
            Explore the portfolio
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-[#C8102E]" />
        </div>

        <ul className="grid grid-cols-2 gap-1 p-2">
          {items.map((item) => {
            const active = isActive(path, item.href);

            return (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.href)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition",
                    "hover:bg-[#C9A45C]/10",
                    active && "bg-[#C9A45C]/10"
                  )}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-[#C8102E]" />

                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs font-bold">
                      {item.label}
                    </span>

                    {item.hint && (
                      <span className="mt-1 text-[10px] leading-snug text-[#777] dark:text-white/55">
                        {item.hint}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

/* =========================================================
   COMMAND PALETTE
========================================================= */

function CommandPalette({
  open,
  onClose,
  items,
  onSelect,
  path,
}: {
  open: boolean;
  onClose: () => void;
  items: NavLink[];
  onSelect: (href: string) => void;
  path: string;
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return items;

    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(value) ||
        item.href.toLowerCase().includes(value) ||
        (item.hint ?? "").toLowerCase().includes(value)
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) return;

    setQuery("");
    setCursor(0);

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setCursor((value) =>
      Math.min(value, Math.max(0, filtered.length - 1))
    );
  }, [filtered.length]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setCursor((value) =>
        Math.min(value + 1, Math.max(0, filtered.length - 1))
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      setCursor((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();

      const selected = filtered[cursor];

      if (selected) onSelect(selected.href);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 pt-[15vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search portfolio pages"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#C9A45C]/45 bg-white text-[#171717] shadow-2xl dark:bg-[#171717] dark:text-white"
          >
            {/* Search input */}

            <div className="flex items-center gap-3 border-b border-[#C9A45C]/25 px-5 py-4">
              <Search className="h-5 w-5 text-[#C8102E]" />

              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCursor(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search research, projects, publications..."
                aria-label="Search portfolio pages"
                className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[#999] dark:placeholder:text-white/40"
              />

              <kbd className="rounded-md border border-[#C9A45C]/40 px-2 py-1 font-mono text-[9px] text-[#8B7448]">
                ESC
              </kbd>
            </div>

            {/* Search results */}

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-[#777] dark:text-white/55">
                  No matching pages found.
                </p>
              ) : (
                filtered.map((item, index) => {
                  const selected = index === cursor;
                  const active = isActive(path, item.href);

                  return (
                    <button
                      key={item.href}
                      type="button"
                      onMouseEnter={() => setCursor(index)}
                      onClick={() => onSelect(item.href)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition",
                        selected
                          ? "bg-[#C9A45C]/15"
                          : "hover:bg-[#C9A45C]/10"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rotate-45 bg-[#C8102E]" />

                        <span>
                          <span className="block text-sm font-bold">
                            {item.label}
                          </span>

                          <span className="mt-0.5 block text-[10px] text-[#888] dark:text-white/45">
                            {item.href}
                          </span>
                        </span>
                      </span>

                      <span className="flex items-center gap-2">
                        {active && (
                          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#9B7B3D]">
                            Current
                          </span>
                        )}

                        {selected && (
                          <CornerDownLeft className="h-4 w-4 text-[#C8102E]" />
                        )}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Keyboard hints */}

            <div className="flex items-center justify-between border-t border-[#C9A45C]/25 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#888] dark:text-white/45">
              <span>↑ ↓ Navigate · Enter Open</span>
              <span>{filtered.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}