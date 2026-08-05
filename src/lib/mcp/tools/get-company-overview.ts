import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_company_overview",
  title: "Get Frontera company overview",
  description:
    "Returns a summary of Frontera Global — a behavioural-intelligence consultancy for healthcare/pharma — including positioning, disciplines, and contact info.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const overview = {
      name: "Frontera Global",
      tagline: "Behavioural Intelligence for Healthcare",
      summary:
        "Frontera Global combines AI-driven research, strategy and creative with behavioural science (CBI™ — Cognitive Behavioural Intelligence) to help pharma teams change behaviour.",
      disciplines: ["Research", "Strategy", "Creative"],
      audience: "Pharmaceutical and healthcare teams",
      website: "https://fronteracreds.com",
      bookingUrl:
        "https://outlook.office.com/book/FronteraIntroCall2@frontera-group.com/?ismsaljsauthenabled",
      contactEmail: "craig@frontera.global",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(overview, null, 2) }],
      structuredContent: overview,
    };
  },
});
