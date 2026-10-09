import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/products/StatusBadge";
import { hasExternalLink } from "@/data/products";
import type { Product } from "@/types";

/** The action that is honest for this product's state. */
export function productAction(p: Product): { href: string; external: boolean; label: string } {
  if (hasExternalLink(p)) return { href: p.url, external: true, label: p.ctaLabel };
  return { href: `/contact?interest=${p.slug}`, external: false, label: p.ctaLabel };
}

export function ProductCard({ product }: { product: Product }) {
  const action = productAction(product);
  return (
    <article
      className="card card-hover group flex h-full flex-col overflow-hidden"
      style={{ ["--accent" as string]: product.accent }}
    >
      {/* Product visual: accent wash, faint grid, and the product's own icon */}
      <div
        aria-hidden="true"
        className="relative grid h-36 place-items-center overflow-hidden border-b border-line"
        style={{
          background: `radial-gradient(120% 140% at 20% 0%, ${product.accent}33, transparent 60%), linear-gradient(180deg, #0c1a2e, #081220)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(155,175,196,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(155,175,196,.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(circle at 50% 50%, #000, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000, transparent 75%)",
          }}
        />
        <span
          className="relative grid size-16 place-items-center rounded-2xl border transition-transform duration-300 group-hover:scale-105"
          style={{
            borderColor: `${product.accent}66`,
            background: `${product.accent}1f`,
            color: product.accent,
          }}
        >
          <Icon name={product.icon} size={30} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow !tracking-[0.16em] text-muted">{product.category}</p>
          <StatusBadge status={product.status} />
        </div>

        <h3 className="text-xl font-semibold">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-4px]"
          >
            {product.name}
            <span className="sr-only"> — details</span>
          </Link>
        </h3>
        <p className="text-sm text-muted">{product.shortDescription}</p>

        {product.notice && (
          <p className="rounded-lg border border-line bg-white/[0.03] p-3 text-xs text-muted">
            {product.notice}
          </p>
        )}

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-3">
          {action.external ? (
            <a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cyan hover:text-ink"
            >
              {action.label}
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <Link
              href={action.href}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cyan hover:text-ink"
            >
              {action.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
