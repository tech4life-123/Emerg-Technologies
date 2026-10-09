import type { ReactNode } from "react";
import { legalUpdated } from "@/data/company";
import { PageHeader } from "@/components/ui/PageHeader";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} description={intro} />
      <div className="container-x pb-20">
        <div className="max-w-3xl space-y-8 text-ink/90 [&_a]:text-cyan [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p]:text-muted [&_ul]:space-y-1.5 [&_ul]:text-muted">
          {children}
          <p className="border-t border-line pt-6 text-sm">Last updated: {legalUpdated}</p>
        </div>
      </div>
    </>
  );
}
