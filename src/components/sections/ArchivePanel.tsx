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
  { id: "05", name: "Fundamentals in AI ML", platform: "Vityarthi", year: "2026", credential: "https://www.vityarthi.com/certificate/Jl4tEodmAwv6" },
  { id: "06", name: "Vibe with India Hackathon", platform: "Unstop", year: "2026", credential: "/vibe-with-india-hackathon-certificate.pdf" },
  { id: "07", name: "Treasure Hunt", platform: "VIT Bhopal", year: "2026", credential: "/treasure-hunt-certificate.png" },
];

export function ArchivePanel({ isOpen, onClose }: ArchivePanelProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const repoTrackRef = useRef<HTMLDivElement>(null);
  const certTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("https://api.github.com/users/RoNnY125-coder/repos?sort=updated&per_page=12")
      .then(r => r.json())
      .then((data: GitHubRepo[]) => {
        setRepos(data.filter(r => !r.name.toLowerCase().includes("ronny125")));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isOpen]);

  // Drag-to-scroll for horizontal tracks
  const useDragScroll = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      const onMouseDown = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; el.style.cursor = 'grabbing'; };
      const onMouseLeave = () => { isDown = false; el.style.cursor = 'grab'; };
      const onMouseUp = () => { isDown = false; el.style.cursor = 'grab'; };
      const onMouseMove = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; const walk = (x - startX) * 2; el.scrollLeft = scrollLeft - walk; };
      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('mouseleave', onMouseLeave);
      el.addEventListener('mouseup', onMouseUp);
      el.addEventListener('mousemove', onMouseMove);
      return () => { el.removeEventListener('mousedown', onMouseDown); el.removeEventListener('mouseleave', onMouseLeave); el.removeEventListener('mouseup', onMouseUp); el.removeEventListener('mousemove', onMouseMove); };
    }, [ref]);
  };

  useDragScroll(repoTrackRef);
  useDragScroll(certTrackRef);

  return (
    <>
      {/* Backdrop — click to close */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 98,
          background: 'rgba(24,18,18,0.3)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 600ms ease',
        }}
      />

      {/* Archive Panel — slides in from RIGHT */}
      <div
        style={{
          position: 'fixed',
          top: 0, right: 0,
          width: '100vw', height: '100vh',
          zIndex: 100,
          background: '#181212',
          transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Sticky header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', borderBottom: '1px solid #251e1e', background: 'rgba(24,18,18,0.95)', backdropFilter: 'blur(16px)', flexShrink: 0 }}>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c6c6c7', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
            CLOSE
          </button>
          <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 14, letterSpacing: '0.15em', color: '#eedfdf', textTransform: 'uppercase' }}>
            ARCHIVED CONSTRUCTS
          </span>
          <span style={{ fontSize: 11, color: '#8D1515', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            V.01 — 2026
          </span>
        </div>

        {/* Hero headline */}
        <div style={{ padding: '48px 48px 24px', flexShrink: 0 }}>
          <h1 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.85, color: '#eedfdf', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
            ARCHIVED
          </h1>
          <h1 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.85, color: '#930616', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 0 10%' }}>
            CONSTRUCTS
          </h1>
          <div style={{ width: '60%', height: 2, background: '#8D1515', marginTop: 32 }} />
        </div>

        {/* SECTION LABEL — Projects */}
        <div style={{ padding: '16px 48px 8px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <div style={{ width: 32, height: 1, background: '#8D1515' }} />
          <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 10, letterSpacing: '0.4em', color: '#c6c6c7', textTransform: 'uppercase' }}>PROJECTS — DRAG TO EXPLORE →</span>
        </div>

        {/* HORIZONTAL PROJECT CARDS */}
        <div
          ref={repoTrackRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            padding: '16px 48px 32px',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            cursor: 'grab',
            flexShrink: 0,
            scrollbarWidth: 'thin',
            scrollbarColor: '#8D1515 #181212',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ width: 280, minWidth: 280, height: 360, background: '#251e1e', flexShrink: 0, scrollSnapAlign: 'start', animation: 'pulse 2s infinite' }} />
              ))
            : repos.map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: i % 4 === 0 ? 380 : 280,
                    minWidth: i % 4 === 0 ? 380 : 280,
                    height: 360,
                    background: ['#302828', '#251e1e', '#3b3333', '#403737'][i % 4],
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                  className="archive-card-hover"
                >
                  {/* Ghost number */}
                  <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: '8rem', color: '#ffb3ae', opacity: 0.07, userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Top-right arrow */}
                  <span className="material-symbols-outlined" style={{ position: 'absolute', top: 16, right: 16, color: '#c6c6c7', fontSize: 20, opacity: 0, transition: 'opacity 300ms' }} data-hover-show>north_east</span>
                  {/* Bottom content */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 24px 24px', background: 'linear-gradient(to top, rgba(24,18,18,0.95), transparent)' }}>
                    {repo.language && (
                      <span style={{ background: '#8d1515', color: '#ff998f', padding: '2px 10px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Inter', sans-serif", display: 'inline-block', marginBottom: 10 }}>
                        {repo.language}
                      </span>
                    )}
                    <h3 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, color: '#eedfdf', fontSize: 18, textTransform: 'uppercase', margin: '0 0 6px', letterSpacing: '0.02em' }}>
                      {repo.name}
                    </h3>
                    {repo.description && (
                      <p style={{ color: '#c6c6c7', fontSize: 13, margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {repo.description}
                      </p>
                    )}
                  </div>
                </a>
              ))}
        </div>

        {/* SECTION LABEL — Certifications */}
        <div style={{ padding: '8px 48px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <div style={{ width: 32, height: 1, background: '#8D1515' }} />
          <span style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 10, letterSpacing: '0.4em', color: '#c6c6c7', textTransform: 'uppercase' }}>CERTIFICATIONS — DRAG TO EXPLORE →</span>
        </div>

        {/* HORIZONTAL CERTIFICATION CARDS */}
        <div
          ref={certTrackRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            padding: '12px 48px 32px',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            cursor: 'grab',
            flexShrink: 0,
            scrollbarWidth: 'thin',
            scrollbarColor: '#8D1515 #181212',
          }}
        >
          {certifications.map((cert, i) => (
            <a
              key={cert.id}
              href={cert.credential}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 220, minWidth: 220, height: 200,
                background: '#251e1e',
                flexShrink: 0,
                scrollSnapAlign: 'start',
                padding: '24px 20px',
                textDecoration: 'none',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative', overflow: 'hidden',
                transition: 'background 300ms ease, transform 300ms ease',
              }}
              className="cert-card-hover"
            >
              <span className="material-symbols-outlined" style={{ color: 'rgba(255,179,174,0.3)', fontSize: 24 }}>workspace_premium</span>
              <div>
                <h4 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, fontSize: 13, color: '#eedfdf', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>
                  {cert.name}
                </h4>
                <p style={{ color: '#c6c6c7', fontSize: 11, margin: 0 }}>{cert.platform} · {cert.year}</p>
              </div>
              <span style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: '4rem', color: '#3b3333', lineHeight: 1, pointerEvents: 'none' }}>
                {cert.id}
              </span>
            </a>
          ))}
        </div>

        {/* GitHub CTA at bottom */}
        <a
          href="https://github.com/RoNnY125-coder"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', background: '#130d0d', padding: '32px 48px', textDecoration: 'none', transition: 'background 500ms ease', marginTop: 'auto', flexShrink: 0 }}
          className="github-cta-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#c6c6c7', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', margin: '0 0 6px', fontFamily: "'Inter', sans-serif" }}>Next</p>
              <h2 style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#ffb4ab', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
                EXPLORE GITHUB
              </h2>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#c6c6c7' }}>arrow_forward</span>
          </div>
        </a>
      </div>

      <style>{`
        .archive-card-hover:hover [data-hover-show] { opacity: 1 !important; }
        .cert-card-hover:hover { background: #302828 !important; transform: scale(1.02); }
        .github-cta-hover:hover { background: #8E1616 !important; }
        .archive-card-hover:hover h3 { color: #FFB3AE !important; }
      `}</style>
    </>
  );
}
