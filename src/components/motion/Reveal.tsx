"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance to travel in px. Keep small; this is guidance, not spectacle. */
  y?: number;
  /** Fire again each time it scrolls into view. Off by default. */
  repeat?: boolean;
};

/**
 * Fades and lifts content into view once. `data-reveal` lets the global
 * stylesheet force it visible for reduced-motion users and, via <noscript>,
 * when JavaScript is unavailable, so content never depends on animation.
 */
export function Reveal({ children, className, delay = 0, y = 22, repeat }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: !repeat, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </m.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Parent that staggers its <StaggerItem> children as it enters the viewport. */
export function StaggerContainer({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Cmp = m[as];
  return (
    <Cmp
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Cmp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Cmp = m[as];
  return (
    <Cmp data-reveal className={className} variants={item}>
      {children}
    </Cmp>
  );
}
