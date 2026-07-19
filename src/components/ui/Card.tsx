import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padded?: boolean;
}

export function Card({
  interactive,
  padded = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-paper rounded-card border border-line shadow-soft",
        padded && "p-5",
        interactive &&
          "transition-shadow duration-150 hover:shadow-soft-lg hover:ring-2 hover:ring-indigo/10 cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-bold text-ink", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
