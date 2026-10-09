import { useId } from "react";
import {
  SYMBOL,
  TONES,
  WORDMARK,
  WORDMARK_BLOCK_HEIGHT,
} from "./brand-geometry.generated";

export type LogoTone = keyof typeof TONES; // "dark" | "light" | "white"

type MarkProps = {
  tone?: LogoTone;
  className?: string;
  /** Pulse the three connection nodes (CSS only, disabled for reduced motion). */
  pulse?: boolean;
  title?: string;
};

function gradientIds(base: string) {
  const safe = base.replace(/[^a-zA-Z0-9]/g, "");
  return { spine: `${safe}s`, bar: `${safe}b` };
}

function Defs({ tone, ids }: { tone: LogoTone; ids: { spine: string; bar: string } }) {
  const t = TONES[tone];
  return (
    <defs>
      <linearGradient id={ids.spine} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={t.spine[0]} />
        <stop offset="1" stopColor={t.spine[1]} />
      </linearGradient>
      <linearGradient id={ids.bar} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={t.bars[0]} />
        <stop offset="1" stopColor={t.bars[1]} />
      </linearGradient>
    </defs>
  );
}

function SymbolShapes({
  tone,
  ids,
  pulse,
}: {
  tone: LogoTone;
  ids: { spine: string; bar: string };
  pulse?: boolean;
}) {
  const t = TONES[tone];
  return (
    <>
      <path d={SYMBOL.spine} fill={`url(#${ids.spine})`} />
      {SYMBOL.bars.map((b) => (
        <path key={b.role} d={b.d} fill={`url(#${ids.bar})`} />
      ))}
      {SYMBOL.nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={t.node}
          className={pulse ? "pulse-node" : undefined}
          style={pulse ? { animationDelay: `${i * 0.5}s` } : undefined}
        />
      ))}
    </>
  );
}

/** The standalone Emerg symbol (compact mark, favicon-shaped). */
export function EmergMark({ tone = "dark", className, pulse, title }: MarkProps) {
  const ids = gradientIds(useId());
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <Defs tone={tone} ids={ids} />
      <SymbolShapes tone={tone} ids={ids} pulse={pulse} />
    </svg>
  );
}

type LogoProps = {
  tone?: LogoTone;
  /** "horizontal" for the header; "stacked" for the primary lockup. */
  layout?: "horizontal" | "stacked";
  className?: string;
  pulse?: boolean;
  /** Provide for standalone use; omit when the logo sits inside a labelled link. */
  title?: string;
};

function Wordmark({ tone, scale }: { tone: LogoTone; scale: number }) {
  const t = TONES[tone];
  const techY = WORDMARK.emerg.height + WORDMARK.gap;
  return (
    <g transform={`scale(${scale})`}>
      <path d={WORDMARK.emerg.d} fill={t.emerg} />
      <g transform={`translate(0 ${techY})`}>
        <path d={WORDMARK.tech.d} fill={t.tech} />
      </g>
    </g>
  );
}

/** Symbol + EMERG TECHNOLOGIES wordmark, as outlined vector paths. */
export function EmergLogo({
  tone = "dark",
  layout = "horizontal",
  className,
  pulse,
  title,
}: LogoProps) {
  const ids = gradientIds(useId());
  const a11y = {
    role: title ? ("img" as const) : undefined,
    "aria-label": title,
    "aria-hidden": title ? undefined : (true as const),
    focusable: "false" as const,
  };

  if (layout === "horizontal") {
    const textScale = 0.38;
    const textW = WORDMARK.emerg.width * textScale;
    const textH = WORDMARK_BLOCK_HEIGHT * textScale;
    const gap = 14;
    const width = 64 + gap + textW;
    return (
      <svg viewBox={`0 0 ${width.toFixed(2)} 64`} className={className} {...a11y}>
        <Defs tone={tone} ids={ids} />
        <SymbolShapes tone={tone} ids={ids} pulse={pulse} />
        <g transform={`translate(${64 + gap} ${((64 - textH) / 2).toFixed(2)})`}>
          <Wordmark tone={tone} scale={textScale} />
        </g>
      </svg>
    );
  }

  const textScale = 0.64;
  const textW = WORDMARK.emerg.width * textScale;
  const textH = WORDMARK_BLOCK_HEIGHT * textScale;
  const symbol = 96;
  const width = Math.max(textW, symbol) + 20;
  const height = symbol + 22 + textH;
  return (
    <svg viewBox={`0 0 ${width.toFixed(2)} ${height.toFixed(2)}`} className={className} {...a11y}>
      <Defs tone={tone} ids={ids} />
      <g transform={`translate(${((width - symbol) / 2).toFixed(2)} 0) scale(${symbol / 64})`}>
        <SymbolShapes tone={tone} ids={ids} pulse={pulse} />
      </g>
      <g transform={`translate(${((width - textW) / 2).toFixed(2)} ${symbol + 22})`}>
        <Wordmark tone={tone} scale={textScale} />
      </g>
    </svg>
  );
}
