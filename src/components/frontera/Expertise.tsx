import { ArrowRight, Blocks, Lightbulb, Network } from "lucide-react";

const pillars = [
  {
    title: "Research intelligence",
    body: "Synthesis, coding, journey mapping, segmentation, and behavioural modelling across complex patient and professional pathways.",
    icon: Blocks,
    caseLabel: "case one",
    caseHref: "#case-research",
  },
  {
    title: "Strategy design",
    body: "Launch planning, intervention design, market alignment, omnichannel planning, and practical frameworks teams can adopt.",
    icon: Network,
    caseLabel: "case three",
    caseHref: "#case-2",
  },
  {
    title: "Creative activation",
    body: "Experience systems, campaigns, content, and scalable activation programmes shaped around what people need to think, feel, and do.",
    icon: Lightbulb,
    caseLabel: "case seven",
    caseHref: "#case-activation",
  },
];

const method = [
  {
    step: "01",
    title: "Decode decisions",
    body: "Unify global and local evidence, then use AI-assisted behavioural analysis to reveal decision drivers, barriers, and pathway friction.",
  },
  {
    step: "02",
    title: "Design change",
    body: "Translate behavioural evidence into strategy, interventions, messaging, experience architecture, and measurable engagement models.",
  },
  {
    step: "03",
    title: "Deliver outcomes",
    body: "Package the work into practical tools, playbooks, campaigns, and optimisation loops that teams can use in the real world.",
  },
];

export function Expertise() {
  return (
    <>
      <section id="expertise" className="scroll-mt-20 bg-off-white">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 xl:px-0">
          <div className="reveal max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Offer</p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
              One integrated team across intelligence, strategy, and activation.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
              Frontera is structured for the messy middle of healthcare: where data is fragmented,
              behaviours are hard to shift, and strategy only matters if it changes what happens
              next.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
              <article
                key={pillar.title}
                className="reveal group flex min-h-[360px] flex-col rounded-[28px] border bg-background p-7 shadow-[0_24px_70px_rgba(18,23,27,0.06)] transition-transform duration-300 hover:-translate-y-1 md:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <pillar.icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="mt-8 font-display text-3xl font-bold leading-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className={`mt-5 text-base text-foreground/62 ${i === 0 ? 'leading-7' : 'leading-8'}`}>
                  {pillar.body}
                </p>
                <a
                  href={pillar.caseHref}
                  className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/78 transition-colors hover:text-accent"
                >
                  See related {pillar.caseLabel}
                </a>
                <a
                  href={pillar.caseHref}
                  className="mt-3 inline-flex min-h-14 w-fit items-center gap-3 rounded-full border border-foreground px-7 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-white"
                >
                  Explore <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="scroll-mt-20 bg-case-dark text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.72fr_1.28fr] xl:px-0">
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              CBI system
            </p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              A simple system for complex behaviour.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              Connected Behavioural Intelligence turns research into a working model of change: what
              is happening, why it is happening, and what can shift it.
            </p>
          </div>

          <div className="reveal grid gap-4">
            {method.map((item) => (
              <article
                key={item.step}
                className="grid gap-5 border border-white/12 p-6 sm:grid-cols-[88px_1fr] md:p-7"
              >
                <p className="font-display text-4xl font-bold text-accent">{item.step}</p>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
