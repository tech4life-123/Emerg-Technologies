import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { EmergLogo } from "@/components/brand/EmergLogo";
import { company, legalNav, siteConfig } from "@/data/company";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";

const linkClass =
  "inline-block py-1 text-sm text-muted transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-line">
      {/* Controlled transition into the footer: a connected network line */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-10 w-full opacity-70"
      >
        <path
          d="M0 30 C 150 4, 250 56, 400 30 S 650 4, 800 30 S 1050 56, 1200 30"
          fill="none"
          stroke="var(--color-cyan)"
          strokeOpacity="0.5"
          strokeWidth="1"
          className="dash-flow"
        />
        {[400, 800].map((x) => (
          <circle key={x} cx={x} cy={30} r="3" fill="var(--color-teal)" className="pulse-node" />
        ))}
      </svg>

      <div className="container-x pb-10 pt-20">
        <Reveal>
          <p className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-tight">
            <span className="text-gradient">{company.tagline}</span>
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <EmergLogo tone="dark" title="Emerg Technologies" className="h-11 w-auto" />
            <p className="mt-5 max-w-sm text-sm text-muted">{company.description}</p>
            {siteConfig.contactEmail && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-ink hover:text-cyan"
              >
                <Mail size={16} aria-hidden="true" /> {siteConfig.contactEmail}
              </a>
            )}
            <a
              href={`https://wa.me/${siteConfig.whatsapp.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex min-h-11 w-fit items-center gap-2 text-sm text-ink hover:text-cyan"
            >
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp {siteConfig.whatsapp.display}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {siteConfig.socials.length > 0 && (
              <ul className="mt-4 flex gap-4">
                {siteConfig.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Products">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink">
              Products
            </h2>
            <ul className="mt-4">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className={linkClass}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink">
              Services
            </h2>
            <ul className="mt-4">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={`${linkClass} text-cyan`}>
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink">
              Company
            </h2>
            <ul className="mt-4">
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/solutions" className={linkClass}>
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {company.name}. All rights reserved.
          </p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
