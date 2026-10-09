"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { EmergLogo, EmergMark } from "@/components/brand/EmergLogo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { mainNav } from "@/data/company";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const MENU_BUTTON_ID = "mobile-menu-button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-deep/95"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="Emerg Technologies — home" className="shrink-0" onClick={close}>
          {/* Compact symbol on the smallest screens, full lockup from 400px up */}
          <EmergMark tone="dark" className="size-10 min-[400px]:hidden" />
          <EmergLogo tone="dark" className="hidden h-10 w-auto min-[400px]:block" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                      active ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan to-teal"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
            Start a Project <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <button
            id={MENU_BUTTON_ID}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-12 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileNavigation
        open={open}
        items={mainNav}
        pathname={pathname}
        onClose={close}
        triggerId={MENU_BUTTON_ID}
      />
    </header>
  );
}
