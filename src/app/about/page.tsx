import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { WhySection } from "@/components/home/WhySection";
import { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { company } from "@/data/company";
import { values } from "@/data/services";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Emerg Technologies is a technology company headquartered in Liberia, building practical software and intelligent systems for Africa and beyond.",
  alternates: canonicalFor("/about"),
  openGraph: { title: "About | Emerg Technologies", url: "/about" },
};

const philosophy = [
  {
    title: "Start with the problem",
    text: "A system is only useful if it fits the work people already do. We begin by understanding that work.",
  },
  {
    title: "Choose proven, maintainable tools",
    text: "We prefer dependable technology and readable code over novelty, so what we build can be run and changed by others.",
  },
  {
    title: "Be honest about status",
    text: "A prototype is called a prototype. We say what is live, what is early, and what is still an idea.",
  },
  {
    title: "Design for ordinary devices",
    text: "Interfaces should work on modest phones and slow connections, and be usable by keyboard and screen reader.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Local Roots. Global Ambition."
        description={`${company.name} is a technology company headquartered in ${company.base}. We aim to build useful digital solutions for Liberia, Africa, and the wider world.`}
      />

      <section aria-labelledby="overview-title" className="container-x grid gap-10 py-10 lg:grid-cols-2">
        <div className="space-y-5 text-ink/90">
          <h2 id="overview-title" className="text-2xl font-semibold">
            Who we are
          </h2>
          <p>{company.description}</p>
          <p>
            Our work spans software engineering, artificial intelligence, business automation,
            enterprise information systems, web and mobile applications, and technology consulting.
            We are building a portfolio of products for education, commerce and mapping, and we take
            on custom projects for organizations that need a system built around how they work.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="card p-6">
            <h2 className="eyebrow">Mission</h2>
            <p className="mt-3 text-lg text-ink">{company.mission}</p>
          </div>
          <div className="card p-6">
            <h2 className="eyebrow">Vision</h2>
            <p className="mt-3 text-lg text-ink">{company.vision}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="container-x py-10">
        <h2 id="values-title" className="text-2xl font-semibold">
          Our values
        </h2>
        <StaggerContainer as="ul" className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {values.map((v) => (
            <StaggerItem as="li" key={v.title} className="h-full">
              <div className="card flex h-full flex-col items-start gap-3 p-5">
                <Icon name={v.icon} size={26} className="text-teal" />
                <span className="font-display text-base font-semibold">{v.title}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section aria-labelledby="philosophy-title" className="container-x py-10">
        <h2 id="philosophy-title" className="text-2xl font-semibold">
          Technology philosophy
        </h2>
        <StaggerContainer as="ul" className="mt-6 grid gap-4 md:grid-cols-2">
          {philosophy.map((p) => (
            <StaggerItem as="li" key={p.title} className="h-full">
              <div className="card h-full p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          We are committed to usable, accessible systems. That includes this website, which is
          built to be navigated by keyboard, to respect reduced-motion settings, and to stay
          readable on small screens.
        </p>
      </section>

      <WhySection />
      <ContactCTA />
    </>
  );
}
