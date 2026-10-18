import type { InquiryInput } from "@/lib/validation";

/** WhatsApp accepts roughly 4,000 characters per message; stay safely below. */
const MAX_TEXT = 3500;

/** Plain-text enquiry, formatted so it reads well inside WhatsApp. */
export function buildWhatsAppText(d: InquiryInput): string {
  const lines = [
    "*New enquiry from the Emerg Technologies website*",
    "",
    `*Name:* ${d.name}`,
    `*Organization:* ${d.organization}`,
    `*Email:* ${d.email}`,
  ];
  if (d.phone) lines.push(`*Phone:* ${d.phone}`);
  lines.push(`*Service:* ${d.service}`);
  if (d.budget) lines.push(`*Budget:* ${d.budget}`);
  lines.push("", "*Message:*", d.message);
  const text = lines.join("\n");
  return text.length > MAX_TEXT ? `${text.slice(0, MAX_TEXT - 1)}…` : text;
}

/** `wa` is the international number, digits only (no + or spaces). */
export function whatsappUrl(wa: string, text: string): string {
  return `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
}
