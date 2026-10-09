import { AFRICA, CITIES, HUB, MADAGASCAR, type LonLat } from "@/lib/globe-data";
import { arcPoint, toVec, view } from "@/lib/globe-math";

/** Initial view shared with the canvas so the hand-off is seamless. */
export const START_LON = 14;
export const START_LAT = 7;

const SIZE = 400;
const C = SIZE / 2;
const R = 176;

function toScreen(lon: number, lat: number) {
  const v = view(toVec(lon, lat), START_LON, START_LAT);
  return { x: C + v.x * R, y: C - v.y * R, z: v.z };
}

function polyPath(poly: LonLat[]) {
  return (
    poly
      .map(([lon, lat], i) => {
        const p = toScreen(lon, lat);
        return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join("") + "Z"
  );
}

function arcPathFromHub(to: { lat: number; lon: number }) {
  const a = toVec(HUB.lon, HUB.lat);
  const b = toVec(to.lon, to.lat);
  let d = "";
  let drawing = false;
  for (let i = 0; i <= 24; i++) {
    const p = view(arcPoint(a, b, i / 24, 0.16), START_LON, START_LAT);
    if (p.z <= 0) {
      drawing = false;
      continue;
    }
    d += `${drawing ? "L" : "M"}${(C + p.x * R).toFixed(1)} ${(C - p.y * R).toFixed(1)}`;
    drawing = true;
  }
  return d;
}

const landPath = `${polyPath(AFRICA)}${polyPath(MADAGASCAR)}`;
const visibleCities = CITIES.map((c) => ({ ...c, ...toScreen(c.lon, c.lat) })).filter(
  (c) => c.z > 0.05,
);
const arcs = CITIES.filter((c) => c.kind !== "hub")
  .map((c) => arcPathFromHub(c))
  .filter(Boolean);

/**
 * Server-rendered globe. This is what visitors see before (or without)
 * JavaScript, and what remains on devices where the canvas cannot start.
 */
export function GlobeStatic({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="gs-body" cx="42%" cy="38%" r="75%">
          <stop offset="0" stopColor="#12335a" />
          <stop offset="0.6" stopColor="#0a1c34" />
          <stop offset="1" stopColor="#040b17" />
        </radialGradient>
        <radialGradient id="gs-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0.82" stopColor="#00d1ff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#00d1ff" stopOpacity="0" />
        </radialGradient>
        <pattern id="gs-dots" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.25" fill="#00e6b8" />
        </pattern>
        <clipPath id="gs-clip">
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>
      <circle cx={C} cy={C} r={R + 22} fill="url(#gs-halo)" />
      <circle cx={C} cy={C} r={R} fill="url(#gs-body)" stroke="#00d1ff" strokeOpacity="0.35" />
      <g clipPath="url(#gs-clip)">
        <path d={landPath} fill="url(#gs-dots)" opacity="0.95" />
        <path d={landPath} fill="none" stroke="#00e6b8" strokeOpacity="0.35" strokeWidth="0.8" />
        {arcs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#00d1ff" strokeOpacity="0.55" strokeWidth="1" />
        ))}
        {visibleCities.map((c) => (
          <circle
            key={c.name}
            cx={c.x}
            cy={c.y}
            r={c.kind === "hub" ? 4.5 : 2.4}
            fill={c.kind === "hub" ? "#e8f3ff" : "#00d1ff"}
          />
        ))}
      </g>
    </svg>
  );
}
