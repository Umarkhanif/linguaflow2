"use client";

import { useState } from "react";
import { Building2, Bell, Palette, Globe, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export default function PengaturanSekolah() {
  const [name, setName] = useState("SMK Texar");
  const [npsn, setNpsn] = useState("12345678");
  const [email, setEmail] = useState("admin@smktn.sch.id");
  const [notif, setNotif] = useState({ tugas: true, laporan: false, murid: true });

  function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        className={"relative h-6 w-11 rounded-full transition-colors " + (on ? "bg-indigo" : "bg-line")}
      >
        <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all " + (on ? "left-[22px]" : "left-0.5")} />
      </button>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ink jp-rule">Pengaturan Sekolah</h1>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Profil sekolah */}
        <Card padded>
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-indigo" />
            <h2 className="text-base font-bold text-ink">Profil Sekolah</h2>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Nama Sekolah</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">NPSN</label>
              <Input value={npsn} onChange={(e) => setNpsn(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Email Admin</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </Card>

        {/* Notifikasi */}
        <Card padded>
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-indigo" />
            <h2 className="text-base font-bold text-ink">Notifikasi</h2>
          </div>
          <div className="mt-4 space-y-3">
            {([
              { k: "tugas", label: "Tugas baru masuk", desc: "Saat murid kumpulkan tugas" },
              { k: "murid", label: "Murid tidak aktif", desc: "Peringatan murid &gt; 3 hari tidak login" },
              { k: "laporan", label: "Laporan mingguan", desc: "Kirim ringkasan tiap Senin" },
            ] as const).map((n) => (
              <div key={n.k} className="flex items-center justify-between rounded-btn bg-indigo-tint-soft/30 px-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-ink">{n.label}</p>
                  <p className="text-xs text-ink-soft">{n.desc}</p>
                </div>
                <Toggle on={notif[n.k]} onClick={() => setNotif((p) => ({ ...p, [n.k]: !p[n.k] }))} />
              </div>
            ))}
          </div>
        </Card>

        {/* Tampilan */}
        <Card padded>
          <div className="flex items-center gap-2">
            <Palette size={18} className="text-indigo" />
            <h2 className="text-base font-bold text-ink">Tampilan</h2>
          </div>
          <div className="mt-4 space-y-2">
            {["Indigo (Ai-iro)", "Vermillion", "Hijau Matcha"].map((t, i) => (
              <div
                key={t}
                className={
                  "flex items-center gap-3 rounded-btn border-2 p-3 " +
                  (i === 0 ? "border-indigo bg-indigo-tint-soft/40" : "border-line")
                }
              >
                <span className="h-5 w-5 rounded-full bg-indigo" />
                <span className="text-sm font-semibold text-ink">{t}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Bahasa */}
        <Card padded>
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-indigo" />
            <h2 className="text-base font-bold text-ink">Bahasa & Region</h2>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Bahasa Antarmuka</label>
              <Select>
                <option>Bahasa Indonesia</option>
                <option>English</option>
                <option>日本語</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Zona Waktu</label>
              <Select>
                <option>Asia/Jakarta (WIB)</option>
                <option>Asia/Makassar (WITA)</option>
                <option>Asia/Jayapura (WIT)</option>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 flex justify-end">
        <Button>
          <Save size={16} /> Simpan Pengaturan
        </Button>
      </div>
    </>
  );
}
