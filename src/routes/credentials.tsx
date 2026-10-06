import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, HeartPulse, Droplets, Scale, TestTube2, Sparkles } from "lucide-react";
import { Nav } from "@/components/frontera/Nav";
import { DarkBar } from "@/components/frontera/DarkBar";
import { therapyAreas } from "@/components/frontera/TherapyCredentials";
import credentialsPdf from "@/assets/frontera/frontera-credentials.pdf.asset.json";
import approachImage from "@/assets/frontera/frontera-approach.jpg.asset.json";
import heroBackground from "@/assets/frontera/credentials-backgrounds/hero-science-bg.webp.asset.json";
import generalBackground from "@/assets/frontera/credentials-backgrounds/general-clean.jpg";
import cardiovascularBackground from "@/assets/frontera/credentials-backgrounds/cardiovascular-clean.jpg";
import ckdBackground from "@/assets/frontera/credentials-backgrounds/ckd-clean.jpg";
import obesityBackground from "@/assets/frontera/credentials-backgrounds/obesity-mash-clean.jpg";
import diagnosticsBackground from "@/assets/frontera/credentials-backgrounds/diagnostics-clean.jpg";
import aestheticsBackground from "@/assets/frontera/credentials-backgrounds/aesthetics-clean.jpg";

const areaCards = [
  { ...therapyAreas[0], number: "02", icon: HeartPulse, background: cardiovascularBackground, blurb: "Changing behaviour to improve cardiovascular health across the patient journey." },
  { ...therapyAreas[1], number: "03", icon: Droplets, background: ckdBackground, blurb: "Insight-led strategies to support earlier detection, better management and improved outcomes." },
  { ...therapyAreas[2], number: "04", icon: Scale, background: obesityBackground, blurb: "Evidence-based approaches to shift behaviour and improve metabolic health." },
  { ...therapyAreas[3], number: "05", icon: TestTube2, background: diagnosticsBackground, blurb: "Driving earlier detection through insight, education and engagement." },
  { ...therapyAreas[4], number: "06", icon: Sparkles, background: aestheticsBackground, blurb: "Shaping perceptions and behaviours in aesthetic care through insight and creativity." },
] as const;

export const Route = createFileRoute("/credentials")({
  head: () => ({ meta: [
    { title: "Credentials & Therapeutic Experience — Frontera Global" },
    { name: "description", content: "Explore Frontera Global's credentials, connected behavioural approach and therapeutic area experience." },
    { property: "og:title", content: "Credentials & Therapeutic Experience — Frontera Global" },
    { property: "og:description", content: "Explore our credentials and find Frontera's experience by therapeutic area." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Credentials,
});

function Credentials() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-16">
        <section className="credentials-image-bg bg-case-dark text-primary-foreground" style={{ backgroundImage: `url("${heroBackground.url}")` }}>
          <div className="mx-auto max-w-[1380px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-14 xl:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Frontera Global / Credentials</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-tight md:text-7xl">Credentials</h1>
            <span className="mt-3 block h-0.5 w-12 bg-accent" aria-hidden="true" />
            <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/80 md:text-lg">
              Research, strategy and creative engagement informed by behavioural science.<br className="hidden md:block" /> Explore how we find what holds better care back — then make it move.
            </p>
            <div className="mt-6 grid gap-3 lg:grid-cols-[30%_minmax(0,1fr)] lg:gap-3" aria-label="View credentials">
              <a href={credentialsPdf.url} target="_blank" rel="noopener noreferrer" style={{ backgroundImage: `url("${generalBackground}")` }} className="credentials-image-bg group flex min-h-[340px] flex-col justify-between border border-accent bg-case-dark p-6 transition-colors hover:border-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:min-h-[415px] lg:p-7">
                <span className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-4 text-sm font-medium text-primary-foreground/85">01 <span className="h-px w-9 bg-primary-foreground/40" aria-hidden="true" /></span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary-foreground/40 transition-colors group-hover:border-accent group-hover:text-accent"><ArrowRight className="size-5" aria-hidden="true" /></span>
                </span>
                <span className="block max-w-[270px]">
                  <span className="block font-display text-4xl font-bold leading-tight md:text-[2.65rem]">General<br />credentials</span>
                  <span className="mt-4 block text-sm leading-6 text-primary-foreground/80">Our end-to-end expertise across therapeutic areas, from insight and strategy to creative and engagement.</span>
                  <span className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">View credentials <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </span>
              </a>
              <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2" >
                {areaCards.map((card, index) => (
                  <Link key={card.slug} to="/credentials/$area" params={{ area: card.slug }} style={{ backgroundImage: `url("${card.background}")` }} className={`credentials-image-bg group flex min-h-[230px] min-w-0 flex-col justify-between border border-primary-foreground/30 bg-case-dark p-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:min-h-0 lg:p-5 ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-3 text-xs font-medium text-primary-foreground/85">{card.number} <span className="h-px w-7 bg-primary-foreground/40" aria-hidden="true" /></span>
                      <card.icon className="size-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
                      <span className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full border border-primary-foreground/40 transition-colors group-hover:border-accent group-hover:text-accent"><ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
                    </span>
                    <span className="block max-w-[220px]">
                      <span className="block font-display text-[1.45rem] font-bold leading-[1.15] md:text-[1.6rem]">{card.name}<br />credentials</span>
                      <span className="mt-3 block text-sm leading-5 text-primary-foreground/80">{card.blurb}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20 xl:px-0">
            <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Our approach</p>
                <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl">From pathway friction to market momentum.</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">We decode how care really happens, design what needs to change and deploy engagement that moves people from awareness to action.</p>
              </div>
              <a href={credentialsPdf.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent">Read the overview <ArrowUpRight className="size-4" aria-hidden="true" /></a>
            </div>
            <a href={credentialsPdf.url} target="_blank" rel="noopener noreferrer" aria-label="Open Frontera credentials PDF" className="mt-9 block overflow-hidden border border-border bg-card transition-opacity hover:opacity-90">
              <img src={approachImage.url} alt="Frontera's Decode, Design and Deploy approach to healthcare behaviour change" className="block h-auto w-full" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">Frontera approach overview · Select the image to view the full credentials document</p>
          </div>
        </section>

        <DarkBar />
      </main>
    </div>
  );
}