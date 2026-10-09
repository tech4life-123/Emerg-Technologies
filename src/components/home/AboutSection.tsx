import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/data/company";
import { values } from "@/data/services";

/** Decorative: a small connected network, drawn rather than photographed. */
function NetworkArt() {
  const nodes = [
    [60, 220], [150, 150], [250, 190], [340, 90], [430, 140], [300, 290], [170, 300], [400, 260],
  ];
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [1, 6], [5, 7], [4, 7], [5, 6]];
  return (
    <svg viewBox="0 0 480 360" aria-hidden="true" className="h-auto w-full" focusable="false">
      <defs>
        <radialGradient id="na-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#00d1ff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#00d1ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="360" fill="url(#na-glow)" />
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#00d1ff"
          strokeOpacity="0.45"
          className="dash-flow"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#00e6b8" fillOpacity="0.12" />
          <circle cx={x} cy={y} r="4.5" fill={i === 0 ? "#e8f3ff" : "#00e6b8"} className="pulse-node" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
    </svg>
  );
}

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About us"
            title="Local Roots. Global Ambition."
            description={`${company.name} aims to build useful digital solutions for Liberia, Africa, and the wider world, starting from real problems close to home.`}
          />

          <Reveal delay={0.1} className="mt-8 space-y-6">
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">
                Mission
              </h3>
              <p className="mt-2 text-ink">{company.mission}</p>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">
                Vision
              </h3>
              <p className="mt-2 text-ink">{company.vision}</p>
            </div>
          </Reveal>

          <StaggerContainer as="ul" className="mt-8 flex flex-wrap gap-2">
            {values.map((v) => (
              <StaggerItem as="li" key={v.title}>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-ink">
                  <Icon name={v.icon} size={16} className="text-teal" />
                  {v.title}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.15} className="mt-8">
            <Link href="/about" className="btn btn-ghost">
              More about Emerg <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Parallax distance={26}>
          <div className="card overflow-hidden p-4 sm:p-6">
            <p className="eyebrow mb-4">Innovation for a better tomorrow</p>
            <NetworkArt />
            <p className="mt-4 text-sm text-muted">
              We build technology on a simple idea: practical tools, designed carefully, can
              change how an organization works.
            </p>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
