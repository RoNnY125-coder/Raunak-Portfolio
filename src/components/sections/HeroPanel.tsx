import React, { useEffect, useState } from 'react';

interface HeroPanelProps {
  onNavigate: (index: number) => void;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({ onNavigate }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section className="hero-panel">
      <div className="hero-grid-lines" />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <div className="hero-spacer" />

      <main className="hero-main">
        <div className="hero-status" style={fadeUp(40)}>
          <span className="hero-status-dot" />
          <span>Available for product builds</span>
        </div>

        <div className="hero-title-wrap" style={fadeUp(120)}>
          <h1 className="hero-title">
            RAUNAK
            <br />
            <span>SHARMA</span>
          </h1>
          <span className="hero-version">V.01-2026</span>
        </div>

        <p className="hero-copy" style={fadeUp(200)}>
          Full-stack web developer and UI/UX designer building sharp interfaces,
          reliable backend systems, and polished digital products that feel fast,
          intentional, and easy to use.
        </p>

        <div className="hero-actions" style={fadeUp(280)}>
          <button type="button" className="hero-primary-button" onClick={() => onNavigate(1)}>
            VIEW WORK
          </button>
          <a
            href="/Raunak_Sharma_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-secondary-button"
          >
            RESUME
          </a>
        </div>

        <div className="hero-skill-strip" style={fadeUp(360)}>
          {['React', 'TypeScript', 'UI Systems', 'APIs', 'Product Design'].map(skill => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </main>

      <footer className="hero-footer" style={fadeUp(420)}>
        <div className="hero-scroll-cue">
          <span>SCROLL -&gt;</span>
          <div>
            <i />
          </div>
        </div>

        <div className="hero-socials">
          <p>FULL-STACK DEVELOPER &amp; UI DESIGNER</p>
          <nav aria-label="Social links">
            {[
              { label: 'GITHUB', href: 'https://github.com/RoNnY125-coder' },
              { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/raunak-sharma-b91650344' },
              { label: 'INSTAGRAM', href: 'https://www.instagram.com/basically._.raunak' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </section>
  );
};
