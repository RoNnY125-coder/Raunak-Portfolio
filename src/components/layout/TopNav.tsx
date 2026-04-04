import React, { useState } from 'react';

interface TopNavProps {
  currentPanel: number;
  onNavigate: (index: number) => void;
  onArchiveOpen: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ currentPanel, onNavigate, onArchiveOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (index: number) => {
    onNavigate(index);
    setMobileMenuOpen(false);
  };

  const handleArchive = () => {
    onArchiveOpen();
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── Top Navigation Bar ── */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 sm:px-8 md:px-12 py-6 sm:py-8 bg-transparent backdrop-blur-xl">
        {/* Logo — always returns to hero */}
        <div
          className="font-headline font-black tracking-tighter text-[#FFB3AE] uppercase cursor-pointer select-none"
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}
          onClick={() => handleNav(0)}
        >
          RAUNAK.S
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 lg:gap-12 items-center">
          {[
            { label: 'WORK', action: () => handleNav(1), active: currentPanel === 1 },
            { label: 'ARCHIVE', action: handleArchive, active: false },
            { label: 'MANIFESTO', action: () => handleNav(2), active: currentPanel === 2 },
            { label: 'CONTACT', action: () => handleNav(3), active: currentPanel === 3 },
          ].map(item => (
            <button
              key={item.label}
              onClick={item.action}
              className={`font-headline font-black uppercase tracking-tighter transition-colors text-sm lg:text-base ${
                item.active
                  ? 'text-[#FFB3AE] border-b-2 border-[#8D1515] pb-1'
                  : 'text-[#C6C6C7] hover:text-[#FFB3AE]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#FFB3AE]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`fixed inset-0 z-40 bg-[#181212]/97 backdrop-blur flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <p className="font-label text-[#8D1515] uppercase tracking-[0.4em] text-xs mb-4">
          FULL-STACK DEVELOPER
        </p>
        {[
          { label: 'WORK', action: () => handleNav(1) },
          { label: 'ARCHIVE', action: handleArchive },
          { label: 'MANIFESTO', action: () => handleNav(2) },
          { label: 'CONTACT', action: () => handleNav(3) },
        ].map(item => (
          <button
            key={item.label}
            onClick={item.action}
            className="font-headline font-black text-4xl uppercase text-[#C6C6C7] hover:text-[#FFB3AE] transition-colors"
          >
            {item.label}
          </button>
        ))}
        {/* Resume link in mobile menu */}
        <a
          href="https://drive.google.com/file/d/YOUR_RESUME_FILE_ID/view"
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline font-black text-2xl uppercase text-[#8D1515] hover:text-[#FFB3AE] transition-colors mt-4"
        >
          RESUME ↗
        </a>
      </div>

      {/* ── Floating HOME pill — appears when NOT on hero (panel 0) ── */}
      {currentPanel !== 0 && (
        <button
          onClick={() => handleNav(0)}
          className="fixed z-50 flex items-center gap-2 font-headline font-black uppercase text-[#FFB3AE] hover:text-[#ffdad7] transition-all duration-300 hover:scale-105"
          style={{
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(24,18,18,0.88)',
            backdropFilter: 'blur(14px)',
            border: '1px solid #3b3333',
            padding: '9px 18px',
            fontSize: '10px',
            letterSpacing: '0.25em',
            cursor: 'pointer',
            boxShadow: '0 0 0 1px rgba(141,21,21,0.15)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#8D1515'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3b3333'; }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>home</span>
          HOME
        </button>
      )}
    </>
  );
};
