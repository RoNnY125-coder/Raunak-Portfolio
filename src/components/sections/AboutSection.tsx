import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const highlights = [
  {
    icon: "code",
    title: "Frontend Engineering",
    description: "Building performant, accessible web applications with modern frameworks and best practices.",
  },
  {
    icon: "design_services",
    title: "UI/UX Design",
    description: "Creating intuitive interfaces with a focus on user experience and visual aesthetics.",
  },
  {
    icon: "bolt",
    title: "Design-to-Code",
    description: "Seamlessly translating design concepts into pixel-perfect, production-ready code.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 lg:pl-24 px-6 lg:px-16 overflow-hidden">
      {/* Ghost number */}
      <div className="ghost-num -top-20 left-10">03</div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:col-span-12"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.4em] text-[#8D1515]"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            About Me
          </span>
          <h2 className="font-black uppercase tracking-tighter text-4xl lg:text-7xl text-[#eedfdf]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}>
            PASSIONATE ABOUT<br />
            <span className="text-gradient">CRAFTING DIGITAL EXPERIENCES</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-7 space-y-8"
        >
          <p className="text-xl leading-[1.6] text-[#c6c6c7]" style={{ fontFamily: "'Inter', sans-serif" }}>
            I'm an aspiring Frontend Developer with a strong foundation in UI/UX design. 
            My journey in web development started with a curiosity about how beautiful, 
            functional interfaces come to life.
          </p>
          <p className="text-xl leading-[1.6] text-[#c6c6c7]" style={{ fontFamily: "'Inter', sans-serif" }}>
            I believe that great products emerge at the intersection of clean code and 
            thoughtful design. My approach involves understanding user needs first, 
            then crafting solutions that are both visually appealing and technically robust.
          </p>
          <p className="text-xl leading-[1.6] text-[#c6c6c7]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Currently focused on building responsive, accessible web applications 
            using modern technologies like React, Next.js, and Tailwind CSS.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 40 }}
           animate={isInView ? { opacity: 1, x: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="md:col-span-5 space-y-8"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="bg-[#251e1e] p-8 group hover:bg-[#302828] transition-colors duration-300 relative border-l-0 hover:border-l-4 border-[#8D1515]"
            >
              <span className="material-symbols-outlined text-4xl text-[#8D1515]/30 group-hover:text-[#8D1515] transition-colors mb-6 block">
                {item.icon}
              </span>
              <h3 className="mb-3 font-black uppercase text-lg text-[#FFB3AE]" style={{ fontFamily: "'Epilogue', sans-serif" }}>{item.title}</h3>
              <p className="text-[#c6c6c7] text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}