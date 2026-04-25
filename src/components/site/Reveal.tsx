import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import type { ElementType, ReactNode, CSSProperties } from "react";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "slide" | "scale";
  style?: CSSProperties;
};

export function Reveal({
  as,
  children,
  className,
  delay = 0,
  variant = "slide",
  style,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, visible } = useReveal<HTMLElement>();
  const base = variant === "scale" ? "reveal-scale" : "reveal";
  return (
    <Tag
      ref={ref}
      className={cn(base, visible && "is-visible", className)}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
    >
      {children}
    </Tag>
  );
}
