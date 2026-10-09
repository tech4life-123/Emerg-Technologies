"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  items: NavItem[];
  pathname: string;
  onClose: () => void;
  /** Id of the button that opened the menu, so focus can return to it. */
  triggerId: string;
};

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Full-width dropdown below the header. Escape closes it, Tab is kept inside it,
 * the page behind does not scroll, and focus returns to the menu button.
 */
export function MobileNavigation({ open, items, pathname, onClose, triggerId }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    const trigger = document.getElementById(triggerId);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        trigger?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep Tab cycling through the button and the menu links only.
      const list = [trigger, ...focusables()].filter(Boolean) as HTMLElement[];
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, triggerId]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Site navigation"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-deep/95 px-5 pb-8 pt-3 shadow-card backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center justify-between font-display text-xl font-medium",
                        active ? "text-cyan" : "text-ink",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="text-xs uppercase tracking-widest text-muted">
                          Current page
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link href="/contact" onClick={onClose} className="btn btn-primary mt-6 w-full">
            Start a Project <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </m.div>
      )}
    </AnimatePresence>
  );
}
