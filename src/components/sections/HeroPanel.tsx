import React, { useEffect, useRef, useState } from 'react';

interface HeroPanelProps {
  onNavigate: (index: number) => void;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({ onNavigate }) => {
  const [mounted, setMounted] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        backgroundColor: '#181212',
        display: 'grid',
        gridTemplateRows: 'clamp(72px, 10vh, 96px) 1fr clamp(72px, 11vh, 88px)',
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '55%', height: '55%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 80% 10%, rgba(141,21,21,0.22) 0%, transparent 65%)',
        transform: isHoveringName ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 700ms ease',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: '5%',
        width: '45%', height: '45%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 20% 90%, rgba(147,6,22,0.14) 0%, transparent 65%)',
        transform: isHoveringName ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 700ms ease',
      }} />

      {/* Hover Popups around the screen */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
        opacity: isHoveringName ? 1 : 0, transition: 'opacity 300ms ease, backdrop-filter 500ms ease',
        backdropFilter: isHoveringName ? 'blur(2px)' : 'none',
      }}>
        <div style={{
            position: 'absolute', top: '18%', left: '12%',
            transform: isHoveringName ? 'scale(1) rotate(-6deg)' : 'scale(0.5) rotate(0)',
            transition: 'transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 50ms',
            background: 'rgba(141,21,21,0.9)', color: '#FFB3AE', padding: '8px 16px',
            fontFamily: "'Epilogue', sans-serif", fontSize: 'clamp(10px, 1.2vw, 14px)', fontWeight: 700, letterSpacing: '0.1em',
            boxShadow: '0 8px 32px rgba(141,21,21,0.4)',
        }}>INNOVATE</div>
        <div style={{
            position: 'absolute', top: '22%', right: '15%',
            transform: isHoveringName ? 'scale(1) rotate(5deg) translateY(-20px)' : 'scale(0.5) rotate(0) translateY(0)',
            transition: 'transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 150ms',
            border: '2px solid #FFB3AE', color: '#FFB3AE', padding: '8px 16px',
            fontFamily: "'Epilogue', sans-serif", fontSize: 'clamp(10px, 1.2vw, 14px)', fontWeight: 700, letterSpacing: '0.1em',
            background: 'rgba(24, 18, 18, 0.6)', backdropFilter: 'blur(8px)',
        }}>ARCHITECT</div>
        <div style={{
            position: 'absolute', bottom: '35%', right: '10%',
            transform: isHoveringName ? 'scale(1) rotate(-8deg) translateX(-30px)' : 'scale(0.5) rotate(0) translateX(0)',
            transition: 'transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms',
            background: '#FFB3AE', color: '#181212', padding: '10px 20px',
            fontFamily: "'Epilogue', sans-serif", fontSize: 'clamp(12px, 1.5vw, 16px)', fontWeight: 900,
            boxShadow: '0 8px 24px rgba(255,179,174,0.3)',
        }}>ENGINEER</div>
        <div style={{
            position: 'absolute', bottom: '25%', left: '15%',
            transform: isHoveringName ? 'scale(1) rotate(12deg)' : 'scale(0.5) rotate(0)',
            transition: 'transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 100ms',
            padding: '8px 16px', borderLeft: '4px solid #8D1515', color: '#c6c6c7',
            fontFamily: "'Inter', sans-serif", fontSize: 'clamp(10px, 1.2vw, 14px)', fontWeight: 700, letterSpacing: '0.2em',
            background: 'rgba(24, 18, 18, 0.8)',
        }}>{`<FULL_STACK />`}</div>
      </div>

      {/* ROW 1 — Nav spacer */}
      <div style={{ gridRow: 1 }} />

      {/* ROW 2 — Main content: 2-col grid on desktop, single col on mobile */}
      <div
        style={{
          gridRow: 2,
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, min(360px, 32%))',
          gridTemplateRows: '1fr auto',
          columnGap: 'clamp(16px, 3vw, 48px)',
          padding: '0 clamp(20px, 5vw, 80px)',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        className="hero-content-grid"
      >
        {/* LEFT COL — Headline */}
        <div 
          style={{ gridColumn: 1, gridRow: '1 / 3', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', paddingLeft: 'clamp(16px, 4vw, 48px)', cursor: 'crosshair' }}
          onMouseEnter={() => setIsHoveringName(true)}
          onMouseLeave={() => setIsHoveringName(false)}
        >
          {/* RAUNAK */}
          <div style={fadeUp(80)}>
            <span
              style={{
                display: 'block',
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 7.5vw, 8rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#8D1515',
                whiteSpace: 'nowrap',
              }}
            >
              RAUNAK
            </span>
          </div>

          {/* SHARMA */}
          <div style={{ position: 'relative', ...fadeUp(160) }}>
            <span
              style={{
                display: 'block',
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 7.5vw, 8rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#FFB3AE',
                whiteSpace: 'nowrap',
              }}
            >
              SHARMA
            </span>
            {/* Version badge */}
            <span style={{
              position: 'absolute',
              top: 6,
              right: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.5em',
              color: '#ffb4ab',
              lineHeight: 1,
            }}>
              V.01-2026
            </span>
          </div>

          {/* Decorative rotated words — fixed height, visible */}
          <div
            style={{
              position: 'relative',
              marginTop: 'clamp(12px, 2.5vh, 28px)',
              height: 'clamp(64px, 10vh, 120px)',
              overflow: 'visible',
              pointerEvents: 'none',
              userSelect: 'none',
              flexShrink: 0,
              ...fadeUp(240),
            }}
          >
            <span style={{
              position: 'absolute',
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 5vw, 5.5rem)',
              lineHeight: 1,
              textTransform: 'uppercase',
              transform: 'rotate(-8deg)',
              bottom: '-8%',
              left: '-1%',
              whiteSpace: 'nowrap',
              WebkitTextStroke: '1.5px #8D1515',
              color: 'transparent',
            }}>
              DESIGN
            </span>
            <span style={{
              position: 'absolute',
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 5vw, 5.5rem)',
              lineHeight: 1,
              textTransform: 'uppercase',
              transform: 'translateX(-50%) rotate(4deg)',
              bottom: '-4%',
              left: '50%',
              whiteSpace: 'nowrap',
              color: '#FFB3AE',
            }}>
              CODE
            </span>
            <span style={{
              position: 'absolute',
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 4vw, 4.5rem)',
              lineHeight: 1,
              textTransform: 'uppercase',
              transform: 'rotate(-2deg)',
              bottom: '-4%',
              right: '2%',
              whiteSpace: 'nowrap',
              color: '#8D1515',
              opacity: 0.65,
            }}>
              BUILD
            </span>
          </div>
        </div>

        {/* RIGHT COL — Tagline (hidden on small screens via CSS) */}
        <div
          className="hero-tagline-col"
          style={{
            gridColumn: 2,
            gridRow: 1,
            display: 'flex',
            alignItems: 'center',
            ...fadeUp(320),
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)',
            lineHeight: 1.75,
            color: '#c6c6c7',
            borderLeft: '2px solid #8D1515',
            paddingLeft: '16px',
            paddingTop: '10px',
            paddingBottom: '10px',
            margin: 0,
          }}>
            A full-stack developer building high-fidelity editorial interfaces
            and robust backend systems. Dismantling the template aesthetic through
            raw geometry, visceral interactions, and clean architecture.
          </p>
        </div>
      </div>

      {/* ROW 3 — Bottom bar */}
      <div style={{
        gridRow: 3,
        zIndex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        gap: 'clamp(32px, 8vw, 100px)',
        padding: '0 clamp(20px, 5vw, 80px) clamp(16px, 3vh, 28px)',
        ...fadeUp(400),
      }}>
        {/* Role + socials aligned right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(7px, 0.9vw, 10px)',
            letterSpacing: '0.45em',
            color: '#FFB3AE',
            textTransform: 'uppercase',
            margin: '0 0 8px 0',
          }}>
            FULL-STACK DEVELOPER &amp; UI DESIGNER
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px, 2vw, 24px)', justifyContent: 'flex-end' }}>
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
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(7px, 0.8vw, 10px)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#c6c6c7',
                  textDecoration: 'none',
                  transition: 'all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#FFB3AE';
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.15)';
                  e.currentTarget.style.textShadow = '0 8px 16px rgba(255, 179, 174, 0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#c6c6c7';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: scroll indicator */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '2px' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '8px',
            letterSpacing: '0.35em',
            color: '#c6c6c7',
            writingMode: 'vertical-rl',
            textTransform: 'uppercase',
          }}>
            SCROLL →
          </span>
          <div style={{
            width: '1px',
            height: 'clamp(36px, 7vh, 72px)',
            background: 'rgba(89,65,62,0.3)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '33%',
              background: '#8D1515',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>

      {/* Mobile: tagline shown below headline, hidden on large screens */}
      <style>{`
        @media (max-width: 767px) {
          .hero-content-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            align-items: start !important;
            padding-top: 12px !important;
          }
          .hero-tagline-col {
            grid-column: 1 !important;
            grid-row: 2 !important;
            margin-top: 16px !important;
          }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
};
