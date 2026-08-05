import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_booking_link",
  title: "Get Frontera intro call booking link",
  description:
    "Returns a link the user can open to book an introductory call with Frontera Global.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: () => {
    const url =
      "https://outlook.office.com/book/FronteraIntroCall2@frontera-group.com/?ismsaljsauthenabled";
    return {
      content: [
        {
          type: "text",
          text: `Book a 30-minute intro call with Frontera Global here: ${url}`,
        },
      ],
      structuredContent: { bookingUrl: url },
    };
  },
});
