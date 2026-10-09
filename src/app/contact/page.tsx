import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock3, ListChecks, MessageCircle, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/company";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Emerg Technologies. Tell us what you are trying to solve and we will reply with a sensible next step.",
  alternates: canonicalFor("/contact"),
  openGraph: { title: "Contact | Emerg Technologies", url: "/contact" },
};

const expectations = [
  {
    icon: ListChecks,
    title: "What helps us most",
    text: "Who will use the system, what they do today, and what a good result looks like.",
  },
  {
    icon: ShieldCheck,
    title: "Your details",
    text: "Used only to reply to your enquiry. See the Privacy Policy for specifics.",
  },
  {
    icon: Clock3,
    title: "What happens next",
    text: "We read your message and reply to the email address you provide.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Build Something Great Together."
        description="Tell us about your project. Required fields are your name, organization, email, a service and a short description."
      />

      <section aria-label="Contact form" className="container-x grid gap-10 pb-16 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <Suspense
            fallback={
              <div className="card p-8 text-sm text-muted" role="status">
                Loading the form…
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </Reveal>

        <aside aria-label="Before you write" className="space-y-4">
          {expectations.map(({ icon: Icon, title, text }) => (
            <Reveal key={title}>
              <div className="card flex gap-4 p-5">
                <Icon size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan" />
                <div>
                  <h2 className="text-base font-semibold">{title}</h2>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover flex min-h-11 items-center gap-4 p-5"
            >
              <MessageCircle size={24} aria-hidden="true" className="shrink-0 text-teal" />
              <span>
                <span className="block text-base font-semibold">Chat on WhatsApp</span>
                <span className="mt-1 block text-sm text-muted">
                  {siteConfig.whatsapp.display}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </span>
            </a>
          </Reveal>
          {siteConfig.contactEmail && (
            <Reveal>
              <p className="text-sm text-muted">
                Prefer email?{" "}
                <a className="text-cyan underline underline-offset-2" href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>
              </p>
            </Reveal>
          )}
        </aside>
      </section>
    </>
  );
}
