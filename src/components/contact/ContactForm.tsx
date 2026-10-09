"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { budgetRanges, siteConfig } from "@/data/company";
import { getProduct } from "@/data/products";
import {
  LIMITS,
  serviceOptions,
  validateInquiry,
  type FieldErrors,
  type InquiryInput,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "not_configured" | "error";

const DEMO_SERVICE = "Request a product demonstration";

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-[#ff9db0]">
          <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

const inputClass =
  "block min-h-12 w-full rounded-xl border border-line-strong bg-midnight/70 px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-cyan aria-[invalid=true]:border-[#ff6b8a]";

export function ContactForm() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const params = useSearchParams();
  const interest = getProduct(params.get("interest") ?? "");

  const [values, setValues] = useState<InquiryInput>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    service: interest ? DEMO_SERVICE : "",
    budget: "",
    message: interest ? `I would like a demonstration of ${interest.name}. ` : "",
    consent: false,
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const id = (name: keyof InquiryInput) => `${uid}-${name}`;
  const set = <K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) => {
    if (!startedAt.current) startedAt.current = Date.now();
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const aria = (name: keyof InquiryInput, hasHint?: boolean) => ({
    id: id(name),
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name]
      ? `${id(name)}-error`
      : hasHint
        ? `${id(name)}-hint`
        : undefined,
  });

  function focusFirstError(errs: FieldErrors) {
    const first = (Object.keys(errs) as (keyof InquiryInput)[])[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`#${id(first)}`)?.focus();
  }

  const mailtoHref = siteConfig.contactEmail
    ? `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
        `Website enquiry: ${values.service || "General"}`,
      )}&body=${encodeURIComponent(
        `${values.message}\n\n— ${values.name}${values.organization ? `, ${values.organization}` : ""}${
          values.email ? ` (${values.email})` : ""
        }`,
      )}`
    : "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const check = validateInquiry(values);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      focusFirstError(check.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...check.data,
          website: honeypot,
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : 0,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        message?: string;
        errors?: FieldErrors;
      };

      if (res.ok && data.ok === true) {
        setStatus("sent");
        setValues((v) => ({ ...v, message: "", consent: false }));
      } else if (data.error === "validation" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
      } else if (data.error === "not_configured") {
        setStatus("not_configured");
        setServerMessage(data.message ?? "");
      } else {
        setStatus("error");
        setServerMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("We could not reach the server. Check your connection and try again.");
    }
    // Move attention to the result so keyboard and screen-reader users notice it.
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-5 p-5 sm:p-8">
      {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.name}>
          <input
            {...aria("name")}
            className={inputClass}
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={LIMITS.name.max}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Field>
        <Field id={id("organization")} label="Organization" error={errors.organization}>
          <input
            {...aria("organization")}
            className={inputClass}
            type="text"
            name="organization"
            autoComplete="organization"
            required
            maxLength={LIMITS.organization.max}
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
          />
        </Field>
        <Field id={id("email")} label="Email address" error={errors.email}>
          <input
            {...aria("email")}
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email.max}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field
          id={id("phone")}
          label="Phone number"
          optional
          hint="Include the country code if outside Liberia."
          error={errors.phone}
        >
          <input
            {...aria("phone", true)}
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            maxLength={24}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <Field id={id("service")} label="Service of interest" error={errors.service}>
          <select
            {...aria("service")}
            className={cn(inputClass, "appearance-none")}
            name="service"
            required
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("budget")} label="Budget range" optional error={errors.budget}>
          <select
            {...aria("budget")}
            className={cn(inputClass, "appearance-none")}
            name="budget"
            value={values.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={id("message")}
        label="Project description"
        hint={`What are you trying to solve, and who will use it? (${LIMITS.message.min}–${LIMITS.message.max} characters)`}
        error={errors.message}
      >
        <textarea
          {...aria("message", true)}
          className={cn(inputClass, "min-h-40 resize-y")}
          name="message"
          required
          maxLength={LIMITS.message.max}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            {...aria("consent")}
            type="checkbox"
            name="consent"
            required
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 size-6 shrink-0 accent-[var(--color-cyan)]"
          />
          <label htmlFor={id("consent")} className="text-sm text-muted">
            I agree that Emerg Technologies may contact me about this enquiry using the details I
            provided. See the{" "}
            <Link href="/privacy" className="text-cyan underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id={`${id("consent")}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-[#ff9db0]">
            <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>{errors.consent}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary min-w-44" disabled={submitting} aria-disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={18} aria-hidden="true" className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={17} aria-hidden="true" />
            </>
          )}
        </button>
        {Object.keys(errors).length > 0 && (
          <p role="alert" className="text-sm text-[#ff9db0]">
            Please fix the {Object.keys(errors).length === 1 ? "field" : "fields"} marked above.
          </p>
        )}
      </div>

      {/* Result region: always rendered so screen readers announce changes. */}
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status === "sent" && (
          <p className="flex items-start gap-3 rounded-xl border border-teal/40 bg-teal/10 p-4 text-sm">
            <CheckCircle2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-teal" />
            <span>
              <strong className="font-semibold">Message sent.</strong> Thank you. We have received your
              enquiry and will reply to the email address you gave.
            </span>
          </p>
        )}
        {status === "not_configured" && (
          <div className="space-y-3 rounded-xl border border-[#ffd166]/50 bg-[#ffd166]/10 p-4 text-sm">
            <p className="flex items-start gap-3">
              <AlertCircle size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#ffd166]" />
              <span>
                <strong className="font-semibold">Your message was not sent.</strong> {serverMessage}{" "}
                {mailtoHref
                  ? "You can send it by email instead using the button below. Your text is filled in for you."
                  : "Please try again later."}
              </span>
            </p>
            {mailtoHref && (
              <a href={mailtoHref} className="btn btn-ghost">
                <Mail size={17} aria-hidden="true" /> Email us instead
              </a>
            )}
          </div>
        )}
        {status === "error" && (
          <p className="flex items-start gap-3 rounded-xl border border-[#ff6b8a]/50 bg-[#ff6b8a]/10 p-4 text-sm">
            <AlertCircle size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#ff6b8a]" />
            <span>
              <strong className="font-semibold">Your message was not sent.</strong> {serverMessage}
              {mailtoHref && (
                <>
                  {" "}
                  You can also{" "}
                  <a href={mailtoHref} className="text-cyan underline underline-offset-2">
                    email us directly
                  </a>
                  .
                </>
              )}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
