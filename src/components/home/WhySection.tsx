import { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { commitments } from "@/data/services";

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="why-title"
          eyebrow="Why Emerg Technologies?"
          title="How we work, and what we hold ourselves to."
          description="These are our working principles and commitments. They describe how we intend to build, not independently audited results."
        />
        <StaggerContainer as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c) => (
            <StaggerItem as="li" key={c.title} className="h-full">
              <div className="card flex h-full flex-col gap-3 p-5">
                <Icon name={c.icon} size={26} className="text-cyan" />
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="text-sm text-muted">{c.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
