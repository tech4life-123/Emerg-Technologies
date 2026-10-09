import { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/data/services";

export function IndustrySolutions({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="solutions-title"
          as={standalone ? "h1" : "h2"}
          eyebrow="Solutions"
          title="Built for the way your sector really works."
          description="These are the kinds of organizations we design for and the everyday problems we can help solve. They are examples of what is possible, not a client list."
        />

        <StaggerContainer as="ul" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <StaggerItem as="li" key={i.id} className="h-full">
              <article className="card flex h-full flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-teal/30 bg-teal/10 text-teal">
                    <Icon name={i.icon} size={22} />
                  </span>
                  <h3 className="text-lg font-semibold">{i.title}</h3>
                </div>
                <p className="text-sm text-muted">
                  <span className="font-semibold text-ink">The problem: </span>
                  {i.problem}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Workflows we can build
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {i.workflows.map((w) => (
                      <li key={w} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
