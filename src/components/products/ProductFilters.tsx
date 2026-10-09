"use client";

import { cn } from "@/lib/utils";

export type CategoryFilter = "All" | string;

type Props = {
  categories: string[];
  active: CategoryFilter;
  counts: Record<string, number>;
  onChange: (value: CategoryFilter) => void;
};

/** Toggle buttons (aria-pressed), usable by keyboard and screen readers. */
export function ProductFilters({ categories, active, counts, onChange }: Props) {
  const all = ["All", ...categories];
  return (
    <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2">
      {all.map((c) => {
        const pressed = active === c;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(c)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
              pressed
                ? "border-cyan bg-cyan/15 text-ink"
                : "border-line-strong text-muted hover:border-cyan/60 hover:text-ink",
            )}
          >
            {c}
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs tabular-nums">
              {counts[c] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
