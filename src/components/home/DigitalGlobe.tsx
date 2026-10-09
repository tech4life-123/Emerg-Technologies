"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
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
      <GlobeCanvas onReady={() => setReady(true)} />
    </div>
  );
}
