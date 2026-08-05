import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, User, Menu, X, Star, Clock, Calendar, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/cinematic-preview')({
  component: CinematicPreview,
});

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
  const [open, setOpen] = useState(false);
  const links = ['Work', 'Capabilities', 'Expertise', 'About', 'Contact'];

  return (
    <div className="cine-root relative h-screen w-screen overflow-hidden flex flex-col">
      <style>{css}</style>

      <video
        autoPlay loop muted playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
      />
      <div className="cine-bottom-blur" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
        <div className="animate-blur-fade-up text-xl md:text-2xl font-semibold tracking-tight h-8 md:h-10 flex items-center" style={{ animationDelay: '0ms' }}>
          FRONTERA
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l, i) => (
            <a key={l} href="#" className="animate-blur-fade-up text-sm hover:text-gray-300 transition-colors" style={{ animationDelay: `${100 + i * 50}ms` }}>
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="liquid-glass animate-blur-fade-up hidden sm:flex items-center gap-2 rounded-full px-4 md:px-6 py-2 text-sm" style={{ animationDelay: '350ms' }}>
            <Search size={18} /> Search
          </button>
          <button className="liquid-glass animate-blur-fade-up hidden sm:flex w-10 h-10 rounded-full items-center justify-center" style={{ animationDelay: '400ms' }}>
            <User size={18} />
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            className="liquid-glass animate-blur-fade-up lg:hidden w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{ animationDelay: '350ms' }}
            aria-label="Menu"
          >
            <Menu size={18} className={`absolute transition-all duration-500 ease-out ${open ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
            <X size={18} className={`absolute transition-all duration-500 ease-out ${open ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute left-0 right-0 top-[72px] z-40 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col px-4 py-4">
          {links.map((l, i) => (
            <a
              key={l} href="#"
              className="py-3 px-3 rounded-lg hover:bg-gray-800/50 transition-all duration-500"
              style={{ transform: open ? 'translateX(0)' : 'translateX(-10px)', transitionDelay: `${i * 50}ms` }}
            >
              {l}
            </a>
          ))}
          <div className="sm:hidden flex gap-3 pt-4 mt-2 border-t border-gray-800">
            <button className="liquid-glass flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm">
              <Search size={18} /> Search
            </button>
            <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
          <div className="flex-1">
            <div className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm" style={{ animationDelay: '300ms' }}>
              <span className="flex items-center gap-2"><Star size={16} className="sm:w-5 sm:h-5 fill-white" /> <span className="font-medium">45+ Data Sources</span></span>
              <span className="flex items-center gap-2"><Clock size={16} className="sm:w-5 sm:h-5" /> 20+ Markets</span>
              <span className="flex items-center gap-2"><Calendar size={16} className="sm:w-5 sm:h-5" /> Est. 2024</span>
            </div>
            <h1 className="animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6" style={{ animationDelay: '400ms', letterSpacing: '-0.04em' }}>
              Behaviourally grounded healthcare strategy.
            </h1>
            <p className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl" style={{ animationDelay: '500ms' }}>
              Research, strategy, and creative for life sciences brands — built on real human behaviour, not assumptions.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button className="animate-blur-fade-up bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors" style={{ animationDelay: '600ms' }}>
                <Play size={18} className="fill-black" /> See Our Work
              </button>
              <button className="liquid-glass animate-blur-fade-up rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3" style={{ animationDelay: '700ms' }}>
                Reach Out
              </button>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <button className="liquid-glass animate-blur-fade-up rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2" style={{ animationDelay: '800ms' }}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="liquid-glass animate-blur-fade-up rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2" style={{ animationDelay: '900ms' }}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
