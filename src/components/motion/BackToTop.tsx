"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

/** Appears after the first screenful; state only changes when the threshold is crossed. */
export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 700;
    setVisible((prev) => (prev === next ? prev : next));
  });

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0 })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-line-strong bg-midnight/90 text-cyan shadow-card backdrop-blur hover:border-cyan"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
