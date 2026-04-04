import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-start overflow-hidden px-6 lg:px-16 pt-24 pb-12"
    >
      {/* Background ghost elements */}
      <div className="ghost-num top-20 right-10">01</div>
      
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span 
            className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.4em] text-[#8D1515]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 font-black text-6xl md:text-8xl lg:text-[10rem] uppercase leading-[0.85] tracking-tighter text-[#eedfdf]"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          RAUNAK<br />
          <span className="text-gradient">SHARMA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 font-black text-xl md:text-3xl uppercase tracking-widest text-[#FFB3AE]"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          Frontend Developer &amp; UI/UX Designer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mb-12 text-lg md:text-xl text-[#c6c6c7] leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          I craft clean, scalable, and user-focused interfaces that bridge the gap between beautiful design and robust engineering. Dismantling the template aesthetic through raw geometry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-8"
        >
          <button
            onClick={scrollToProjects}
            className="bg-[#8d1515] hover:bg-[#ffb3ae] text-[#ffb3ae] hover:text-[#68000b] px-10 py-5 font-black uppercase text-sm tracking-widest transition-all duration-300"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            VIEW PROJECTS
          </button>
          
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link-el font-black uppercase text-sm tracking-widest text-[#FFB3AE]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            DOWNLOAD RESUME
          </a>
        </motion.div>
      </div>

      {/* Vertical social bar */}
      <div className="absolute right-8 bottom-12 hidden lg:flex flex-col items-center gap-8 text-[#3B3333]">
        <a href="https://github.com/RoNnY125-coder" target="_blank" className="hover:text-[#8D1515] transition-colors"><i className="material-symbols-outlined text-lg">code</i></a>
        <a href="https://www.linkedin.com/in/raunak-sharma-b91650344" target="_blank" className="hover:text-[#8D1515] transition-colors"><i className="material-symbols-outlined text-lg">link</i></a>
        <a href="https://www.instagram.com/basically._.raunak" target="_blank" className="hover:text-[#8D1515] transition-colors"><i className="material-symbols-outlined text-lg">share</i></a>
        <div className="w-[1px] h-16 bg-[#3B3333]" />
      </div>
    </section>
  );
}
