"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, BookOpen, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "murid" | "guru" | "admin";

const roles: { role: Role; label: string; href: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { role: "murid", label: "Murid", href: "/m/dashboard", icon: BookOpen },
  { role: "guru", label: "Guru", href: "/g/dashboard", icon: GraduationCap },
  { role: "admin", label: "Admin", href: "/a/dashboard", icon: ShieldCheck },
];

export function RoleSwitcher({ current }: { current: Role }) {
  const path = usePathname();
  return (
    <div className="flex items-center gap-1 rounded-btn bg-indigo-tint-soft/60 p-1">
      {roles.map((r) => {
        const Icon = r.icon;
        const active = r.role === current || path.startsWith(`/${r.role === "murid" ? "m" : r.role === "guru" ? "g" : "a"}`);
        return (
          <Link
            key={r.role}
            href={r.href}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-[0.5rem] px-2.5 py-1.5 text-sm font-semibold transition-colors",
              active ? "bg-paper text-indigo shadow-soft" : "text-ink-soft hover:text-ink",
            )}
          >
            <Icon size={16} />
            {r.label}
          </Link>
        );
      })}
    </div>
  );
}
