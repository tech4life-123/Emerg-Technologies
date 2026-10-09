/**
 * Generates the Emerg Technologies logo system.
 *
 *   node scripts/build-brand.mjs
 *
 * Output (all committed, so the site never needs this script at build time):
 *   - src/components/brand/brand-geometry.generated.ts   (used by <EmergLogo />)
 *   - public/brand/*.svg                                  (downloadable logo set)
 *   - src/app/icon.svg                                    (favicon)
 *
 * The wordmark is converted to outlined vector paths from the Space Grotesk
 * font so every SVG is self-contained and renders identically everywhere,
 * with no font dependency.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontFile = path.join(
  root,
  "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff",
);
const buf = readFileSync(fontFile);
const font = opentype.parse(
  buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
);
const upm = font.unitsPerEm;
const capHeightUnits = font.tables.os2?.sCapHeight ?? 700;

/* ------------------------------------------------------------------
   Symbol — a custom "E" built from a spine and three forward-leaning
   bars (layered digital pathways), each ending in a connected node.
   viewBox 0 0 64 64
------------------------------------------------------------------- */
const SYMBOL = {
  spine: "M10 8H21V56H10Z",
  bars: [
    { d: "M24 8H50L44.5 18H24Z", role: "top" },
    { d: "M24 27H40L34.5 37H24Z", role: "mid" },
    { d: "M24 46H50L44.5 56H24Z", role: "bottom" },
  ],
  nodes: [
    { cx: 54.5, cy: 13, r: 2.7 },
    { cx: 44.5, cy: 32, r: 2.7 },
    { cx: 54.5, cy: 51, r: 2.7 },
  ],
};

/* ------------------------------------------------------------------
   Wordmark — outlined paths. Both lines are normalised so their
   top edge sits at y = 0 and the left edge at x = 0.
------------------------------------------------------------------- */
const num = (n) => String(+n.toFixed(2));

/** Serialise glyph commands ourselves (opentype.js 2.x toPathData can emit NaN). */
function commandsToPath(commands) {
  return commands
    .map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${num(c.x)} ${num(c.y)}`;
        case "Q":
          return `Q${num(c.x1)} ${num(c.y1)} ${num(c.x)} ${num(c.y)}`;
        case "C":
          return `C${num(c.x1)} ${num(c.y1)} ${num(c.x2)} ${num(c.y2)} ${num(c.x)} ${num(c.y)}`;
        case "Z":
          return "Z";
        default:
          throw new Error(`Unexpected path command ${c.type}`);
      }
    })
    .join("");
}

function outline(text, fontSize, targetWidth) {
  const scale = fontSize / upm;
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  const advances = glyphs.map((g) => g.advanceWidth * scale);
  const natural = advances.reduce((a, b) => a + b, 0);
  const tracking =
    targetWidth !== undefined
      ? (targetWidth - natural) / (glyphs.length - 1)
      : fontSize * 0.04;
  const cap = (capHeightUnits / upm) * fontSize;
  let x = 0;
  let d = "";
  glyphs.forEach((g, i) => {
    d += commandsToPath(g.getPath(x, cap, fontSize).commands);
    x += advances[i] + tracking;
  });
  return { d, width: x - tracking, height: cap, tracking };
}

const emerg = outline("EMERG", 100);
const tech = outline("TECHNOLOGIES", 30, emerg.width);

const WORDMARK = {
  emerg: { d: emerg.d, width: +emerg.width.toFixed(2), height: +emerg.height.toFixed(2) },
  tech: { d: tech.d, width: +tech.width.toFixed(2), height: +tech.height.toFixed(2) },
  gap: 14, // vertical gap between the two lines at size 100
};

const blockH = WORDMARK.emerg.height + WORDMARK.gap + WORDMARK.tech.height;

/* ------------------------------------------------------------------
   Tones
------------------------------------------------------------------- */
const TONES = {
  dark: {
    // for dark backgrounds
    spine: ["#00D1FF", "#0A6CF0"],
    bars: ["#00E6B8", "#00D1FF"],
    node: "#E8F3FF",
    emerg: "#E8F3FF",
    tech: "#00E6B8",
  },
  light: {
    // for light backgrounds
    spine: ["#0B2A4A", "#081220"],
    bars: ["#00A889", "#0095C2"],
    node: "#081220",
    emerg: "#081220",
    tech: "#007A68",
  },
  white: {
    spine: ["#FFFFFF", "#FFFFFF"],
    bars: ["#FFFFFF", "#FFFFFF"],
    node: "#FFFFFF",
    emerg: "#FFFFFF",
    tech: "#FFFFFF",
  },
};

const f = (n) => +n.toFixed(2);

function defs(tone, id) {
  const t = TONES[tone];
  return `<defs>
    <linearGradient id="${id}-s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${t.spine[0]}"/><stop offset="1" stop-color="${t.spine[1]}"/>
    </linearGradient>
    <linearGradient id="${id}-b" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${t.bars[0]}"/><stop offset="1" stop-color="${t.bars[1]}"/>
    </linearGradient>
  </defs>`;
}

function symbolMarkup(tone, id) {
  const t = TONES[tone];
  return [
    `<path d="${SYMBOL.spine}" fill="url(#${id}-s)"/>`,
    ...SYMBOL.bars.map((b) => `<path d="${b.d}" fill="url(#${id}-b)"/>`),
    ...SYMBOL.nodes.map(
      (n) => `<circle cx="${n.cx}" cy="${n.cy}" r="${n.r}" fill="${t.node}"/>`,
    ),
  ].join("\n    ");
}

function textMarkup(tone, scale) {
  const t = TONES[tone];
  const s = scale / 100;
  const techY = WORDMARK.emerg.height + WORDMARK.gap;
  return `<g transform="scale(${f(s * 100) / 100})">
      <path d="${WORDMARK.emerg.d}" fill="${t.emerg}"/>
      <g transform="translate(0 ${f(techY)})"><path d="${WORDMARK.tech.d}" fill="${t.tech}"/></g>
    </g>`;
}

function symbolOnly(tone, withBg = false) {
  const id = `e-${tone}`;
  const bg = withBg
    ? `<rect width="64" height="64" rx="14" fill="#081220"/><g transform="translate(6.4 6.4) scale(0.8)">`
    : "<g>";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Emerg Technologies symbol">
  ${defs(tone, id)}
  ${bg}
    ${symbolMarkup(tone, id)}
  </g>
</svg>
`;
}

function horizontal(tone) {
  const id = `h-${tone}`;
  const textScale = 38 / 100; // EMERG at 38px
  const textW = WORDMARK.emerg.width * textScale;
  const textH = blockH * textScale;
  const gap = 14;
  const W = f(64 + gap + textW);
  const ty = f((64 - textH) / 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 64" role="img" aria-label="Emerg Technologies">
  ${defs(tone, id)}
  <g>
    ${symbolMarkup(tone, id)}
  </g>
  <g transform="translate(${64 + gap} ${ty})">
    ${textMarkup(tone, 38)}
  </g>
</svg>
`;
}

function stacked(tone) {
  const id = `p-${tone}`;
  const emergPx = 64;
  const textScale = emergPx / 100;
  const textW = WORDMARK.emerg.width * textScale;
  const textH = blockH * textScale;
  const symbol = 96;
  const symScale = symbol / 64;
  const W = f(Math.max(textW, symbol) + 20);
  const H = f(symbol + 22 + textH);
  const sx = f((W - symbol) / 2);
  const tx = f((W - textW) / 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Emerg Technologies">
  ${defs(tone, id)}
  <g transform="translate(${sx} 0) scale(${f(symScale)})">
    ${symbolMarkup(tone, id)}
  </g>
  <g transform="translate(${tx} ${symbol + 22})">
    ${textMarkup(tone, emergPx)}
  </g>
</svg>
`;
}

/* ------------------------------------------------------------------
   Write files
------------------------------------------------------------------- */
const outDir = path.join(root, "public/brand");
mkdirSync(outDir, { recursive: true });

const files = {
  "emerg-logo-primary.svg": stacked("dark"),
  "emerg-logo-horizontal.svg": horizontal("dark"),
  "emerg-logo-on-light.svg": horizontal("light"),
  "emerg-logo-primary-on-light.svg": stacked("light"),
  "emerg-logo-white.svg": horizontal("white"),
  "emerg-symbol.svg": symbolOnly("dark"),
  "emerg-symbol-on-light.svg": symbolOnly("light"),
  "emerg-symbol-white.svg": symbolOnly("white"),
};
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(path.join(outDir, name), svg);
}
writeFileSync(path.join(root, "src/app/icon.svg"), symbolOnly("dark", true));

const ts = `/* AUTO-GENERATED by scripts/build-brand.mjs — do not edit by hand. */

export const SYMBOL = ${JSON.stringify(SYMBOL, null, 2)} as const;

export const WORDMARK = ${JSON.stringify(WORDMARK, null, 2)} as const;

/** Height of the two-line wordmark block at font-size 100. */
export const WORDMARK_BLOCK_HEIGHT = ${f(blockH)};

export const TONES = ${JSON.stringify(TONES, null, 2)} as const;
`;
writeFileSync(path.join(root, "src/components/brand/brand-geometry.generated.ts"), ts, {
  flag: "w",
});

console.log(
  `Brand assets written. EMERG width@100=${WORDMARK.emerg.width}, TECH tracking=${tech.tracking.toFixed(2)}`,
);
