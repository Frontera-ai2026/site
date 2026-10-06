import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/frontera/Nav";
import { DarkBar } from "@/components/frontera/DarkBar";
import approachImage from "@/assets/frontera/frontera-approach.jpg.asset.json";

export const Route = createFileRoute("/credentials_/general")({
  head: () => ({ meta: [
    { title: "General Credentials — Frontera Global" },
    { name: "description", content: "Frontera Global's end-to-end expertise across therapeutic areas, from insight and strategy to creative and engagement." },
    { property: "og:title", content: "General Credentials — Frontera Global" },
    { property: "og:description", content: "We find what is holding better care back. Then we make it move." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: GeneralCredentials,
});

function GeneralCredentials() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-16">
        <section className="bg-case-dark text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 xl:px-0">
            <Link to="/credentials" className="inline-flex items-center gap-2 text-sm text-primary-foreground/65 transition-colors hover:text-accent">
              <ArrowLeft className="size-4" aria-hidden="true" /> All credentials
            </Link>
            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Credentials / Overview</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight md:text-7xl">General credentials</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-primary-foreground/70">Our end-to-end expertise across therapeutic areas, from insight and strategy to creative and engagement.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16 xl:px-0">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <p className="text-sm text-muted-foreground">General credentials</p>
            <a href={approachImage.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent">
              Open full size <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <a href={approachImage.url} target="_blank" rel="noopener noreferrer" aria-label="Open general credentials full size" className="mt-8 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <img src={approachImage.url} alt="Frontera Global general credentials: Decode, Design and Deploy approach to healthcare behaviour change" className="block h-auto w-full border border-border" />
          </a>
        </section>
        <DarkBar />
      </main>
    </div>
  );
}
