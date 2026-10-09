import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="More Than Software. We Build Solutions."
          description="From the first conversation to a working release, we build and deploy the systems your organization depends on."
        />

        <StaggerContainer as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem as="li" key={s.id}>
              <Link
                href={`/services#${s.id}`}
                className="card card-hover flex h-full flex-col gap-4 p-6"
              >
                <span className="grid size-12 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted">{s.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/contact" className="btn btn-primary">
            Discuss Your Project <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/services" className="btn btn-ghost">
            See service details
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
