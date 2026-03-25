import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

const experiences = [
  {
    type: "education",
    title: "B.Tech In Computer Science Engineering",
    organization: "VIT Bhopal University",
    period: "2025 - 2029",
    description: "Pursuing B.Tech with focus on web technologies, data structures, and software engineering principles.",
  },
  {
    type: "education",
    title: "Higher Secondary Education",
    organization: "D.A.V Public School, Kailash Hills , New Delhi",
    period: "2023 - 2025",
    description: "Completed 12th grade with focus on Physics, Chemistry, and Mathematics.",
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 lg:pl-20">
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
            Journey
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Experience & Education
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:block" />

          <div className="space-y-8">
            {experiences.map((item, index) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              return (
                <motion.div
                  key={`${item.title}-${index}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-0 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary md:flex">
                    <Icon className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>

                  <div className="card-glass p-6 transition-all duration-300 hover:border-primary/30">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 md:hidden">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="mb-1 font-heading text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mb-3 font-medium text-primary">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
