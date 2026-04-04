import React, { useEffect } from 'react';

interface HeroPanelProps {
  onNavigate: (index: number) => void;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.body.classList.add('cursor-crosshair');
    return () => document.body.classList.remove('cursor-crosshair');
  }, []);

  return (
    <section
      className="w-screen h-screen flex-shrink-0 overflow-hidden relative bg-[#181212]"
      style={{ maxWidth: '100vw', maxHeight: '100vh' }}
    >
      {/* Ambient blobs — decorative only */}
      <div
        className="absolute top-0 right-0 pointer-events-none -z-10"
        style={{ width: '50%', height: '60%', background: 'radial-gradient(ellipse at top right, rgba(141,21,21,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none -z-10"
        style={{ width: '40%', height: '50%', background: 'radial-gradient(ellipse at bottom left, rgba(147,6,22,0.12) 0%, transparent 70%)' }}
      />

      {/*
        LAYOUT: full-height flex column, split into 3 rows.
        - Row A (flex-1): Headline left + tagline right — fills available space
        - Row B (fixed): Bottom bar with role, socials, scroll hint
        No min-h-screen, no gap-12, no absolute words overflowing.
      */}
      <div className="relative z-10 h-full flex flex-col px-6 sm:px-10 md:px-16 lg:px-20">

        {/* ── SPACER: top nav clearance ── */}
        <div className="h-20 sm:h-24 flex-shrink-0" />

        {/* ── ROW A: Headline + description ── fills remaining space above bottom bar */}
        <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">

          {/* Name headline */}
          <div
            className="hero-animate"
            style={{ animationDelay: '80ms' }}
          >
            <h1
              className="font-black font-headline uppercase tracking-tighter text-[#8D1515] leading-[0.82]"
              style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
            >
              RAUNAK
            </h1>
            <div className="relative">
              <h1
                className="font-black font-headline uppercase tracking-tighter text-[#FFB3AE] leading-[0.82]"
                style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
              >
                SHARMA
              </h1>
              {/* Version badge — top-right of SHARMA, hidden on tiny screens */}
              <span
                className="absolute top-0 right-0 hidden sm:block font-label text-[#ffb4ab]"
                style={{ fontSize: '0.6rem', letterSpacing: '0.5em', lineHeight: 1, top: '4px' }}
              >
                V.01-2026
              </span>
            </div>
          </div>

          {/* Tagline — below headline on mobile, right-aligned on desktop */}
          <div
            className="mt-6 sm:mt-8 hero-animate"
            style={{ animationDelay: '180ms', maxWidth: '520px' }}
          >
            <p
              className="font-body leading-relaxed text-[#c6c6c7]"
              style={{
                fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
                borderLeft: '3px solid #8D1515',
                paddingLeft: '16px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              A full-stack developer building high-fidelity editorial interfaces
              and robust backend systems. Dismantling the template aesthetic
              through raw geometry, visceral interactions, and clean architecture.
            </p>
          </div>

          {/* Decorative rotated words strip — constrained height, clipped */}
          <div
            className="relative mt-auto overflow-hidden hero-animate flex-shrink-0"
            style={{
              height: 'clamp(60px, 12vh, 130px)',
              animationDelay: '280ms',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {/* DESIGN — outline left */}
            <span
              className="absolute font-black font-headline uppercase text-stroke-red"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                transform: 'rotate(-9deg)',
                bottom: '-10%',
                left: '-1%',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              DESIGN
            </span>

            {/* CODE — pink centre */}
            <span
              className="absolute font-black font-headline uppercase text-[#FFB3AE]"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                transform: 'rotate(5deg)',
                bottom: '-5%',
                left: '28%',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              CODE
            </span>

            {/* BUILD — dark red right */}
            <span
              className="absolute font-black font-headline uppercase text-[#8D1515]"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 6.5rem)',
                transform: 'rotate(-3deg)',
                bottom: '-5%',
                right: '1%',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                opacity: 0.6,
              }}
            >
              BUILD
            </span>
          </div>
        </div>

        {/* ── ROW B: Bottom bar — fixed height, always visible ── */}
        <div
          className="flex-shrink-0 flex items-end justify-between pb-6 sm:pb-8 hero-animate"
          style={{ animationDelay: '380ms', minHeight: '64px' }}
        >
          {/* Left: role + socials */}
          <div>
            <p
              className="font-label uppercase text-[#FFB3AE] mb-2 sm:mb-3"
              style={{ fontSize: 'clamp(7px, 1vw, 10px)', letterSpacing: '0.45em' }}
            >
              FULL-STACK DEVELOPER &amp; UI DESIGNER
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {[
                { label: 'GITHUB ↗', href: 'https://github.com/RoNnY125-coder' },
                { label: 'LINKEDIN ↗', href: 'https://www.linkedin.com/in/raunak-sharma-b91650344' },
                { label: 'INSTAGRAM ↗', href: 'https://www.instagram.com/basically._.raunak' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline font-bold uppercase text-[#c6c6c7] hover:text-[#FFB3AE] transition-colors"
                  style={{ fontSize: 'clamp(7px, 0.85vw, 10px)', letterSpacing: '0.2em' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: scroll indicator — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 pb-1">
            <span
              className="font-label text-[#c6c6c7]"
              style={{ fontSize: '8px', letterSpacing: '0.35em', writingMode: 'vertical-rl' }}
            >
              SCROLL →
            </span>
            <div
              className="w-px bg-[#59413e]/30 relative ml-1"
              style={{ height: 'clamp(40px, 8vh, 80px)' }}
            >
              <div className="absolute top-0 left-0 w-full h-1/3 bg-[#8D1515] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
