import type { NavItem } from "@/types";

/**
 * Company-level, editable facts. Nothing here is invented: no founding date,
 * headcount, address, phone number, awards, clients or social profiles.
 * Add those only once they are real and approved.
 */
export const company = {
  name: "Emerg Technologies",
  brand: "EMERG",
  tagline: "Innovation. Intelligence. Impact.",
  headline: "Building a Smarter Digital Future.",
  description:
    "Emerg Technologies builds innovative software, intelligent systems, and digital solutions that help businesses, schools, and communities solve real problems and move forward.",
  heroCopy:
    "From custom software to intelligent AI solutions, we build digital products that help African businesses, institutions, and communities achieve more.",
  base: "Liberia",
  mission:
    "To build accessible, reliable, and intelligent digital solutions that help people and organizations solve meaningful problems.",
  vision:
    "To become a trusted African technology company recognized for practical innovation and lasting digital impact.",
} as const;

/** Environment-driven settings. All optional; the site works without them. */
export const siteConfig = {
  /** First year shown in the footer. Configurable so it never goes stale by edit. */
  copyrightYear: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ?? "2026",
  /** Public contact address used for the mailto fallback. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** Verified social profiles only. Leave empty until real. */
  socials: [] as { label: string; href: string }[],
};

/** Shown on the Privacy and Terms pages. Update whenever those texts change. */
export const legalUpdated = "8 October 2026";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export const budgetRanges = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "Over $50,000",
] as const;
