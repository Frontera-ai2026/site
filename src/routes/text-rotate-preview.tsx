import { createFileRoute } from "@tanstack/react-router";
import { TextRotate } from "@/components/ui/text-rotate";
import { useRef } from "react";
import type { TextRotateRef } from "@/components/ui/text-rotate";

export const Route = createFileRoute("/text-rotate-preview")({
  component: TextRotatePreview,
});

const caseOutcomes = [
  "Uncovering how decisions are made",
  "Validating strategy through patient experience",
  "Designing patient support through real-world behaviour",
  "Building behaviour-led omnichannel engagement",
  "Using creative identity to achieve relevance",
  "Embedding continuous patient feedback",
  "Driving clinic growth through peer proof",
];

const verbs = [
  "Decoding decisions",
  "Designing change",
  "Delivering outcomes",
];

function TextRotatePreview() {
  const ref = useRef<TextRotateRef>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border px-6 md:px-20 py-5 flex items-center justify-between">
        <span className="font-display font-bold text-xl">TextRotate Preview</span>
        <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to site
        </a>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-20 py-16 md:py-24 space-y-24">
        {/* 1. Hero-like headline */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Hero Integration</p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-[20ch]">
            AI-driven{" "}
            <TextRotate
              texts={["research", "strategy", "creative"]}
              rotationInterval={2500}
              mainClassName="text-accent inline-flex"
              elementLevelClassName="text-accent"
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            />{" "}
            for intelligent healthcare teams
          </h1>
        </section>

        {/* 2. Case-study headline rotation */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Case Study Headlines</p>
          <div className="bg-case-dark text-white p-8 md:p-12 rounded-sm">
            <p className="text-accent text-xs uppercase tracking-[0.25em] mb-5">Case ONE</p>
            <h2 className="font-display text-2xl md:text-4xl leading-tight max-w-[24ch]">
              <TextRotate
                texts={caseOutcomes}
                rotationInterval={3000}
                mainClassName="inline-flex"
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
              />
            </h2>
            <p className="mt-4 text-white/60 max-w-xl leading-relaxed text-sm">
              Launching across dual indications in highly diverse reimbursement environments required combining AI-driven analysis with behavioural science.
            </p>
          </div>
        </section>

        {/* 3. Tagline rotation */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Tagline / Values</p>
          <div className="flex flex-col items-start gap-2">
            <p className="font-display text-2xl md:text-3xl italic text-foreground/70">
              If behaviour doesn't change,{" "}
              <TextRotate
                texts={["nothing does.", "outcomes stall.", "strategy fails.", "patients wait."]}
                rotationInterval={2000}
                mainClassName="text-accent inline-flex"
                elementLevelClassName="text-accent"
              />
            </p>
          </div>
        </section>

        {/* 4. Manual control demo */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Manual Control</p>
          <div className="border border-border p-8 rounded-sm space-y-6">
            <div className="font-display text-3xl md:text-5xl">
              <TextRotate
                ref={ref}
                texts={["Research.", "Strategy.", "Creative.", "Activation."]}
                rotationInterval={6000}
                auto={false}
                mainClassName="text-accent inline-flex"
                elementLevelClassName="text-accent"
                transition={{ type: "spring", damping: 18, stiffness: 250 }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => ref.current?.previous()}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => ref.current?.next()}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Next →
              </button>
              <button
                onClick={() => ref.current?.reset()}
                className="px-4 py-2 border border-input bg-background text-sm font-medium hover:bg-accent transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* 5. Stagger effects */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Stagger Effects</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border p-6 rounded-sm">
              <p className="text-sm text-muted-foreground mb-3">From first</p>
              <TextRotate
                texts={["Behavioural Evidence", "Intelligence Modelling", "Launch Excellence"]}
                rotationInterval={3000}
                staggerDuration={0.03}
                staggerFrom="first"
                mainClassName="font-display text-2xl"
              />
            </div>
            <div className="border border-border p-6 rounded-sm">
              <p className="text-sm text-muted-foreground mb-3">From center</p>
              <TextRotate
                texts={["Behavioural Evidence", "Intelligence Modelling", "Launch Excellence"]}
                rotationInterval={3000}
                staggerDuration={0.03}
                staggerFrom="center"
                mainClassName="font-display text-2xl"
              />
            </div>
          </div>
        </section>

        {/* 6. Word-level split */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Word-Level Split</p>
          <div className="bg-muted/50 p-8 rounded-sm">
            <TextRotate
              texts={["Decoding decisions.", "Designing change.", "Delivering outcomes."]}
              rotationInterval={2500}
              splitBy="words"
              mainClassName="font-display text-3xl md:text-5xl"
              transition={{ type: "spring", damping: 22, stiffness: 200 }}
            />
          </div>
        </section>

        {/* 7. Subtle inline use */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Inline Context</p>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl">
            Frontera combines{" "}
            <TextRotate
              texts={["AI-driven research", "behavioural strategy", "creative execution"]}
              rotationInterval={2200}
              mainClassName="text-accent inline-flex font-semibold"
              elementLevelClassName="text-accent"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />{" "}
            to help healthcare teams change behaviour and deliver real-world impact.
          </p>
        </section>
      </div>
    </div>
  );
}
