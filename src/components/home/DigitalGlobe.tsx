"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlobeStatic } from "./GlobeStatic";

// Loaded after hydration so the canvas code never delays first paint.
const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });

/**
 * The hero centerpiece: a connected globe centred on Africa.
 * Layer 1 (always present, server-rendered): a static SVG globe.
 * Layer 2 (progressive): a Canvas 2D globe that fades in and takes over.
 */
export function DigitalGlobe({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);
  const [mount, setMount] = useState(false);

  // Start the canvas only once the page is idle, so it never competes with
  // loading text, fonts and scripts. The SVG globe is visible meanwhile.
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) setMount(true);
    };
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const kick = () => {
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timer = setTimeout(start, 800);
      }
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", kick);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="A globe centred on Africa, with connection lines radiating from Liberia to cities across Africa and the world."
      className={cn("relative aspect-square w-full select-none", className)}
    >
      <GlobeStatic
        className={cn(
          "absolute inset-0 size-full transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      {mount && <GlobeCanvas onReady={() => setReady(true)} />}
    </div>
  );
}
