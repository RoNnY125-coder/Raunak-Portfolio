import React from 'react';

interface ManifestoPanelProps {
  onNavigate: (index: number) => void;
}

export const ManifestoPanel: React.FC<ManifestoPanelProps> = ({ onNavigate }) => {
  const skills = [
    "REACT / NEXT.JS",
    "TYPESCRIPT / JAVASCRIPT",
    "TAILWIND CSS",
    "FIGMA / UI DESIGN",
    "HTML5 / CSS3",
    "GIT / GITHUB"
  ];

  return (
    <section className="w-screen h-screen flex-shrink-0 overflow-y-auto bg-[#181212]">
      <div className="px-8 md:px-16 pt-32 pb-24 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* LEFT — The Arsenal */}
          <div>
            <h2 className="text-5xl font-headline font-black uppercase text-[#e0bfbb] leading-none mb-12 whitespace-pre-line">
              {'The\nArsenal'}
            </h2>
            <p className="text-[#c6c6c7] mb-12">
              Building high-fidelity interfaces with the bleeding edge of the web ecosystem.
            </p>
            
            <div className="flex flex-col">
              {skills.map((skill, index) => (
                <div key={index} className="border-b border-[#59413e]/30 py-4 flex justify-between items-center bg-transparent hover:bg-[#251e1e] transition-colors group px-4 -mx-4 cursor-default">
                  <span className="font-headline font-bold text-xl text-[#eedfdf] group-hover:text-[#FFB3AE] transition-colors">
                    {skill}
                  </span>
                  <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-[#FFB3AE] transition-opacity">
                    arrow_outward
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Manifesto */}
          <div className="relative">
            <span className="absolute -top-20 -left-10 text-[20vw] opacity-[0.03] font-headline font-black text-[#FFB3AE] pointer-events-none leading-none">
              03
            </span>
            
            <blockquote className="text-4xl md:text-5xl font-headline font-black italic text-[#FFB3AE] leading-tight mb-12 relative z-10 uppercase">
              "WE DON'T DESIGN INTERFACES;<br/>
              WE DESIGN ATMOSPHERES<br/>
              THAT HOUSE DATA."
            </blockquote>
            
            <div className="font-body text-[#c6c6c7] leading-relaxed space-y-6 relative z-10 mb-12 text-lg">
              <p>
                I'm an aspiring Frontend Developer with a strong foundation in UI/UX design. 
                My journey started with curiosity about how beautiful, functional interfaces come to life.
              </p>
              <p>
                I believe great products emerge at the intersection of clean code and thoughtful design. 
                Currently studying B.Tech CSE at VIT Bhopal University (2025–2029).
              </p>
            </div>

            <button 
              onClick={() => onNavigate(3)}
              className="font-headline font-bold text-[#FFB3AE] border-b-2 border-[#8D1515] pb-2 text-xl hover:text-white transition-all uppercase tracking-widest relative z-10"
            >
              READ THE MANIFESTO
            </button>
          </div>
        </div>

        {/* EDUCATION STRIP */}
        <div className="mt-32 pt-24 border-t border-[#59413e]/20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="border-l-2 border-[#8D1515] pl-8">
              <div className="font-headline font-black text-5xl text-[#8D1515] mb-4">2025 — 2029</div>
              <h3 className="font-headline font-bold text-xl text-[#eedfdf] uppercase tracking-widest mb-2">B.TECH — COMPUTER SCIENCE ENGINEERING</h3>
              <p className="text-[#c6c6c7] font-label tracking-widest text-sm uppercase">VIT BHOPAL UNIVERSITY</p>
            </div>
            <div className="border-l-2 border-[#3b3333] pl-8 opacity-60">
              <div className="font-headline font-black text-5xl text-[#3b3333] mb-4">2023 — 2025</div>
              <h3 className="font-headline font-bold text-xl text-[#eedfdf] uppercase tracking-widest mb-2">HIGHER SECONDARY EDUCATION</h3>
              <p className="text-[#c6c6c7] font-label tracking-widest text-sm uppercase">D.A.V PUBLIC SCHOOL, KAILASH HILLS, NEW DELHI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
