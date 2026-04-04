import React from 'react';

interface SidebarProps {
  currentPanel: number;
  onNavigate: (index: number) => void;
  onArchiveOpen: () => void;
  archiveOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPanel, onNavigate, onArchiveOpen, archiveOpen }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-24 z-40 bg-[#181212] hidden lg:flex flex-col items-center py-12">
      <div className="flex flex-col items-center">
        <span className="text-xl font-black text-[#8D1515] font-headline">RS</span>
        <span className="text-[10px] tracking-widest text-[#FFB3AE] rotate-180 vertical-text mt-4">V.01</span>
      </div>

      <div className="flex flex-col gap-16 flex-grow justify-center">
        <span 
          onClick={() => onNavigate(1)}
          className={`material-symbols-outlined transition-all duration-500 ease-in-out cursor-pointer ${
            currentPanel === 1 && !archiveOpen ? 'text-[#FFB3AE] scale-110' : 'text-[#3B3333] hover:text-[#8D1515]'
          }`}
        >
          grid_view
        </span>
        <span 
          onClick={onArchiveOpen}
          className={`material-symbols-outlined transition-all duration-500 ease-in-out cursor-pointer ${
            archiveOpen ? 'text-[#FFB3AE] scale-110' : 'text-[#3B3333] hover:text-[#8D1515]'
          }`}
        >
          folder_open
        </span>
        <span 
          onClick={() => onNavigate(2)}
          className={`material-symbols-outlined transition-all duration-500 ease-in-out cursor-pointer ${
            currentPanel === 2 && !archiveOpen ? 'text-[#FFB3AE] scale-110' : 'text-[#3B3333] hover:text-[#8D1515]'
          }`}
        >
          auto_stories
        </span>
        <span 
          onClick={() => onNavigate(3)}
          className={`material-symbols-outlined transition-all duration-500 ease-in-out cursor-pointer ${
            currentPanel === 3 && !archiveOpen ? 'text-[#FFB3AE] scale-110' : 'text-[#3B3333] hover:text-[#8D1515]'
          }`}
        >
          alternate_email
        </span>
      </div>

      <div className="w-10 h-10 bg-[#3b3333]"></div>
    </aside>
  );
};