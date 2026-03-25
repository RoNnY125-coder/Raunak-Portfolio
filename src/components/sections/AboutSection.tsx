import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description: "Building performant, accessible web applications with modern frameworks and best practices.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive interfaces with a focus on user experience and visual aesthetics.",
  },
  {
    icon: Zap,
    title: "Design-to-Code",
    description: "Seamlessly translating design concepts into pixel-perfect, production-ready code.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:pl-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            About Me
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Passionate about crafting
            <br />
            <span className="text-gradient">digital experiences</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm an aspiring Frontend Developer with a strong foundation in UI/UX design. 
              My journey in web development started with a curiosity about how beautiful, 
              functional interfaces come to life.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I believe that great products emerge at the intersection of clean code and 
              thoughtful design. My approach involves understanding user needs first, 
              then crafting solutions that are both visually appealing and technically robust.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Currently focused on building responsive, accessible web applications 
              using modern technologies like React, Next.js, and Tailwind CSS. I'm always 
              eager to learn and grow in this ever-evolving field.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="card-glass p-6 transition-all duration-300 hover:border-primary/30"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}