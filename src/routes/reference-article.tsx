import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/frontera/Nav";
import { DarkBar } from "@/components/frontera/DarkBar";
import approachImage from "@/assets/frontera/frontera-approach.jpg.asset.json";

export const Route = createFileRoute("/reference-article")({
  head: () => ({ meta: [
    { title: "Our Approach — Frontera Global" },
    { name: "description", content: "Decode, design and deploy: Frontera's approach to moving healthcare behaviour forward." },
    { property: "og:title", content: "Our Approach — Frontera Global" },
    { property: "og:description", content: "See Frontera's Decode, Design and Deploy approach to healthcare behaviour change." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ReferenceArticle,
});

function ReferenceArticle() {
  return <div className="min-h-screen bg-background">
    <Nav />
    <main className="pt-16">
      <section className="bg-case-dark text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20 xl:px-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Frontera Global / Our approach</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">From friction to momentum.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/70">We find what is holding better care back. Then we make it move.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16 xl:px-0">
        <img src={approachImage.url} alt="Frontera Global's Decode, Design and Deploy approach, with healthcare imagery and the questions it helps answer" className="block h-auto w-full border border-border" />
        <Link to="/credentials" className="mt-8 inline-flex border-b border-accent pb-1 text-sm font-semibold text-foreground transition-colors hover:text-accent">Explore credentials →</Link>
      </section>
      <DarkBar />
    </main>
  </div>;
}