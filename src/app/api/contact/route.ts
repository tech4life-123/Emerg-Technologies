import { validateInquiry } from "@/lib/validation";

/**
 * POST /api/contact
 *
 * Delivers an enquiry by email through Resend (free tier is enough to start).
 * It NEVER reports success unless the provider accepted the message. If the
 * environment variables are missing it answers 503 "not_configured" so the
 * form can say so honestly instead of pretending.
 *
 * Required env (server only):
 *   RESEND_API_KEY      API key from resend.com
 *   CONTACT_TO_EMAIL    where enquiries are delivered
 * Optional:
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Emerg Technologies <hello@your-domain>"
 */

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 1_500; // humans need a moment to fill this in
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance rate limit. On serverless this limits bursts from
// one instance, not globally; use a shared store (e.g. Upstash) if abuse appears.
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
  }
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  // Same-origin only.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      /* fall through to rejection */
    }
    if (originHost !== host) return json({ error: "forbidden" }, 403);
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "bad_request", message: "We could not read that request." }, 400);
  }

  // Spam traps: a hidden field real people never fill, and an implausibly fast submit.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ error: "rejected", message: "This message could not be accepted." }, 400);
  }
  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS) {
    return json({ error: "too_fast", message: "That was very quick. Please check your details and try again." }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json(
      { error: "rate_limited", message: "Too many messages from your connection. Please try again later." },
      429,
      { "Retry-After": String(WINDOW_MS / 1000) },
    );
  }

  // The only validation that is trusted. The browser check is for convenience.
  const result = validateInquiry(body);
  if (!result.ok) return json({ error: "validation", errors: result.errors }, 400);
  const d = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return json(
      {
        error: "not_configured",
        message:
          "Email delivery has not been set up on this site yet, so your message was not sent.",
      },
      503,
    );
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Emerg Technologies <onboarding@resend.dev>";
  const text = [
    `New website enquiry`,
    ``,
    `Name:          ${d.name}`,
    `Organization:  ${d.organization}`,
    `Email:         ${d.email}`,
    `Phone:         ${d.phone || "(not provided)"}`,
    `Service:       ${d.service}`,
    `Budget:        ${d.budget || "(not provided)"}`,
    `Consent:       agreed to be contacted`,
    ``,
    `Message:`,
    d.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: `Website enquiry: ${d.service} — ${d.name}`.slice(0, 200),
        text, // plain text only: nothing the visitor typed is ever rendered as HTML
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      // Log the status only. Never log the visitor's details or the provider body.
      console.error(`[contact] provider rejected message (status ${res.status})`);
      return json(
        { error: "delivery_failed", message: "We could not deliver your message just now. Please try again shortly." },
        502,
      );
    }
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[contact] delivery error:", err instanceof Error ? err.name : "unknown");
    return json(
      { error: "delivery_failed", message: "We could not deliver your message just now. Please try again shortly." },
      502,
    );
  }
}
