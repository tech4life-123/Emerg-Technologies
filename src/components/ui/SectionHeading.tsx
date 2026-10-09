import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Heading level. Use "h1" only once per page. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  className,
  id,
}: Props) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <Tag id={id} className="mt-3 text-[clamp(1.9rem,4.6vw,3.2rem)] font-semibold">
        {title}
      </Tag>
      {description && <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
