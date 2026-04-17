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
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline font-black text-2xl uppercase text-[#8D1515] hover:text-[#FFB3AE] transition-colors mt-4"
        >
          RESUME ↗
        </a>
      </div>

    </>
  );
};
