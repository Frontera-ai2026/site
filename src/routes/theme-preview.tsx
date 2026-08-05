import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Hls from "hls.js";

import case1Portrait from "@/assets/frontera/case1-portrait.jpg";
import case2Portrait from "@/assets/frontera/case2-portrait.jpg";
import case5Portrait from "@/assets/frontera/case5-portrait.jpg";
import case7Portrait from "@/assets/frontera/case7-portrait.jpg";

const VIDEO_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const THEME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@1&display=swap');

.tp-root {
  --bg: 0 0% 4%;
  --surface: 0 0% 8%;
  --text: 0 0% 96%;
  --muted: 0 0% 53%;
  --stroke: 0 0% 12%;
  background: hsl(var(--bg));
  color: hsl(var(--text));
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}
.tp-root .font-display { font-family: 'Instrument Serif', serif; font-style: italic; }
.tp-root .bg-bg { background: hsl(var(--bg)); }
.tp-root .bg-surface { background: hsl(var(--surface)); }
.tp-root .bg-surface\\/30 { background: hsl(var(--surface) / 0.3); }
.tp-root .text-text-primary { color: hsl(var(--text)); }
.tp-root .text-muted { color: hsl(var(--muted)); }
.tp-root .border-stroke { border-color: hsl(var(--stroke)); }
.tp-root .bg-stroke\\/50 { background: hsl(var(--stroke) / 0.5); }
.tp-root .bg-stroke { background: hsl(var(--stroke)); }
.tp-accent-gradient { background: linear-gradient(90deg, #89AACC 0%, #4E85BF 100%); }
.tp-gradient-border {
  background: linear-gradient(90deg, #89AACC, #4E85BF, #89AACC);
  background-size: 200% 100%;
  animation: tp-gradient-shift 6s ease infinite;
}
@keyframes tp-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes tp-scroll-down {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}
.tp-scroll-anim { animation: tp-scroll-down 1.5s ease-in-out infinite; }
@keyframes tp-role-fade-in {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
.tp-role-anim { animation: tp-role-fade-in 0.4s ease-out; }
`;

export const Route = createFileRoute("/theme-preview")({
  head: () => ({
    meta: [{ title: "Theme Preview — Frontera" }],
  }),
  component: ThemePreview,
});

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const words = ["Research", "Strategy", "Creative"];

  useEffect(() => {
    const start = performance.now();
    const dur = 2700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const i = setInterval(() => setWordIdx((w) => (w + 1) % words.length), 900);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg overflow-hidden">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-6 left-6 text-xs text-muted uppercase tracking-[0.3em]"
      >
        Frontera
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIdx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary/80"
          >
            {words[wordIdx]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-6 right-6 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
        {String(count).padStart(3, "0")}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="h-full tp-accent-gradient origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const linkBase =
    "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors";
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        <div className="group relative w-9 h-9 rounded-full p-[2px] tp-gradient-border transition-transform hover:scale-110">
          <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display text-[13px] text-text-primary">FG</span>
          </div>
        </div>
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />
        {["Home", "Work", "About"].map((l, i) => (
          <button
            key={l}
            className={`${linkBase} ${
              i === 0
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {l}
          </button>
        ))}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />
        <div className="relative group">
          <span className="absolute -inset-[2px] rounded-full tp-gradient-border opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-surface rounded-full backdrop-blur-md">
            <button className={`${linkBase} text-text-primary inline-flex items-center gap-1`}>
              Say hi <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(v);
      return () => hls.destroy();
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = VIDEO_SRC;
    }
  }, []);
  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
    />
  );
}

function Hero() {
  const roles = ["Research", "Strategy", "Creative", "Behavioural"];
  const [ri, setRi] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => setRi((r) => (r + 1) % roles.length), 2000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".tp-name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      );
      tl.fromTo(
        ".tp-blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        "-=0.9",
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <HeroVideo />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(var(--bg))] to-transparent" />
      <Navbar />
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <div className="tp-blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          BEHAVIOURAL INTELLIGENCE '26
        </div>
        <h1 className="tp-name-reveal font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-text-primary mb-6">
          Frontera Global
        </h1>
        <div className="tp-blur-in text-base md:text-lg text-text-primary mb-4">
          A{" "}
          <span key={ri} className="font-display text-text-primary inline-block tp-role-anim">
            {roles[ri]}
          </span>{" "}
          studio for healthcare.
        </div>
        <p className="tp-blur-in text-sm md:text-base text-muted max-w-md mb-12">
          AI-driven research, strategy and creative paired with behavioural science to help
          healthcare teams change behaviour and deliver real-world impact.
        </p>
        <div className="tp-blur-in inline-flex gap-4 flex-wrap justify-center">
          <button className="group relative rounded-full text-sm px-7 py-3.5 transition-all hover:scale-105 bg-[hsl(var(--text))] text-[hsl(var(--bg))] hover:bg-[hsl(var(--bg))] hover:text-text-primary">
            See Work
          </button>
          <button className="rounded-full text-sm px-7 py-3.5 transition-all hover:scale-105 border-2 border-stroke bg-bg text-text-primary">
            Reach out
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="w-full h-full tp-accent-gradient tp-scroll-anim absolute" />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  italic,
  sub,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  sub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-10 md:mb-14"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-stroke" />
        <span className="text-xs text-muted uppercase tracking-[0.3em]">{eyebrow}</span>
      </div>
      <h2 className="text-4xl md:text-6xl text-text-primary leading-tight max-w-3xl">
        {title} <span className="font-display">{italic}</span>
      </h2>
      <p className="text-muted mt-4 max-w-xl">{sub}</p>
    </motion.div>
  );
}

const works = [
  { title: "Launch Strategy", img: case1Portrait, span: "md:col-span-7" },
  { title: "Behavioural Research", img: case2Portrait, span: "md:col-span-5" },
  { title: "Creative Identity", img: case5Portrait, span: "md:col-span-5" },
  { title: "Automation Activation", img: case7Portrait, span: "md:col-span-7" },
];

function Works() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          italic="projects"
          sub="A selection of healthcare programs combining AI, behavioural science, and creative."
        />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {works.map((w) => (
            <div
              key={w.title}
              className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl aspect-[4/3] ${w.span}`}
            >
              <img
                src={w.img}
                alt={w.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-500 flex items-center justify-center">
                <div className="relative">
                  <span className="absolute -inset-[2px] rounded-full tp-gradient-border" />
                  <div className="relative bg-white text-bg rounded-full px-5 py-2 text-sm">
                    View — <span className="font-display">{w.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "45+", l: "Data Sources" },
    { n: "20+", l: "Markets Reached" },
    { n: "100%", l: "Behaviourally Grounded" },
  ];
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-6xl md:text-7xl text-text-primary mb-2">{s.n}</div>
            <div className="text-muted uppercase tracking-[0.2em] text-xs">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(el);
      return () => hls.destroy();
    } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = VIDEO_SRC;
    }
  }, []);

  return (
    <section className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden">
      <video
        ref={v}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10">
        <div className="overflow-hidden mb-16">
          <div ref={marqueeRef} className="flex whitespace-nowrap font-display text-7xl md:text-9xl text-text-primary">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mx-8">
                BUILDING THE FUTURE OF HEALTH •
              </span>
            ))}
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
          <div className="relative group mb-12">
            <span className="absolute -inset-[2px] rounded-full tp-gradient-border opacity-0 group-hover:opacity-100 transition-opacity" />
            <a
              href="mailto:hello@frontera.global"
              className="relative inline-flex items-center gap-2 rounded-full bg-surface text-text-primary px-8 py-4 text-base"
            >
              hello@frontera.global ↗
            </a>
          </div>
          <div className="flex items-center gap-6 text-muted text-sm flex-wrap justify-center">
            {["LinkedIn", "X", "Dribbble", "GitHub"].map((l) => (
              <a key={l} href="#" className="hover:text-text-primary transition-colors">
                {l}
              </a>
            ))}
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemePreview() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="tp-root">
      <style dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Hero />
      <Works />
      <Stats />
      <Footer />
      <div className="fixed top-2 right-2 z-[100]">
        <Link to="/" className="text-xs text-muted hover:text-text-primary bg-surface px-3 py-1.5 rounded-full border border-stroke">
          ← back to site
        </Link>
      </div>
    </div>
  );
}
