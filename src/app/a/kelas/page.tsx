"use client";

import { useState } from "react";
import { Plus, Search, Users, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const classes = [
  { name: "XII RPL 1", level: "XII", major: "RPL", wali: "Bu Siti Rahma", students: 28, avg: 72 },
  { name: "XII RPL 2", level: "XII", major: "RPL", wali: "Bu Dewi A.", students: 30, avg: 68 },
  { name: "XI TKJ 1", level: "XI", major: "TKJ", wali: "Pak Eko P.", students: 26, avg: 81 },
  { name: "XII MM 2", level: "XII", major: "MM", wali: "Bu Faridah", students: 24, avg: 76 },
  { name: "X RPL 1", level: "X", major: "RPL", wali: "Bu Ani W.", students: 32, avg: 64 },
];

export default function KelolaKelas() {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink jp-rule">Kelola Kelas</h1>
        <Button size="sm" onClick={() => setModal(true)}>
          <Plus size={15} /> Buat Kelas
        </Button>
      </div>

      <div className="relative mt-5 max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
        <Input placeholder="Cari kelas..." className="pl-10" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <Card key={c.name} interactive padded>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-indigo text-white">
                <BookOpen size={20} />
              </span>
              <Badge tone="indigo">
                {c.level}
              </Badge>
            </div>
            <h3 className="mt-3 text-base font-bold text-ink">{c.name}</h3>
            <p className="text-sm text-ink-soft">Wali: {c.wali}</p>
            <div className="mt-2 flex items-center gap-1 text-sm text-ink-soft">
              <Users size={14} /> {c.students} murid
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-ink-soft">Rata-rata</span>
                <span className="font-semibold text-indigo">{c.avg}%</span>
              </div>
              <ProgressBar value={c.avg} />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full"
              onClick={() => router.push(`/g/kelas/${slug(c.name)}`)}
            >
              <ExternalLink size={15} /> Lihat sebagai Guru
            </Button>
          </Card>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setModal(false)} />
          <Card className="relative z-10 w-full max-w-md" padded>
            <h2 className="text-lg font-bold text-ink">Buat Kelas Baru</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-ink">Nama Kelas</label>
                <Input placeholder="XII RPL 3" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-ink">Tingkat</label>
                  <Select>
                    <option>X</option>
                    <option>XI</option>
                    <option>XII</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-ink">Jurusan</label>
                  <Select>
                    <option>RPL</option>
                    <option>TKJ</option>
                    <option>MM</option>
                  </Select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-ink">Wali Kelas</label>
                <Select>
                  <option>Bu Siti Rahma</option>
                  <option>Pak Eko Prasetyo</option>
                  <option>Bu Dewi Anggraini</option>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" fullWidth onClick={() => setModal(false)}>
                Batal
              </Button>
              <Button fullWidth onClick={() => setModal(false)}>
                Buat Kelas
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
