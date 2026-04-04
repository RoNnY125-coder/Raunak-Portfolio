import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 40 },
      { name: "React", level: 35 },
      { name: "Next.js", level: 35 },
    ],
  },
  {
    title: "UI / UX",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Wireframing", level: 70 },
      { name: "Prototyping", level: 75 },
      { name: "User Flows", level: 70 },
    ],
  },
  {
    title: "Styling & Layout",
    skills: [
      { name: "Tailwind CSS", level: 85 },
      { name: "Responsive Design", level: 90 },
      { name: "Flexbox", level: 90 },
      { name: "CSS Grid", level: 85 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 85 },
      { name: "Vercel", level: 75 },
      { name: "VS Code", level: 90 },
    ],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 lg:pl-24 px-6 lg:px-16">
      <div className="ghost-num -top-10 left-10">04</div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span
          className="block text-xs tracking-[0.3em] uppercase text-[#FFB3AE] mb-3"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Skills & Expertise
        </span>
        <h2
          className="font-black uppercase tracking-tighter text-4xl lg:text-6xl text-[#eedfdf]"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          TECHNOLOGIES I<br />WORK WITH
        </h2>
      </motion.div>

      {/* Staggered 2-col layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {skillCategories
            .filter((_, i) => i % 2 === 0)
            .map((category, ci) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                className="bg-[#211a1a] p-8 group hover:bg-[#251e1e] transition-colors duration-500"
              >
                <h3
                  className="font-black uppercase text-xl text-gradient mb-6"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="bg-[#3b3333] text-[#c6c6c7] px-3 py-2 text-xs uppercase tracking-wider hover:bg-[#8d1515] hover:text-[#ff998f] transition-colors duration-200 cursor-default"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {skill.name} — {skill.level}%
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>

        {/* Right column — offset down */}
        <div className="space-y-6 pt-0 md:pt-12">
          {skillCategories
            .filter((_, i) => i % 2 === 1)
            .map((category, ci) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (ci + 2) * 0.1 }}
                className="bg-[#211a1a] p-8 group hover:bg-[#251e1e] transition-colors duration-500"
              >
                <h3
                  className="font-black uppercase text-xl text-gradient mb-6"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="bg-[#3b3333] text-[#c6c6c7] px-3 py-2 text-xs uppercase tracking-wider hover:bg-[#8d1515] hover:text-[#ff998f] transition-colors duration-200 cursor-default"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {skill.name} — {skill.level}%
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
