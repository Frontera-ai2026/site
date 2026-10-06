import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "./Nav";
import { DarkBar } from "./DarkBar";
import cardiovascularImage from "@/assets/frontera/cardiovascular-credentials.jpeg.asset.json";
import ckdImage from "@/assets/frontera/ckd-credentials.jpeg.asset.json";
import obesityMashImage from "@/assets/frontera/obesity-mash-credentials.jpeg.asset.json";
import diagnosticsImage from "@/assets/frontera/diagnostics-credentials.jpeg.asset.json";
import aestheticsImage from "@/assets/frontera/aesthetics-credentials.jpeg.asset.json";

export const therapyAreas = [
  { name: "Cardiovascular", slug: "cardiovascular", number: "01", image: cardiovascularImage.url },
  { name: "CKD", slug: "ckd", number: "02", image: ckdImage.url },
  { name: "Obesity & MASH", slug: "obesity-mash", number: "03", image: obesityMashImage.url },
  { name: "Diagnostics", slug: "diagnostics", number: "04", image: diagnosticsImage.url },
  { name: "Aesthetics", slug: "aesthetics", number: "05", image: aestheticsImage.url },
] as const;

export type TherapyArea = (typeof therapyAreas)[number];

export function TherapyCredentials({ area }: { area: TherapyArea }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-16">
        <section className="bg-case-dark text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 xl:px-0">
            <Link to="/credentials" className="inline-flex items-center gap-2 text-sm text-primary-foreground/65 transition-colors hover:text-accent">
              <ArrowLeft className="size-4" aria-hidden="true" /> All credentials
            </Link>
            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Therapeutic area / {area.number}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight md:text-7xl">{area.name}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-primary-foreground/70">Frontera credentials and experience in {area.name}.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16 xl:px-0">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <p className="text-sm text-muted-foreground">{area.name} credentials</p>
            <a href={area.image} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent">
              Open full size <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <a href={area.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${area.name} credentials full size`} className="mx-auto mt-8 block max-w-[746px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <img src={area.image} alt={`Frontera Global ${area.name} credentials: Decode, Design and Deploy experience`} width="746" height="1054" className="block h-auto w-full" />
          </a>
        </section>
        <DarkBar />
      </main>
    </div>
  );
}