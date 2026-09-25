import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/frontera/Nav";
import { DarkBar } from "@/components/frontera/DarkBar";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Frontera Global" },
      {
        name: "description",
        content:
          "How Frontera Global collects, uses and protects personal data, and your rights under the UK GDPR and EU GDPR.",
      },
      { property: "og:title", content: "Privacy Policy — Frontera Global" },
      {
        property: "og:description",
        content:
          "How Frontera Global collects, uses and protects personal data, and your rights under the UK GDPR and EU GDPR.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

function H2({ children }: { children: string }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground pt-4">
      {children}
    </h2>
  );
}

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav />
      <main className="pt-16 flex-1">
        <section className="bg-case-dark text-white">
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
            <p className="text-accent text-xs uppercase tracking-[0.25em] mb-5">Legal</p>
            <h1 className="font-display text-3xl md:text-5xl leading-[1.05]">Privacy Policy</h1>
            <p className="mt-5 text-white/70 leading-relaxed">
              How Frontera Global collects, uses and protects your personal data.
            </p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p className="text-sm text-muted-foreground">
              Last updated: September 2026
            </p>

            <H2>Who we are</H2>
            <p>
              Frontera Global ("Frontera", "we", "us") combines AI-driven research, strategy and
              creative with behavioural science to help healthcare teams change behaviour. Our
              website address is{" "}
              <a href="https://frontera-group.com" className="underline underline-offset-4 hover:text-foreground">
                frontera-group.com
              </a>
              . We are the controller of personal data collected through this website.
            </p>

            <H2>What data we collect</H2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Technical and browsing data.</strong> When you visit our site, we and our
                technology providers may collect your IP address, browser and device details, pages
                viewed, and the company or organisation associated with your network.
              </li>
              <li>
                <strong>Consent data.</strong> We store a record of your privacy choices (which
                optional technologies you allow) so we can honour them on future visits.
              </li>
              <li>
                <strong>Contact data.</strong> If you contact us by email or book an introductory
                call, we process the details you provide, such as your name, email address and
                enquiry.
              </li>
            </ul>

            <H2>How we use your data</H2>
            <p>We use personal data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>operate, secure and improve our website;</li>
              <li>
                understand which organisations are interested in our services, including
                business-to-business visitor identification provided by Happierleads, where you
                have allowed marketing technologies;
              </li>
              <li>respond to enquiries and arrange meetings or demos;</li>
              <li>comply with legal obligations.</li>
            </ul>

            <H2>Lawful bases</H2>
            <p>
              We rely on legitimate interests to operate and secure the site and to respond to
              business enquiries, and on your consent for optional analytics and marketing
              technologies. You can withdraw or change your consent at any time via the "Privacy
              choices" link in the site footer.
            </p>

            <H2>Sharing your data</H2>
            <p>
              We do not sell personal data. We share it only with service providers who process it
              on our behalf (for example website hosting and visitor analytics), or where required
              by law. Where data is transferred outside the UK or EEA, we rely on appropriate
              safeguards such as adequacy decisions or standard contractual clauses.
            </p>

            <H2>Retention</H2>
            <p>
              We keep personal data only as long as necessary for the purposes above: consent
              records for as long as they remain relevant to honour your choices, and enquiry
              correspondence for up to 24 months.
            </p>

            <H2>Your rights</H2>
            <p>
              Under the UK GDPR and EU GDPR you have the right to access, correct, delete or
              restrict the processing of your personal data, to object to processing, to data
              portability, and to lodge a complaint with your local supervisory authority (in the
              UK, the Information Commissioner's Office).
            </p>

            <H2>Contact us</H2>
            <p>
              For any privacy question or request, contact{" "}
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
