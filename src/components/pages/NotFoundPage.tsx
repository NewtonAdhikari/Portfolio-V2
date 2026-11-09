"use client";

import { motion } from "framer-motion";
import { Compass, Home } from "lucide-react";
import { useRoute } from "@/lib/router";
import { NAV_ITEMS } from "@/components/layout/Navbar";

export function NotFoundPage() {
  const { navigate } = useRoute();

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-ink px-4 py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div className="blob left-[20%] top-[10%] h-[300px] w-[300px] bg-brand-deep/60" aria-hidden="true" />
      <div className="blob bottom-[10%] right-[15%] h-[260px] w-[260px] bg-brand-red/30" aria-hidden="true" />

      <div className="relative max-w-lg text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[7rem] font-bold leading-none text-gradient sm:text-[9rem]"
        >
          404
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            This page wandered off the graph.
          </h1>
          <p className="mx-auto mt-3 flex max-w-sm items-center justify-center gap-2 text-sm text-white/60">
            <Compass className="h-4 w-4 text-brand-gold" />
            The route you asked for doesn&apos;t exist — but plenty of others do.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <Home className="h-4 w-4" /> Back to Home
            </button>
            {NAV_ITEMS.filter((n) => n.href !== "/")
              .slice(0, 4)
              .map((n) => (
                <button
                  key={n.href}
                  onClick={() => navigate(n.href)}
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  {n.label}
                </button>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
