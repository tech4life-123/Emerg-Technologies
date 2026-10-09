"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-x grid min-h-[60vh] place-content-center gap-5 py-24 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="text-[clamp(2rem,6vw,3.2rem)] font-bold">We hit a problem loading this page.</h1>
      <p className="mx-auto max-w-md text-muted">Please try again. If it keeps happening, let us know.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/contact" className="btn btn-ghost">
          Contact us
        </Link>
      </div>
    </section>
  );
}
