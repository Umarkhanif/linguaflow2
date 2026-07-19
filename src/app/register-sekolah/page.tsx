"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Building2, Mail, User, Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function RegisterSchoolPage() {
  const [step, setStep] = useState(1);
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="relative min-h-screen px-5 py-8">
      <div className="seigaiha pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40" />
      <div className="relative mx-auto max-w-lg">
        <Link href="/" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-indigo">
          <ChevronLeft size={18} /> Beranda
        </Link>

        <div className="mb-6 text-center">
          <Logo size={30} />
          <h1 className="mt-4 text-2xl font-bold text-ink">Daftarkan Sekolah</h1>
          <p className="mt-1 text-sm text-ink-soft">Gratis untuk 30 murid pertama</p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2 text-xs font-semibold">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={
                  "flex h-7 w-7 items-center justify-center rounded-full " +
                  (s <= step ? "bg-indigo text-white" : "bg-line text-ink-soft")
                }
              >
                {s < step ? <Check size={15} /> : s}
              </span>
              {s < 3 && <span className={"h-0.5 w-8 " + (s < step ? "bg-indigo" : "bg-line")} />}
            </div>
          ))}
        </div>

        <Card>
          {step === 1 && (
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">Nama Sekolah</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
                <Input
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="SMK Texar"
                  className="pl-10"
                />
              </div>
              <label className="mb-1.5 mt-4 block text-sm font-semibold text-ink">NPSN (opsional)</label>
              <Input placeholder="12345678" />
              <Button fullWidth className="mt-6" disabled={!school} onClick={() => setStep(2)}>
                Lanjut
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">Nama Admin</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Budi Santoso" className="pl-10" />
              </div>
              <label className="mb-1.5 mt-4 block text-sm font-semibold text-ink">Email Admin</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@sekolah.sch.id" className="pl-10" />
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" fullWidth onClick={() => setStep(1)}>
                  Kembali
                </Button>
                <Button fullWidth disabled={!name || !email} onClick={() => setStep(3)}>
                  Lanjut
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
                <Check size={28} className="text-success" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-ink">Sekolah Terdaftar!</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Kami kirim email ke <span className="font-semibold text-ink">{email}</span> untuk set password.
              </p>
              <Link href="/login" className="mt-6 block">
                <Button fullWidth>Ke Halaman Masuk</Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
