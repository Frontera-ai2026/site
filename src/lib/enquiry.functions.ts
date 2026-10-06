import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { NOTICE_VERSION, REQUEST_TYPES } from "./enquiry";

const enquirySchema = z.object({
  requestType: z.enum(REQUEST_TYPES),
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email address").max(255),
  mobile: z
    .string()
    .trim()
    .min(7, "Enter a valid mobile number")
    .max(24)
    .regex(/^[+0-9][0-9()\-\s.]{5,23}$/, "Enter a valid mobile number with country code"),
  company: z.string().trim().min(1, "Company is required").max(120),
  jobTitle: z.string().trim().min(1, "Job title is required").max(120),
  note: z.string().trim().max(1000).optional().default(""),
  whatsapp: z.boolean().default(false),
  page: z.string().trim().max(300).default(""),
  companyWebsite: z.string().optional().default(""),
});

const GATEWAY_URL = "https://connector-gateway.lovable.dev/pipedrive";
const API_BASE = "https://api.pipedrive.com/v1";

async function pipedrive<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const method = options.method ?? "GET";
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const headers = { "Content-Type": "application/json" };

  // Inside Lovable: route through the managed gateway (uses the Lovable-managed
  // connection key). On external hosts (e.g. Vercel) there is no LOVABLE_API_KEY,
  // so call Pipedrive's public REST API directly with the personal API token.
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["PIPEDRIVE_API_KEY"];
  if (lovableKey && connectionKey) {
    const gatewayResponse = await fetch(`${GATEWAY_URL}${path}`, {
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connectionKey,
      },
      body,
    });
    if (gatewayResponse.ok) {
      return (await gatewayResponse.json()) as T;
    }
    const gatewayError = await gatewayResponse.text();
    console.error(`Pipedrive gateway request failed [${gatewayResponse.status}] ${path}: ${gatewayError}`);
  }

  const token = process.env["PIPEDRIVE_API_KEY"];
  if (!token) {
    throw new Error("pipedrive_not_configured");
  }
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("api_token", token);
  const response = await fetch(url, { method, headers, body });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Pipedrive request failed [${response.status}] ${path}: ${errorBody}`);
    throw new Error(`Pipedrive request failed [${response.status}]: ${errorBody}`);
  }
  const json = (await response.json()) as { success?: boolean; error?: string };
  if (json.success === false) {
    console.error(`Pipedrive API error ${path}: ${json.error ?? "unknown"}`);
    throw new Error(`Pipedrive API error: ${json.error ?? "unknown"}`);
  }
  return json as T;
}

type PipedriveSearchItem = { id: number };
type PipedriveSearchResponse = {
  data?: { items?: Array<{ item: PipedriveSearchItem }> } | null;
};

function nextWorkingDay(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot: silently accept bot submissions without creating CRM records.
    if (data.companyWebsite) {
      return { ok: true as const, spam: true as const };
    }

    const summary = [
      `Request type: ${data.requestType}`,
      data.note ? `Note: ${data.note}` : null,
      `WhatsApp permission: ${data.whatsapp ? "Yes" : "No"} (notice ${NOTICE_VERSION})`,
      `Submitted: ${new Date().toISOString()}`,
      `Source: Website enquiry form`,
      data.page ? `Originating page: ${data.page}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // Notify the team inbox (never blocks the CRM flow).
    try {
      const { sendTemplateEmail } = await import("./email-templates/send-email");
      await sendTemplateEmail("enquiry-notification", "enquiries@frontera-group.com", {
        replyTo: data.email,
        idempotencyKey: `enquiry-${data.email}-${Date.now()}`,
        templateData: {
          requestType: data.requestType,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          mobile: data.mobile,
          company: data.company,
          jobTitle: data.jobTitle,
          note: data.note,
          whatsapp: data.whatsapp,
          page: data.page,
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error("Enquiry notification email failed:", err);
    }

    try {
      // 1. Match existing person by email.
      const personSearch = await pipedrive<PipedriveSearchResponse>(
        `/persons/search?term=${encodeURIComponent(data.email)}&fields=email&exact_match=true`,
      );
      const existingPersonId = personSearch.data?.items?.[0]?.item.id;

      // 2. Match existing organisation by name.
      const orgSearch = await pipedrive<PipedriveSearchResponse>(
        `/organizations/search?term=${encodeURIComponent(data.company)}&fields=name&exact_match=true`,
      );
      let orgId = orgSearch.data?.items?.[0]?.item.id;
      if (!orgId) {
        const created = await pipedrive<{ data: { id: number } }>(`/organizations`, {
          method: "POST",
          body: { name: data.company },
        });
        orgId = created.data.id;
      }

      // 3. Create or update the person (update only fills in, never wipes).
      let personId: number;
      if (existingPersonId) {
        personId = existingPersonId;
        await pipedrive(`/persons/${personId}`, {
          method: "PUT",
          body: {
            phone: data.mobile,
            org_id: orgId,
            job_title: data.jobTitle,
          },
        });
      } else {
        const created = await pipedrive<{ data: { id: number } }>(`/persons`, {
          method: "POST",
          body: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.mobile,
            org_id: orgId,
            job_title: data.jobTitle,
          },
        });
        personId = created.data.id;
      }

      // 4. Record the enquiry as a lead.
      const lead = await pipedrive<{ data: { id: string } }>(`/leads`, {
        method: "POST",
        body: {
          title: `Website enquiry — ${data.requestType} — ${data.firstName} ${data.lastName}`,
          person_id: personId,
          organization_id: orgId,
        },
      });

      // 5. Store the full enquiry detail as a note on the lead.
      await pipedrive(`/notes`, {
        method: "POST",
        body: {
          content: summary,
          lead_id: lead.data.id,
          person_id: personId,
          org_id: orgId,
        },
      });

      // 6. Follow-up activity due next working day.
      await pipedrive(`/activities`, {
        method: "POST",
        body: {
          subject: `Follow up website enquiry — ${data.firstName} ${data.lastName} (${data.requestType})`,
          type: "call",
          due_date: nextWorkingDay(),
          person_id: personId,
          org_id: orgId,
          note: summary,
        },
      });

      return { ok: true as const, spam: false as const };
    } catch (error) {
      if (error instanceof Error && error.message === "pipedrive_not_configured") {
        // Pipedrive not linked yet — log the enquiry so nothing is lost silently.
        console.warn("Enquiry received but Pipedrive is not linked:", summary, {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          mobile: data.mobile,
          company: data.company,
          jobTitle: data.jobTitle,
        });
        return { ok: true as const, spam: false as const, configured: false as const };
      }
      throw error;
    }
  });
