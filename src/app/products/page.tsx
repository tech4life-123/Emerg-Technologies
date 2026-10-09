import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { productCategories, products, statusMeta } from "@/data/products";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software and digital products from Emerg Technologies: education, commerce, mapping and consumer applications, each labelled live, prototype or concept.",
  alternates: canonicalFor("/products"),
  openGraph: { title: "Products | Emerg Technologies", url: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our products"
        title="Innovative Solutions for Real-World Problems."
        description="Browse everything we are building. Every project carries an honest status so you know what you can use today."
      />

      <section aria-label="Product portfolio" className="container-x pb-10">
        <ProductGrid products={products} categories={productCategories} />

        <aside aria-labelledby="status-key" className="card mt-12 p-6">
          <h2 id="status-key" className="text-lg font-semibold">
            What the status labels mean
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(statusMeta).map((s) => (
              <div key={s.label}>
                <dt className="font-display text-sm font-semibold text-ink">{s.label}</dt>
                <dd className="text-sm text-muted">{s.description}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <ContactCTA />
    </>
  );
}
