import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { REQUEST_TYPES, type EnquiryPayload, type RequestType } from "@/lib/enquiry";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { bookingUrl } from "./Nav";

type FieldErrors = Partial<Record<string, string>>;

const inputClass =
  "w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none";

export function EnquiryForm({ onClose }: { onClose?: () => void }) {
  const [requestType, setRequestType] = useState<RequestType>(REQUEST_TYPES[0]);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    jobTitle: "",
    note: "",
    companyWebsite: "", // honeypot
  });
  const [whatsapp, setWhatsapp] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const er: FieldErrors = {};
    if (!values.firstName.trim()) er.firstName = "Please enter your first name.";
    if (!values.lastName.trim()) er.lastName = "Please enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      er.email = "Please enter a valid email address.";
    if (!/^[+0-9][0-9()\-\s.]{5,23}$/.test(values.mobile.trim()))
      er.mobile = "Please enter a valid mobile number, including your country code.";
    if (!values.company.trim()) er.company = "Please enter your company.";
    if (!values.jobTitle.trim()) er.jobTitle = "Please enter your job title.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    setStatus("sending");
    try {
      const payload: EnquiryPayload = {
        requestType,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        mobile: values.mobile.trim(),
        company: values.company.trim(),
        jobTitle: values.jobTitle.trim(),
        note: values.note.trim() || undefined,
        whatsapp,
        page: window.location.pathname,
        companyWebsite: values.companyWebsite,
      };
      await submitEnquiry({ data: payload });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold text-foreground">
          Thanks, {values.firstName.trim()}. We’ve received your enquiry.
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Someone from our team will be in touch about your request.
        </p>
        <p className="mt-5 text-sm text-muted-foreground">
          Prefer to choose a time now?{" "}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline underline-offset-4"
          >
            Book an intro call.
          </a>
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex min-h-11 items-center justify-center border border-foreground px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="p-6 md:p-8">
      <h3 className="font-display text-2xl font-bold text-foreground">How can we help?</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Have a challenge in mind, or simply exploring? Get in touch with our team.
      </p>

      <div className="mt-5">
        <label htmlFor="enq-request" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
          I’d like to…
        </label>
        <select
          id="enq-request"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value as RequestType)}
          className={inputClass}
        >
          {REQUEST_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-first" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            First name*
          </label>
          <input id="enq-first" autoComplete="given-name" className={inputClass} value={values.firstName} onChange={set("firstName")} aria-invalid={!!errors.firstName} />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="enq-last" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            Last name*
          </label>
          <input id="enq-last" autoComplete="family-name" className={inputClass} value={values.lastName} onChange={set("lastName")} aria-invalid={!!errors.lastName} />
          {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="enq-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            Work email*
          </label>
          <input id="enq-email" type="email" autoComplete="email" inputMode="email" className={inputClass} value={values.email} onChange={set("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="enq-mobile" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            Mobile number*
          </label>
          <input id="enq-mobile" type="tel" autoComplete="tel" inputMode="tel" placeholder="+44…" className={inputClass} value={values.mobile} onChange={set("mobile")} aria-invalid={!!errors.mobile} aria-describedby="enq-mobile-hint" />
          <p id="enq-mobile-hint" className="mt-1 text-xs text-muted-foreground">Include your country code.</p>
          {errors.mobile && <p className="mt-1 text-xs text-destructive">{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor="enq-company" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            Company*
          </label>
          <input id="enq-company" autoComplete="organization" className={inputClass} value={values.company} onChange={set("company")} aria-invalid={!!errors.company} />
          {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
        </div>
        <div>
          <label htmlFor="enq-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            Job title*
          </label>
          <input id="enq-title" autoComplete="organization-title" className={inputClass} value={values.jobTitle} onChange={set("jobTitle")} aria-invalid={!!errors.jobTitle} />
          {errors.jobTitle && <p className="mt-1 text-xs text-destructive">{errors.jobTitle}</p>}
        </div>
      </div>

      {/* Honeypot — hidden from real users, must stay empty */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="enq-website">Company website</label>
        <input id="enq-website" tabIndex={-1} autoComplete="off" value={values.companyWebsite} onChange={set("companyWebsite")} />
      </div>

      <div className="mt-4">
        <label htmlFor="enq-note" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
          Anything you’d like us to know? (optional)
        </label>
        <textarea id="enq-note" rows={3} placeholder="A sentence or two is plenty." className={inputClass} value={values.note} onChange={set("note")} />
      </div>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        By submitting this form, you consent to Frontera contacting you by email or phone about your
        enquiry, including providing any information or case studies you request.{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-accent">
          Click here to reach our privacy policy.
        </Link>
      </p>

      <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-foreground">
        <input
          type="checkbox"
          checked={whatsapp}
          onChange={(e) => setWhatsapp(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#00b4d8]"
        />
        Frontera can also contact me on WhatsApp about this enquiry, including sending information
        and case studies.
      </label>

      {status === "error" && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          Something went wrong sending your enquiry. Your details are still here — please try again,
          or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center bg-accent px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-foreground disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
        *Required fields. See our{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-accent">
          Privacy Notice
        </Link>
        .
      </p>
    </form>
  );
}
