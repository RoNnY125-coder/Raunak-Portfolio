import { useEffect, useState } from "react";

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

const surfaceColors = [
  "bg-[#302828]", "bg-[#251e1e]", "bg-[#3b3333]",
  "bg-[#403737]", "bg-[#302828]", "bg-[#251e1e]",
  "bg-[#3b3333]", "bg-[#251e1e]", "bg-[#302828]",
];

export function ArchivePanel({ isOpen, onClose }: ArchivePanelProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  // ESC key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Fetch repos
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("https://api.github.com/users/RoNnY125-coder/repos?sort=updated&per_page=9")
      .then((r) => r.json())
      .then((data: GitHubRepo[]) => {
        setRepos(data.filter((r) => !r.name.toLowerCase().includes("ronny125")));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99] bg-[#181212]/80 backdrop-blur-sm archive-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed inset-0 z-[100] bg-[#181212] archive-panel ${isOpen ? "is-open" : ""} overflow-y-auto`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#8D1515 #181212" }}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 lg:px-16 py-6 bg-[#181212]/90 backdrop-blur-xl border-b border-[#251e1e]">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#c6c6c7] hover:text-[#FFB3AE] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span
              className="font-black uppercase text-xs tracking-[0.2em]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              CLOSE
            </span>
          </button>
          <span
            className="font-black uppercase text-sm tracking-[0.15em] text-[#eedfdf]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            ARCHIVED CONSTRUCTS
          </span>
          <span className="text-xs text-[#8D1515] tracking-widest uppercase font-medium">
            V.01 — 2026
          </span>
        </div>

        {/* Hero headline */}
        <div className="px-6 lg:px-16 pt-20 pb-12">
          <div
            className="archive-item"
            style={{ animationDelay: "0ms" }}
          >
            <h1
              className="font-black uppercase tracking-tighter text-[#eedfdf] leading-[0.85]"
              style={{ fontFamily: "'Epilogue', sans-serif", fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              ARCHIVED
            </h1>
            <h1
              className="font-black uppercase tracking-tighter text-[#930616] leading-[0.85] ml-[10%]"
              style={{ fontFamily: "'Epilogue', sans-serif", fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              CONSTRUCTS
            </h1>
          </div>
          <div
            className="w-[60%] h-[2px] bg-[#8D1515] mt-10 archive-item"
            style={{ animationDelay: "80ms" }}
          />
        </div>

        {/* Projects grid */}
        <div className="px-6 lg:px-16 pb-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {[8, 4, 4, 8, 12].map((span, i) => (
                <div
                  key={i}
                  className={`md:col-span-${span} h-64 bg-[#251e1e] animate-pulse`}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {repos.map((repo, i) => {
                const isLarge = i % 3 === 0;
                const isWide = i % 5 === 4;
                const colSpan = isWide ? "md:col-span-12" : isLarge ? "md:col-span-8" : "md:col-span-4";
                const aspect = isWide ? "aspect-[21/9]" : isLarge ? "aspect-video" : "aspect-[3/4]";
                const bg = surfaceColors[i % surfaceColors.length];
                const ghostNum = String(i + 1).padStart(2, "0");

                return (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${colSpan} ${aspect} relative overflow-hidden group archive-item`}
                    style={{ animationDelay: `${(i + 2) * 80}ms` }}
                  >
                    {/* Background surface */}
                    <div className={`absolute inset-0 ${bg} transition-all duration-700`} />

                    {/* Red overlay on hover */}
                    <div className="absolute inset-0 bg-[#8D1515] mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                    {/* Ghost number */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span
                        className="font-black text-[10rem] text-[#ffb3ae] opacity-10 select-none"
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        {ghostNum}
                      </span>
                    </div>

                    {/* North-east arrow top right */}
                    <div className="absolute top-4 right-4 z-10 text-[#c6c6c7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined">north_east</span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-[#181212]/90 to-transparent">
                      {repo.language && (
                        <span className="bg-[#8d1515] text-[#ff998f] px-3 py-1 text-xs uppercase tracking-wider inline-block mb-3"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {repo.language}
                        </span>
                      )}
                      <h3
                        className="font-bold text-[#eedfdf] text-lg uppercase group-hover:text-[#FFB3AE] transition-colors"
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        {repo.name}
                      </h3>
                      {repo.description && (
                        <p className="text-[#c6c6c7] text-sm mt-1 line-clamp-2">{repo.description}</p>
                      )}
                    </div>

                    {/* VIEW PROJECT CTA that slides up */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-6">
                      <span
                        className="cta-reveal bg-[#FFB3AE] text-[#181212] px-6 py-3 font-black uppercase text-xs tracking-widest"
                        style={{ fontFamily: "'Epilogue', sans-serif" }}
                      >
                        VIEW PROJECT
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Certifications section */}
        <div className="px-6 lg:px-16 pb-16">
          <div
            className="flex items-center gap-6 mb-12 archive-item"
            style={{ animationDelay: `${(repos.length + 3) * 80}ms` }}
          >
            <div className="h-[1px] w-16 bg-[#8D1515]" />
            <span
              className="font-black uppercase text-xs tracking-[0.3em] text-[#c6c6c7]"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              CERTIFICATIONS
            </span>
            <div className="h-[1px] flex-1 bg-[#251e1e]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <a
                key={cert.id}
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#251e1e] p-6 group hover:bg-[#302828] transition-all duration-300 hover:scale-[1.02] relative archive-item"
                style={{ animationDelay: `${(repos.length + 4 + i) * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="material-symbols-outlined text-[#FFB3AE]/30 text-2xl group-hover:text-[#FFB3AE] transition-colors">
                    workspace_premium
                  </span>
                  <span className="material-symbols-outlined text-sm text-[#c6c6c7] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    north_east
                  </span>
                </div>
                <span
                  className="absolute bottom-4 right-4 font-black text-6xl text-[#3b3333] pointer-events-none select-none"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {cert.id}
                </span>
                <h3
                  className="font-bold text-sm text-[#eedfdf] uppercase group-hover:text-[#FFB3AE] transition-colors relative z-10"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {cert.name}
                </h3>
                <p className="text-xs text-[#c6c6c7] mt-1 relative z-10">
                  {cert.platform} • {cert.year}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Explore GitHub CTA */}
        <a
          href="https://github.com/RoNnY125-coder"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="bg-[#130d0d] hover:bg-[#8E1616] transition-all duration-500 px-6 lg:px-16 py-20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#c6c6c7] mb-2">Next</p>
                <h2
                  className="font-black uppercase tracking-tighter text-3xl lg:text-5xl text-[#ffb4ab] group-hover:text-[#FFB3AE] transition-colors"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  EXPLORE GITHUB
                </h2>
              </div>
              <span className="material-symbols-outlined text-4xl text-[#c6c6c7] group-hover:translate-x-4 transition-transform duration-500">
                arrow_forward
              </span>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
