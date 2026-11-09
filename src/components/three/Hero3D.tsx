"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { HeroSceneFallback } from "./HeroScene";

/**
 * Lazy-loaded 3D hero. Client-only, and replaced by a static CSS scene for
 * reduced-motion users or if WebGL fails.
 */
const HeroSceneDynamic = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroSceneFallback />,
});

export function Hero3D({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={className} aria-hidden="true">
      {reduce ? <HeroSceneFallback /> : <HeroSceneDynamic />}
    </div>
  );
}
