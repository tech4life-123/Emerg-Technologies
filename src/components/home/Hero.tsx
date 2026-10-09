import Link from "next/link";
import { Fragment, useId } from "react";
import { ArrowRight } from "lucide-react";
import { DigitalGlobe } from "@/components/home/DigitalGlobe";
import { SYMBOL, TONES } from "@/components/brand/brand-geometry.generated";
import { company } from "@/data/company";

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
      <path
        d={SYMBOL.spine}
        fill={`url(#${raw}s)`}
        className="logo-spine"
        style={{ ...box, transformOrigin: "50% 100%" }}
      />
      {SYMBOL.bars.map((b, i) => (
        <path
          key={b.role}
          d={b.d}
          fill={`url(#${raw}b)`}
          className="logo-bar"
          style={{ ...box, transformOrigin: "0% 50%", animationDelay: `${0.25 + i * 0.12}s` }}
        />
      ))}
      {SYMBOL.nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={t.node}
          className="logo-node"
          style={{ ...box, transformOrigin: "50% 50%", animationDelay: `${0.7 + i * 0.1}s` }}
        />
      ))}
    </svg>
  );
}

function Headline() {
  // "Building a Smarter Digital Future."
  const words = company.headline.replace(/\.$/, "").split(" ");
  const gradientFrom = words.length - 2; // "Digital Future"
  return (
    <h1 id="hero-title" className="mt-5 text-[clamp(2.5rem,7.4vw,5rem)] font-bold leading-[1.02]">
      {words.map((w, i) => (
        <Fragment key={i}>
        <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span
            className={`hero-word inline-block ${i >= gradientFrom ? "text-gradient" : ""}`}
            style={{ animationDelay: `${0.1 + i * 0.09}s` }}
          >
            {w}
            {i === words.length - 1 ? "." : ""}
          </span>
        </span>
        {i < words.length - 1 ? " " : ""}
        </Fragment>
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
            <p className="eyebrow hero-in" style={{ ["--y" as string]: "0px", ["--x" as string]: "-12px", animationDelay: "0.1s" }}>
              Africa&rsquo;s Technology Partner
            </p>
          </div>

          <Headline />

          <p
            className="hero-in mt-6 max-w-xl text-base text-muted sm:text-lg"
            style={{ animationDelay: "0.45s" }}
          >
            {company.heroCopy}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="hero-in" style={{ animationDelay: "0.55s" }}>
              <Link href="#products" className="btn btn-primary">
                Explore Our Products <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-in" style={{ animationDelay: "0.65s" }}>
              <Link href="#services" className="btn btn-ghost">
                Our Services
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-pop relative mx-auto w-full max-w-[19rem] sm:max-w-[28rem] lg:max-w-none">
          <div
            aria-hidden="true"
            className="drift glow absolute inset-[2%] -z-10 rounded-full"
          />
          <DigitalGlobe />
        </div>
      </div>

      <div className="container-x relative z-10 mt-10 lg:mt-4">
        <dl
          aria-label="Emerg Technologies at a glance"
          className="hero-in grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
          style={{ animationDelay: "0.8s" }}
        >
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end gap-1 bg-midnight/90 p-5">
              <dt className="text-xs uppercase tracking-widest text-muted">{f.label}</dt>
              <dd className="font-display text-2xl font-semibold text-ink sm:text-3xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
