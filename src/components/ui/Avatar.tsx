import { cn } from "@/lib/utils";

const palette = [
  "#2b3a67", // indigo
  "#c8373a", // vermillion
  "#e8b04b", // gold
  "#3d4f82", // indigo tint
  "#10b981", // success
  "#5a6fa8", // indigo tint 2
  "#9a6b16", // dark gold
  "#b22f32", // dark vermillion
];

/** Deterministic color from a name string. */
export function colorFromName(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface AvatarProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  square?: boolean;
}

export function Avatar({ name, size = 40, color, className, square }: AvatarProps) {
  const bg = color ?? colorFromName(name);
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-bold text-white shrink-0 select-none",
        square ? "rounded-card" : "rounded-full",
        className,
      )}
      style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.38 }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}
