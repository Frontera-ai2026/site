import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { H as Html } from "../_libs/react-email__html.mjs";
import { H as Head } from "../_libs/react-email__head.mjs";
import { P as Preview } from "../_libs/react-email__preview.mjs";
import { B as Body } from "../_libs/react-email__body.mjs";
import { C as Container } from "../_libs/react-email__container.mjs";
import { H as Heading } from "../_libs/react-email__heading.mjs";
import { S as Section } from "../_libs/react-email__section.mjs";
import { T as Text } from "../_libs/react-email__text.mjs";
const row = (label, value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { margin: "0 0 8px", fontSize: 14, color: "#222" }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
    label,
    ":"
  ] }),
  " ",
  value || "—"
] });
function EnquiryNotification(p) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Html, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Preview, { children: [
      "New website enquiry from ",
      p.name ?? "a visitor"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Body, { style: { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { style: { padding: "24px", maxWidth: 560 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: { fontSize: 20, color: "#111" }, children: "New website enquiry" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { children: [
        row("Request", p.requestType),
        row("Name", p.name),
        row("Email", p.email),
        row("Mobile", p.mobile),
        row("Company", p.company),
        row("Job title", p.jobTitle),
        row("Note", p.note),
        row("WhatsApp permission", p.whatsapp ? "Yes" : "No"),
        row("Page", p.page),
        row("Submitted", p.submittedAt)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 12, color: "#777" }, children: "This enquiry has also been added to Pipedrive." })
    ] }) })
  ] });
}
const template = {
  component: EnquiryNotification,
  subject: (d) => `New enquiry: ${d.requestType ?? "Website"} — ${d.name ?? ""}`,
  displayName: "Enquiry notification (team)",
  to: "enquiries@frontera-group.com",
  previewData: {
    requestType: "Speak to the team",
    name: "Jane Smith",
    email: "jane@example.com",
    mobile: "+44 7700 900000",
    company: "Acme Ltd",
    jobTitle: "Head of Marketing",
    note: "Keen to discuss a campaign.",
    whatsapp: false,
    page: "/",
    submittedAt: (/* @__PURE__ */ new Date()).toISOString()
  }
};
const TEMPLATES = {
  "enquiry-notification": template
};
export {
  TEMPLATES as T
};
