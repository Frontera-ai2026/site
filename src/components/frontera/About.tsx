const outcomes = [
  {
    value: "45+",
    label: "source types synthesised across launch and market planning work",
  },
  {
    value: "3",
    label: "connected disciplines: research intelligence, strategy, creative activation",
  },
  {
    value: "1",
    label: "system for turning behavioural evidence into action",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] xl:px-0">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">About</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Built for teams who need behaviour to change, not just messages to land.
          </h2>
        </div>

        <div className="reveal">
          <div className="grid gap-6 text-lg leading-8 text-foreground/72">
            <p>
              Frontera helps pharma teams move from evidence to adoption by modelling how patients,
              professionals, and systems actually make decisions.
            </p>
            <p>
              Our{" "}
              <strong className="font-semibold text-foreground">
                Connected Behavioural Intelligence System
              </strong>{" "}
              uses AI-enabled synthesis and behavioural science to decode decision drivers, identify
              friction, and design interventions that can be deployed across markets.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item.value} className="border-t border-foreground/18 pt-4">
                <p className="font-display text-4xl font-bold text-foreground">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
