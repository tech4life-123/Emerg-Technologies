import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { productCategories, products } from "@/data/products";

export function ProductShowcase() {
  return (
    <section id="products" aria-labelledby="products-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="products-title"
            eyebrow="Our products"
            title="Innovative Solutions for Real-World Problems."
            description="Each project below is labelled with its true status, so you can tell a live application from a prototype or a concept."
          />
          <Reveal>
            <Link href="/products" className="btn btn-ghost">
              View all products <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} categories={productCategories} showFilters={false} />
        </div>
      </div>
    </section>
  );
}
