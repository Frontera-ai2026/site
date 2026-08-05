import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_PREFS_EVENT,
  applyConsent,
  getConsent,
  setConsent,
} from "@/lib/consent";

type View = "hidden" | "welcome" | "preferences";

const PRIVACY_URL = "/privacy-policy";
const COOKIE_URL = "/cookie-policy";

export function ConsentBanner() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // First-visit detection + re-apply stored consent on every load.
  useEffect(() => {
    const stored = getConsent();
    if (stored) {
      applyConsent(stored);
    } else {
      setView("welcome");
    }
    const openPrefs = () => {
      const s = getConsent();
      if (s) {
        setAnalytics(s.categories.analytics);
        setMarketing(s.categories.marketing);
      }
      setView("preferences");
    };
    window.addEventListener(CONSENT_OPEN_PREFS_EVENT, openPrefs);
    return () => window.removeEventListener(CONSENT_OPEN_PREFS_EVENT, openPrefs);
  }, []);

  // Focus trap: on open, focus first control.
  useEffect(() => {
    if (view === "hidden") return;
    const t = window.setTimeout(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(
        "button, [href], input, [tabindex]:not([tabindex='-1'])",
      );
      first?.focus();
    }, 30);
    return () => window.clearTimeout(t);
  }, [view]);

  // Broadcast helper: (re)apply consent whenever it changes elsewhere.
  useEffect(() => {
    const onChange = () => {
      /* no-op; individual consumers listen to CONSENT_EVENT */
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent("personalised", { analytics: true, marketing: true });
    setView("hidden");
  }, []);

  const rejectAll = useCallback(() => {
    setConsent("standard", { analytics: false, marketing: false });
    setView("hidden");
  }, []);

  const saveCustom = useCallback(() => {
    const allOn = analytics && marketing;
    const allOff = !analytics && !marketing;
    const decision = allOn ? "personalised" : allOff ? "standard" : "custom";
    setConsent(decision, { analytics, marketing });
    setView("hidden");
  }, [analytics, marketing]);

  if (view === "hidden") return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:left-auto sm:justify-end sm:px-0 sm:pb-0"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div
        ref={dialogRef}
        className="pointer-events-auto w-full max-w-md overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
      >
        {view === "welcome" ? (
          <WelcomeView
            titleId={titleId}
            descId={descId}
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onManage={() => setView("preferences")}
          />
        ) : (
          <PreferencesView
            titleId={titleId}
            descId={descId}
            analytics={analytics}
            marketing={marketing}
            setAnalytics={setAnalytics}
            setMarketing={setMarketing}
            onSave={saveCustom}
            onBack={() => setView("welcome")}
          />
        )}
      </div>
    </div>
  );
}

function WelcomeView({
  titleId,
  descId,
  onAcceptAll,
  onRejectAll,
  onManage,
}: {
  titleId: string;
  descId: string;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onManage: () => void;
}) {
  return (
    <div className="p-6 sm:p-8">
      <h2
        id={titleId}
        className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        Welcome
      </h2>
      <div id={descId} className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
        <p>
          Explore our case studies in full, get to know who we are, and see how we help leading
          pharma teams make better informed decisions.
        </p>
        <p>
          With your permission, we use optional analytics and marketing technologies to understand
          which content matters most to you, identify business interest in Frontera, and tailor
          your experience.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <ConsentButton
          onClick={onAcceptAll}
          title="Enter personalised experience"
          subtitle="Allow optional analytics and marketing technologies"
          variant="primary"
        />
        <ConsentButton
          onClick={onRejectAll}
          title="Enter standard experience"
          subtitle="Continue with essential technologies only"
          variant="secondary"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={onManage}
          className="underline underline-offset-4 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Manage privacy choices
        </button>
        <span className="flex gap-4">
          <a
            href={PRIVACY_URL}
            className="underline underline-offset-4 hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href={COOKIE_URL}
            className="underline underline-offset-4 hover:text-foreground"
          >
            Cookie Policy
          </a>
        </span>
      </div>
    </div>
  );
}

function PreferencesView({
  titleId,
  descId,
  analytics,
  marketing,
  setAnalytics,
  setMarketing,
  onSave,
  onBack,
}: {
  titleId: string;
  descId: string;
  analytics: boolean;
  marketing: boolean;
  setAnalytics: (v: boolean) => void;
  setMarketing: (v: boolean) => void;
  onSave: () => void;
  onBack: () => void;
}) {
  return (
    <div className="p-6 sm:p-8">
      <h2
        id={titleId}
        className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        Privacy choices
      </h2>
      <p id={descId} className="mt-3 text-sm leading-6 text-muted-foreground">
        Choose which optional technologies you allow. Essential technologies are always on because
        they are needed for the site to work.
      </p>

      <ul className="mt-6 space-y-4">
        <PreferenceRow
          title="Essential"
          badge="Always on"
          description="Required to serve pages, remember your privacy choices, and keep the site secure. Cannot be turned off."
          checked
          disabled
          onChange={() => {}}
        />
        <PreferenceRow
          title="Analytics"
          badge="Optional"
          description="Helps us understand which case studies and pages people find most useful, so we can improve what we publish."
          checked={analytics}
          onChange={setAnalytics}
        />
        <PreferenceRow
          title="Marketing"
          badge="Optional"
          description="Helps us understand which organisations may be interested in Frontera’s services and supports relevant business communications."
          checked={marketing}
          onChange={setMarketing}
        />
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Save choices
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Back
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <a href={PRIVACY_URL} className="underline underline-offset-4 hover:text-foreground">
          Privacy Policy
        </a>
        <a href={COOKIE_URL} className="underline underline-offset-4 hover:text-foreground">
          Cookie Policy
        </a>
      </div>
    </div>
  );
}

function ConsentButton({
  onClick,
  title,
  subtitle,
  variant,
}: {
  onClick: () => void;
  title: string;
  subtitle: string;
  variant: "primary" | "secondary";
}) {
  const base =
    "group flex h-full flex-col rounded-md border px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const styles =
    variant === "primary"
      ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
      : "border-input bg-background text-foreground hover:bg-secondary";
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      <span className="text-base font-semibold leading-tight">{title}</span>
      <span
        className={`mt-1 text-xs leading-5 ${
          variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {subtitle}
      </span>
    </button>
  );
}

function PreferenceRow({
  title,
  badge,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  badge: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="rounded-md border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {badge}
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <label className="relative inline-flex shrink-0 cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            aria-label={`${title} — ${checked ? "enabled" : "disabled"}`}
          />
          <span
            aria-hidden
            className={`h-6 w-11 rounded-full bg-input transition-colors peer-checked:bg-primary peer-disabled:opacity-60 peer-focus-visible:ring-2 peer-focus-visible:ring-ring`}
          />
          <span
            aria-hidden
            className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform peer-checked:translate-x-5"
          />
        </label>
      </div>
    </li>
  );
}
