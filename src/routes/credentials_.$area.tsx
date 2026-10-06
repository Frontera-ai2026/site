import { createFileRoute, notFound } from "@tanstack/react-router";
import { therapyAreas, TherapyCredentials } from "@/components/frontera/TherapyCredentials";

export const Route = createFileRoute("/credentials_/$area")({
  loader: ({ params }) => {
    const area = therapyAreas.find((item) => item.slug === params.area);
    if (!area) throw notFound();
    return area;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} Credentials — Frontera Global` : "Therapeutic Area — Frontera Global" },
    { name: "description", content: loaderData ? `Explore Frontera Global's ${loaderData.name} credentials and experience across research, strategy and engagement.` : "Explore Frontera Global therapeutic areas." },
    { property: "og:title", content: loaderData ? `${loaderData.name} Credentials — Frontera Global` : "Therapeutic Area — Frontera Global" },
    { property: "og:description", content: loaderData ? `View Frontera Global's ${loaderData.name} credentials and therapeutic experience.` : "Explore Frontera therapeutic areas." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <TherapyCredentials area={Route.useLoaderData()} />,
});