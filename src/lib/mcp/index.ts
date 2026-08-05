import { defineMcp } from "@lovable.dev/mcp-js";
import getCompanyOverview from "./tools/get-company-overview";
import listCaseStudies from "./tools/list-case-studies";
import getBookingLink from "./tools/get-booking-link";

export default defineMcp({
  name: "frontera-mcp",
  title: "Frontera Global MCP",
  version: "0.1.0",
  instructions:
    "Public tools for Frontera Global — a behavioural-intelligence consultancy for healthcare. Use `get_company_overview` for positioning and contact info, `list_case_studies` to browse published cases (optionally by slug), and `get_booking_link` to share an intro-call booking URL.",
  tools: [getCompanyOverview, listCaseStudies, getBookingLink],
});
