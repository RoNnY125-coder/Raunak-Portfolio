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
      className="w-screen h-screen flex-shrink-0 overflow-hidden relative bg-[#181212] flex flex-col"
      style={{ maxWidth: '100vw', maxHeight: '100vh' }}
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-[#8D1515]/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#930616]/15 blur-[120px] pointer-events-none -z-10" />

      {/* ── MAIN LAYOUT: 2-row grid ── */}
      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-24 pb-8">

        {/* ROW 1 — Headline + description side by side */}
        <div className="flex items-start justify-between flex-1 min-h-0">

          {/* LEFT: Big headline */}
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <h1
              className="font-black font-headline uppercase leading-[0.82] tracking-tighter text-[#8D1515] hero-animate"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 11rem)',
                animationDelay: '100ms',
              }}
            >
              RAUNAK
            </h1>
            <h1
              className="font-black font-headline uppercase leading-[0.82] tracking-tighter text-[#FFB3AE] relative hero-animate"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 11rem)',
                animationDelay: '180ms',
              }}
            >
              SHARMA
              <span
                className="absolute font-label text-[#ffb4ab]"
                style={{
                  fontSize: 'clamp(8px, 1vw, 11px)',
                  letterSpacing: '0.45em',
                  top: '8px',
                  right: 0,
                }}
              >
                V.01-2026
              </span>
            </h1>
          </div>

          {/* RIGHT: Description */}
          <div
            className="hidden md:flex flex-col justify-center ml-8 hero-animate"
            style={{
              maxWidth: '320px',
              minWidth: '220px',
              animationDelay: '260ms',
            }}
          >
            <p
              className="font-body leading-relaxed text-[#c6c6c7]"
              style={{
                fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
                borderLeft: '3px solid #8D1515',
                paddingLeft: '20px',
                paddingTop: '12px',
                paddingBottom: '12px',
              }}
            >
              A frontend engineer building high-fidelity editorial interfaces.
              Dismantling the template aesthetic through raw geometry and visceral
              interactions.
            </p>
          </div>
        </div>

        {/* ROW 2 — Rotated words strip */}
        <div
          className="relative flex items-end overflow-hidden hero-animate"
          style={{
            height: 'clamp(100px, 18vh, 220px)',
            animationDelay: '340ms',
          }}
        >
          {/* DESIGN — outline, rotated */}
          <h2
            className="absolute font-black font-headline uppercase text-stroke-red select-none pointer-events-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 9rem)',
              transform: 'rotate(-10deg)',
              bottom: '10%',
              left: '-1%',
              lineHeight: 1,
            }}
          >
            DESIGN
          </h2>

          {/* CODE — pink, center */}
          <h2
            className="absolute font-black font-headline uppercase text-[#FFB3AE] select-none pointer-events-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 9rem)',
              transform: 'rotate(5deg)',
              bottom: '5%',
              left: '30%',
              lineHeight: 1,
              mixBlendMode: 'difference',
            }}
          >
            CODE
          </h2>

          {/* CREATE — dark red, right */}
          <h2
            className="absolute font-black font-headline uppercase text-[#8D1515] select-none pointer-events-none"
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 7.5rem)',
              transform: 'rotate(-2deg)',
              bottom: '5%',
              right: '2%',
              lineHeight: 1,
              opacity: 0.7,
            }}
          >
            CREATE
          </h2>
        </div>

        {/* ROW 3 — Bottom bar: role + socials */}
        <div
          className="flex items-end justify-between pb-2 pt-2 hero-animate"
          style={{ animationDelay: '420ms', flexShrink: 0 }}
        >
          <div>
            <p
              className="font-label uppercase text-[#FFB3AE] mb-2"
              style={{ fontSize: 'clamp(8px, 1vw, 11px)', letterSpacing: '0.5em' }}
            >
              FRONTEND ENGINEER &amp; UI DESIGNER
            </p>
            <div className="flex gap-4 md:gap-6">
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
                  style={{ fontSize: 'clamp(8px, 0.9vw, 11px)', letterSpacing: '0.2em' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hidden md:flex items-center gap-2 mb-1">
            <span
              className="font-label text-[#c6c6c7] rotate-90 origin-right"
              style={{ fontSize: 9, letterSpacing: '0.4em' }}
            >
              SCROLL →
            </span>
            <div className="w-px h-16 bg-[#59413e]/30 relative ml-2">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-[#8D1515] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
