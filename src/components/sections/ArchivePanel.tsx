import { useEffect, useState, useRef } from "react";

interface ArchivePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
}

const certifications = [
  { id: "01", name: "Design2Code", platform: "Unstop", year: "2025", credential: "https://www.linkedin.com/posts/raunak-sharma-b91650344_design2code-figma-uiux-activity-7409111679499689985-_9eZ" },
  { id: "02", name: "Hack Secure", platform: "VIT Bhopal", year: "2025", credential: "https://www.linkedin.com/posts/raunak-sharma-b91650344_hacksecure2025-hackathon-ideathon-activity-7409219318111993856-HXPP" },
  { id: "03", name: "Python Essentials", platform: "Vityarthi", year: "2025", credential: "https://www.vityarthi.com/certificate/v3bCxOzG6A9g" },
  { id: "04", name: "Digital Literacy", platform: "Vityarthi", year: "2026", credential: "https://www.vityarthi.com/certificate/9ncUzDHR348m" },
  { id: "05", name: "AI/ML Fundamentals", platform: "Vityarthi", year: "2026", credential: "https://www.vityarthi.com/certificate/Jl4tEodmAwv6" },
  { id: "06", name: "Vibe with India Hackathon", platform: "Unstop", year: "2026", credential: "/vibe-with-india-hackathon-certificate.pdf" },
  { id: "07", name: "Treasure Hunt", platform: "VIT Bhopal", year: "2026", credential: "/treasure-hunt-certificate.png" },
];

const BG_COLORS = ['#1e1818', '#211a1a', '#251e1e', '#2a2020', '#1e1818'];

export function ArchivePanel({ isOpen, onClose }: ArchivePanelProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredRepo, setHoveredRepo] = useState<number | null>(null);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const repoRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", e => { if (e.key === "Escape") onClose(); });
    return () => document.removeEventListener("keydown", () => {});
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("https://api.github.com/users/RoNnY125-coder/repos?sort=updated&per_page=12")
      .then(r => r.json())
      .then((data: GitHubRepo[]) => { setRepos(data.filter(r => !r.name.toLowerCase().includes("raunak-portfolio"))); setLoading(false); })
      .catch(() => setLoading(false));
  }, [isOpen]);

  // Drag scroll
  const makeDraggable = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const el = ref.current; if (!el) return;
      let down = false, startX = 0, sl = 0;
      const md = (e: MouseEvent) => { down = true; startX = e.pageX - el.offsetLeft; sl = el.scrollLeft; el.style.cursor = 'grabbing'; };
      const ml = () => { down = false; el.style.cursor = 'grab'; };
      const mu = () => { down = false; el.style.cursor = 'grab'; };
      const mm = (e: MouseEvent) => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - startX) * 1.8; };
      el.addEventListener('mousedown', md); el.addEventListener('mouseleave', ml);
      el.addEventListener('mouseup', mu); el.addEventListener('mousemove', mm);
      return () => { el.removeEventListener('mousedown', md); el.removeEventListener('mouseleave', ml); el.removeEventListener('mouseup', mu); el.removeEventListener('mousemove', mm); };
    }, [ref]);
  };

  makeDraggable(repoRef);
  makeDraggable(certRef);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 98,
        background: 'rgba(24,18,18,0.5)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 500ms ease',
        backdropFilter: isOpen ? 'blur(2px)' : 'none',
      }} />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: '100vw', height: '100vh', zIndex: 100,
        background: '#181212',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 650ms cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px clamp(20px,4vw,48px)', borderBottom: '1px solid #251e1e', flexShrink: 0, background: 'rgba(24,18,18,0.95)', backdropFilter: 'blur(16px)' }}>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#c6c6c7', fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '8px 12px', transition: 'color 250ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFB3AE')}
            onMouseLeave={e => (e.currentTarget.style.color = '#c6c6c7')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            CLOSE
          </button>
          <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: '0.15em', color: '#eedfdf', textTransform: 'uppercase' }}>ARCHIVED CONSTRUCTS</span>
          <span style={{ fontSize: 10, color: '#8D1515', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>V.01 — 2026</span>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#8D1515 #181212' }}>
          {/* Hero headline */}
          <div style={{ padding: 'clamp(32px,5vh,56px) clamp(20px,4vw,48px) 24px' }}>
            <h1 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem,8vw,7rem)', lineHeight: 0.85, color: '#eedfdf', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>ARCHIVED</h1>
            <h1 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem,8vw,7rem)', lineHeight: 0.85, color: '#930616', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 0 8%' }}>CONSTRUCTS</h1>
            <div style={{ width: '55%', height: 2, background: '#8D1515', marginTop: 24 }} />
          </div>

          {/* PROJECTS — horizontal drag track */}
          <div style={{ padding: '8px clamp(20px,4vw,48px) 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: '#8D1515' }} />
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 9, letterSpacing: '0.4em', color: '#c6c6c7', textTransform: 'uppercase' }}>
                PROJECTS — DRAG TO EXPLORE →
              </span>
            </div>
          </div>

          <div ref={repoRef} style={{ display: 'flex', gap: 12, padding: '4px clamp(20px,4vw,48px) 24px', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', cursor: 'grab', scrollbarWidth: 'thin', scrollbarColor: '#8D1515 #181212', WebkitOverflowScrolling: 'touch' }}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ width: 260, minWidth: 260, height: 300, background: '#251e1e', flexShrink: 0, scrollSnapAlign: 'start', opacity: 0.5, animation: 'shimmer 1.5s ease infinite', animationDelay: `${i*120}ms` }} />
                ))
              : repos.map((repo, i) => {
                  const isH = hoveredRepo === repo.id;
                  return (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                      style={{
                        width: i % 4 === 0 ? 340 : 260, minWidth: i % 4 === 0 ? 340 : 260, height: 300,
                        background: isH ? '#302828' : BG_COLORS[i % BG_COLORS.length],
                        flexShrink: 0, scrollSnapAlign: 'start',
                        position: 'relative', overflow: 'hidden', textDecoration: 'none',
                        border: `1px solid ${isH ? '#8D1515' : 'transparent'}`,
                        transform: isH ? 'scale(1.03) translateY(-4px)' : 'scale(1) translateY(0)',
                        boxShadow: isH ? '0 20px 48px rgba(141,21,21,0.22)' : 'none',
                        transition: 'all 280ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                      onMouseEnter={() => setHoveredRepo(repo.id)}
                      onMouseLeave={() => setHoveredRepo(null)}
                    >
                      {/* Ghost number */}
                      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: '7rem', color: isH ? '#3b3333' : '#251e1e', opacity: 0.6, userSelect: 'none', pointerEvents: 'none', lineHeight: 1, transition: 'color 280ms' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Arrow */}
                      <span className="material-symbols-outlined" style={{ position: 'absolute', top: 14, right: 14, fontSize: 18, color: isH ? '#FFB3AE' : '#3b3333', transition: 'color 280ms, transform 280ms', transform: isH ? 'translate(2px,-2px)' : 'translate(0,0)' }}>north_east</span>
                      {/* Bottom content */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px 20px', background: 'linear-gradient(to top, rgba(24,18,18,0.98), transparent)' }}>
                        {repo.language && (
                          <span style={{ background: '#8d1515', color: '#ff998f', padding: '2px 8px', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Inter',sans-serif", display: 'inline-block', marginBottom: 8 }}>{repo.language}</span>
                        )}
                        <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, color: isH ? '#FFB3AE' : '#eedfdf', fontSize: 15, textTransform: 'uppercase', margin: '0 0 6px', transition: 'color 280ms' }}>{repo.name}</h3>
                        {repo.description && (
                          <p style={{ color: '#c6c6c7', fontSize: 12, margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{repo.description}</p>
                        )}
                        {/* VIEW PROJECT reveal */}
                        <div style={{ overflow: 'hidden', height: isH ? '28px' : '0px', marginTop: isH ? '10px' : '0px', transition: 'height 280ms cubic-bezier(0.16,1,0.3,1), margin 280ms' }}>
                          <span style={{ display: 'inline-block', background: '#FFB3AE', color: '#181212', padding: '4px 12px', fontSize: 9, fontFamily: "'Epilogue', sans-serif", fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase' }}>VIEW PROJECT →</span>
                        </div>
                      </div>
                    </a>
                  );
                })
            }
          </div>

          {/* CERTIFICATIONS */}
          <div style={{ padding: '8px clamp(20px,4vw,48px) 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: '#8D1515' }} />
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 9, letterSpacing: '0.4em', color: '#c6c6c7', textTransform: 'uppercase' }}>CERTIFICATIONS — DRAG TO EXPLORE →</span>
            </div>
          </div>

          <div ref={certRef} style={{ display: 'flex', gap: 10, padding: '4px clamp(20px,4vw,48px) 32px', overflowX: 'auto', scrollSnapType: 'x mandatory', cursor: 'grab', scrollbarWidth: 'thin', scrollbarColor: '#8D1515 #181212' }}>
            {certifications.map((cert) => {
              const isH = hoveredCert === cert.id;
              return (
                <a key={cert.id} href={cert.credential} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 210, minWidth: 210, height: 180, background: isH ? '#302828' : '#211a1a',
                    flexShrink: 0, scrollSnapAlign: 'start', padding: '20px 18px',
                    textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    position: 'relative', overflow: 'hidden',
                    border: `1px solid ${isH ? '#8D1515' : 'transparent'}`,
                    transform: isH ? 'scale(1.04) translateY(-4px)' : 'scale(1) translateY(0)',
                    boxShadow: isH ? '0 16px 32px rgba(141,21,21,0.2)' : 'none',
                    transition: 'all 260ms cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={() => setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                >
                  <span className="material-symbols-outlined" style={{ color: isH ? '#FFB3AE' : 'rgba(255,179,174,0.3)', fontSize: 22, transition: 'color 260ms' }}>workspace_premium</span>
                  <div>
                    <h4 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 12, color: isH ? '#FFB3AE' : '#eedfdf', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px', transition: 'color 260ms' }}>{cert.name}</h4>
                    <p style={{ color: '#c6c6c7', fontSize: 11, margin: 0 }}>{cert.platform} · {cert.year}</p>
                  </div>
                  <span style={{ position: 'absolute', bottom: 6, right: 10, fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: '3.5rem', color: isH ? '#3b3333' : '#2a2020', lineHeight: 1, pointerEvents: 'none', transition: 'color 260ms' }}>{cert.id}</span>
                </a>
              );
            })}
          </div>

          {/* GitHub CTA */}
          <a href="https://github.com/RoNnY125-coder" target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8E1616'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#130d0d'; }}
          >
            <div style={{ background: '#130d0d', padding: 'clamp(24px,4vh,40px) clamp(20px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 400ms ease' }}>
              <div>
                <p style={{ color: '#c6c6c7', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', margin: '0 0 6px', fontFamily: "'Inter',sans-serif" }}>Next</p>
                <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,3rem)', color: '#ffb4ab', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>EXPLORE GITHUB</h2>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#c6c6c7' }}>arrow_forward</span>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
      `}</style>
    </>
  );
}
