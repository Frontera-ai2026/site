import { bookingUrl } from "./Nav";

export type CaseStudyProps = {
  id: string;
  badge: string;
  tags: string[];
  heroHeadline: string;
  heroBody: string;
  portrait: string;
  portraitAlt: string;
  ctaSubject: string;
  detailHeading: string;
  detailSub: string;
  thumb: string;
  thumbAlt: string;
  objective: string;
  techniques: { title: string; body: string }[];
  roleOfAi: string;
  deliverables: string;
  impact: string[];
  outcome: string;
  rotatingWords?: string[];
  summary?: string;
  metric?: string;
  featured?: boolean;
};

function FeaturedCase({ p }: { p: CaseStudyProps }) {
  return (
    <article id={p.id} className="reveal scroll-mt-24 overflow-hidden border bg-background">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[320px] lg:min-h-full">
          <img
            src={p.portrait}
            alt={p.portraitAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-case-dark/18" />
        </div>
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="border border-foreground/16 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/62"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Case {p.badge}
          </p>
          <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {p.heroHeadline}
          </h3>
          <p className="mt-5 text-base leading-8 text-foreground/68">{p.summary ?? p.heroBody}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Deliverable
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/75">{p.deliverables}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Outcome
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/75">{p.outcome}</p>
            </div>
          </div>

          <details className="mt-8 border-t border-foreground/12 pt-5">
            <summary className="cursor-pointer text-sm font-semibold text-foreground transition-colors hover:text-accent">
              Read the behavioural approach
            </summary>
            <div className="mt-5 grid gap-5 text-sm leading-7 text-foreground/70 md:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground">Objective</p>
                <p className="mt-1">{p.objective}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Role of AI</p>
                <p className="mt-1">{p.roleOfAi}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold text-foreground">Impact</p>
                <div className="mt-1 space-y-2">
                  {p.impact.map((impact) => (
                    <p key={impact}>{impact}</p>
                  ))}
                </div>
              </div>
            </div>
          </details>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center justify-center border border-foreground px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            Discuss this case
          </a>
        </div>
      </div>
    </article>
  );
}

function CaseCard({ p }: { p: CaseStudyProps }) {
  return (
    <article className="group reveal grid min-h-[300px] overflow-hidden border bg-background transition-transform duration-300 hover:-translate-y-1">
      <div className="relative min-h-[160px]">
        <img
          src={p.thumb}
          alt={p.thumbAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-case-dark/12 transition-colors group-hover:bg-case-dark/4" />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
          Case {p.badge}
        </p>
        <h3 className="mt-3 font-display text-xl font-bold leading-tight text-foreground">
          {p.detailHeading}
        </h3>
        <p className="mt-3 text-sm leading-6 text-foreground/62">{p.detailSub}</p>
        {p.metric && (
          <p className="mt-5 border-t border-foreground/12 pt-4 text-sm font-semibold text-foreground">
            {p.metric}
          </p>
        )}
        <details className="mt-5 border-t border-foreground/12 pt-4">
          <summary className="cursor-pointer text-sm font-semibold text-foreground transition-colors hover:text-accent">
            Read the behavioural approach
          </summary>
          <div className="mt-4 space-y-4 text-sm leading-6 text-foreground/68">
            <div>
              <p className="font-semibold text-foreground">Objective</p>
              <p className="mt-1">{p.objective}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Role of AI</p>
              <p className="mt-1">{p.roleOfAi}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Impact</p>
              <div className="mt-1 space-y-2">
                {p.impact.map((impact) => (
                  <p key={impact}>{impact}</p>
                ))}
              </div>
            </div>
          </div>
        </details>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent"
        >
          Discuss this case
        </a>
      </div>
    </article>
  );
}

export function CaseStudies({ cases }: { cases: CaseStudyProps[] }) {
  const featured = cases.filter((p) => p.featured);
  const remaining = cases.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20 xl:px-0">
        <div className="reveal grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Proof</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-[3.4rem]">
              Behavioural work, built for real-world adoption.
            </h2>
          </div>
          <p className="max-w-2xl pt-2 text-lg leading-8 text-foreground/68 lg:pt-12">
            Selected work across launch strategy, patient experience, omnichannel planning, medical
            affairs, and scalable activation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-12">
          {featured.map((p) => (
            <FeaturedCase key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {remaining.map((p) => (
            <CaseCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudy(p: CaseStudyProps) {
  return <FeaturedCase p={p} />;
}
