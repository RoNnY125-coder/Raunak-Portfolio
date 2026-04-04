import React, { useEffect, useState } from 'react';

interface WorkPanelProps {
  onNavigate: (index: number) => void;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
}

export const WorkPanel: React.FC<WorkPanelProps> = ({ onNavigate }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/RoNnY125-coder/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching repos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-screen h-screen flex-shrink-0 overflow-y-auto bg-[#181212]">
      <div className="px-8 md:px-16 pt-32 pb-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <h2 className="text-7xl font-headline font-black uppercase text-[#FFB3AE] leading-none whitespace-pre-line">
            {'Selected\nWorks'}
          </h2>
          <span className="font-headline font-bold tracking-widest text-[#c6c6c7]">
            01 // 06
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6 relative">
          {loading ? (
            <>
              <div className="col-span-12 md:col-span-8 aspect-video bg-[#251e1e] animate-pulse"></div>
              <div className="col-span-12 md:col-span-4 aspect-[3/4] bg-[#251e1e] animate-pulse self-center"></div>
              <div className="col-span-12 md:col-start-2 md:col-span-6 aspect-square bg-[#251e1e] animate-pulse"></div>
            </>
          ) : (
            <>
              {/* Slot 01: DESIGN-TO-CODE effect */}
              {repos[0] && (
                <a href={repos[0].html_url} target="_blank" rel="noopener noreferrer" className="col-span-12 md:col-span-8 aspect-video bg-[#251e1e] relative group overflow-hidden block">
                  <div className="absolute inset-0 bg-[#3b3333] opacity-60 scale-105 group-hover:scale-100 transition-transform duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181212] to-transparent"></div>
                  <div className="absolute bottom-8 left-8 z-10 w-full pr-8">
                    <span className="bg-[#8D1515] text-[#ff998f] px-3 py-1 text-xs uppercase font-label">
                      {repos[0].language || 'Code'}
                    </span>
                    <h3 className="text-4xl font-headline font-bold text-[#eedfdf] mt-4 uppercase">
                      {repos[0].name}
                    </h3>
                    <p className="text-[#c6c6c7] mt-2 line-clamp-2 max-w-xl">{repos[0].description}</p>
                  </div>
                </a>
              )}

              {/* Slot 02: Ghost number effect */}
              {repos[1] && (
                <a href={repos[1].html_url} target="_blank" rel="noopener noreferrer" className="col-span-12 md:col-span-4 self-center aspect-[3/4] bg-[#302828] relative group overflow-hidden block">
                  <span className="absolute -top-4 -left-4 font-headline font-black text-[#FFB3AE] opacity-10" style={{ fontSize: 'clamp(4rem,15vw,12rem)' }}>
                    02
                  </span>
                  <div className="absolute inset-0 bg-[#403737] grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="absolute bottom-8 left-8 z-10 w-full pr-8">
                    <h3 className="text-2xl font-headline font-bold text-[#eedfdf] uppercase">{repos[1].name}</h3>
                    <span className="text-[#FFB3AE] text-sm tracking-widest uppercase mt-2 block">{repos[1].language || 'Project'}</span>
                  </div>
                </a>
              )}

              {/* Slot 03: VIEW PROJECT CTA slide */}
              {repos[2] && (
                <a href={repos[2].html_url} target="_blank" rel="noopener noreferrer" className="col-span-12 md:col-start-2 md:col-span-6 aspect-square bg-[#211a1a] relative group overflow-hidden block border-[20px] border-[#181212] hover:border-[0px] transition-all duration-[400ms]">
                  <div className="absolute inset-0 bg-[#8D1515] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity"></div>
                  <div className="absolute inset-x-0 bottom-0 bg-[#FFB3AE] text-[#68000b] p-6 text-center transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="font-headline font-black text-xl tracking-widest uppercase">VIEW PROJECT</span>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center pointer-events-none">
                     <h3 className="text-4xl font-headline font-bold text-[#eedfdf] uppercase mb-4">{repos[2].name}</h3>
                     <p className="text-[#c6c6c7] line-clamp-3">{repos[2].description}</p>
                  </div>
                </a>
              )}

              {/* "View All Projects" Card */}
              <div className="col-span-12 md:col-span-4 md:col-start-9 min-h-[350px]">
                <button 
                  onClick={() => window.open('https://github.com/RoNnY125-coder', '_blank')}
                  className="bg-[#8D1515] hover:bg-[#FFB3AE] w-full h-full p-12 flex flex-col justify-between group transition-colors duration-300 text-left"
                >
                  <span className="material-symbols-outlined text-white group-hover:text-[#181212] transition-colors duration-300">arrow_outward</span>
                  <div>
                    <h3 className="font-headline font-black text-5xl text-white group-hover:text-[#181212] transition-colors duration-300 uppercase leading-none mb-4">
                      VIEW ALL PROJECTS
                    </h3>
                    <p className="text-[#ff998f] group-hover:text-[#68000b] transition-colors duration-300">
                      Explore the complete collection on GitHub
                    </p>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Small repos row (3-col grid below) */}
        {!loading && repos.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {repos.slice(3, 6).map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="bg-[#211a1a] p-6 hover:bg-[#251e1e] transition-colors group relative block">
                <span className="absolute top-6 right-6 material-symbols-outlined text-[#c6c6c7] group-hover:text-[#FFB3AE]">arrow_outward</span>
                <span className="text-xs text-[#8D1515] font-bold uppercase tracking-widest mb-2 block">{repo.language || 'Repository'}</span>
                <h4 className="font-headline font-bold text-xl uppercase text-[#eedfdf] mb-2 pr-8 truncate">{repo.name}</h4>
                <p className="text-[#c6c6c7] text-sm line-clamp-2">{repo.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
