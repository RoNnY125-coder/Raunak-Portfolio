import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";

const surfaceColors = [
  "bg-[#302828]", "bg-[#251e1e]", "bg-[#3b3333]",
  "bg-[#403737]", "bg-[#302828]", "bg-[#251e1e]",
];

export function ProjectsSection() {
  const { repos, loading, error } = useGitHubProjects("RoNnY125-coder");
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-32 lg:pl-24 px-6 lg:px-16">
      {/* Ghost number */}
      <div className="ghost-num -top-20 left-0">02</div>

      {/* Section header — left aligned */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-20"
      >
        <div>
          <span
            className="block text-xs tracking-[0.3em] uppercase text-[#FFB3AE] mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Portfolio
          </span>
          <h2
            className="font-black uppercase tracking-tighter text-5xl lg:text-7xl text-[#FFB3AE]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            SELECTED<br />WORKS
          </h2>
        </div>
        <span
          className="font-bold text-[#c6c6c7] text-lg hidden md:block"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          01 // {repos.length > 0 ? String(repos.length).padStart(2, "0") : "06"}
        </span>
      </motion.div>

      {/* Projects grid — asymmetric 12-col */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`${i % 2 === 0 ? "md:col-span-8" : "md:col-span-4"} h-64 bg-[#251e1e] animate-pulse`}
            />
          ))}

        {error && (
          <p className="md:col-span-12 text-[#c6c6c7]">
            {error}{" "}
            <a href="https://github.com/RoNnY125-coder" target="_blank" className="text-[#FFB3AE] underline">
              Visit GitHub
            </a>
          </p>
        )}

        {!loading &&
          repos.map((repo, index) => {
            const variant = index % 3;
            const ghostNum = String(index + 1).padStart(2, "0");
            const bg = surfaceColors[index % surfaceColors.length];

            // LARGE — Effect C: scale zoom, gradient overlay, CTA slide-up, inner border shrink
            if (variant === 0) {
              return (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="md:col-span-8 aspect-video relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 ${bg} scale-105 group-hover:scale-100 transition-transform duration-700`} />
                  <div className="absolute inset-0 inner-border z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#181212] to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    {repo.language && (
                      <span className="bg-[#8d1515] text-[#ff998f] px-3 py-1 text-xs uppercase tracking-wider inline-block mb-3">
                        {repo.language}
                      </span>
                    )}
                    <h3
                      className="font-bold text-[#eedfdf] text-xl uppercase group-hover:text-[#FFB3AE] transition-colors"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {repo.name.replace(/-/g, " ")}
                    </h3>
                    {repo.description && (
                      <p className="text-[#c6c6c7] text-sm mt-1 line-clamp-2 max-w-md">{repo.description}</p>
                    )}
                  </div>
                  <div className="absolute bottom-6 right-6 z-30">
                    <span
                      className="cta-reveal bg-[#FFB3AE] text-[#181212] px-5 py-2 font-black uppercase text-xs tracking-widest inline-block"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      VIEW PROJECT
                    </span>
                  </div>
                </motion.a>
              );
            }

            // SMALL — Effect B: grayscale flash, ghost number
            if (variant === 1) {
              return (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="md:col-span-4 aspect-[3/4] relative overflow-hidden group self-end"
                >
                  <div className={`absolute inset-0 ${bg} grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700`} />
                  <span
                    className="absolute top-8 left-8 font-black text-[8rem] text-[#ffb3ae] opacity-10 select-none pointer-events-none leading-none"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {ghostNum}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {repo.language && (
                      <span className="bg-[#8d1515] text-[#ff998f] px-3 py-1 text-xs uppercase tracking-wider inline-block mb-3">
                        {repo.language}
                      </span>
                    )}
                    <h3
                      className="font-bold text-[#eedfdf] text-lg uppercase group-hover:text-[#FFB3AE] transition-colors"
                      style={{ fontFamily: "'Epilogue', sans-serif" }}
                    >
                      {repo.name.replace(/-/g, " ")}
                    </h3>
                  </div>
                </motion.a>
              );
            }

            // MEDIUM — Red overlay blend, CTA slide-up
            return (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="md:col-start-2 md:col-span-6 aspect-square relative overflow-hidden group"
              >
                <div className={`absolute inset-0 ${bg} transition-all duration-700`} />
                <div className="absolute inset-0 bg-[#8D1515] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-[#181212]/80 to-transparent">
                  {repo.language && (
                    <span className="bg-[#8d1515] text-[#ff998f] px-3 py-1 text-xs uppercase tracking-wider inline-block mb-3">
                      {repo.language}
                    </span>
                  )}
                  <h3
                    className="font-bold text-[#eedfdf] text-xl uppercase group-hover:text-[#FFB3AE] transition-colors"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    {repo.name.replace(/-/g, " ")}
                  </h3>
                  {repo.description && (
                    <p className="text-[#c6c6c7] text-sm mt-1 line-clamp-2">{repo.description}</p>
                  )}
                </div>
                <div className="absolute bottom-6 right-6 z-20">
                  <span
                    className="cta-reveal bg-[#FFB3AE] text-[#181212] px-5 py-2 font-black uppercase text-xs tracking-widest inline-block"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  >
                    VIEW PROJECT
                  </span>
                </div>
              </motion.a>
            );
          })}
      </div>

      {/* View All link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="flex justify-end mt-12"
      >
        <a
          href="https://github.com/RoNnY125-coder"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span
            className="font-black uppercase text-sm tracking-widest text-[#FFB3AE]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            VIEW ALL ON GITHUB
          </span>
          <span className="material-symbols-outlined text-[#FFB3AE] group-hover:translate-x-2 transition-transform duration-300">
            arrow_forward
          </span>
        </a>
      </motion.div>
    </section>
  );
}
