import { r as reactExports } from "../_libs/react.mjs";
import { r as render } from "../_libs/react-email__render.mjs";
import { s as sendLovableEmail, E as EmailAPIError } from "../_libs/lovable.dev__email-js.mjs";
import { T as TEMPLATES } from "./registry-Zu_ijqFZ.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/html5parser.mjs";
import "node:stream";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__text.mjs";
const SITE_NAME = "Frontera Reach";
const SENDER_DOMAIN = "notify.frontera-group.com";
const FROM_DOMAIN = "notify.frontera-group.com";
async function sendTemplateEmail(templateName, to, options = {}) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new Error("LOVABLE_API_KEY is not configured");
  }
  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(
      `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(", ")}`
    );
  }
  const recipient = template.to || to;
  if (!recipient) {
    throw new Error("Recipient is required (the template defines no fixed recipient)");
  }
  const templateData = options.templateData ?? {};
  const element = reactExports.createElement(template.component, templateData);
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject = typeof template.subject === "function" ? template.subject(templateData) : template.subject;
  try {
    await sendLovableEmail(
      {
        to: recipient,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: "transactional",
        label: templateName,
        idempotency_key: options.idempotencyKey || crypto.randomUUID(),
        reply_to: options.replyTo
      },
      { apiKey, sendUrl: process.env["LOVABLE_SEND_URL"] }
    );
  } catch (error) {
    if (error instanceof EmailAPIError && error.code === "recipient_suppressed") {
      return { sent: false, reason: "recipient_suppressed" };
    }
    throw error;
  }
  return { sent: true };
}
export {
  sendTemplateEmail
};
