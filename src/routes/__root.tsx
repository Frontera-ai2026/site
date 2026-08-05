import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ConsentBanner } from "@/components/frontera/ConsentBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Frontera Global" },
      { property: "og:site_name", content: "Frontera Global" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Frontera Global — Behavioural Intelligence for Healthcare" },
      {
        property: "og:title",
        content: "Frontera Global — Behavioural Intelligence for Healthcare",
      },
      {
        name: "twitter:title",
        content: "Frontera Global — Behavioural Intelligence for Healthcare",
      },
      {
        name: "description",
        content:
          "Frontera Global combines AI-driven research, strategy and creative with behavioural science to help pharma teams change behaviour.",
      },
      {
        property: "og:description",
        content: "AI-driven research, strategy and creative for pharma teams.",
      },
      {
        name: "twitter:description",
        content: "AI-driven research, strategy and creative for pharma teams.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9afd3200-5494-4937-8b21-c69c25413da0/id-preview-55efbc52--d31ec655-8cb0-4fa4-a0fe-a36e7881f955.lovable.app-1778747946998.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9afd3200-5494-4937-8b21-c69c25413da0/id-preview-55efbc52--d31ec655-8cb0-4fa4-a0fe-a36e7881f955.lovable.app-1778747946998.png",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Frontera Global",
              url: "https://frontera-creds.lovable.app",
              sameAs: ["https://frontera.global/", "https://www.linkedin.com/in/cpmills/"],
            },
            {
              "@type": "WebSite",
              name: "Frontera Global",
              url: "https://frontera-creds.lovable.app",
            },
          ],
        }),
      },
      {
        children: `!function(){var e="rest.happierleads.com/v3/script?clientId=98S7wB6pspZC81zWSBW8MG&version=4.0.0",t=document.createElement("script");window.location.protocol.split(":")[0];t.src="https://"+e;var c=document.getElementsByTagName("script")[0];t.async=true;t.onload=function(){new Happierleads.default};c.parentNode.insertBefore(t,c)}();`,
      },
    ],



  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ConsentBanner />
    </QueryClientProvider>
  );
}

