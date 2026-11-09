"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DynamicIcon } from "./DynamicIcon";
import { cn } from "@/lib/utils";

/**
 * Gradient cover art used on cards instead of fake screenshots — a premium,
 * consistent visual identity per item (colors defined in the data files).
 */
export function CoverArt({
  from,
  to,
  icon,
  className,
  iconClassName,
}: {
  from: string;
  to: string;
  icon: string;
  className?: string;
  iconClassName?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div
        className="absolute -left-6 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl"
      />
      <div
        className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-black/20 blur-xl"
      />
      {/* orbit rings */}
      <div className="absolute h-[130%] w-[130%] rounded-full border border-white/15" />
      <div className="absolute h-[92%] w-[92%] rounded-full border border-white/10" />
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute h-[110%] w-[110%] rounded-full border border-dashed border-white/20"
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold shadow-[0_0_12px_2px_rgba(212,175,55,0.8)]" />
      </motion.div>
      <DynamicIcon
        name={icon}
        className={cn(
          "relative h-12 w-12 text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]",
          iconClassName
        )}
      />
    </div>
  );
}
