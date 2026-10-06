import * as React from "react";
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  requestType?: string;
  name?: string;
  email?: string;
  mobile?: string;
  company?: string;
  jobTitle?: string;
  note?: string;
  whatsapp?: boolean;
  page?: string;
  submittedAt?: string;
}

const row = (label: string, value?: string) => (
  <Text style={{ margin: "0 0 8px", fontSize: 14, color: "#222" }}>
    <strong>{label}:</strong> {value || "—"}
  </Text>
);

function EnquiryNotification(p: Props) {
  return (
    <Html>
      <Head />
      <Preview>New website enquiry from {p.name ?? "a visitor"}</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "24px", maxWidth: 560 }}>
          <Heading style={{ fontSize: 20, color: "#111" }}>New website enquiry</Heading>
          <Section>
            {row("Request", p.requestType)}
            {row("Name", p.name)}
            {row("Email", p.email)}
            {row("Mobile", p.mobile)}
            {row("Company", p.company)}
            {row("Job title", p.jobTitle)}
            {row("Note", p.note)}
            {row("WhatsApp permission", p.whatsapp ? "Yes" : "No")}
            {row("Page", p.page)}
            {row("Submitted", p.submittedAt)}
          </Section>
          <Text style={{ fontSize: 12, color: "#777" }}>This enquiry has also been added to Pipedrive.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: EnquiryNotification,
  subject: (d: Record<string, any>) => `New enquiry: ${d.requestType ?? "Website"} — ${d.name ?? ""}`,
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
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry;
