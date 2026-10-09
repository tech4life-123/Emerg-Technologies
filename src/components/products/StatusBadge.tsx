import { CircleCheck, FlaskConical, Hammer, Lightbulb, Rocket, type LucideIcon } from "lucide-react";
import { statusMeta } from "@/data/products";
import type { ProductStatus } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<ProductStatus, { icon: LucideIcon; cls: string }> = {
  live: { icon: CircleCheck, cls: "border-teal/50 bg-teal/10 text-teal" },
  "early-access": { icon: Rocket, cls: "border-cyan/50 bg-cyan/10 text-cyan" },
  prototype: { icon: FlaskConical, cls: "border-[#ffd166]/50 bg-[#ffd166]/10 text-[#ffd166]" },
  "in-development": { icon: Hammer, cls: "border-[#ffa94d]/50 bg-[#ffa94d]/10 text-[#ffa94d]" },
  concept: { icon: Lightbulb, cls: "border-[#a78bfa]/50 bg-[#a78bfa]/10 text-[#c4b5fd]" },
};

/** Status is always icon + text, never colour alone. */
export function StatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  const { icon: Icon, cls } = styles[status];
  const meta = statusMeta[status];
  return (
    <span
      title={meta.description}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider",
        cls,
        className,
      )}
    >
      <Icon size={13} aria-hidden="true" />
      {meta.label}
    </span>
  );
}
