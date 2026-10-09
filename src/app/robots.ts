import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const { url, isConfigured } = getSite();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    // Only advertise a sitemap host once a real domain is configured.
    ...(isConfigured ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
