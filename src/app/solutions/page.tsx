import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { IndustrySolutions } from "@/components/home/IndustrySolutions";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "How Emerg Technologies can help schools, businesses, retailers, NGOs, public institutions and startups with practical software and automation.",
  alternates: canonicalFor("/solutions"),
  openGraph: { title: "Solutions | Emerg Technologies", url: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <IndustrySolutions standalone />
      <ContactCTA />
    </>
  );
}
