import { TrendingUp, Users, UserCircle, ClipboardList, Activity } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";

const stats = [
  { icon: Users, label: "Total Murid", value: "840", trend: "+5% dari minggu lalu" },
  { icon: UserCircle, label: "Total Guru", value: "12", trend: "+1 baru" },
  { icon: ClipboardList, label: "Total Kelas", value: "24", trend: "Stabil" },
  { icon: Activity, label: "Aktif Hari Ini", value: "612 (73%)", trend: "+8% dari minggu lalu" },
];

const activity = [
  { d: 12, v: 40 }, { d: 13, v: 55 }, { d: 14, v: 48 }, { d: 15, v: 62 }, { d: 16, v: 70 },
  { d: 17, v: 58 }, { d: 18, v: 75 }, { d: 19, v: 82 }, { d: 20, v: 68 }, { d: 21, v: 88 },
  { d: 22, v: 79 }, { d: 23, v: 91 }, { d: 24, v: 85 }, { d: 25, v: 95 }, { d: 26, v: 88 },
  { d: 27, v: 100 }, { d: 28, v: 92 }, { d: 29, v: 97 }, { d: 30, v: 90 }, { d: 1, v: 96 },
  { d: 2, v: 84 }, { d: 3, v: 93 }, { d: 4, v: 87 }, { d: 5, v: 98 }, { d: 6, v: 91 },
  { d: 7, v: 100 }, { d: 8, v: 94 }, { d: 9, v: 99 }, { d: 10, v: 96 }, { d: 11, v: 100 },
];

const topClasses = [
  { name: "XII RPL 1", prog: 92 },
  { name: "XI TKJ 1", prog: 88 },
  { name: "XII MM 2", prog: 85 },
];
const topTeachers = [
  { name: "Siti Rahma", tasks: 24 },
  { name: "Dewi Anggraini", tasks: 19 },
  { name: "Eko Prasetyo", tasks: 15 },
];

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-ink jp-rule">Dashboard — SMK Texar</h1>
      <p className="text-sm text-ink-soft">{today}</p>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} padded>
              <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-indigo-tint-soft">
                <Icon size={20} className="text-indigo" />
              </span>
              <p className="mt-3 text-2xl font-bold text-ink">{s.value}</p>
              <p className="text-sm text-ink-soft">{s.label}</p>
              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-success">
                <TrendingUp size={13} /> {s.trend}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Activity line chart (area fill) */}
      <Card className="mt-6" padded>
        <h2 className="text-sm font-bold text-ink">Aktivitas Belajar 30 Hari Terakhir</h2>
        <div className="mt-4 overflow-x-auto thin-scroll">
          <div className="flex min-w-[640px] items-end gap-1">
            {activity.map((a, i) => (
              <div key={i} className="flex-1">
                <div
                  className="w-full rounded-t-sm bg-indigo/70"
                  style={{ height: `${a.v * 0.6}px` }}
                  title={`Hari ${a.d}: ${a.v}%`}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card padded>
          <h2 className="text-sm font-bold text-ink">Kelas Paling Aktif</h2>
          <div className="mt-3 space-y-3">
            {topClasses.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold text-ink">{c.name}</span>
                  <span className="text-indigo">{c.prog}%</span>
                </div>
                <ProgressBar value={c.prog} />
              </div>
            ))}
          </div>
        </Card>

        <Card padded>
          <h2 className="text-sm font-bold text-ink">Guru Paling Aktif</h2>
          <div className="mt-3 space-y-3">
            {topTeachers.map((t, i) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-indigo">#{i + 1}</span>
                <Avatar name={t.name} size={32} />
                <span className="flex-1 text-sm font-semibold text-ink">{t.name}</span>
                <span className="text-xs text-ink-soft">{t.tasks} tugas</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
