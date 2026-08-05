import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/frontera/Nav";
import { DarkBar } from "@/components/frontera/DarkBar";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/reference-article")({
  head: () => ({
    meta: [
      { title: "From Campaign Delivery to Behaviour-Led Customer Journeys — Frontera Global" },
      {
        name: "description",
        content:
          "Why global healthcare teams need more than marketing automation to create meaningful customer movement. An insight article from Frontera Global.",
      },
      { property: "og:title", content: "From Campaign Delivery to Behaviour-Led Customer Journeys" },
      {
        property: "og:description",
        content:
          "Better outcomes start by understanding where customers slow down, why they slow down, and what kind of engagement would actually help them move forward.",
      },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/reference-article" }],
  }),
  component: ReferenceArticle,
});

function ReferenceArticle() {
  useReveal();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-case-dark text-white">
          <div className="max-w-4xl mx-auto px-6 md:px-20 py-16 md:py-24 reveal">
            <p className="text-accent text-xs uppercase tracking-[0.25em] mb-5">
              Insight Article · Digital Engagement
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05]">
              From Campaign Delivery to Behaviour-Led Customer Journeys
            </h1>
            <p className="mt-6 text-white/70 max-w-2xl leading-relaxed text-lg">
              Why global healthcare teams need more than marketing automation to create meaningful
              customer movement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/frontera-article.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-accent text-white text-[13px] font-medium px-7 py-3.5 hover:opacity-80 transition-opacity"
              >
                Download PDF
              </a>
              <Link
                to="/"
                className="inline-flex items-center border border-white/40 text-white text-[13px] font-medium px-7 py-3.5 hover:bg-white hover:text-case-dark transition-colors"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </section>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24 reveal">
          <div className="border-l-2 border-accent pl-6 mb-12">
            <p className="font-display text-xl md:text-2xl leading-snug">
              <span className="font-bold">Executive summary —</span> Most global healthcare teams
              already have platforms, data and content infrastructure in place. The missed
              opportunity is often not technology. It is the absence of behavioural logic behind the
              journey. Better outcomes start by understanding where customers slow down, why they
              slow down, and what kind of engagement would actually help them move forward.
            </p>
          </div>

          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              Most global healthcare digital teams have strong infrastructure. Platforms are in
              place. Automation is running. Content is produced, approved, localised and deployed
              across markets. By most operational measures, the system works.
            </p>
            <p>
              And yet movement, actual change in what customers believe or do, is often slower than
              it should be. Campaigns reach the right people. Journeys complete. Metrics are
              reported. But the outcomes that really matter are harder to point to.
            </p>
            <p className="font-semibold text-foreground">This is not usually a platform problem. It is a thinking problem.</p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl mt-14 mb-5">The wrong question</h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              A lot of journey design starts from the wrong place. The question being asked is{" "}
              <em>what are we sending, and when?</em> rather than{" "}
              <em>why is this customer not progressing, and what would actually help them move?</em>
            </p>
            <p>
              Those are different questions. The first produces campaign calendars. The second
              produces behavioural insight.
            </p>
            <p>
              Automation can scale activity. It cannot, on its own, explain why someone is not
              moving forward. That requires understanding what kind of barrier is sitting in the
              way.
            </p>
            <p>
              Each situation requires something different. Sending the same journey to all of them,
              triggered by the same logic, will underperform for most of them — not because the
              platform is wrong, but because the audience has not been understood at that level.
            </p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl mt-14 mb-5">The data problem</h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              Large organisations usually have substantial data: research findings, CRM signals,
              content engagement, local market feedback and campaign results. The challenge is that
              these rarely sit together in a way that supports useful interpretation.
            </p>
            <p>
              Teams end up making journey decisions with partial pictures. They optimise against
              what they can measure, without always having a clear view of the behavioural question
              they are trying to answer.
            </p>
            <p>The issue is often not the absence of data. It is the absence of connected interpretation.</p>
          </div>

          <blockquote className="my-12 border-l-4 border-accent pl-6 font-display text-xl md:text-2xl italic leading-snug text-foreground">
            “The issue is often not the absence of technology, but the absence of behavioural logic
            behind the journey.”
          </blockquote>

          <h2 className="font-display text-2xl md:text-3xl mt-14 mb-5">
            What changes when you start with behaviour
          </h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              Salesforce Marketing Cloud and similar platforms can perform very differently
              depending on what sits behind them. The platform is not the constraint. The
              segmentation logic, journey objective and content matched to specific barriers are
              where value is either created or lost.
            </p>
            <p>
              When audience groups are profiled behaviourally, rather than only by role, brand,
              market or therapy area, the work that follows gets sharper. One segment may need
              clinical evidence in a specific context. Another may need peer examples. A third may
              need practical workflow support.
            </p>
            <p>
              Each is a different journey, built around a different objective and measured
              differently. The platform activates it. The thinking has to come first.
            </p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl mt-14 mb-5">
            Barriers are not all information gaps
          </h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              When a customer is not acting, the instinct is often to give them more: more evidence,
              more content, more touchpoints. But if the barrier is not lack of information, more
              information will not solve it.
            </p>
            <p>
              A clinician may understand the data but not believe the outcome applies to their
              setting. A decision-maker may need peer validation before they will move. A local
              team may have the assets but lack the practical support to apply them.
            </p>
            <p>
              That is why the journey has to begin with the behavioural question, not only the
              campaign plan.
            </p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl mt-14 mb-5">Where to start</h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              The teams that move fastest tend to pick something specific rather than launching a
              full transformation programme. A practical starting point is one campaign, one therapy
              area, or one journey.
            </p>
            <p>
              Map what data exists. Identify where progress stalls. Define the behavioural barrier.
              Build the journey around solving that barrier, using existing platforms and content
              where they fit.
            </p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl mt-14 mb-5">A closing thought</h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              The next phase of healthcare digital engagement will not be decided by teams that
              automate more activity. It will be decided by teams that understand their audiences
              more precisely, map decision friction more clearly and build journeys that are
              designed to move people forward, not simply reach them.
            </p>
            <p>
              That shift does not require replacing what is already in place. It requires putting
              better behavioural thinking in front of it.
            </p>
          </div>

          <div className="mt-14 bg-muted/40 p-8 border-l-2 border-accent">
            <h3 className="font-display text-lg font-bold mb-4">A practical discussion could start with:</h3>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>Choose one live campaign, market, therapy area or customer journey.</li>
              <li>Map the data currently available and where it sits.</li>
              <li>Identify where customer progress appears to slow down.</li>
              <li>Define the likely behavioural barrier behind that friction.</li>
              <li>Assess how existing platforms could activate a sharper journey.</li>
            </ol>
          </div>

          <div className="mt-10">
            <h3 className="font-display text-lg font-bold mb-2">Suggested next step</h3>
            <p className="text-foreground/80 leading-relaxed">
              A focused working session around one campaign or journey would make the opportunity
              tangible without requiring a broad transformation programme.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <h3 className="font-display text-lg font-bold mb-2">About Frontera</h3>
            <p className="text-foreground/80 leading-relaxed">
              Frontera is a research-driven global health and life sciences partner. We work with
              digital marketing teams to translate audience insight and campaign data into
              behavioural profiles, friction maps and journey designs that existing platforms can
              activate at scale. If this reflects a challenge you are currently working through, it
              is worth a conversation.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="mailto:craig@frontera-group.com?subject=Behaviour-Led%20Customer%20Journeys%20—%20Discussion"
              className="inline-flex items-center bg-accent text-white text-[13px] font-medium px-7 py-3.5 hover:opacity-80 transition-opacity"
            >
              Start a conversation
            </a>
            <a
              href="/frontera-article.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-foreground text-foreground text-[13px] font-medium px-7 py-3.5 hover:bg-foreground hover:text-background transition-colors"
            >
              Download PDF
            </a>
          </div>
        </article>

        <DarkBar />
      </main>
    </div>
  );
}
