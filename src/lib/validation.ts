import { budgetRanges } from "@/data/company";
import { services } from "@/data/services";

/** Options for the "service of interest" field. */
export const serviceOptions: string[] = [
  ...services.map((s) => s.title),
  "Request a product demonstration",
  "Something else / not sure yet",
];

export interface InquiryInput {
  name: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
}

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

export type ValidationResult =
  | { ok: true; data: InquiryInput }
  | { ok: false; errors: FieldErrors };

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE = /^\+?[\d\s\-().]{7,24}$/;
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const LIMITS = {
  name: { min: 2, max: 100 },
  organization: { min: 2, max: 120 },
  email: { max: 254 },
  message: { min: 20, max: 4000 },
} as const;

function str(value: unknown): string {
  return typeof value === "string" ? value.replace(CONTROL, "").trim() : "";
}

/** Single-line fields must not contain line breaks (prevents header injection). */
const hasLineBreak = (s: string) => /[\r\n]/.test(s);

/**
 * Validates an enquiry. Used by the browser (instant feedback) and again on
 * the server (the only check that is actually trusted).
 */
export function validateInquiry(raw: unknown): ValidationResult {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;

  const data: InquiryInput = {
    name: str(input.name),
    organization: str(input.organization),
    email: str(input.email),
    phone: str(input.phone),
    service: str(input.service),
    budget: str(input.budget),
    message: str(input.message),
    consent: input.consent === true,
  };

  const errors: FieldErrors = {};

  if (data.name.length < LIMITS.name.min) {
    errors.name = "Please enter your full name.";
  } else if (data.name.length > LIMITS.name.max || hasLineBreak(data.name)) {
    errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;
  }

  if (data.organization.length < LIMITS.organization.min) {
    errors.organization =
      "Please enter your organization. If you are an individual, write “Independent”.";
  } else if (
    data.organization.length > LIMITS.organization.max ||
    hasLineBreak(data.organization)
  ) {
    errors.organization = `Organization must be ${LIMITS.organization.max} characters or fewer.`;
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (
    data.email.length > LIMITS.email.max ||
    hasLineBreak(data.email) ||
    !EMAIL.test(data.email)
  ) {
    errors.email = "That doesn’t look like a valid email address.";
  }

  if (data.phone && !PHONE.test(data.phone)) {
    errors.phone = "Use digits, spaces and + - ( ) only, or leave this blank.";
  }

  if (!serviceOptions.includes(data.service)) {
    errors.service = "Please choose a service.";
  }

  if (data.budget && !(budgetRanges as readonly string[]).includes(data.budget)) {
    errors.budget = "Please choose one of the listed ranges, or leave it blank.";
  }

  if (data.message.length < LIMITS.message.min) {
    errors.message = `Please describe your project in at least ${LIMITS.message.min} characters.`;
  } else if (data.message.length > LIMITS.message.max) {
    errors.message = `Please keep this under ${LIMITS.message.max} characters.`;
  }

  if (!data.consent) {
    errors.consent = "Please agree to be contacted so we can reply.";
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}
