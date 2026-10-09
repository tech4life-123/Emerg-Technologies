import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60vh] place-content-center gap-5 py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="text-[clamp(2rem,6vw,3.6rem)] font-bold">This page could not be found.</h1>
      <p className="mx-auto max-w-md text-muted">
        The link may be out of date, or the page may have moved. Try one of these instead.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back to home <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link href="/products" className="btn btn-ghost">
          Browse products
        </Link>
      </div>
    </section>
  );
}
