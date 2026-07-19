"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronLeft, School, Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

const CODE_LEN = 6;

export default function RegisterPage() {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LEN).fill(""));
  const [valid, setValid] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function setDigit(i: number, v: string) {
    const next = [...digits];
    next[i] = v.slice(-1).toUpperCase();
    setDigits(next);
    const full = next.join("");
    setValid(full.length === CODE_LEN && full === "SMK2026");
    if (v && i < CODE_LEN - 1) refs.current[i + 1]?.focus();
  }

  function onKey(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  }

  return (
    <div className="relative min-h-screen px-5 py-8">
      <div className="seigaiha pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40" />
      <div className="relative mx-auto max-w-md">
        <Link href="/login" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-indigo">
          <ChevronLeft size={18} /> Kembali
        </Link>

        <div className="mb-6 text-center">
          <Logo size={30} />
          <h1 className="mt-4 text-2xl font-bold text-ink">Gabung ke Kelas</h1>
          <p className="mt-1 text-sm text-ink-soft">Masukkan kode kelas dari wali kelas kamu</p>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2 text-xs font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo text-white">1</span>
          <span className="h-0.5 w-8 bg-indigo" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-tint-soft text-indigo">2</span>
          <span className="h-0.5 w-8 bg-line" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-line text-ink-soft">3</span>
        </div>

        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              maxLength={1}
              inputMode="text"
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              className="h-14 w-full rounded-btn border-2 border-line bg-paper text-center text-xl font-bold text-indigo focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/20"
            />
          ))}
        </div>

        {/* Preview class card */}
        <div className="mt-6 flex items-center gap-3 rounded-card border border-line bg-indigo-tint-soft p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-indigo text-white">
            <School size={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">XII RPL 1 — SMK Texar</p>
            <p className="text-xs text-ink-soft">Wali Kelas: Bu Siti Rahma</p>
          </div>
          {valid && <Check size={18} className="ml-auto text-success" />}
        </div>

        <Button fullWidth className="mt-6" disabled={!valid}>
          Lanjut
        </Button>
        <p className="mt-4 text-center text-xs text-ink-soft">
          Ga punya kode? Minta ke wali kelas kamu.
        </p>
      </div>
    </div>
  );
}
