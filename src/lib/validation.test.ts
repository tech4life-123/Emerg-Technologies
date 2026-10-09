import { describe, expect, it } from "vitest";
import { validateInquiry } from "./validation";

const valid = {
  name: "Ama Kollie",
  organization: "Independent",
  email: "ama@example.com",
  phone: "+231 77 000 0000",
  service: "Custom Software Development",
  budget: "Not sure yet",
  message: "We need a simple system to track stock across two shops.",
  consent: true,
};

describe("validateInquiry", () => {
  it("accepts a complete, valid enquiry", () => {
    const r = validateInquiry(valid);
    expect(r.ok).toBe(true);
  });

  it("allows phone and budget to be blank", () => {
    const r = validateInquiry({ ...valid, phone: "", budget: "" });
    expect(r.ok).toBe(true);
  });

  it("rejects missing required fields with field-level messages", () => {
    const r = validateInquiry({});
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(Object.keys(r.errors).sort()).toEqual(
        ["consent", "email", "message", "name", "organization", "service"].sort(),
      );
    }
  });

  it("rejects malformed email addresses", () => {
    for (const email of ["nope", "a@b", "a b@c.com", "a@b.c", "<x>@y.com"]) {
      const r = validateInquiry({ ...valid, email });
      expect(r.ok, email).toBe(false);
    }
  });

  it("blocks line breaks in single-line fields (header injection)", () => {
    const r = validateInquiry({
      ...valid,
      email: "a@b.com\r\nBcc: victim@example.com",
    });
    expect(r.ok).toBe(false);
    const r2 = validateInquiry({ ...valid, name: "Ama\nBcc: x@y.com" });
    // control characters are stripped, so the injected line cannot survive as a break
    if (r2.ok) expect(r2.data.name).not.toMatch(/[\r\n]/);
  });

  it("requires consent to be exactly true", () => {
    const r = validateInquiry({ ...valid, consent: "true" });
    expect(r.ok).toBe(false);
  });

  it("rejects an unknown service or budget", () => {
    expect(validateInquiry({ ...valid, service: "Hacking" }).ok).toBe(false);
    expect(validateInquiry({ ...valid, budget: "$1" }).ok).toBe(false);
  });

  it("enforces message length limits", () => {
    expect(validateInquiry({ ...valid, message: "too short" }).ok).toBe(false);
    expect(validateInquiry({ ...valid, message: "x".repeat(4001) }).ok).toBe(
      false,
    );
  });
});
