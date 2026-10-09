import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="section-y pt-8">
      <div className="container-x">
        <Reveal>
          <div className="card relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="drift pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full glow"
            />
            <h2 id="cta-title" className="relative text-[clamp(1.8rem,4.6vw,3rem)] font-semibold">
              Let&rsquo;s Build Something Great Together.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">
              Tell us what you are trying to solve. We will reply with honest questions and a sensible
              next step.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a Project <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/products" className="btn btn-ghost">
                See our products
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
