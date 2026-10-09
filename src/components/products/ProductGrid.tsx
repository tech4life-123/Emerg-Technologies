"use client";

import { m } from "motion/react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters, type CategoryFilter } from "@/components/products/ProductFilters";
import type { Product } from "@/types";

type Props = {
  products: Product[];
  categories: string[];
  /** Hide the filter bar (used for the compact homepage showcase). */
  showFilters?: boolean;
};

export function ProductGrid({ products, categories, showFilters = true }: Props) {
  const [active, setActive] = useState<CategoryFilter>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: products.length };
    for (const p of products) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [products]);

  const visible = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      {showFilters && (
        <ProductFilters categories={categories} active={active} counts={counts} onChange={setActive} />
      )}

      {/* Announced politely whenever the filter changes */}
      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} of {products.length} products
        {active === "All" ? "" : ` in ${active}`}.
      </p>

      <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-8" : ""}`}>
        {visible.map((p) => (
          <m.li
            key={p.slug}
            data-reveal
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={p} />
          </m.li>
        ))}
      </ul>
    </div>
  );
}
