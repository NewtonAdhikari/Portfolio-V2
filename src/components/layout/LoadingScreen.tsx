
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  angle: (i / 24) * Math.PI * 2,
  distance: 120 + (i % 4) * 35,
  delay: (i % 8) * 0.12,
}));

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDone(true),
      reduceMotion ? 300 : 3200
    );

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070816]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(15px)",
          }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading Newton Adhikari portfolio"
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.16]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          {/* Background ambient lights */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[150px]"
            animate={
              reduceMotion
                ? {}
                : {
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.3, 0.7, 0.3],
                  }
            }
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[130px]"
            animate={reduceMotion ? {} : { x: [0, 100, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          <motion.div
            className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-red-600/15 blur-[140px]"
            animate={reduceMotion ? {} : { y: [0, 100, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Main cinematic content */}
          <div className="relative flex w-full flex-col items-center px-5">

            {/* Logo stage */}
            <div className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px]">

              {/* Outer energy circle */}
              <motion.div
                className="absolute inset-3 rounded-full border border-white/10"
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute left-1/2 top-0 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_5px_rgba(34,211,238,0.7)]" />
              </motion.div>

              {/* Second orbital circle */}
              <motion.div
                className="absolute inset-9 rounded-full border border-blue-400/20"
                animate={reduceMotion ? {} : { rotate: -360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute bottom-6 left-3 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_20px_5px_rgba(251,146,60,0.7)]" />
              </motion.div>

              {/* Energy ring */}
              <motion.div
                className="absolute inset-[52px] rounded-full border border-cyan-300/20"
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: [0.9, 1.12, 0.9],
                        opacity: [0.25, 0.8, 0.25],
                      }
                }
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Orbiting particles */}
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute left-1/2 top-1/2"
                  initial={{ opacity: 0 }}
                  animate={
                    reduceMotion
                      ? { opacity: 0.3 }
                      : {
                          x: [
                            Math.cos(p.angle) * 45,
                            Math.cos(p.angle) * p.distance,
                          ],
                          y: [
                            Math.sin(p.angle) * 45,
                            Math.sin(p.angle) * p.distance,
                          ],
                          opacity: [0, 0.9, 0],
                          scale: [0.3, 1.2, 0.2],
                        }
                  }
                  transition={{
                    duration: 2.2,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(34,211,238,0.6)]" />
                </motion.div>
              ))}

              {/* Central logo glow */}
              <motion.div
                className="absolute h-40 w-40 rounded-full bg-blue-500/30 blur-[65px]"
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: [0.8, 1.4, 0.8],
                        opacity: [0.3, 0.8, 0.3],
                      }
                }
                transition={{ duration: 2.4, repeat: Infinity }}
              />

              {/* Logo container */}
              <motion.div
                className="relative z-10 flex h-36 w-36 items-center justify-center rounded-[30px] border border-white/20 bg-white/[0.06] p-3 shadow-[0_0_60px_rgba(37,99,235,0.25)] backdrop-blur-xl sm:h-44 sm:w-44"
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        scale: 0.2,
                        rotateY: 120,
                        rotateX: 30,
                        filter: "blur(20px)",
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.img
                  src="/favicon.svg"
                  alt="Newton Adhikari"
                  className="h-full w-full object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          scale: [1, 1.035, 1],
                        }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Scanning laser */}
                {!reduceMotion && (
                  <motion.div
                    className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_3px_rgba(34,211,238,0.6)]"
                    initial={{ top: "10%", opacity: 0 }}
                    animate={{
                      top: ["10%", "90%", "10%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* Brand identity */}
            <motion.div
              className="mt-1 text-center"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              <h1 className="font-display text-3xl font-black tracking-[0.2em] text-white sm:text-5xl">
                NEWTON
              </h1>

              <motion.h2
                className="mt-2 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text font-display text-2xl font-bold tracking-[0.35em] text-transparent sm:text-3xl"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                ADHIKARI
              </motion.h2>
            </motion.div>

            {/* Animated tagline */}
            <motion.div
              className="mt-6 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />

              <p className="text-[10px] font-semibold tracking-[0.35em] text-white/55 sm:text-xs">
                CODE • RESEARCH • INNOVATION
              </p>

              <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-400" />
            </motion.div>

            {/* Loading progress */}
            <motion.div
              className="mt-12 w-52 sm:w-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] font-semibold tracking-[0.25em] text-white/40">
                  LOADING EXPERIENCE
                </span>

                <motion.span
                  className="text-[10px] font-semibold text-cyan-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  WELCOME
                </motion.span>
              </div>

              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 via-orange-400 to-red-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2.7,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Bottom status */}
            <motion.p
              className="mt-5 text-[9px] font-medium tracking-[0.4em] text-white/30"
              animate={
                reduceMotion ? {} : { opacity: [0.3, 0.8, 0.3] }
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              CRAFTING DIGITAL EXPERIENCES
            </motion.p>
          </div>

          {/* Corner decorative elements */}
          <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-white/20" />
          <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-white/20" />
          <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-white/20" />
          <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-white/20" />

          {/* Bottom copyright */}
          <div className="absolute bottom-10 text-[9px] tracking-[0.3em] text-white/25">
            NEWTONADHIKARI.CC.CD
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
