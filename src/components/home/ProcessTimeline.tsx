"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/data/services";

/**
 * Five connected steps. A progress line fills as the section scrolls past
 * (a transform only; no layout work and no React state updates per frame).
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" aria-labelledby="process-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          eyebrow="Our process"
          title="From first conversation to continuous improvement."
        />

        <ol ref={ref} className="relative mt-12 grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Track + progress: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute left-[1.35rem] top-2 h-[calc(100%-1rem)] w-px bg-line-strong lg:left-6 lg:right-6 lg:top-[1.35rem] lg:h-px lg:w-auto"
          />
          <m.span
            aria-hidden="true"
            className="absolute left-[1.35rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-cyan to-teal lg:hidden"
            style={{ scaleY: reduce ? 1 : fill }}
          />
          <m.span
            aria-hidden="true"
            className="absolute left-6 right-6 top-[1.35rem] hidden h-px origin-left bg-gradient-to-r from-cyan to-teal lg:block"
            style={{ scaleX: reduce ? 1 : fill }}
          />

          {processSteps.map((s, i) => (
            <li key={s.step} className="relative pl-16 lg:pl-0 lg:pt-16">
              <Reveal delay={i * 0.06}>
                <span className="absolute left-0 top-0 grid size-11 place-items-center rounded-full border border-cyan/60 bg-deep font-display text-sm font-semibold text-cyan">
                  {s.step}
                </span>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
