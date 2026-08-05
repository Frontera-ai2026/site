import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/editorial-preview')({
  component: EditorialPreview,
});

function EditorialPreview() {
  return (
    <div className="min-h-screen bg-[#0a1730] text-[#e8ecf3] font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Tiempos+Headline:wght@400;600&family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        .serif { font-family: 'Source Serif Pro', 'Tiempos Headline', Georgia, serif; }
        .rule { height: 1px; background: rgba(232,236,243,0.15); }
      `}</style>

      {/* Nav */}
      <header className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-[#c9a84c]" />
            <span className="text-sm tracking-[0.2em] font-semibold">FRONTERA</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-wide text-white/70">
            <a href="#">Capabilities</a>
            <a href="#">Expertise</a>
            <a href="#">Insights</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <button className="text-[12px] tracking-[0.2em] border border-white/30 px-4 py-2 hover:bg-white hover:text-[#0a1730] transition">
            ENGAGE US
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-8 pt-20 pb-24 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-2 text-[11px] tracking-[0.25em] text-[#c9a84c] pt-3">
          № 01 — PRACTICE
        </div>
        <div className="col-span-12 md:col-span-7">
          <h1 className="serif text-[64px] md:text-[88px] leading-[0.95] tracking-tight font-normal">
            Behaviourally<br />grounded<br />
            <em className="text-[#c9a84c] font-normal">healthcare strategy.</em>
          </h1>
          <p className="mt-10 text-lg text-white/70 max-w-xl leading-relaxed">
            Frontera partners with life sciences leaders to translate human behaviour
            into commercial advantage — across 20+ markets and 45+ proprietary data sources.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <button className="bg-[#c9a84c] text-[#0a1730] px-7 py-3.5 text-[13px] tracking-[0.15em] font-semibold hover:bg-[#f0d78c] transition">
              SEE OUR WORK
            </button>
            <button className="text-[13px] tracking-[0.15em] text-white/80 border-b border-white/30 pb-1 hover:text-[#c9a84c] hover:border-[#c9a84c] transition">
              REQUEST A BRIEFING →
            </button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 md:border-l border-white/10 md:pl-8 text-sm text-white/60 space-y-6">
          <div>
            <div className="text-[11px] tracking-[0.2em] text-white/40 mb-2">EST.</div>
            <div className="serif text-2xl text-white">2024</div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.2em] text-white/40 mb-2">MARKETS</div>
            <div className="serif text-2xl text-white">20+</div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.2em] text-white/40 mb-2">DATA SOURCES</div>
            <div className="serif text-2xl text-white">45+</div>
          </div>
        </div>
      </section>

      <div className="rule max-w-[1400px] mx-auto" />

      {/* Capabilities */}
      <section className="max-w-[1400px] mx-auto px-8 py-20 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <div className="text-[11px] tracking-[0.25em] text-[#c9a84c] mb-3">№ 02 — CAPABILITIES</div>
          <h2 className="serif text-4xl leading-tight">What we do<br />for our clients.</h2>
        </div>
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {[
            { n: '01', t: 'Market Access Strategy', d: 'Pricing, reimbursement and payer evidence frameworks calibrated to local payer archetypes.' },
            { n: '02', t: 'Behavioural Insight', d: 'Decision-science research uncovering the cognitive and emotional drivers behind prescribing.' },
            { n: '03', t: 'Launch Excellence', d: 'Cross-functional launch readiness, KPI architecture, and field-force enablement.' },
            { n: '04', t: 'Brand & Communications', d: 'Therapy-area positioning that resonates with HCPs, payers, and patient advocates.' },
            { n: '05', t: 'Evidence Generation', d: 'RWE study design and HEOR translation that holds up at scientific committees.' },
            { n: '06', t: 'Commercial Analytics', d: 'Forecasting, segmentation and territory design powered by proprietary data.' },
          ].map((c) => (
            <div key={c.n} className="bg-[#0a1730] p-8 hover:bg-[#0f1f3d] transition">
              <div className="serif text-3xl text-[#c9a84c] mb-4">{c.n}</div>
              <div className="text-base font-semibold mb-2">{c.t}</div>
              <div className="text-sm text-white/60 leading-relaxed">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule max-w-[1400px] mx-auto" />

      {/* Editorial quote */}
      <section className="max-w-[1400px] mx-auto px-8 py-24 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-2 text-[11px] tracking-[0.25em] text-[#c9a84c] pt-3">
          № 03 — POINT OF VIEW
        </div>
        <div className="col-span-12 md:col-span-10">
          <blockquote className="serif italic text-3xl md:text-5xl leading-[1.2] text-white/90">
            "The next decade of healthcare commercialisation will be won by
            organisations that treat <span className="text-[#c9a84c] not-italic">human behaviour</span> as
            a first-class asset — not an afterthought."
          </blockquote>
          <div className="mt-10 text-sm tracking-wide text-white/50">
            — FRONTERA PRACTICE BRIEF, Q2 2026
          </div>
        </div>
      </section>

      <div className="rule max-w-[1400px] mx-auto" />

      {/* Footer */}
      <footer className="max-w-[1400px] mx-auto px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] tracking-[0.15em] text-white/50">
        <div>© 2026 FRONTERA CREDENTIALS LTD.</div>
        <div className="flex gap-8">
          <a href="#">LONDON</a>
          <a href="#">NEW YORK</a>
          <a href="#">SINGAPORE</a>
        </div>
      </footer>
    </div>
  );
}
