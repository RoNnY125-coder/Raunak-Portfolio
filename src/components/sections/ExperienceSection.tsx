import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    period: "2025 — 2029",
    ghostYear: "2025",
    type: "EDUCATION",
    title: "B.TECH IN COMPUTER SCIENCE ENGINEERING",
    organization: "VIT Bhopal University",
    description:
      "Pursuing B.Tech with focus on web technologies, data structures, and software engineering principles.",
  },
  {
    period: "2023 — 2025",
    ghostYear: "2023",
    type: "EDUCATION",
    title: "HIGHER SECONDARY EDUCATION",
    organization: "D.A.V Public School, Kailash Hills, New Delhi",
    description:
      "Completed 12th grade with focus on Physics, Chemistry, and Mathematics.",
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 lg:pl-24 px-6 lg:px-16">
      <div className="ghost-num -top-10 right-10">05</div>

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
          Visual Journey
        </span>
        <h2
          className="font-black uppercase tracking-tighter text-4xl lg:text-6xl text-[#eedfdf]"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          EXPERIENCE &amp;<br />EDUCATION
        </h2>
      </motion.div>

      <div className="space-y-20 max-w-5xl">
        {experiences.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 ${
                !isEven ? "md:ml-auto md:max-w-4xl" : ""
              }`}
            >
              {/* Ghost year number */}
              <span
                className="absolute -top-8 left-0 font-black text-[#ffb3ae] opacity-[0.04] select-none pointer-events-none leading-none"
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: "15vw",
                }}
              >
                {item.ghostYear}
              </span>

              {/* Card */}
              <div
                className={`${
                  isEven ? "md:col-span-8" : "md:col-start-5 md:col-span-8"
                } bg-[#251e1e] p-8 lg:p-12 group hover:bg-[#302828] transition-all duration-300 relative overflow-hidden border-l-0 hover:border-l-4 border-[#8d1515]`}
              >
                {/* Period ghost behind */}
                <span
                  className="absolute top-4 right-4 font-black text-7xl text-[#3b3333] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none select-none"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {item.ghostYear}
                </span>

                <span
                  className="block text-xs tracking-[0.3em] uppercase text-[#8d1515] mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.type}
                </span>
                <p
                  className="font-bold text-sm text-[#c6c6c7] mb-4"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {item.period}
                </p>
                <h3
                  className="font-bold text-2xl text-[#FFB3AE] uppercase mb-2 relative z-10"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#c6c6c7] text-lg mb-4 relative z-10"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.organization}
                </p>
                <p className="text-[#e0bfbb] leading-relaxed relative z-10">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
