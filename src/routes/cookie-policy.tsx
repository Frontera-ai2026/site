import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/frontera/Nav";
import { DarkBar } from "@/components/frontera/DarkBar";
import { openPrivacyChoices } from "@/lib/consent";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Frontera Global" },
      {
        name: "description",
        content:
          "Which cookies and similar technologies frontera-group.com uses, why, and how you can control them.",
      },
      { property: "og:title", content: "Cookie Policy — Frontera Global" },
      {
        property: "og:description",
        content:
          "Which cookies and similar technologies frontera-group.com uses, why, and how you can control them.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: CookiePolicy,
});

function H2({ children }: { children: string }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground pt-4">
      {children}
    </h2>
  );
}

function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav />
      <main className="pt-16 flex-1">
        <section className="bg-case-dark text-white">
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
            <p className="text-accent text-xs uppercase tracking-[0.25em] mb-5">Legal</p>
            <h1 className="font-display text-3xl md:text-5xl leading-[1.05]">Cookie Policy</h1>
            <p className="mt-5 text-white/70 leading-relaxed">
              Which cookies and similar technologies this site uses, and how you can control them.
            </p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p className="text-sm text-muted-foreground">Last updated: September 2026</p>

            <H2>What are cookies?</H2>
            <p>
              Cookies are small text files placed on your device by a website. We also use similar
              technologies such as local storage and tracking pixels, which this policy covers
              together under "cookies".
            </p>

            <H2>Essential technologies</H2>
            <p>
              These are always on because the site cannot work without them. They include local
              storage used to remember your privacy choices between visits, and basic technical
              features needed to serve pages and keep the site secure.
            </p>

            <H2>Optional technologies</H2>
            <p>
              Optional cookies and trackers only load with your permission, given through the
              privacy choices panel when you first visit:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Marketing — Happierleads.</strong> A business-to-business visitor
                identification service. Where allowed, it uses cookies and your IP address to
                identify the company or organisation associated with your visit and which pages
                were viewed. No personal contact details are collected without you providing them.
              </li>
              <li>
                <strong>Analytics.</strong> Helps us understand which pages and content people find
                most useful, so we can improve what we publish.
              </li>
            </ul>

            <H2>Managing your choices</H2>
            <p>
              You can change or withdraw your consent at any time using the{" "}
              <button
                type="button"
                onClick={openPrivacyChoices}
                className="underline underline-offset-4 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Privacy choices
              </button>{" "}
              link in the site footer, which reopens the preferences panel. You can also delete or
              block cookies in your browser settings; note that blocking essential storage may
              affect how the site works.
            </p>

            <H2>More information</H2>
            <p>
              See our{" "}
              <a href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
                Privacy Policy
              </a>{" "}
              for full details of how we handle personal data, or contact{" "}
              <a
                href="mailto:craig@frontera-group.com"
                className="underline underline-offset-4 hover:text-foreground"
              >
                craig@frontera-group.com
              </a>
              .
            </p>
          </div>
        </article>
      </main>
      <DarkBar />
    </div>
  );
}
