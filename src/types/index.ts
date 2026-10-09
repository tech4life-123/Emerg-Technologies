export type IconName =
  | "graduation-cap"
  | "landmark"
  | "truck"
  | "shopping-bag"
  | "map-pin"
  | "id-card"
  | "heart-handshake"
  | "code-xml"
  | "brain-circuit"
  | "boxes"
  | "school"
  | "globe"
  | "smartphone"
  | "compass"
  | "bar-chart"
  | "cloud"
  | "store"
  | "building"
  | "hand-heart"
  | "rocket"
  | "briefcase"
  | "shield-check"
  | "layers"
  | "gauge"
  | "eye"
  | "scale"
  | "users"
  | "lightbulb"
  | "sparkles"
  | "refresh-cw"
  | "workflow"
  | "file-text"
  | "clipboard-list";

/**
 * How far along a product really is. Shown on every card so visitors can
 * always tell a live app from a prototype or a concept.
 */
export type ProductStatus =
  | "live"
  | "early-access"
  | "prototype"
  | "in-development"
  | "concept";

export type ProductCategory =
  | "Education"
  | "Commerce"
  | "Mapping"
  | "Consumer applications"
  | "AI and business systems";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  /** One line for cards. */
  shortDescription: string;
  /** Paragraphs for the detail page. */
  longDescription: string[];
  icon: IconName;
  /** Accent used sparingly for the icon tile and border glow. */
  accent: string;
  status: ProductStatus;
  /** Destination, only when one has been supplied. */
  url?: string;
  /** True only if we actually loaded the URL ourselves (see verifiedOn). */
  urlVerified: boolean;
  /** ISO date of the last reachability check. */
  verifiedOn?: string;
  /** Extra honesty note shown on the detail page and card. */
  notice?: string;
  ctaLabel: string;
  features?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  deliverables: string[];
}

export interface IndustrySolution {
  id: string;
  title: string;
  icon: IconName;
  problem: string;
  workflows: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Commitment {
  title: string;
  description: string;
  icon: IconName;
}

export interface NavItem {
  label: string;
  href: string;
}
