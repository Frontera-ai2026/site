const OPEN_ENQUIRY_EVENT = "frontera:open-enquiry";
const ENQUIRY_DISMISSED_KEY = "frontera-enquiry-dismissed";
const REQUEST_TYPES = [
  "Speak to the team",
  "Find out more about your services",
  "Request a case study"
];
const NOTICE_VERSION = "enquiry-notice-v1";
function openEnquiryForm() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_ENQUIRY_EVENT));
}
export {
  ENQUIRY_DISMISSED_KEY as E,
  NOTICE_VERSION as N,
  OPEN_ENQUIRY_EVENT as O,
  REQUEST_TYPES as R,
  openEnquiryForm as o
};
