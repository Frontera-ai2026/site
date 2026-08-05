import heroImg from "@/assets/frontera/hero-patient.jpg";
import { TextRotate } from "@/components/ui/text-rotate";
import { bookingUrl } from "./Nav";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-case-dark text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Patient looking out a hospital window in contemplation"
          className="h-full w-full object-cover object-[35%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,23,27,0.92)_0%,rgba(18,23,27,0.70)_38%,rgba(18,23,27,0.16)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-case-dark/55 to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end px-5 pb-12 pt-24 md:px-8 md:pb-16 lg:min-h-[720px] xl:px-0">
        <div className="reveal max-w-5xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-accent">
            Frontera Global
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.7rem]">
            <span className="flex flex-wrap items-baseline gap-x-[0.18em]">
              AI-driven{" "}
              <span className="inline-flex w-[7.5ch] overflow-hidden text-accent">
                <TextRotate
                  texts={["research", "strategy", "creative"]}
                  rotationInterval={2600}
                  splitBy="words"
                  mainClassName="inline-flex"
                  elementLevelClassName="text-accent"
                  transition={{ type: "spring", damping: 22, stiffness: 190 }}
                />
              </span>
            </span>
            <span className="block">for pharma teams.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
            Behavioural intelligence for organisations that need to understand decisions, design
            change, and deliver real-world impact across patients, professionals, and systems.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-foreground"
            >
              Book an intro call
            </a>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center border border-white/45 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-foreground"
            >
              Our work
            </a>
          </div>
        </div>

        <div className="reveal mt-14 grid gap-3 border-t border-white/20 pt-6 text-white/70 sm:grid-cols-3">
          {[
            "Global and regional pharma teams",
            "AI-enabled behavioural modelling",
            "Research, strategy, creative activation",
          ].map((item) => (
            <p key={item} className="text-xs font-medium uppercase leading-5 tracking-[0.18em]">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
