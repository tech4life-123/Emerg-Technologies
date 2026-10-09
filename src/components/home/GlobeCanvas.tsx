"use client";

import { useEffect, useRef } from "react";
import { CITIES, HUB, isLand } from "@/lib/globe-data";
import { arcPoint, toVec, view, type Vec3 } from "@/lib/globe-math";
import { START_LAT, START_LON } from "./GlobeStatic";

/**
 * Canvas 2D globe. No WebGL and no 3D model: dots, arcs and a handful of
 * gradients, drawn only while visible. The server-rendered SVG underneath is
 * the fallback if this never starts.
 */

type Props = { onReady?: () => void };

const TAU = Math.PI * 2;

function buildLand(step: number): Vec3[] {
  const out: Vec3[] = [];
  for (let lat = -36; lat <= 38; lat += step) {
    const lonStep = step / Math.max(Math.cos((lat * Math.PI) / 180), 0.35);
    for (let lon = -19; lon <= 53; lon += lonStep) {
      if (isLand(lon, lat)) out.push(toVec(lon, lat));
    }
  }
  return out;
}

function buildOcean(count: number): Vec3[] {
  const out: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const θ = golden * i;
    const v = { x: Math.cos(θ) * r, y, z: Math.sin(θ) * r };
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(v.x, v.z) * 180) / Math.PI;
    if (!isLand(lon, lat)) out.push(v);
  }
  return out;
}

export default function GlobeCanvas({ onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(onReady);
  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return; // fallback SVG stays visible

    const lowPower =
      window.innerWidth < 640 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const land = buildLand(lowPower ? 2.1 : 1.55);
    const ocean = buildOcean(lowPower ? 420 : 820);

    const hub = toVec(HUB.lon, HUB.lat);
    const others = CITIES.filter((c) => c.kind !== "hub").map((c) => ({
      city: c,
      vec: toVec(c.lon, c.lat),
    }));
    const cityVecs = CITIES.map((c) => ({ city: c, vec: toVec(c.lon, c.lat) }));

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = reduceQuery.matches;

    let size = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let inView = true;
    let lastPaint = 0;
    let announced = false;

    // pointer parallax (fine pointers only)
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    function resize() {
      const rect = host!.getBoundingClientRect();
      const next = Math.max(1, Math.round(rect.width));
      if (next === size && canvas!.width > 0) return;
      size = next;
      dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);
      canvas!.width = Math.round(size * dpr);
      canvas!.height = Math.round(size * dpr);
      canvas!.style.width = `${size}px`;
      canvas!.style.height = `${size}px`;
    }

    function draw(time: number) {
      const c = ctx!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, size, size);

      const mid = size / 2;
      const R = size * 0.44;
      const sway = reduce ? 0 : Math.sin(time * 0.11) * 36;
      const lon0 = START_LON + sway + cx * 10;
      const lat0 = START_LAT + cy * -7;

      // --- orbits, back half ---------------------------------------
      const orbits = [
        { rx: R * 1.3, ry: R * 0.3, rot: -0.38, speed: 0.22, phase: 0.6 },
        { rx: R * 1.16, ry: R * 0.44, rot: 0.52, speed: -0.15, phase: 2.4 },
      ];
      c.lineWidth = 1;
      for (const o of orbits) {
        c.strokeStyle = "rgba(0,209,255,0.16)";
        c.beginPath();
        c.ellipse(mid, mid, o.rx, o.ry, o.rot, Math.PI, TAU);
        c.stroke();
      }
      const sats = orbits.map((o) => {
        const a = (reduce ? 0 : time * o.speed) + o.phase;
        const ex = Math.cos(a) * o.rx;
        const ey = Math.sin(a) * o.ry;
        const x = mid + ex * Math.cos(o.rot) - ey * Math.sin(o.rot);
        const y = mid + ex * Math.sin(o.rot) + ey * Math.cos(o.rot);
        return { x, y, front: Math.sin(a) > 0 };
      });
      for (const s of sats) {
        if (s.front) continue;
        c.fillStyle = "rgba(0,230,184,0.7)";
        c.beginPath();
        c.arc(s.x, s.y, 2.2, 0, TAU);
        c.fill();
      }

      // --- atmosphere + body ---------------------------------------
      const halo = c.createRadialGradient(mid, mid, R * 0.92, mid, mid, R * 1.2);
      halo.addColorStop(0, "rgba(0,209,255,0.28)");
      halo.addColorStop(1, "rgba(0,209,255,0)");
      c.fillStyle = halo;
      c.beginPath();
      c.arc(mid, mid, R * 1.2, 0, TAU);
      c.fill();

      const body = c.createRadialGradient(mid - R * 0.3, mid - R * 0.34, R * 0.1, mid, mid, R);
      body.addColorStop(0, "#14375f");
      body.addColorStop(0.6, "#0a1c34");
      body.addColorStop(1, "#040b17");
      c.fillStyle = body;
      c.beginPath();
      c.arc(mid, mid, R, 0, TAU);
      c.fill();
      c.strokeStyle = "rgba(0,209,255,0.38)";
      c.stroke();

      // --- dots ------------------------------------------------------
      // Bucket by depth so each bucket is a single path + fill.
      const BUCKETS = 4;
      const paint = (pts: Vec3[], radius: number, alphaBase: number, alphaGain: number, rgb: string) => {
        const paths: number[][] = Array.from({ length: BUCKETS }, () => []);
        for (const p of pts) {
          const v = view(p, lon0, lat0);
          if (v.z <= 0.02) continue;
          const b = Math.min(BUCKETS - 1, Math.floor(v.z * BUCKETS));
          paths[b].push(mid + v.x * R, mid - v.y * R);
        }
        for (let b = 0; b < BUCKETS; b++) {
          const arr = paths[b];
          if (arr.length === 0) continue;
          const z = (b + 0.5) / BUCKETS;
          c.fillStyle = `rgba(${rgb},${(alphaBase + alphaGain * z).toFixed(3)})`;
          c.beginPath();
          for (let i = 0; i < arr.length; i += 2) {
            c.moveTo(arr[i] + radius, arr[i + 1]);
            c.arc(arr[i], arr[i + 1], radius, 0, TAU);
          }
          c.fill();
        }
      };
      paint(ocean, size * 0.0017, 0.04, 0.2, "120,170,220");
      paint(land, size * 0.0032, 0.28, 0.72, "0,230,184");

      // --- connections from the hub ----------------------------------
      c.lineWidth = 1;
      others.forEach(({ vec }, i) => {
        const SEG = 26;
        let started = false;
        c.strokeStyle = "rgba(0,209,255,0.5)";
        c.beginPath();
        for (let s = 0; s <= SEG; s++) {
          const v = view(arcPoint(hub, vec, s / SEG, 0.17), lon0, lat0);
          if (v.z <= 0) {
            started = false;
            continue;
          }
          const x = mid + v.x * R;
          const y = mid - v.y * R;
          if (started) c.lineTo(x, y);
          else c.moveTo(x, y);
          started = true;
        }
        c.stroke();

        if (!reduce) {
          const f = (time * 0.16 + i * 0.137) % 1;
          const v = view(arcPoint(hub, vec, f, 0.17), lon0, lat0);
          if (v.z > 0) {
            const x = mid + v.x * R;
            const y = mid - v.y * R;
            const g = c.createRadialGradient(x, y, 0, x, y, 7);
            g.addColorStop(0, "rgba(232,243,255,0.95)");
            g.addColorStop(1, "rgba(0,209,255,0)");
            c.fillStyle = g;
            c.beginPath();
            c.arc(x, y, 7, 0, TAU);
            c.fill();
          }
        }
      });

      // --- city nodes -------------------------------------------------
      cityVecs.forEach(({ city, vec }, i) => {
        const v = view(vec, lon0, lat0);
        if (v.z <= 0.04) return;
        const x = mid + v.x * R;
        const y = mid - v.y * R;
        const isHub = city.kind === "hub";
        const r = (isHub ? 4.2 : 2.3) * (size / 480 + 0.55);
        if (!reduce) {
          const ph = (time * 0.5 + i * 0.29) % 1;
          c.strokeStyle = `rgba(0,209,255,${(0.5 * (1 - ph)).toFixed(3)})`;
          c.beginPath();
          c.arc(x, y, r + ph * (isHub ? 16 : 9), 0, TAU);
          c.stroke();
        }
        c.fillStyle = isHub ? "#e8f3ff" : "#00d1ff";
        c.beginPath();
        c.arc(x, y, r, 0, TAU);
        c.fill();
      });

      // --- orbits, front half ----------------------------------------
      for (const o of orbits) {
        c.strokeStyle = "rgba(0,209,255,0.3)";
        c.beginPath();
        c.ellipse(mid, mid, o.rx, o.ry, o.rot, 0, Math.PI);
        c.stroke();
      }
      for (const s of sats) {
        if (!s.front) continue;
        c.fillStyle = "#00e6b8";
        c.beginPath();
        c.arc(s.x, s.y, 2.6, 0, TAU);
        c.fill();
      }
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const minGap = lowPower ? 1000 / 30 : 1000 / 60;
      if (now - lastPaint < minGap) return;
      lastPaint = now;
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      draw(now / 1000);
    }

    function sync() {
      const shouldRun = !reduce && inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
      if (!shouldRun) draw(0); // keep one correct still frame
    }

    function announce() {
      if (announced) return;
      announced = true;
      readyRef.current?.();
    }

    resize();
    draw(0);
    requestAnimationFrame(announce);
    sync();

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(0);
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(host);

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);

    const onReduce = () => {
      reduce = reduceQuery.matches;
      sync();
    };
    reduceQuery.addEventListener("change", onReduce);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduce) return;
      const rect = host.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceQuery.removeEventListener("change", onReduce);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 m-auto block" aria-hidden="true" />;
}
