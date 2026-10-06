import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-8Sc3uNUS.mjs";
import { R as REQUEST_TYPES, N as NOTICE_VERSION } from "./enquiry-o3dXUj6o.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { f as object, d as string, j as boolean, _ as _enum } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const enquirySchema = object({
  requestType: _enum(REQUEST_TYPES),
  firstName: string().trim().min(1, "First name is required").max(80),
  lastName: string().trim().min(1, "Last name is required").max(80),
  email: string().trim().email("Enter a valid email address").max(255),
  mobile: string().trim().min(7, "Enter a valid mobile number").max(24).regex(/^[+0-9][0-9()\-\s.]{5,23}$/, "Enter a valid mobile number with country code"),
  company: string().trim().min(1, "Company is required").max(120),
  jobTitle: string().trim().min(1, "Job title is required").max(120),
  note: string().trim().max(1e3).optional().default(""),
  whatsapp: boolean().default(false),
  page: string().trim().max(300).default(""),
  companyWebsite: string().optional().default("")
});
const GATEWAY_URL = "https://connector-gateway.lovable.dev/pipedrive";
const API_BASE = "https://api.pipedrive.com/v1";
async function pipedrive(path, options = {}) {
  const method = options.method ?? "GET";
  const body = options.body ? JSON.stringify(options.body) : void 0;
  const headers = {
    "Content-Type": "application/json"
  };
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["PIPEDRIVE_API_KEY"];
  if (lovableKey && connectionKey) {
    const gatewayResponse = await fetch(`${GATEWAY_URL}${path}`, {
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connectionKey
      },
      body
    });
    if (gatewayResponse.ok) {
      return await gatewayResponse.json();
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
  const response = await fetch(url, {
    method,
    headers,
    body
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Pipedrive request failed [${response.status}] ${path}: ${errorBody}`);
    throw new Error(`Pipedrive request failed [${response.status}]: ${errorBody}`);
  }
  const json = await response.json();
  if (json.success === false) {
    console.error(`Pipedrive API error ${path}: ${json.error ?? "unknown"}`);
    throw new Error(`Pipedrive API error: ${json.error ?? "unknown"}`);
  }
  return json;
}
function nextWorkingDay() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}
const submitEnquiry_createServerFn_handler = createServerRpc({
  id: "617707e00effff11fe2ad158ad24aa66c3e087d1885e1e35dc054328f3e2b494",
  name: "submitEnquiry",
  filename: "src/lib/enquiry.functions.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
const submitEnquiry = createServerFn({
  method: "POST"
}).inputValidator((data) => enquirySchema.parse(data)).handler(submitEnquiry_createServerFn_handler, async ({
  data
}) => {
  if (data.companyWebsite) {
    return {
      ok: true,
      spam: true
    };
  }
  const summary = [`Request type: ${data.requestType}`, data.note ? `Note: ${data.note}` : null, `WhatsApp permission: ${data.whatsapp ? "Yes" : "No"} (notice ${NOTICE_VERSION})`, `Submitted: ${(/* @__PURE__ */ new Date()).toISOString()}`, `Source: Website enquiry form`, data.page ? `Originating page: ${data.page}` : null].filter(Boolean).join("\n");
  try {
    const {
      sendTemplateEmail
    } = await import("./send-email-C7RODRi2.mjs");
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
        submittedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  } catch (err) {
    console.error("Enquiry notification email failed:", err);
  }
  try {
    const personSearch = await pipedrive(`/persons/search?term=${encodeURIComponent(data.email)}&fields=email&exact_match=true`);
    const existingPersonId = personSearch.data?.items?.[0]?.item.id;
    const orgSearch = await pipedrive(`/organizations/search?term=${encodeURIComponent(data.company)}&fields=name&exact_match=true`);
    let orgId = orgSearch.data?.items?.[0]?.item.id;
    if (!orgId) {
      const created = await pipedrive(`/organizations`, {
        method: "POST",
        body: {
          name: data.company
        }
      });
      orgId = created.data.id;
    }
    let personId;
    if (existingPersonId) {
      personId = existingPersonId;
      await pipedrive(`/persons/${personId}`, {
        method: "PUT",
        body: {
          phone: data.mobile,
          org_id: orgId,
          job_title: data.jobTitle
        }
      });
    } else {
      const created = await pipedrive(`/persons`, {
        method: "POST",
        body: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.mobile,
          org_id: orgId,
          job_title: data.jobTitle
        }
      });
      personId = created.data.id;
    }
    const lead = await pipedrive(`/leads`, {
      method: "POST",
      body: {
        title: `Website enquiry — ${data.requestType} — ${data.firstName} ${data.lastName}`,
        person_id: personId,
        organization_id: orgId
      }
    });
    await pipedrive(`/notes`, {
      method: "POST",
      body: {
        content: summary,
        lead_id: lead.data.id,
        person_id: personId,
        org_id: orgId
      }
    });
    await pipedrive(`/activities`, {
      method: "POST",
      body: {
        subject: `Follow up website enquiry — ${data.firstName} ${data.lastName} (${data.requestType})`,
        type: "call",
        due_date: nextWorkingDay(),
        person_id: personId,
        org_id: orgId,
        note: summary
      }
    });
    return {
      ok: true,
      spam: false
    };
  } catch (error) {
    if (error instanceof Error && error.message === "pipedrive_not_configured") {
      console.warn("Enquiry received but Pipedrive is not linked:", summary, {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        mobile: data.mobile,
        company: data.company,
        jobTitle: data.jobTitle
      });
      return {
        ok: true,
        spam: false,
        configured: false
      };
    }
    throw error;
  }
});
export {
  submitEnquiry_createServerFn_handler
};
