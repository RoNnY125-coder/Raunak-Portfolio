import React, { useEffect, useState, useRef } from 'react';

interface WorkPanelProps {
  onNavigate: (index: number) => void;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
  stargazers_count: number;
  homepage?: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', Rust: '#dea584',
  Go: '#00ADD8', Java: '#b07219', 'C++': '#f34b7d',
};

export const WorkPanel: React.FC<WorkPanelProps> = ({ onNavigate }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Static projects data for 100% reliability
  const STATIC_REPOS: Repo[] = [
    {
      id: 1187439861,
      name: "CampusMind",
      description: "An AI-powered academic assistant designed to streamline student workflow. Features include intelligent note-taking, assignment tracking, and collaborative study tools.",
      language: "TypeScript",
      html_url: "https://github.com/RoNnY125-coder/CampusMind",
      stargazers_count: 2,
      homepage: "https://campus-mind-flame.vercel.app/"
    },
    {
      id: 1121251552,
      name: "E-commerce-Dashboard",
      description: "A modern, responsive admin interface built with React, Tailwind CSS, Chart.js, and Supabase. Features real-time analytics, inventory management, and order tracking.",
      language: "TypeScript",
      html_url: "https://github.com/RoNnY125-coder/E-commerce-Dashboard",
      stargazers_count: 0
    },
    {
      id: 1192321022,
      name: "AI-Resume-Analyzer",
      description: "A smart AI/ML tool that parses resumes, evaluates skills, and provides insights to help recruiters and job seekers quickly assess qualifications.",
      language: "Python",
      html_url: "https://github.com/RoNnY125-coder/AI-Resume-Analyzer",
      stargazers_count: 1
    },
    {
      id: 1169738071,
      name: "Bankagement",
      description: "A mobile banking app prototype designed to simulate modern fintech UI/UX flows. Focused on clean financial data presentation and secure interaction design.",
      language: "HTML",
      html_url: "https://github.com/RoNnY125-coder/Bankagement",
      stargazers_count: 0
    },
    {
      id: 1122638308,
      name: "Task-Management-App",
      description: "A modern collaborative task management app with drag-and-drop task boards, multiple task views, and seamless dark & light mode support.",
      language: "TypeScript",
      html_url: "https://github.com/RoNnY125-coder/Task-Management-App",
      stargazers_count: 0
    }
  ];

  useEffect(() => {
    // We now use static repos for the main grid to avoid API rate limits/failures
    setRepos(STATIC_REPOS);
    setLoading(false);
  }, []);

  // Trigger card animations when panel becomes visible
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const cardEnter = (i: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
    transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
  });

  // Abstract grid mapping classes for indices 0 to 4
  const getGridClasses = (i: number) => {
    switch(i) {
      case 0: return "col-span-12 md:col-span-8 md:row-span-2 min-h-[300px] md:min-h-[500px]"; // Massive feature block
      case 1: return "col-span-12 md:col-span-4 min-h-[250px]"; // Top right thin block
      case 2: return "col-span-12 md:col-span-4 md:row-span-2 min-h-[300px] md:min-h-[500px]"; // Right tall vertical block
      case 3: return "col-span-12 md:col-span-4 min-h-[250px]"; // Bottom left box
      case 4: return "col-span-12 md:col-span-4 min-h-[250px]"; // Bottom middle box
      default: return "col-span-12 md:col-span-4 min-h-[250px]";
    }
  };

  return (
    <section ref={sectionRef} className="w-screen h-screen flex-shrink-0 overflow-y-auto bg-[#181212]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#8D1515 #181212' }}>
      <div style={{ padding: 'clamp(80px, 12vh, 120px) clamp(20px, 5vw, 80px) 80px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(32px, 6vh, 64px)', ...cardEnter(0) }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.4em', color: '#8D1515', textTransform: 'uppercase', marginBottom: '8px' }}>
              FULL-STACK ARSENAL
            </p>
            <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#FFB3AE', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              Core<br />Systems
            </h2>
          </div>
          <a href="https://github.com/RoNnY125-coder" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', color: '#c6c6c7', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 250ms', border: '1px solid #3b3333', padding: '8px 16px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FFB3AE'; (e.currentTarget as HTMLElement).style.borderColor = '#8D1515'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#c6c6c7'; (e.currentTarget as HTMLElement).style.borderColor = '#3b3333'; }}
          >
            GITHUB ↗
          </a>
        </div>

        {/* Grid Container */}
        {loading ? (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={getGridClasses(i)} style={{ background: '#251e1e', animation: 'shimmer 1.5s ease infinite', animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {repos.length > 0 ? (
              repos.map((repo, i) => {
                const isHovered = hoveredId === repo.id;
                const langColor = LANG_COLORS[repo.language] || '#8D1515';
                return (
                  <div
                    key={repo.id}
                    className={getGridClasses(i)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: i === 0 ? '40px' : '24px', // Extra padding for feature block
                      background: isHovered ? '#251e1e' : '#1a1414',
                      border: `1px solid ${isHovered ? '#8D1515' : '#251e1e'}`,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transform: isHovered ? 'translateY(-4px) scale(1.015)' : 'translateY(0) scale(1)',
                      boxShadow: isHovered ? '0 16px 40px rgba(141,21,21,0.18)' : '0 0 0 transparent',
                      transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
                      ...cardEnter(i + 1),
                    }}
                    onClick={() => {
                        window.open(repo.homepage || repo.html_url, '_blank', 'noopener,noreferrer');
                    }}
                    onMouseEnter={() => setHoveredId(repo.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Subtle Background Graphic for feature panels */}
                    {(i === 0 || i === 2) && (
                      <div style={{
                        position: 'absolute', inset: 0, opacity: isHovered ? 0.08 : 0.03,
                        background: `radial-gradient(circle at 100% 100%, #FFB3AE, transparent 65%)`,
                        transition: 'opacity 300ms', pointerEvents: 'none'
                      }} />
                    )}

                    {/* Ghost number */}
                    <span style={{
                      position: 'absolute', bottom: '-8px', right: '12px',
                      fontFamily: "'Epilogue', sans-serif", fontWeight: 900,
                      fontSize: i === 0 ? '12rem' : '6rem', 
                      color: '#251e1e',
                      lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                      transition: 'color 300ms',
                      ...(isHovered ? { color: '#302828' } : {}),
                      zIndex: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Top: language + arrow */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                      {repo.language && (
                        <span style={{
                          fontFamily: "'Inter', sans-serif", fontSize: '9px',
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          color: langColor, background: `${langColor}18`,
                          padding: '4px 10px', border: `1px solid ${langColor}40`,
                        }}>
                          {repo.language}
                        </span>
                      )}
                      <span className="material-symbols-outlined" style={{
                        fontSize: i === 0 ? '24px' : '18px',
                        color: isHovered ? '#FFB3AE' : '#3b3333',
                        transition: 'color 300ms, transform 300ms',
                        transform: isHovered ? 'translate(2px,-2px)' : 'translate(0,0)',
                      }}>
                        north_east
                      </span>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
                      {/* Repo name */}
                      <h3 style={{
                        fontFamily: "'Epilogue', sans-serif", fontWeight: 900,
                        fontSize: i === 0 ? 'clamp(1.5rem, 3vw, 2.5rem)' : 'clamp(1rem, 1.5vw, 1.25rem)',
                        lineHeight: 1.1,
                        color: isHovered ? '#FFB3AE' : '#eedfdf',
                        textTransform: 'uppercase', letterSpacing: '0.01em',
                        margin: '0 0 12px', transition: 'color 300ms',
                      }}>
                        {repo.name.replace(/-/g, ' ')}
                      </h3>

                      {/* Description */}
                      {repo.description && (
                        <p style={{
                          fontFamily: "'Inter', sans-serif", 
                          fontSize: i === 0 ? '14px' : '12px',
                          color: '#c6c6c7', margin: '0 0 16px', lineHeight: 1.6,
                          display: '-webkit-box', WebkitLineClamp: i === 0 ? 3 : 2,
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          maxWidth: i === 0 ? '75%' : '100%',
                        }}>
                          {repo.description}
                        </p>
                      )}

                      {/* Bottom: "VIEW PROJECT" reveal */}
                      <div style={{
                        overflow: 'hidden',
                        height: isHovered ? '32px' : '0px',
                        transition: 'height 300ms cubic-bezier(0.16,1,0.3,1)',
                      }}>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-block',
                            fontFamily: "'Epilogue', sans-serif", fontWeight: 900,
                            fontSize: '10px', letterSpacing: '0.25em',
                            textTransform: 'uppercase', color: '#181212',
                            background: '#FFB3AE', padding: '6px 16px',
                            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                            transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1) 50ms',
                            textDecoration: 'none'
                          }}
                        >
                          ACCESS REPOSITORY →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-12 py-20 text-center border border-[#3b3333] bg-[#1a1414]">
                <p className="font-headline font-black text-xl text-[#FFB3AE] uppercase tracking-widest mb-4">No Core Systems Detected</p>
                <p className="text-[#c6c6c7] max-w-md mx-auto text-sm">Our neural link to GitHub is active, but no repositories matched the primary exclusion filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
};
