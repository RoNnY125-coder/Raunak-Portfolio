import React, { useState } from 'react';

interface TopNavProps {
  currentPanel: number;
  onNavigate: (index: number) => void;
  onArchiveOpen: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ currentPanel, onNavigate, onArchiveOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-8 md:px-12 bg-transparent backdrop-blur-xl">
        <div 
          className="text-3xl font-headline font-black tracking-tighter text-[#FFB3AE] uppercase cursor-pointer"
          onClick={() => handleNav(0)}
        >
          RAUNAK.S
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12">
          <button
            onClick={() => handleNav(1)}
            className={`font-headline font-black uppercase tracking-tighter transition-colors ${
              currentPanel === 1 
                ? 'text-[#FFB3AE] border-b-2 border-[#8D1515] pb-1' 
                : 'text-[#C6C6C7] hover:text-[#FFB3AE]'
            }`}
          >
            WORK
          </button>
          <button
            onClick={handleArchive}
            className="font-headline font-black uppercase tracking-tighter text-[#C6C6C7] hover:text-[#FFB3AE] transition-colors"
          >
            ARCHIVE
          </button>
          <button
            onClick={() => handleNav(2)}
            className={`font-headline font-black uppercase tracking-tighter transition-colors ${
              currentPanel === 2 
                ? 'text-[#FFB3AE] border-b-2 border-[#8D1515] pb-1' 
                : 'text-[#C6C6C7] hover:text-[#FFB3AE]'
            }`}
          >
            MANIFESTO
          </button>
          <button
            onClick={() => handleNav(3)}
            className={`font-headline font-black uppercase tracking-tighter transition-colors ${
              currentPanel === 3 
                ? 'text-[#FFB3AE] border-b-2 border-[#8D1515] pb-1' 
                : 'text-[#C6C6C7] hover:text-[#FFB3AE]'
            }`}
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#FFB3AE]" onClick={toggleMenu}>
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#181212]/95 backdrop-blur flex flex-col items-center justify-center gap-12">
          <button
            onClick={() => handleNav(1)}
            className="font-headline font-black text-4xl uppercase text-[#C6C6C7] hover:text-[#FFB3AE] transition-colors"
          >
            WORK
          </button>
          <button
            onClick={handleArchive}
            className="font-headline font-black text-4xl uppercase text-[#C6C6C7] hover:text-[#FFB3AE] transition-colors"
          >
            ARCHIVE
          </button>
          <button
            onClick={() => handleNav(2)}
            className="font-headline font-black text-4xl uppercase text-[#C6C6C7] hover:text-[#FFB3AE] transition-colors"
          >
            MANIFESTO
          </button>
          <button
            onClick={() => handleNav(3)}
            className="font-headline font-black text-4xl uppercase text-[#C6C6C7] hover:text-[#FFB3AE] transition-colors"
          >
            CONTACT
          </button>
        </div>
      )}

      {/* Floating home button — visible when not on hero */}
      {currentPanel !== 0 && (
        <button
          onClick={() => handleNav(0)}
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            background: 'rgba(24,18,18,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #3b3333',
            color: '#FFB3AE',
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 900,
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            padding: '10px 20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'border-color 300ms ease, color 300ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#8D1515';
            (e.currentTarget as HTMLElement).style.color = '#ffdad7';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#3b3333';
            (e.currentTarget as HTMLElement).style.color = '#FFB3AE';
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>home</span>
          HOME
        </button>
      )}
    </>
  );
};
