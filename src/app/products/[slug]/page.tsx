import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { ContactCTA } from "@/components/home/ContactCTA";
import { productAction } from "@/components/products/ProductCard";
import { StatusBadge } from "@/components/products/StatusBadge";
import { Icon } from "@/components/ui/Icon";
import { products, getProduct, statusMeta } from "@/data/products";
import { canonicalFor } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name}: ${product.shortDescription} Status: ${statusMeta[product.status].label}.`,
    alternates: canonicalFor(`/products/${product.slug}`),
    openGraph: {
      title: `${product.name} | Emerg Technologies`,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const action = productAction(product);
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <article className="container-x pb-10 pt-12 sm:pt-16">
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" /> All products
        </Link>

        <header className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
          <span
            aria-hidden="true"
            className="grid size-20 shrink-0 place-items-center rounded-3xl border"
            style={{
              borderColor: `${product.accent}66`,
              background: `${product.accent}1f`,
              color: product.accent,
            }}
          >
            <Icon name={product.icon} size={38} />
          </span>
          <div>
            <p className="eyebrow !text-muted">{product.category}</p>
            <h1 className="mt-2 text-[clamp(2rem,5vw,3.4rem)] font-bold">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StatusBadge status={product.status} />
              <span className="text-sm text-muted">{statusMeta[product.status].description}</span>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base text-ink/90 sm:text-lg">
            {product.longDescription.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {product.notice && (
              <p
                role="note"
                className="flex gap-3 rounded-xl border border-line-strong bg-white/[0.03] p-4 text-sm text-muted"
              >
                <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan" />
                <span>{product.notice}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {action.external ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {action.label} <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <Link href={action.href} className="btn btn-primary">
                  {action.label} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              )}
              <Link href={`/contact?interest=${product.slug}`} className="btn btn-ghost">
                Ask about {product.name}
              </Link>
            </div>
            {action.external && product.verifiedOn && (
              <p className="text-xs text-muted">
                Link checked on {product.verifiedOn}. External sites can change after that date.
              </p>
            )}
          </div>

          {product.features && (
            <aside aria-labelledby="features-title" className="card h-fit p-6">
              <h2 id="features-title" className="text-lg font-semibold">
                At a glance
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <section aria-labelledby="more-title" className="mt-16">
          <h2 id="more-title" className="text-2xl font-semibold">
            More from Emerg
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="card card-hover flex h-full flex-col gap-2 p-5"
                >
                  <span className="font-display text-lg font-semibold">{p.name}</span>
                  <span className="text-sm text-muted">{p.shortDescription}</span>
                  <StatusBadge status={p.status} className="mt-auto w-fit" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <ContactCTA />
    </>
  );
}
