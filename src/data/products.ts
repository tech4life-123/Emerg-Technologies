import type { Product, ProductCategory, ProductStatus } from "@/types";

/**
 * Single source of truth for the portfolio. Every card, filter, detail page,
 * sitemap entry and the contact form's "service of interest" read from here.
 *
 * Status rules (do not relax these without re-checking):
 *  - "live"        : we loaded the URL and it served a public page.
 *  - "early-access": reachable, but the product describes itself as early access.
 *  - "prototype"   : a demonstration, or a link we could not verify ourselves.
 *  - "in-development" / "concept": no deployment URL has been supplied.
 */
export const products: Product[] = [
  {
    slug: "educore",
    name: "EduCore",
    category: "Education",
    shortDescription:
      "School management software where each school gets its own branded workspace.",
    longDescription: [
      "EduCore is a multi-school management platform. Each school runs in its own branded, isolated workspace on a shared system, so schools keep their identity while the platform stays easy to maintain.",
      "It is designed around the people who use a school every day: administrators, teachers, students and parents. The first focus is Liberian high schools, with colleges and universities planned for later.",
    ],
    icon: "graduation-cap",
    accent: "#00d1ff",
    status: "live",
    url: "https://educore-beryl-xi.vercel.app/",
    urlVerified: true,
    verifiedOn: "2026-10-08",
    ctaLabel: "Visit EduCore",
    features: [
      "A branded, isolated workspace for every school",
      "Roles for administrators, teachers, students and parents",
      "Built first for Liberian high schools",
    ],
  },
  {
    slug: "wvstu-digital-campus",
    name: "WVSTU Digital Campus",
    category: "Education",
    shortDescription:
      "A digital campus portal demonstration for a university community.",
    longDescription: [
      "WVSTU Digital Campus is a demonstration prototype of a unified university portal. It brings public university information together with student, faculty and administrative tools in one place.",
      "It exists to show what an institutional platform could look like. All student, financial and grade data in the demo is fictional.",
    ],
    icon: "landmark",
    accent: "#5b8cff",
    status: "prototype",
    url: "https://wvstu-digital-campus.vercel.app/",
    urlVerified: true,
    verifiedOn: "2026-10-08",
    notice:
      "Demonstration prototype with fictional data. It is not an official William V. S. Tubman University system.",
    ctaLabel: "View the prototype",
    features: [
      "Public university information and portal tools in one place",
      "Separate views for students, faculty and administrators",
      "Demo records only; no real student data",
    ],
  },
  {
    slug: "gbanab2b",
    name: "GbanaB2B",
    category: "Commerce",
    shortDescription:
      "A wholesale and freight marketplace concept for suppliers, retailers and carriers.",
    longDescription: [
      "GbanaB2B is a wholesale commerce and logistics concept that connects suppliers, retailers and freight providers. The idea is that businesses can buy stock in bulk and receive competing freight bids for the delivery.",
      "The product is in early access. The payment-protection flow it describes is part of the product design, and its availability should be confirmed before anyone relies on it.",
    ],
    icon: "truck",
    accent: "#ffa94d",
    status: "early-access",
    url: "https://gbana-b2-b.vercel.app/",
    urlVerified: true,
    verifiedOn: "2026-10-08",
    ctaLabel: "Explore GbanaB2B",
    features: [
      "Bulk buying from suppliers",
      "Competing freight bids from carriers",
      "Payment held until delivery is confirmed (as designed)",
    ],
  },
  {
    slug: "too-easy",
    name: "Too Easy",
    category: "Commerce",
    shortDescription:
      "An online storefront for Too Easy, a Liberian streetwear brand.",
    longDescription: [
      "Too Easy is an online storefront for a Liberian streetwear brand. It presents clothing drops, a lookbook, the brand's identity and details of its physical store.",
    ],
    icon: "shopping-bag",
    accent: "#ffd166",
    status: "live",
    url: "https://too-easy-wine.vercel.app/",
    urlVerified: true,
    verifiedOn: "2026-10-08",
    ctaLabel: "Visit the store",
    features: ["Clothing drops", "Lookbook", "Store information"],
  },
  {
    slug: "libmap",
    name: "LibMap",
    category: "Mapping",
    shortDescription:
      "A digital mapping project to help people explore places in Liberia.",
    longDescription: [
      "LibMap is a digital mapping project intended to help users explore locations in Liberia.",
      "It does not have a public deployment yet. If you would like to see where it stands, ask for a demonstration.",
    ],
    icon: "map-pin",
    accent: "#00e6b8",
    status: "in-development",
    urlVerified: false,
    ctaLabel: "Request a demonstration",
  },
  {
    slug: "educard-pro",
    name: "EduCard Pro",
    category: "Education",
    shortDescription:
      "An ID-card design and verification application concept.",
    longDescription: [
      "EduCard Pro is an application concept for designing identity cards and verifying them. It is aimed at schools and institutions that issue cards to students and staff.",
      "It is at the concept stage and has no public deployment. Request a demonstration to discuss what it could look like for your organization.",
    ],
    icon: "id-card",
    accent: "#a78bfa",
    status: "concept",
    urlVerified: false,
    ctaLabel: "Request a demonstration",
  },
  {
    slug: "heartbridge",
    name: "HeartBridge",
    category: "Consumer applications",
    shortDescription:
      "A dating and social connection platform preview.",
    longDescription: [
      "HeartBridge is a dating and social connection platform. It is shown here as a preview of a consumer application.",
    ],
    icon: "heart-handshake",
    accent: "#ff6b8a",
    status: "prototype",
    url: "https://heartbridge-mu.vercel.app/app",
    urlVerified: true,
    notice:
      "Preview of a consumer application. It is a prototype and not yet a finished public service.",
    ctaLabel: "Open the preview",
  },
];

export const statusMeta: Record<
  ProductStatus,
  { label: string; description: string }
> = {
  live: {
    label: "Live",
    description: "Publicly reachable when we last checked.",
  },
  "early-access": {
    label: "Early access",
    description: "Publicly reachable; features are still being rolled out.",
  },
  prototype: {
    label: "Prototype",
    description: "A working demonstration or preview, not a production service.",
  },
  "in-development": {
    label: "In development",
    description: "Being built. No public deployment yet.",
  },
  concept: {
    label: "Concept",
    description: "An idea we have designed but not yet deployed.",
  },
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Only categories that actually contain products, in display order. */
export const productCategories: ProductCategory[] = (
  [
    "Education",
    "Commerce",
    "Mapping",
    "Consumer applications",
    "AI and business systems",
  ] as ProductCategory[]
).filter((c) => products.some((p) => p.category === c));

/** True when the product has a destination that is safe to present as a link. */
export function hasExternalLink(p: Product): p is Product & { url: string } {
  return typeof p.url === "string" && p.url.length > 0;
}
