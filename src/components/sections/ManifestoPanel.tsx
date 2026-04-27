import React from 'react';

interface ManifestoPanelProps {
  onNavigate: (index: number) => void;
}

export const ManifestoPanel: React.FC<ManifestoPanelProps> = ({ onNavigate }) => {
  const skills = [
    { name: 'REACT / NEXT.JS', category: 'Frontend' },
    { name: 'NODE.JS / EXPRESS', category: 'Backend' },
    { name: 'TYPESCRIPT / JAVASCRIPT', category: 'Language' },
    { name: 'POSTGRESQL / MONGODB', category: 'Database' },
    { name: 'TAILWIND CSS / FIGMA', category: 'Design' },
    { name: 'REST APIs / GRAPHQL', category: 'Architecture' },
    { name: 'GIT / GITHUB / CI-CD', category: 'DevOps' },
    { name: 'PYTHON / FASTAPI', category: 'Backend' },
  ];

  // IMPORTANT: Replace this URL with your actual hosted resume PDF URL
  // e.g. Google Drive share link, Vercel-hosted PDF, or GitHub raw file
  const RESUME_URL = '/Raunak_Sharma_Resume.pdf';

  return (
    <section className="w-screen h-screen flex-shrink-0 overflow-y-auto bg-[#181212]">
      <div className="px-6 sm:px-10 md:px-16 pt-28 sm:pt-32 pb-24 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* LEFT — The Arsenal */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-headline font-black uppercase text-[#e0bfbb] leading-none mb-4">
              The
            </h2>
            <h2 className="text-4xl sm:text-5xl font-headline font-black uppercase text-[#e0bfbb] leading-none mb-10">
              Arsenal
            </h2>
            <p className="text-[#c6c6c7] mb-10 text-sm sm:text-base">
              Building end-to-end products — from pixel-perfect interfaces to
              scalable backend systems.
            </p>

            <div className="flex flex-col">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="border-b border-[#59413e]/30 py-3 sm:py-4 flex justify-between items-center hover:bg-[#251e1e] transition-colors group px-3 sm:px-4 -mx-3 sm:-mx-4 cursor-default"
                >
                  <div>
                    <span className="font-headline font-bold text-base sm:text-xl text-[#eedfdf] group-hover:text-[#FFB3AE] transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className="block font-label text-[#8D1515] uppercase"
                      style={{ fontSize: '9px', letterSpacing: '0.3em' }}
                    >
                      {skill.category}
                    </span>
                  </div>
                  <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-[#FFB3AE] transition-opacity text-lg">
                    arrow_outward
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Manifesto + bio */}
          <div className="relative mt-8 lg:mt-0">
            {/* Ghost number */}
            <span className="absolute -top-16 -left-6 text-[18vw] opacity-[0.03] font-headline font-black text-[#FFB3AE] pointer-events-none leading-none select-none">
              03
            </span>

            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-headline font-black italic text-[#FFB3AE] leading-tight mb-10 relative z-10 uppercase">
              "WE DON'T BUILD PRODUCTS;<br />
              WE ARCHITECT EXPERIENCES<br />
              THAT OUTLAST TRENDS."
            </blockquote>

            <div className="font-body text-[#c6c6c7] leading-relaxed space-y-5 relative z-10 mb-10 text-sm sm:text-base lg:text-lg">
              <p>
                I'm a Full-Stack Developer with a strong foundation in both
                UI/UX design and backend engineering. My journey started with
                curiosity about how beautiful, functional products are built
                — from database to pixel.
              </p>
              <p>
                I build complete systems: React/Next.js frontends, Node.js APIs,
                and PostgreSQL databases — all with an obsessive attention to
                design quality. Currently studying B.Tech CSE at VIT Bhopal
                University (2025–2029).
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 relative z-10">
              {/* READ RESUME — opens PDF in new tab */}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-headline font-bold text-[#FFB3AE] border-b-2 border-[#8D1515] pb-2 text-base sm:text-xl hover:text-white transition-all uppercase tracking-widest"
              >
                READ RESUME ↗
              </a>

              {/* VIEW WORK — navigates to Work panel */}
              <button
                onClick={() => onNavigate(1)}
                className="font-headline font-bold text-[#c6c6c7] border-b-2 border-[#3b3333] pb-2 text-base sm:text-xl hover:text-[#FFB3AE] hover:border-[#8D1515] transition-all uppercase tracking-widest"
              >
                VIEW WORK
              </button>
            </div>
          </div>
        </div>

        {/* EDUCATION STRIP */}
        <div className="mt-20 sm:mt-32 pt-16 sm:pt-24 border-t border-[#59413e]/20 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">
            <div className="border-l-2 border-[#8D1515] pl-6 sm:pl-8">
              <div className="font-headline font-black text-3xl sm:text-5xl text-[#8D1515] mb-3">2025 — 2029</div>
              <h3 className="font-headline font-bold text-base sm:text-xl text-[#eedfdf] uppercase tracking-widest mb-2">
                B.TECH — COMPUTER SCIENCE ENGINEERING
              </h3>
              <p className="text-[#c6c6c7] font-label tracking-widest text-xs sm:text-sm uppercase">
                VIT BHOPAL UNIVERSITY
              </p>
            </div>
            <div className="border-l-2 border-[#3b3333] pl-6 sm:pl-8 opacity-60">
              <div className="font-headline font-black text-3xl sm:text-5xl text-[#3b3333] mb-3">2023 — 2025</div>
              <h3 className="font-headline font-bold text-base sm:text-xl text-[#eedfdf] uppercase tracking-widest mb-2">
                HIGHER SECONDARY EDUCATION
              </h3>
              <p className="text-[#c6c6c7] font-label tracking-widest text-xs sm:text-sm uppercase">
                D.A.V PUBLIC SCHOOL, KAILASH HILLS, NEW DELHI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
