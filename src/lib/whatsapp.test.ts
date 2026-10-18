import { describe, expect, it } from "vitest";
import { buildWhatsAppText, whatsappUrl } from "./whatsapp";
import type { InquiryInput } from "./validation";

const base: InquiryInput = {
  name: "Jane Doe",
  organization: "Acme School",
  email: "jane@example.com",
  phone: "",
  service: "Education Management Systems",
  budget: "",
  message: "We need a school management system for 400 students.",
  consent: true,
};

describe("whatsapp helpers", () => {
  it("includes the key details and skips empty optional fields", () => {
    const t = buildWhatsAppText(base);
    expect(t).toContain("Jane Doe");
    expect(t).toContain("jane@example.com");
    expect(t).toContain("400 students");
    expect(t).not.toContain("Phone:");
    expect(t).not.toContain("Budget:");
  });

  it("includes phone and budget when given", () => {
    const t = buildWhatsAppText({ ...base, phone: "+231 77 000 0000", budget: "$1,000 – $5,000" });
    expect(t).toContain("+231 77 000 0000");
    expect(t).toContain("$1,000 – $5,000");
  });

  it("keeps very long messages under the limit", () => {
    const t = buildWhatsAppText({ ...base, message: "x".repeat(4000) });
    expect(t.length).toBeLessThanOrEqual(3500);
  });

  it("builds an encoded wa.me link", () => {
    const u = whatsappUrl("231778760759", "Hi & bye\nline");
    expect(u).toBe("https://wa.me/231778760759?text=Hi%20%26%20bye%0Aline");
  });
});
