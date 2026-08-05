import { bookingUrl } from "./Nav";

const groups = [
  {
    title: "Research and intelligence",
    items: [
      "Journey mapping",
      "Segmentation and profiling",
      "Behavioural evidence synthesis",
      "Insight mining",
      "KOL and influence mapping",
      "Message and asset testing",
    ],
  },
  {
    title: "Strategy and planning",
    items: [
      "Launch strategy",
      "Brand positioning",
      "Patient and HCP engagement strategy",
      "Omnichannel planning",
      "Performance frameworks",
      "Workshops and playbooks",
    ],
  },
  {
    title: "Creative Digital Activation",
    items: [
      "Campaign platforms",
      "Disease awareness",
      "Messaging systems",
      "Digital tools",
      "Congress experiences",
      "Personalised outreach",
    ],
  },
];


const introAgenda = [
  "Pressure-test a launch or activation challenge",
  "Identify behavioural friction in the journey",
  "Explore where AI can accelerate insight and targeting",
  "Discuss scalable outreach or GTM automation",
  "Define the next practical intervention",
];

export function Capabilities() {
  return (
    <section id="deliverables" className="scroll-mt-20 bg-off-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 xl:px-0">
        <div className="reveal grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Capabilities
            </p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
              The work behind the outcome.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-foreground/68">
            Frontera covers the connected work required to move from understanding a behaviour to
            changing it in market.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.title} className="reveal border bg-background p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold text-foreground">{group.title}</h3>
              <ul className="mt-8 grid gap-4 text-sm text-foreground/70">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>


        <div className="reveal mt-16 grid overflow-hidden bg-case-dark text-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 md:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Start the conversation
            </p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Bring a live healthcare challenge. We will help frame the behavioural path forward.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              Use the intro call to pressure-test a launch plan, patient support challenge,
              omnichannel question, or activation opportunity.
            </p>
          </div>
          <div className="border-t border-white/10 bg-white/6 p-7 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/48">
              On the intro call
            </p>
            <ol className="mt-7 grid gap-4">
              {introAgenda.map((item, index) => (
                <li key={item} className="grid grid-cols-[2.25rem_1fr] gap-4 text-sm leading-6">
                  <span className="flex h-9 w-9 items-center justify-center border border-white/16 font-display text-sm font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1.5 text-white/72">{item}</span>
                </li>
              ))}
            </ol>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center bg-accent px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-foreground"
            >
              Book an intro call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
