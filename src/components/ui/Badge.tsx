import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

type Tone = "indigo" | "vermillion" | "gold" | "success" | "error" | "neutral" | "soft";

const tones: Record<Tone, string> = {
  indigo: "bg-indigo-tint-soft text-indigo",
  vermillion: "bg-[#fdeaea] text-vermillion",
  gold: "bg-[#fbf1dd] text-[#9a6b16]",
  success: "bg-[#e6f7f0] text-success",
  error: "bg-[#fdeaea] text-error",
  neutral: "bg-[#f2f2f2] text-ink-soft",
  soft: "bg-indigo-tint-soft text-indigo-tint-2",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "indigo", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
