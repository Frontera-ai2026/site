import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Search, U as User, M as Menu, X, c as Star, C as Clock, d as Calendar, P as Play, e as ChevronLeft, f as ChevronRight } from "../_libs/lucide-react.mjs";
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
.cine-root, .cine-root * { font-family: 'Inter', sans-serif; }
.cine-root { background: #000; color: #fff; min-height: 100vh; }

.cine-bottom-blur {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
  mask-image: linear-gradient(to top, black 0%, transparent 45%);
}

.liquid-glass {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative; overflow: hidden;
  color: #fff;
}
.liquid-glass::before {
  content: "";
  position: absolute; inset: 0; border-radius: inherit; padding: 1.4px;
  background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

@keyframes blurFadeUp {
  from { opacity: 0; filter: blur(20px); transform: translateY(40px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
}
.animate-blur-fade-up { opacity: 0; animation: blurFadeUp 1s ease-out forwards; }
`;
function CinematicPreview() {
  const [open, setOpen] = reactExports.useState(false);
  const links = ["Work", "Capabilities", "Expertise", "About", "Contact"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cine-root relative h-screen w-screen overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: css }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { autoPlay: true, loop: true, muted: true, playsInline: true, className: "fixed inset-0 w-full h-full object-cover z-0", src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cine-bottom-blur" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-blur-fade-up text-xl md:text-2xl font-semibold tracking-tight h-8 md:h-10 flex items-center", style: {
        animationDelay: "0ms"
      }, children: "FRONTERA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-center gap-8", children: links.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "animate-blur-fade-up text-sm hover:text-gray-300 transition-colors", style: {
        animationDelay: `${100 + i * 50}ms`
      }, children: l }, l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "liquid-glass animate-blur-fade-up hidden sm:flex items-center gap-2 rounded-full px-4 md:px-6 py-2 text-sm", style: {
          animationDelay: "350ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18 }),
          " Search"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "liquid-glass animate-blur-fade-up hidden sm:flex w-10 h-10 rounded-full items-center justify-center", style: {
          animationDelay: "400ms"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen((o) => !o), className: "liquid-glass animate-blur-fade-up lg:hidden w-10 h-10 rounded-full flex items-center justify-center relative", style: {
          animationDelay: "350ms"
        }, "aria-label": "Menu", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 18, className: `absolute transition-all duration-500 ease-out ${open ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, className: `absolute transition-all duration-500 ease-out ${open ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-50"}` })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `lg:hidden absolute left-0 right-0 top-[72px] z-40 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-4 py-4", children: [
      links.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "py-3 px-3 rounded-lg hover:bg-gray-800/50 transition-all duration-500", style: {
        transform: open ? "translateX(0)" : "translateX(-10px)",
        transitionDelay: `${i * 50}ms`
      }, children: l }, l)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:hidden flex gap-3 pt-4 mt-2 border-t border-gray-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "liquid-glass flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18 }),
          " Search"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "liquid-glass w-10 h-10 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-end gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm", style: {
          animationDelay: "300ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "sm:w-5 sm:h-5 fill-white" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "45+ Data Sources" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "sm:w-5 sm:h-5" }),
            " 20+ Markets"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16, className: "sm:w-5 sm:h-5" }),
            " Est. 2024"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6", style: {
          animationDelay: "400ms",
          letterSpacing: "-0.04em"
        }, children: "Behaviourally grounded healthcare strategy." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl", style: {
          animationDelay: "500ms"
        }, children: "Research, strategy, and creative for life sciences brands — built on real human behaviour, not assumptions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "animate-blur-fade-up bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors", style: {
            animationDelay: "600ms"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18, className: "fill-black" }),
            " See Our Work"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "liquid-glass animate-blur-fade-up rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3", style: {
            animationDelay: "700ms"
          }, children: "Reach Out" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "liquid-glass animate-blur-fade-up rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2", style: {
          animationDelay: "800ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 }),
          " Previous"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "liquid-glass animate-blur-fade-up rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2", style: {
          animationDelay: "900ms"
        }, children: [
          "Next ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CinematicPreview as component
};
