"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Lightweight hash router.
 *
 * The sandbox preview only exposes the root route, so the whole portfolio runs
 * as a single-page application with hash URLs (`#/research/my-paper`).
 * Every page lives in its own component, so migrating to real Next.js routes
 * (`app/research/[slug]/page.tsx`, etc.) is a mechanical copy-paste when
 * deploying to Vercel.
 */

export type RouteContextValue = {
  path: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
};

const RouteContext = createContext<RouteContextValue>({
  path: "/",
  navigate: () => {},
});

function readHash(): string {
  if (typeof window === "undefined") return "/";
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    const onChange = () => setPath(readHash());
    onChange();
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    const target = to.startsWith("/") ? to : `/${to}`;
    if (readHash() === target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (opts?.replace) {
      window.location.replace(`#${target}`);
    } else {
      window.location.hash = target;
    }
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}

export function useRoute() {
  return useContext(RouteContext);
}

/** Match "/research/:slug" style segments against the current path. */
export function matchRoute(
  pattern: string,
  path: string
): Record<string, string> | null {
  const p = pattern.split("/").filter(Boolean);
  const s = path.split("/").filter(Boolean);
  if (p.length !== s.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(":")) {
      params[p[i].slice(1)] = decodeURIComponent(s[i]);
    } else if (p[i] !== s[i]) {
      return null;
    }
  }
  return params;
}
