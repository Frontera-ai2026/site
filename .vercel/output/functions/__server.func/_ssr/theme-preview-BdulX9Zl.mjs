import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as gsapWithCSS } from "../_libs/gsap.mjs";
import { H as Hls } from "../_libs/hls.js.mjs";
import { c as case1Portrait, a as case2Portrait, b as case5Portrait, d as case7Portrait } from "./case7-portrait-DWbh3SeC.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
function LoadingScreen({
  onComplete
}) {
  const [count, setCount] = reactExports.useState(0);
  const [wordIdx, setWordIdx] = reactExports.useState(0);
  const words = ["Research", "Strategy", "Creative"];
  reactExports.useEffect(() => {
    const start = performance.now();
    const dur = 2700;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);
  reactExports.useEffect(() => {
    const i = setInterval(() => setWordIdx((w) => (w + 1) % words.length), 900);
    return () => clearInterval(i);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[9999] bg-bg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      y: -20,
      opacity: 0
    }, animate: {
      y: 0,
      opacity: 1
    }, className: "absolute top-6 left-6 text-xs text-muted uppercase tracking-[0.3em]", children: "Frontera" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      y: 20,
      opacity: 0
    }, animate: {
      y: 0,
      opacity: 1
    }, exit: {
      y: -20,
      opacity: 0
    }, transition: {
      duration: 0.4
    }, className: "text-4xl md:text-6xl lg:text-7xl font-display text-text-primary/80", children: words[wordIdx] }, wordIdx) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 right-6 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums", children: String(count).padStart(3, "0") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full tp-accent-gradient origin-left", style: {
      transform: `scaleX(${count / 100})`,
      boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)"
    } }) })
  ] });
}
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const linkBase = "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 ${scrolled ? "shadow-md shadow-black/10" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group relative w-9 h-9 rounded-full p-[2px] tp-gradient-border transition-transform hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full rounded-full bg-bg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[13px] text-text-primary", children: "FG" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-stroke mx-1 hidden sm:block" }),
    ["Home", "Work", "About"].map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `${linkBase} ${i === 0 ? "text-text-primary bg-stroke/50" : "text-muted hover:text-text-primary hover:bg-stroke/50"}`, children: l }, l)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-stroke mx-1 hidden sm:block" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -inset-[2px] rounded-full tp-gradient-border opacity-0 group-hover:opacity-100 transition-opacity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative bg-surface rounded-full backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `${linkBase} text-text-primary inline-flex items-center gap-1`, children: [
        "Say hi ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "↗" })
      ] }) })
    ] })
  ] }) });
}
function HeroVideo() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref, autoPlay: true, muted: true, loop: true, playsInline: true, className: "absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2" });
}
function Hero() {
  const roles = ["Research", "Strategy", "Creative", "Behavioural"];
  const [ri, setRi] = reactExports.useState(0);
  const rootRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const i = setInterval(() => setRi((r) => (r + 1) % roles.length), 2e3);
    return () => clearInterval(i);
  }, []);
  reactExports.useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsapWithCSS.context(() => {
      const tl = gsapWithCSS.timeline({
        defaults: {
          ease: "power3.out"
        }
      });
      tl.fromTo(".tp-name-reveal", {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1
      });
      tl.fromTo(".tp-blur-in", {
        opacity: 0,
        filter: "blur(10px)",
        y: 20
      }, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        stagger: 0.1
      }, "-=0.9");
    }, rootRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: rootRef, className: "relative w-full h-screen overflow-hidden flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroVideo, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(var(--bg))] to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center text-center px-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tp-blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8", children: "BEHAVIOURAL INTELLIGENCE '26" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "tp-name-reveal font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-text-primary mb-6", children: "Frontera Global" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tp-blur-in text-base md:text-lg text-text-primary mb-4", children: [
        "A",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-text-primary inline-block tp-role-anim", children: roles[ri] }, ri),
        " ",
        "studio for healthcare."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tp-blur-in text-sm md:text-base text-muted max-w-md mb-12", children: "AI-driven research, strategy and creative paired with behavioural science to help healthcare teams change behaviour and deliver real-world impact." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tp-blur-in inline-flex gap-4 flex-wrap justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "group relative rounded-full text-sm px-7 py-3.5 transition-all hover:scale-105 bg-[hsl(var(--text))] text-[hsl(var(--bg))] hover:bg-[hsl(var(--bg))] hover:text-text-primary", children: "See Work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full text-sm px-7 py-3.5 transition-all hover:scale-105 border-2 border-stroke bg-bg text-text-primary", children: "Reach out" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted uppercase tracking-[0.2em]", children: "SCROLL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-stroke overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full tp-accent-gradient tp-scroll-anim absolute" }) })
    ] })
  ] });
}
function SectionHeader({
  eyebrow,
  title,
  italic,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 30
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-100px"
  }, transition: {
    duration: 1,
    ease: [0.25, 0.1, 0.25, 1]
  }, className: "mb-10 md:mb-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-px bg-stroke" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted uppercase tracking-[0.3em]", children: eyebrow })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-6xl text-text-primary leading-tight max-w-3xl", children: [
      title,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: italic })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mt-4 max-w-xl", children: sub })
  ] });
}
const works = [{
  title: "Launch Strategy",
  img: case1Portrait,
  span: "md:col-span-7"
}, {
  title: "Behavioural Research",
  img: case2Portrait,
  span: "md:col-span-5"
}, {
  title: "Creative Identity",
  img: case5Portrait,
  span: "md:col-span-5"
}, {
  title: "Automation Activation",
  img: case7Portrait,
  span: "md:col-span-7"
}];
function Works() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-bg py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Selected Work", title: "Featured", italic: "projects", sub: "A selection of healthcare programs combining AI, behavioural science, and creative." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6", children: works.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative overflow-hidden bg-surface border border-stroke rounded-3xl aspect-[4/3] ${w.span}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: w.img, alt: w.title, className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none", style: {
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "4px 4px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -inset-[2px] rounded-full tp-gradient-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white text-bg rounded-full px-5 py-2 text-sm", children: [
          "View — ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: w.title })
        ] })
      ] }) })
    ] }, w.title)) })
  ] }) });
}
function Stats() {
  const stats = [{
    n: "45+",
    l: "Data Sources"
  }, {
    n: "20+",
    l: "Markets Reached"
  }, {
    n: "100%",
    l: "Behaviourally Grounded"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-bg py-16 md:py-24 border-t border-stroke", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-10", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-6xl md:text-7xl text-text-primary mb-2", children: s.n }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted uppercase tracking-[0.2em] text-xs", children: s.l })
  ] }, s.l)) }) });
}
function Footer() {
  const marqueeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsapWithCSS.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1
    });
    return () => {
      tween.kill();
    };
  }, []);
  const v = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: v, autoPlay: true, muted: true, loop: true, playsInline: true, className: "absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: marqueeRef, className: "flex whitespace-nowrap font-display text-7xl md:text-9xl text-text-primary", children: Array.from({
        length: 10
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-8", children: "BUILDING THE FUTURE OF HEALTH •" }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -inset-[2px] rounded-full tp-gradient-border opacity-0 group-hover:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@frontera.global", className: "relative inline-flex items-center gap-2 rounded-full bg-surface text-text-primary px-8 py-4 text-base", children: "hello@frontera.global ↗" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-muted text-sm flex-wrap justify-center", children: [
          ["LinkedIn", "X", "Dribbble", "GitHub"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-text-primary transition-colors", children: l }, l)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
            ] }),
            "Available for projects"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ThemePreview() {
  const [loading, setLoading] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tp-root", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: {
      __html: THEME_CSS
    } }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { onComplete: () => setLoading(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Works, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-2 right-2 z-[100]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-xs text-muted hover:text-text-primary bg-surface px-3 py-1.5 rounded-full border border-stroke", children: "← back to site" }) })
  ] });
}
export {
  ThemePreview as component
};
