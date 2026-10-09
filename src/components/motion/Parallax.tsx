"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Subtle vertical drift for decorative layers only. Never wrap real content.
 * Disabled entirely when the user prefers reduced motion.
 */
export function Parallax({
  children,
  distance = 40,
  className,
}: {
  children: ReactNode;
  /** Total travel in px across the element's pass through the viewport. */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y }}>{children}</m.div>
    </div>
  );
}
