import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ENQUIRY_DISMISSED_KEY, OPEN_ENQUIRY_EVENT } from "@/lib/enquiry";
import { CONSENT_EVENT, getConsent } from "@/lib/consent";
import { EnquiryForm } from "./EnquiryForm";

const TRIGGER_MS = 25_000;

export function EnquirySlideIn() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [consentReady, setConsentReady] = useState(false);

  // Don't appear over the cookie banner: wait until a consent choice exists.
  useEffect(() => {
    setConsentReady(!!getConsent());
    const onConsent = () => setConsentReady(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(ENQUIRY_DISMISSED_KEY)) setDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Timed trigger: ~25s of active browsing, after scrolling past the opening section.
  useEffect(() => {
    if (open || dismissed || !consentReady) return;
    let elapsed = 0;
    let scrolledPast = window.scrollY > window.innerHeight * 0.8;

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) scrolledPast = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return; // only count active browsing
      elapsed += 1000;
      if (elapsed >= TRIGGER_MS && scrolledPast) {
        setOpen(true);
        window.clearInterval(interval);
      }
    }, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(interval);
    };
  }, [open, dismissed, consentReady]);

  // Open on demand from "Speak to our team" buttons.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_ENQUIRY_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ENQUIRY_EVENT, onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    setDismissed(true);
    try {
      window.sessionStorage.setItem(ENQUIRY_DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (open) {
    return (
      <>
        {/* Mobile: full-screen sheet. Desktop: right-side panel, site stays visible. */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How can we help?"
          className="fixed inset-0 z-[60] overflow-y-auto bg-background shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[520px] sm:border-l sm:border-border"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close enquiry form"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <X className="h-4 w-4" />
          </button>
          <EnquiryForm onClose={close} />
        </div>
      </>
    );
  }

  // Collapsed state: small re-open tab (desktop) / compact invitation (mobile).
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="fixed bottom-4 right-4 z-50 inline-flex min-h-11 items-center gap-2 bg-foreground px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-background shadow-lg transition-colors hover:bg-accent sm:bottom-6 sm:right-6"
    >
      How can we help?
    </button>
  );
}
