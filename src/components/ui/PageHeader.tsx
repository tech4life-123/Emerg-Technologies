import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Consistent top-of-page block for inner pages. Renders the page's only h1. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-x pb-6 pt-14 sm:pt-20">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
      {children}
    </header>
  );
}
