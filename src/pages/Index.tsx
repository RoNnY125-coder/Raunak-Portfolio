import React, { useState, useEffect, useCallback } from 'react';
import { TopNav } from '../components/layout/TopNav';
import { Sidebar } from '../components/layout/Sidebar';
import { HeroPanel } from '../components/sections/HeroPanel';
import { WorkPanel } from '../components/sections/WorkPanel';
import { ManifestoPanel } from '../components/sections/ManifestoPanel';
import { ContactPanel } from '../components/sections/ContactPanel';
import { ArchivePanel } from '../components/sections/ArchivePanel';

const Index = () => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const totalPanels = 4;

  const goToPanel = useCallback((index: number) => {
    if (isAnimating || index === currentPanel) return;
    if (index < 0 || index >= totalPanels) return;
    setIsAnimating(true);
    setCurrentPanel(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, currentPanel, totalPanels]);

  // Wheel navigation — disabled when archive is open
  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      if (archiveOpen) return;
      const target = e.target as HTMLElement;
      const isScrollable = target.closest('.overflow-y-auto');
      if (isScrollable) {
        const sc = target.closest('.overflow-y-auto') as HTMLElement;
        if (sc) {
          const atTop = sc.scrollTop <= 0;
          const atBottom = Math.abs(sc.scrollHeight - sc.clientHeight - sc.scrollTop) < 1;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
        }
      }
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          if (e.deltaX > 30) goToPanel(currentPanel + 1);
          else if (e.deltaX < -30) goToPanel(currentPanel - 1);
        } else {
          if (e.deltaY > 30) goToPanel(currentPanel + 1);
          else if (e.deltaY < -30) goToPanel(currentPanel - 1);
        }
      }, 50);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => { window.removeEventListener('wheel', handleWheel); clearTimeout(wheelTimeout); };
  }, [currentPanel, goToPanel, archiveOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (archiveOpen) { if (e.key === 'Escape') setArchiveOpen(false); return; }
      if (e.key === 'ArrowRight') goToPanel(currentPanel + 1);
      if (e.key === 'ArrowLeft') goToPanel(currentPanel - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentPanel, goToPanel, archiveOpen]);

  // Touch navigation
  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (archiveOpen) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToPanel(currentPanel + 1);
        else goToPanel(currentPanel - 1);
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => { window.removeEventListener('touchstart', handleTouchStart); window.removeEventListener('touchend', handleTouchEnd); };
  }, [currentPanel, goToPanel, archiveOpen]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const panelNames = ['RAUNAK SHARMA', 'SELECTED WORK', 'MANIFESTO', 'CONTACT'];

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#181212] text-[#eedfdf]">
      <TopNav currentPanel={currentPanel} onNavigate={goToPanel} onArchiveOpen={() => setArchiveOpen(true)} />
      <Sidebar currentPanel={currentPanel} onNavigate={goToPanel} onArchiveOpen={() => setArchiveOpen(true)} archiveOpen={archiveOpen} />

      {/* Main horizontal track — dims when archive is open */}
      <div
        style={{
          width: `${totalPanels * 100}vw`,
          transform: archiveOpen
            ? `translateX(-${currentPanel * 100}vw) translateX(-2%) scale(0.98)`
            : `translateX(-${currentPanel * 100}vw)`,
          transition: isAnimating
            ? 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)'
            : archiveOpen
            ? 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms ease'
            : 'transform 300ms ease',
          filter: archiveOpen ? 'blur(4px) brightness(0.4)' : 'none',
          height: '100%',
          display: 'flex',
        }}
      >
        <HeroPanel onNavigate={goToPanel} />
        <WorkPanel onNavigate={goToPanel} />
        <ManifestoPanel onNavigate={goToPanel} />
        <ContactPanel />
      </div>

      {/* Panel label */}
      <div className="fixed bottom-8 left-8 z-50 lg:left-32 pointer-events-none" style={{ opacity: archiveOpen ? 0 : 1, transition: 'opacity 300ms ease' }}>
        <p className="font-label text-xs tracking-[0.4em] text-[#c6c6c7] uppercase">{panelNames[currentPanel]}</p>
      </div>

      {/* Panel indicators */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3" style={{ opacity: archiveOpen ? 0 : 1, transition: 'opacity 300ms ease' }}>
        {['01', '02', '03', '04'].map((num, i) => (
          <button key={i} onClick={() => goToPanel(i)}
            className={`font-headline font-black text-xs tracking-widest transition-all duration-300 ${i === currentPanel ? 'text-[#FFB3AE] scale-125' : 'text-[#3B3333] hover:text-[#8D1515]'}`}>
            {num}
          </button>
        ))}
      </div>

      {/* Archive Overlay — slides in from RIGHT */}
      <ArchivePanel isOpen={archiveOpen} onClose={() => setArchiveOpen(false)} />
    </div>
  );
};

export default Index;