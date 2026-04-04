import { useState } from "react";

interface TopNavProps {
  activeSection: string;
  onArchiveOpen: () => void;
}

const navLinks = [
  { id: "projects", label: "WORK", href: "#projects" },
  { id: "archive", label: "ARCHIVE", href: null },
  { id: "about", label: "MANIFESTO", href: "#about" },
  { id: "contact", label: "CONTACT", href: "#contact" },
];

export function TopNav({ activeSection, onArchiveOpen }: TopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (link: (typeof navLinks)[number]) => {
    if (link.id === "archive") {
      onArchiveOpen();
      setMobileOpen(false);
      return;
    }
    if (link.href) {
      const el = document.querySelector(link.href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-24 right-0 z-50 backdrop-blur-xl bg-[#181212]/30">
        <div className="flex items-center justify-between px-6 lg:px-12 py-5">
          <a
            href="#home"
            className="font-black text-[#FFB3AE] uppercase tracking-tight text-lg"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            RAUNAK.S
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.id === activeSection;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`nav-link-el font-black uppercase text-xs tracking-[0.2em] transition-colors duration-300 ${
                    isActive
                      ? "text-[#FFB3AE] active"
                      : "text-[#C6C6C7] hover:text-[#FFB3AE]"
                  }`}
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#eedfdf]"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-[#181212]/95 backdrop-blur-xl flex flex-col items-start justify-center px-10 gap-8 transition-transform duration-500 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-[#eedfdf]"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link)}
            className="font-black text-4xl uppercase text-[#eedfdf] hover:text-[#FFB3AE] transition-colors"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
