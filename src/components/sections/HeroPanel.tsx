import React, { useEffect } from 'react';

interface HeroPanelProps {
  onNavigate: (index: number) => void;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.body.classList.add('cursor-crosshair');
    return () => {
      document.body.classList.remove('cursor-crosshair');
    };
  }, []);

  return (
    <section className="w-screen h-screen flex-shrink-0 overflow-hidden relative bg-[#181212] flex flex-col">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-[800px] bg-[#8D1515]/10 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#930616]/20 blur-[150px] pointer-events-none -z-10"></div>

      <div className="relative z-10 px-8 md:px-16 py-20 flex flex-col gap-12 min-h-screen">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-10 hero-animate" style={{ animationDelay: '100ms' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 15vw, 14rem)' }} className="font-black font-headline leading-[0.85] tracking-tighter uppercase text-[#8D1515]">
              RAUNAK<br/>
              <span className="text-[#FFB3AE] relative">
                SHARMA
                <span className="absolute -top-4 right-0 text-xs font-label tracking-[0.5em] text-[#ffb4ab]">V.01-2026</span>
              </span>
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-8 mt-12 md:mt-0 hero-animate" style={{ animationDelay: '200ms' }}>
            <p className="text-xl font-body leading-relaxed text-[#c6c6c7] border-l-4 border-[#8D1515] pl-6 py-4">
              A frontend engineer building high-fidelity editorial interfaces.
              Dismantling the template aesthetic through raw geometry and visceral interactions.
            </p>
          </div>
        </div>

        <div className="mt-32 relative h-[500px] md:h-[700px] overflow-hidden lg:overflow-visible">
          <div className="absolute top-0 left-0 lg:-left-20 transform -rotate-12 z-20 group cursor-pointer hero-animate" style={{ animationDelay: '300ms' }}>
            <h2 className="text-7xl md:text-9xl font-black font-headline transition-all text-stroke-red" style={{ '--base-rotate': '-12deg' } as any}>
              DESIGN
            </h2>
          </div>

          <div className="absolute top-1/4 right-0 lg:-right-10 transform rotate-6 z-30 group cursor-pointer hero-animate" style={{ animationDelay: '400ms' }}>
            <h2 className="text-7xl md:text-9xl font-black font-headline text-[#FFB3AE] hover:text-[#8D1515] transition-all mix-blend-difference hover:scale-105" style={{ '--base-rotate': '6deg' } as any}>
              CODE
            </h2>
          </div>

          <div className="absolute bottom-20 left-1/4 transform -rotate-3 z-10 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity hero-animate" style={{ animationDelay: '500ms' }}>
            <h2 className="text-6xl md:text-8xl font-black font-headline text-[#8D1515] transition-all hover:scale-105" style={{ '--base-rotate': '-3deg' } as any}>
              CREATE
            </h2>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] h-[400px] bg-[#3b3333] -z-10 opacity-30 editorial-mask">
            <div className="w-full h-full bg-gradient-to-br from-[#930616]/40 to-[#181212]"></div>
          </div>
        </div>

        <div className="absolute bottom-16 left-8 md:left-16 hero-animate" style={{ animationDelay: '0ms' }}>
          <p className="font-label text-xs tracking-[0.5em] text-[#FFB3AE] uppercase mb-2">FRONTEND ENGINEER & UI DESIGNER</p>
          <div className="flex gap-6 mt-4 hero-animate" style={{ animationDelay: '600ms' }}>
            <a href="https://github.com/RoNnY125-coder" target="_blank" rel="noopener noreferrer" className="font-headline font-bold text-xs uppercase tracking-widest text-[#c6c6c7] hover:text-[#FFB3AE] transition-colors">
              GITHUB ↗
            </a>
            <a href="https://www.linkedin.com/in/raunak-sharma-b91650344" target="_blank" rel="noopener noreferrer" className="font-headline font-bold text-xs uppercase tracking-widest text-[#c6c6c7] hover:text-[#FFB3AE] transition-colors">
              LINKEDIN ↗
            </a>
            <a href="https://www.instagram.com/basically._.raunak" target="_blank" rel="noopener noreferrer" className="font-headline font-bold text-xs uppercase tracking-widest text-[#c6c6c7] hover:text-[#FFB3AE] transition-colors">
              INSTAGRAM ↗
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 flex items-center gap-4">
          <span className="font-label text-xs tracking-widest text-[#c6c6c7] rotate-90 origin-right">SCROLL →</span>
          <div className="w-px h-24 bg-[#59413e]/30 relative">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-[#8D1515] animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
