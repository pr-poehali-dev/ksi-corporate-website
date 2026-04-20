import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ReactNode, CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  delay?: number;        // ms
  duration?: number;     // ms
  direction?: Direction;
  distance?: number;     // px
  className?: string;
  threshold?: number;
}

const TRANSLATE: Record<Direction, string> = {
  up:    "translateY(28px)",
  down:  "translateY(-28px)",
  left:  "translateX(28px)",
  right: "translateX(-28px)",
  none:  "none",
};

export function Reveal({
  children,
  delay = 0,
  duration = 550,
  direction = "up",
  distance,
  className = "",
  threshold = 0.12,
}: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold });

  const translate = distance
    ? direction === "up" || direction === "down"
      ? `translateY(${direction === "up" ? distance : -distance}px)`
      : `translateX(${direction === "left" ? distance : -distance}px)`
    : TRANSLATE[direction];

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : translate,
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
