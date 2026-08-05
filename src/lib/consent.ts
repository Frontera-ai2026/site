// GDPR / UK GDPR consent management for Frontera.
// Stores a first-party consent record in localStorage and controls loading
// of optional marketing / analytics technologies (currently RB2B).

export type ConsentCategories = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentDecision = "personalised" | "standard" | "custom";

export type ConsentRecord = {
  version: 1;
  decision: ConsentDecision;
  categories: ConsentCategories;
  timestamp: string; // ISO
};

export const CONSENT_STORAGE_KEY = "frontera-consent-v1";
export const CONSENT_EVENT = "frontera:consent-change";
export const CONSENT_OPEN_PREFS_EVENT = "frontera:open-privacy-choices";


export function getConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed && parsed.version === 1) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function setConsent(
  decision: ConsentDecision,
  categories: Omit<ConsentCategories, "essential"> & { essential?: true },
): ConsentRecord {
  const record: ConsentRecord = {
    version: 1,
    decision,
    categories: {
      essential: true,
      analytics: !!categories.analytics,
      marketing: !!categories.marketing,
    },
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
  applyConsent(record);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
  return record;
}

export function applyConsent(_record: ConsentRecord | null) {
  // No optional marketing/analytics vendors are currently loaded.
}

export function openPrivacyChoices() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_PREFS_EVENT));
}
