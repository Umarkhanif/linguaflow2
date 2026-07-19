"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { viewportOnce } from "@/lib/motion";
import { ScrollHint } from "@/components/landing/ScrollHint";
import { SeigaihaWave } from "@/components/landing/SeigaihaWave";

/** A vermillion brushstroke that reveals itself when scrolled into view. */
function RevealStroke() {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <span ref={ref} className={`lf-stroke ${revealed ? "reveal" : ""}`} />;
}

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, animated]);

  return (
    <span ref={ref}>
      {val.toLocaleString("id-ID")}{suffix}
    </span>
  );
}

/**
 * Scene 9 — CERITA KAMI
 * Why LinguaFlow exists. Indonesian story. Warm. Human.
 */
export function StoryScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const yContent = useTransform(scrollYProgress, [0, 0.35], [40, 0]);

  return (
    <section aria-label="Cerita kami" id="awal-mula" ref={ref} className="relative h-[120vh] bg-cream">
      <SeigaihaWave position="bottom" />
      <motion.div
        style={{ opacity, y: yContent }}
        className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 md:px-10"
      >
        <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center pb-8 md:pb-10">
          <div className="grid w-full gap-12 md:grid-cols-2 md:gap-16">
            {/* Left: trigger + journey */}
            <div className="space-y-6">
              <RevealStroke />
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-jp-red">
                Awal Mula
              </p>
              <h2 className="text-3xl font-bold leading-tight text-navy md:text-4xl">
                Kenapa kami buat <span className="text-gold">LinguaFlow</span>?
              </h2>
              <div className="space-y-4 text-ink-soft leading-relaxed">
                <p>
                  SMK jurusan RPL harus belajar banyak hal. Tapi tidak ada yang mengajarkan
                  <em className="font-semibold text-navy"> bahasa Jepang</em> secara praktis untuk kerja.
                </p>
                <p>
                  Kami ingin murid — termasuk kami sendiri — bisa belajar bahasa Jepang dengan cara yang
                  <em className="font-semibold text-navy"> relevan dengan dunia IT</em>.
                  Bukan sekadar menghafal kanji, tapi bisa menggunakannya.
                </p>
              </div>
            </div>

            {/* Right: stat block with animated counters */}
            <div className="flex items-center">
              <div className="w-full space-y-5 rounded-2xl border border-line bg-white/60 p-6 backdrop-blur-sm md:p-8">
                {[
                  { label: "Jam belajar terkumpul", to: 1200, suffix: "+" },
                  { label: "Kosakata dikuasai", to: 800, suffix: "+" },
                  { label: "Murid aktif", to: 47, suffix: "" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between border-b border-line/50 pb-4 last:border-0 last:pb-0">
                    <span className="text-sm text-ink-soft">{s.label}</span>
                    <span className="text-2xl font-bold text-navy tabular-nums">
                      <AnimatedCounter to={s.to} suffix={s.suffix} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ScrollHint />
        </div>
      </motion.div>
    </section>
  );
}
