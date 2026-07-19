"use client";

import { useState } from "react";
import { Search, Plus, Upload, Pencil, UserX, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

const students = [
  { name: "Ahmad Fauzi", nis: "12345", class: "XII RPL 1", xp: 2450, status: "Aktif" },
  { name: "Siti Nurhaliza", nis: "12346", class: "XII RPL 1", xp: 3120, status: "Aktif" },
  { name: "Budi Santoso", nis: "12347", class: "XII RPL 2", xp: 1980, status: "Aktif" },
  { name: "Rina Maharani", nis: "12348", class: "XI TKJ 1", xp: 2980, status: "Aktif" },
  { name: "Bayu Permana", nis: "12349", class: "XII MM 2", xp: 0, status: "Nonaktif" },
];

export default function KelolaMurid() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink jp-rule">Kelola Murid</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setModal(true)}>
            <Upload size={15} /> Import Murid
          </Button>
          <Button size="sm">
            <Plus size={15} /> Tambah Murid
          </Button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <Input placeholder="Cari murid / NIS..." className="pl-10" />
        </div>
        <button className="flex h-11 items-center gap-2 rounded-btn border border-line bg-paper px-3 text-sm font-semibold text-ink-soft">
          <Filter size={16} /> Semua Kelas
        </button>
      </div>

      {/* Mobile: card list */}
      <div className="mt-4 space-y-3 md:hidden">
        {students.map((s) => (
          <Card key={s.nis} padded>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={s.name} size={40} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-ink-soft">NIS {s.nis}</p>
                </div>
              </div>
              <Badge tone={s.status === "Aktif" ? "success" : "neutral"}>{s.status}</Badge>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
              <span className="text-ink-soft">{s.class}</span>
              <span className="font-bold text-indigo">{s.xp.toLocaleString()} XP</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" fullWidth>
                <Pencil size={15} /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-error">
                <UserX size={15} /> Nonaktifkan
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop: table */}
      <Card className="mt-4 hidden overflow-hidden p-0 md:block" padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-line bg-indigo-tint-soft/40 text-left text-xs font-bold text-ink-soft">
                <th className="px-4 py-3">Murid</th>
                <th className="px-4 py-3">Kelas</th>
                <th className="px-4 py-3">Total XP</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.nis} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} size={32} />
                      <div>
                        <p className="font-semibold text-ink">{s.name}</p>
                        <p className="text-xs text-ink-soft">NIS {s.nis}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{s.class}</td>
                  <td className="px-4 py-3 font-bold text-indigo">{s.xp.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge tone={s.status === "Aktif" ? "success" : "neutral"}>{s.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-indigo" aria-label="Edit">
                        <Pencil size={16} />
                      </button>
                      <button className="text-ink-soft hover:text-error" aria-label="Nonaktifkan">
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Import modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setModal(false)} />
          <Card className="relative z-10 w-full max-w-md" padded>
            <h2 className="text-lg font-bold text-ink">Import Murid (CSV)</h2>
            <div className="mt-4 flex h-32 items-center justify-center rounded-card border-2 border-dashed border-indigo/40 bg-indigo-tint-soft/30 text-sm text-ink-soft">
              Drop file CSV di sini atau klik untuk pilih
            </div>
            <p className="mt-2 text-xs text-ink-soft">Format: Nama, NIS, Kelas, Email</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" fullWidth onClick={() => setModal(false)}>
                Batal
              </Button>
              <Button fullWidth onClick={() => setModal(false)}>
                Import
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
