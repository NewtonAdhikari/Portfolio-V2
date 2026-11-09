"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function StatCounter({
  value,
  label,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Jump to the final value on the next frame (not synchronously).
      const r = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(r);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-brand-gold/40"
    >
      <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        <span className="text-gradient-gold">{display}</span>
        <span className="text-white">{suffix}</span>
      </div>
      <div className="mt-2 text-[13px] font-medium leading-snug text-white/60">
        {label}
      </div>
    </div>
  );
}
