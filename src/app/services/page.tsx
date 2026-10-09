import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { canonicalFor, safeJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, AI integration, business and education systems, web and mobile apps, consulting, data and cloud: what Emerg Technologies builds.",
  alternates: canonicalFor("/services"),
  openGraph: { title: "Services | Emerg Technologies", url: "/services" },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${company.name} services`,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: { "@type": "Organization", name: company.name },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(servicesJsonLd) }}
      />
      <PageHeader
        eyebrow="Services"
        title="More Than Software. We Build Solutions."
        description="Nine areas of work, from a first prototype to a system your team runs every day. What you receive depends on the project, and we agree it with you in writing before we build."
      />

      <section aria-label="Service details" className="container-x pb-10">
        <StaggerContainer as="ul" className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <StaggerItem as="li" key={s.id} className="h-full">
              <article id={s.id} className="card flex h-full scroll-mt-28 flex-col gap-4 p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan">
                    <Icon name={s.icon} size={28} />
                  </span>
                  <h2 className="text-xl font-semibold sm:text-2xl">{s.title}</h2>
                </div>
                <p className="text-muted">{s.description}</p>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                    What this can include
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-teal" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-2 text-sm font-semibold text-cyan hover:text-ink"
                >
                  Discuss your project <ArrowRight size={16} aria-hidden="true" />
                  <span className="sr-only"> about {s.title}</span>
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <ProcessTimeline />
      <ContactCTA />
    </>
  );
}
