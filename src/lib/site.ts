/**
 * Resolves the public site URL.
 *
 * Priority: NEXT_PUBLIC_SITE_URL (your real domain) → Vercel's production
 * hostname at build time → localhost. `isConfigured` is true only when a real
 * domain was supplied, which is when canonical URLs are emitted.
 */
export function getSite(): { url: string; isConfigured: boolean } {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return { url: explicit.replace(/\/+$/, ""), isConfigured: true };
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) {
    return { url: `https://${vercel}`, isConfigured: false };
  }
  return { url: "http://localhost:3000", isConfigured: false };
}

/** Escape "<" so JSON-LD can never close its own <script> tag. */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Canonical alternates, emitted only once a real production domain is
 * configured (NEXT_PUBLIC_SITE_URL). Until then pages declare no canonical,
 * so nothing points search engines at a placeholder host.
 */
export function canonicalFor(path: string): { canonical: string } | undefined {
  return getSite().isConfigured ? { canonical: path } : undefined;
}
