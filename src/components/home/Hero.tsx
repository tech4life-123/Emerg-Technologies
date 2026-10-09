"use client";

import { m, type Variants } from "motion/react";
import Link from "next/link";
import { useId } from "react";
import { ArrowRight } from "lucide-react";
import { DigitalGlobe } from "@/components/home/DigitalGlobe";
import { SYMBOL, TONES } from "@/components/brand/brand-geometry.generated";
import { company } from "@/data/company";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Truthful facts only, derived from the site's own data. */
type Fact = { value: string; label: string };

/** The symbol assembles itself: spine, then each bar, then the nodes light up. */
function LogoReveal() {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const t = TONES.dark;
  const box = { transformBox: "fill-box" as const };
  return (
    <svg viewBox="0 0 64 64" className="size-11 shrink-0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${raw}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.spine[0]} />
          <stop offset="1" stopColor={t.spine[1]} />
        </linearGradient>
        <linearGradient id={`${raw}b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={t.bars[0]} />
          <stop offset="1" stopColor={t.bars[1]} />
        </linearGradient>
      </defs>
      <m.path
        data-reveal
        d={SYMBOL.spine}
        fill={`url(#${raw}s)`}
        style={{ ...box, transformOrigin: "50% 100%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
      />
      {SYMBOL.bars.map((b, i) => (
        <m.path
          key={b.role}
          data-reveal
          d={b.d}
          fill={`url(#${raw}b)`}
          style={{ ...box, transformOrigin: "0% 50%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.25 + i * 0.12, ease: EASE }}
        />
      ))}
      {SYMBOL.nodes.map((n, i) => (
        <m.circle
          key={i}
          data-reveal
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={t.node}
          style={{ ...box, transformOrigin: "50% 50%" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.7 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.7, delay: 0.35 + i * 0.09, ease: EASE },
  }),
};

function Headline() {
  // "Building a Smarter Digital Future."
  const words = company.headline.replace(/\.$/, "").split(" ");
  const gradientFrom = words.length - 2; // "Digital Future"
  return (
    <h1 id="hero-title" className="mt-5 text-[clamp(2.5rem,7.4vw,5rem)] font-bold leading-[1.02]">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <m.span
            data-reveal
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="show"
            className={`inline-block ${i >= gradientFrom ? "text-gradient" : ""}`}
          >
            {w}
            {i === words.length - 1 ? "." : ""}
          </m.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

export function Hero({ facts }: { facts: Fact[] }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-16">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <LogoReveal />
            <m.p
              data-reveal
              className="eyebrow"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              Africa&rsquo;s Technology Partner
            </m.p>
          </div>

          <Headline />

          <m.p
            data-reveal
            className="mt-6 max-w-xl text-base text-muted sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.85, ease: EASE }}
          >
            {company.heroCopy}
          </m.p>

          <div className="mt-8 flex flex-wrap gap-3">
            <m.div
              data-reveal
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.0 }}
            >
              <Link href="#products" className="btn btn-primary">
                Explore Our Products <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </m.div>
            <m.div
              data-reveal
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.1 }}
            >
              <Link href="#services" className="btn btn-ghost">
                Our Services
              </Link>
            </m.div>
          </div>
        </div>

        <m.div
          data-reveal
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-[28rem] lg:max-w-none"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        >
          <div
            aria-hidden="true"
            className="drift absolute inset-[8%] -z-10 rounded-full bg-cyan/10 blur-3xl"
          />
          <DigitalGlobe />
        </m.div>
      </div>

      <div className="container-x relative z-10 mt-10 lg:mt-4">
        <m.dl
          data-reveal
          aria-label="Emerg Technologies at a glance"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
        >
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end gap-1 bg-midnight/90 p-5 backdrop-blur">
              <dt className="text-xs uppercase tracking-widest text-muted">{f.label}</dt>
              <dd className="font-display text-2xl font-semibold text-ink sm:text-3xl">{f.value}</dd>
            </div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}
