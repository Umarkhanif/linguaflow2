import { type ClassValue } from "./types";

/**
 * Minimal className combiner (clsx + tailwind-merge style).
 * Filters falsy values and de-dupes conflicting Tailwind utility classes.
 */
function twMerge(classes: string[]): string {
  const seen = new Map<string, string>();
  const order = [
    "font",
    "text",
    "bg",
    "border",
    "rounded",
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr",
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "ml",
    "mr",
    "flex",
    "grid",
    "w",
    "h",
    "min-w",
    "min-h",
    "max-w",
    "max-h",
    "gap",
    "items",
    "justify",
    "shadow",
    "opacity",
    "block",
    "inline",
    "hidden",
    "absolute",
    "relative",
    "fixed",
    "sticky",
  ];
  for (const cls of classes) {
    if (!cls) continue;
    const base = cls.split(":").pop()!.split("-")[0];
    const idx = order.indexOf(base);
    if (idx >= 0) seen.set(base, cls);
    else seen.set(cls, cls);
  }
  return Array.from(seen.values()).join(" ");
}

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const i of inputs) {
    if (!i) continue;
    if (typeof i === "string") out.push(i);
    else if (Array.isArray(i)) out.push(cn(...i));
    else if (typeof i === "object") {
      for (const [k, v] of Object.entries(i)) if (v) out.push(k);
    }
  }
  return twMerge(out);
}
