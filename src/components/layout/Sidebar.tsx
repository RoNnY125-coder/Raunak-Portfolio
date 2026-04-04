interface SidebarProps {
  activeSection: string;
  onArchiveOpen: () => void;
}

const sideIcons = [
  { id: "projects", icon: "grid_view", href: "#projects", isArchive: false },
  { id: "archive", icon: "folder_open", href: null, isArchive: true },
  { id: "about", icon: "auto_stories", href: "#about", isArchive: false },
  { id: "contact", icon: "alternate_email", href: "#contact", isArchive: false },
];

export function Sidebar({ activeSection, onArchiveOpen }: SidebarProps) {
  const handleClick = (item: (typeof sideIcons)[number]) => {
    if (item.isArchive) {
      onArchiveOpen();
      return;
    }
    if (item.href) {
      const el = document.querySelector(item.href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-24 h-full bg-[#181212] z-40 flex-col items-center justify-between py-8 border-r border-[#251e1e]">
      {/* Top brand */}
      <div className="flex flex-col items-center gap-2">
        <span
          className="font-black text-[#FFB3AE] text-lg"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          RS
        </span>
        <span className="vertical-text text-[10px] tracking-[0.3em] uppercase text-[#8D1515] mt-4">
          V.01
        </span>
      </div>

      {/* Middle icons */}
      <div className="flex flex-col items-center gap-8">
        {sideIcons.map((item) => {
          const isActive = item.id === activeSection;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`transition-all duration-500 ease-in-out ${
                isActive
                  ? "text-[#FFB3AE] scale-110"
                  : "text-[#3B3333] hover:text-[#8D1515] hover:scale-110"
              }`}
            >
              <span className="material-symbols-outlined text-2xl">
                {item.icon}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom portrait placeholder */}
      <div className="w-10 h-10 bg-[#3b3333] flex items-center justify-center">
        <span
          className="text-xs text-[#c6c6c7] font-black"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          R
        </span>
      </div>
    </aside>
  );
}