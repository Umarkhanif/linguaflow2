"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { viewportOnce } from "@/lib/motion";

/**
 * Scene 12 — ENDING
 * Three-line signature close + brushstroke + CTA.
 * "Mulai perjalananmu."
 * Minimal. Quiet. Unforgettable.
 */
export function EndingScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end 0.6"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const yContent = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  return (
    <section aria-label="Call to action" ref={ref} className="relative min-h-screen bg-cream overflow-hidden flex items-center justify-center">
      {/* Kanji watermarks */}
      <span className="lf-kanji text-[35vw] left-[-15%] top-[-18%] text-navy/5">始</span>
      <span className="lf-kanji text-[25vw] right-[-15%] bottom-[-12%] text-navy/5">旅</span>

      <motion.div
        style={{ opacity, y: yContent }}
        className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center md:px-10"
      >
        {/* Signature ending lines */}
        <div className="lf-ending space-y-2">
          <p className="text-xl font-light text-ink-soft md:text-2xl">
            Belajar bahasa Jepang
          </p>
          <p className="text-xl font-light text-ink-soft md:text-2xl">
            dengan cara yang benar.
          </p>
          <p className="text-3xl font-bold text-navy md:text-5xl">
            Mulai perjalananmu.
          </p>
        </div>

        {/* Vermillion brushstroke */}
        <div className="lf-ending-line mx-auto mt-8" />
        <p className="mt-3 text-xs text-ink-soft/60">Mulai dari sini</p>

        {/* CTA */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          viewport={viewportOnce}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/register-sekolah"
            className="w-full rounded-full bg-navy px-10 py-4 text-sm font-bold text-cream shadow-xl shadow-black/15 transition-all duration-300 hover:bg-navy-soft hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jp-red focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-auto"
          >
            Coba Sekarang — Gratis
          </Link>
          <Link
            href="/login"
            className="w-full rounded-full border border-line bg-white px-10 py-4 text-sm font-bold text-navy transition-all duration-300 hover:bg-navy/5 hover:border-navy/30 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-auto dark:bg-navy-soft/50 dark:border-white/10 dark:text-cream"
          >
            Masuk
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
