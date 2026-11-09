"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DEV.to BLOG INTEGRATION — frontend-only data layer
 * ─────────────────────────────────────────────────────────────────────────
 *  DEV.to is the single publishing platform; this module is the ONLY place
 *  that talks to its public API (https://developers.forem.com/api/v1).
 *
 *  Design goals (per spec §13.5):
 *   • fetch on mount, refresh periodically while the visitor stays
 *   • short in-memory cache (TTL) + in-flight request de-duplication
 *   • serve stale data gracefully when the API fails or rate-limits us
 *   • never require code changes / redeployment to show new articles
 *
 *  The username lives in src/data/profile.ts → devtoConfig.username.
 */

import { devtoConfig } from "@/data/profile";

/* ── Raw DEV.to API article (only fields we consume) ──────────────────── */
type DevtoRawArticle = {
  id: number;
  title: string;
  description?: string;
  url: string;
  path?: string;
  slug?: string;
  cover_image?: string | null;
  social_image?: string | null;
  tag_list?: string[];
  published_timestamp?: string;
  published_at?: string;
  readable_publish_date?: string;
  reading_time_minutes?: number;
  public_reactions_count?: number;
  positive_reactions_count?: number;
  comments_count?: number;
  user?: { name?: string; username?: string };
};

/** Normalised article shape used across the UI. */
export type BlogArticle = {
  id: number;
  title: string;
  description: string;
  /** Absolute original DEV.to URL — "Read article" always goes here. */
  url: string;
  coverImage: string | null;
  tags: string[];
  /** Portfolio category derived from DEV.to tags. */
  category: string;
  publishedAt: string | null;
  publishedLabel: string;
  readingTimeMinutes: number;
  reactions: number;
  comments: number;
  author: string;
};

export type FetchState =
  | { status: "loading" }
  | { status: "ready" }
  | { status: "empty" }
  | { status: "stale"; message: string }
  | { status: "error"; message: string };

export type DevtoResult = {
  articles: BlogArticle[];
  /** ISO timestamp of the last successful API fetch. */
  fetchedAt: string | null;
  state: FetchState;
};

/* ── Tag → portfolio category mapping ──────────────────────────────────── */
const TAG_CATEGORY: Record<string, string> = {
  ai: "Artificial Intelligence",
  artificialintelligence: "Artificial Intelligence",
  machinelearning: "Machine Learning",
  ml: "Machine Learning",
  deeplearning: "Deep Learning",
  neuralnetworks: "Deep Learning",
  llm: "Large Language Models",
  llms: "Large Language Models",
  nlp: "Large Language Models",
  computerscience: "Computer Science",
  programming: "Programming",
  coding: "Programming",
  javascript: "Web Development",
  typescript: "Web Development",
  webdev: "Web Development",
  webdevelopment: "Web Development",
  react: "Web Development",
  nextjs: "Web Development",
  html: "Web Development",
  css: "Web Development",
  datascience: "Data Science",
  data: "Data Science",
  python: "Data Science",
  research: "Research and Innovation",
  innovation: "Research and Innovation",
  cybersecurity: "Cybersecurity",
  security: "Cybersecurity",
  softwareengineering: "Software Engineering",
  software: "Software Engineering",
  engineering: "Software Engineering",
  tech: "Technology Trends",
  technology: "Technology Trends",
  trends: "Technology Trends",
  project: "Project Development",
  projects: "Project Development",
  tutorial: "Tutorials and Guides",
  beginners: "Tutorials and Guides",
  howto: "Tutorials and Guides",
  learning: "Personal Learning Journey",
  career: "Personal Learning Journey",
  journey: "Personal Learning Journey",
};

const FALLBACK_CATEGORY = "General";

/** Map DEV.to tags to the portfolio's editorial categories (first hit wins). */
export function deriveCategory(tags: string[]): string {
  for (const raw of tags) {
    const key = raw.toLowerCase().replace(/[\s_-]/g, "");
    if (TAG_CATEGORY[key]) return TAG_CATEGORY[key];
  }
  return FALLBACK_CATEGORY;
}

/** All categories the mapping can produce (for the filter dropdown). */
export const BLOG_CATEGORIES: string[] = [
  ...new Set(Object.values(TAG_CATEGORY).concat(FALLBACK_CATEGORY)),
].sort();

/* ── Helpers ───────────────────────────────────────────────────────────── */

function normalise(raw: DevtoRawArticle): BlogArticle {
  const tags = Array.isArray(raw.tag_list) ? raw.tag_list : [];
  const iso = raw.published_timestamp ?? raw.published_at ?? null;
  const label = raw.readable_publish_date
    ? raw.readable_publish_date
    : iso
      ? new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";
  return {
    id: raw.id,
    title: raw.title ?? "Untitled article",
    description: raw.description ?? "",
    url: raw.url ?? `https://dev.to/${raw.path ?? ""}`,
    coverImage: raw.cover_image ?? raw.social_image ?? null,
    tags,
    category: deriveCategory(tags),
    publishedAt: iso,
    publishedLabel: label,
    readingTimeMinutes: raw.reading_time_minutes ?? 0,
    reactions: raw.public_reactions_count ?? raw.positive_reactions_count ?? 0,
    comments: raw.comments_count ?? 0,
    author: raw.user?.name ?? devtoConfig.username,
  };
}

export function formatReadingTime(minutes: number): string {
  if (!minutes || minutes <= 0) return "Quick read";
  return `${minutes} min read`;
}

/* ── Cache (module-level, survives route changes in the SPA) ───────────── */
type CacheEntry = { articles: BlogArticle[]; fetchedAt: number };
let cache: CacheEntry | null = null;
let inflight: Promise<CacheEntry> | null = null;

const API_BASE = "https://dev.to/api/articles";

async function requestArticles(perPage: number): Promise<CacheEntry> {
  const url = `${API_BASE}?username=${encodeURIComponent(
    devtoConfig.username
  )}&per_page=${perPage}`;

  const res = await fetch(url, {
    headers: { Accept: "application/vnd.forem.api-v1+json" },
    // DEV.to rate-limits aggressively (~1 req/30s per IP): a shared cache
    // keeps the whole session polite.
    cache: "no-store",
  });

  if (res.status === 429) {
    throw Object.assign(new Error("rate-limited"), { kind: "rate" as const });
  }
  if (!res.ok) {
    throw Object.assign(new Error(`HTTP ${res.status}`), {
      kind: "http" as const,
    });
  }

  const raw = (await res.json()) as DevtoRawArticle[];
  return {
    articles: (Array.isArray(raw) ? raw : []).map(normalise),
    fetchedAt: Date.now(),
  };
}

/**
 * Fetch articles with TTL cache + stale-on-error semantics.
 *
 * @param opts.force  bypass the TTL (manual refresh / periodic timer)
 * @param opts.perPage  how many articles to request (max 1000)
 */
export async function fetchDevtoArticles(opts?: {
  force?: boolean;
  perPage?: number;
}): Promise<DevtoResult> {
  const perPage = Math.min(Math.max(opts?.perPage ?? 30, 1), 1000);
  const now = Date.now();

  // 1. Fresh cache → return immediately.
  if (!opts?.force && cache && now - cache.fetchedAt < devtoConfig.cacheTtlMs) {
    return {
      articles: cache.articles,
      fetchedAt: new Date(cache.fetchedAt).toISOString(),
      state: cache.articles.length ? { status: "ready" } : { status: "empty" },
    };
  }

  // 2. De-duplicate concurrent requests.
  try {
    if (!inflight) {
      inflight = requestArticles(perPage).finally(() => {
        inflight = null;
      });
    }
    cache = await inflight;
    return {
      articles: cache.articles,
      fetchedAt: new Date(cache.fetchedAt).toISOString(),
      state: cache.articles.length ? { status: "ready" } : { status: "empty" },
    };
  } catch (err) {
    const kind =
      err && typeof err === "object" && "kind" in err
        ? String((err as { kind?: unknown }).kind)
        : "network";

    // 3. Stale cache is better than a blank page.
    if (cache) {
      return {
        articles: cache.articles,
        fetchedAt: new Date(cache.fetchedAt).toISOString(),
        state: {
          status: "stale",
          message:
            kind === "rate"
              ? "DEV.to is rate-limiting requests right now — showing the last successful update."
              : "Couldn't reach DEV.to just now — showing the last successful update.",
        },
      };
    }

    return {
      articles: [],
      fetchedAt: null,
      state: {
        status: "error",
        message:
          kind === "rate"
            ? "DEV.to is rate-limiting requests right now. Please wait about 30 seconds and try again."
            : "Couldn't reach the DEV.to API. Check your connection — or if you just changed the username in src/data/profile.ts, make sure it exists on dev.to.",
      },
    };
  }
}

/* ── React hook: fetch-on-mount + periodic refresh ─────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";

export type UseDevtoArticles = DevtoResult & {
  /** True while a background refresh is running after the first load. */
  refreshing: boolean;
  refresh: () => void;
};

export function useDevtoArticles(perPage = 30): UseDevtoArticles {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [state, setState] = useState<FetchState>({ status: "loading" });
  const [refreshing, setRefreshing] = useState(false);
  const loadedOnce = useRef(false);
  const alive = useRef(true);

  const load = useCallback(
    async (force: boolean) => {
      if (loadedOnce.current && force) setRefreshing(true);
      const result = await fetchDevtoArticles({ force, perPage });
      if (!alive.current) return;
      loadedOnce.current = true;
      setArticles(result.articles);
      setFetchedAt(result.fetchedAt);
      setState(result.state);
      setRefreshing(false);
    },
    [perPage]
  );

  useEffect(() => {
    alive.current = true;

    // Defer the initial fetch to a macrotask so no state is set
    // synchronously inside the effect body.
    const kickoff = window.setTimeout(() => void load(false), 0);

    // Periodic refresh while the visitor stays on the page.
    const id = window.setInterval(() => {
      void load(true);
    }, devtoConfig.refreshIntervalMs);

    return () => {
      alive.current = false;
      window.clearTimeout(kickoff);
      window.clearInterval(id);
    };
  }, [load]);

  const refresh = useCallback(() => void load(true), [load]);

  return { articles, fetchedAt, state, refreshing, refresh };
}
