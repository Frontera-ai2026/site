// Shared constants for the website enquiry form ("Speak to our team").

export const OPEN_ENQUIRY_EVENT = "frontera:open-enquiry";
export const ENQUIRY_DISMISSED_KEY = "frontera-enquiry-dismissed";

export const REQUEST_TYPES = [
  "Speak to the team",
  "Find out more about your services",
  "Request a case study",
] as const;

export type RequestType = (typeof REQUEST_TYPES)[number];

export type EnquiryPayload = {
  requestType: RequestType;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: string;
  jobTitle: string;
  note?: string;
  whatsapp: boolean;
  page: string;
  // Honeypot — must stay empty. Real users never see it.
  companyWebsite?: string;
};

export const NOTICE_VERSION = "enquiry-notice-v1";

export function openEnquiryForm() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_ENQUIRY_EVENT));
}
