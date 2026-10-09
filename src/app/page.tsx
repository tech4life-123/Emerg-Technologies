import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Hero } from "@/components/home/Hero";
import { IndustrySolutions } from "@/components/home/IndustrySolutions";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySection } from "@/components/home/WhySection";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { industries, services } from "@/data/services";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${company.name} — ${company.tagline}` },
  description: company.description,
  alternates: canonicalFor("/"),
};

export default function HomePage() {
  // Facts come from the site's own data, so they can never drift from reality.
  const facts = [
    { value: String(products.length), label: "Products and projects" },
    { value: String(services.length), label: "Service areas" },
    { value: String(industries.length), label: "Sectors we build for" },
    { value: company.base, label: "Headquartered in" },
  ];

  return (
    <>
      <Hero facts={facts} />
      <ProductShowcase />
      <ServicesSection />
      <IndustrySolutions />
      <AboutSection />
      <WhySection />
      <ProcessTimeline />
      <ContactCTA />
    </>
  );
}
