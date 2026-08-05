import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CASES = [
  {
    slug: "case-research",
    title: "Research case",
    summary:
      "AI-augmented qualitative and quantitative research uncovering behavioural drivers in a specialist therapy area.",
    url: "https://fronteracreds.com/case-research",
  },
  {
    slug: "case-launch",
    title: "Launch case",
    summary:
      "Behaviourally-grounded launch strategy and creative platform for a new pharmaceutical brand.",
    url: "https://fronteracreds.com/case-launch",
  },
  {
    slug: "case-journey",
    title: "Patient journey case",
    summary:
      "Mapping and re-shaping the patient journey using Cognitive Behavioural Intelligence (CBI™).",
    url: "https://fronteracreds.com/case-journey",
  },
];

export default defineTool({
  name: "list_case_studies",
  title: "List Frontera case studies",
  description:
    "Returns Frontera Global's published case studies with a short summary and public URL for each.",
  inputSchema: {
    slug: z
      .string()
      .optional()
      .describe("Optional case slug (e.g. 'case-launch') to return a single case."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const items = slug ? CASES.filter((c) => c.slug === slug) : CASES;
    if (slug && items.length === 0) {
      return {
        content: [{ type: "text", text: `No case study found with slug "${slug}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { cases: items },
    };
  },
});
