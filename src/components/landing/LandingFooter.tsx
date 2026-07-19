import Link from "next/link";
import { ToriiMark } from "@/components/brand/Logo";

export function LandingFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 text-center md:flex-row md:justify-between md:px-10 md:py-12 md:text-left">
        <div className="flex items-center gap-2">
          <ToriiMark width={24} height={24} />
          <span className="text-base font-bold tracking-tight text-navy">LinguaFlow</span>
        </div>
        <p className="max-w-md text-sm text-ink-soft">
          Platform belajar Bahasa Jepang buatan murid SMK Texar, untuk sekolah
          Indonesia.
        </p>
        <div className="flex gap-5 text-sm font-semibold text-ink-soft">
          <Link href="/login" className="hover:text-navy">Masuk</Link>
          <Link href="/register-sekolah" className="hover:text-navy">Daftar</Link>
          <a href="/kontak" className="hover:text-navy">Kontak</a>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-ink-soft">© 2026 LinguaFlow · SMK Texar</p>
    </footer>
  );
}
