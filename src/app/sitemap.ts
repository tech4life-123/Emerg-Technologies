import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getSite } from "@/lib/site";

const pages = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/solutions", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = getSite();
  return [
    ...pages.map((p) => ({
      url: `${url}${p.path === "/" ? "" : p.path}`,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...products.map((p) => ({
      url: `${url}/products/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
