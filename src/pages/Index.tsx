import React, { useState, useEffect, useCallback } from 'react';
import { TopNav } from '../components/layout/TopNav';
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

  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      if (archiveOpen) return;

      const target = e.target as HTMLElement;
      const scrollPanel = target.closest('.scroll-panel, .overflow-y-auto') as HTMLElement | null;

      if (scrollPanel) {
        const atTop = scrollPanel.scrollTop <= 0;
        const atBottom = Math.abs(scrollPanel.scrollHeight - scrollPanel.clientHeight - scrollPanel.scrollTop) < 2;
        const wantsVerticalScroll = Math.abs(e.deltaY) >= Math.abs(e.deltaX);

        if (wantsVerticalScroll && ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom))) {
          return;
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
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [currentPanel, goToPanel, archiveOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (archiveOpen) {
        if (e.key === 'Escape') setArchiveOpen(false);
        return;
      }
      if (e.key === 'ArrowRight') goToPanel(currentPanel + 1);
      if (e.key === 'ArrowLeft') goToPanel(currentPanel - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentPanel, goToPanel, archiveOpen]);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (archiveOpen) return;
      const diffX = touchStartX - e.changedTouches[0].clientX;
      const diffY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diffX) > 54 && Math.abs(diffX) > Math.abs(diffY) * 1.35) {
        if (diffX > 0) goToPanel(currentPanel + 1);
        else goToPanel(currentPanel - 1);
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPanel, goToPanel, archiveOpen]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const panelNames = ['RAUNAK SHARMA', 'SELECTED WORK', 'MANIFESTO', 'CONTACT'];

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#181212] text-[#eedfdf]">
      <TopNav currentPanel={currentPanel} onNavigate={goToPanel} onArchiveOpen={() => setArchiveOpen(true)} />

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

      <div className="panel-label" style={{ opacity: archiveOpen ? 0 : 1 }}>
        <p>{panelNames[currentPanel]}</p>
      </div>

      <div className="panel-indicators" style={{ opacity: archiveOpen ? 0 : 1 }}>
        {['01', '02', '03', '04'].map((num, i) => (
          <button
            key={num}
            type="button"
            onClick={() => goToPanel(i)}
            className={i === currentPanel ? 'is-active' : ''}
            aria-label={`Go to ${panelNames[i]}`}
          >
            {num}
          </button>
        ))}
      </div>

      <ArchivePanel isOpen={archiveOpen} onClose={() => setArchiveOpen(false)} />
    </div>
  );
};

export default Index;
