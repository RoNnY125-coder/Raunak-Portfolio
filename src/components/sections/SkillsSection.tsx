import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
    <section id="skills" className="relative py-24 lg:pl-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Skills & Expertise
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Technologies I work with
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="card-glass hover:glow-border p-6 lg:p-8"
            >
              <h3 className="mb-6 font-heading text-xl font-semibold text-gradient">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {skill.name}
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
