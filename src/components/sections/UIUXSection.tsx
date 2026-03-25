import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Figma,
  Layout,
  Smartphone,
  Github,
  Linkedin,
} from "lucide-react";

const uiuxProjects = [
  {
    title: "Bankagement",
    category: "App Design",
    description:
      "A mobile banking management app prototype focused on secure interaction design, financial clarity, and modern fintech UI patterns.",
    highlights: [
      "User Research",
      "Wireframes",
      "High-Fidelity Mockups",
      "Prototype",
    ],
    github: "https://github.com/RoNnY125-coder/Bankagement",
    linkedin: "https://www.linkedin.com/posts/raunak-sharma-b91650344_uiux-fintech-aidesign-activity-7433754268475744256-7mqh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFY8o50BE0sEy87C3_WPmiWdyMAj-GzA-48",
    icon: Smartphone,
  },
  {
    title: "E-Learning Platform",
    category: "Web Design",
    description:
      "An intuitive learning management system designed to improve student engagement, structured navigation, and performance tracking.",
    highlights: [
      "Information Architecture",
      "User Flows",
      "Component Library",
      "Dark Mode",
    ],
    icon: Layout,
  },
  {
    title: "Fitness Tracker Dashboard",
    category: "Dashboard Design",
    description:
      "A comprehensive fitness analytics dashboard with structured data visualization and goal tracking features.",
    highlights: [
      "Data Visualization",
      "Responsive Design",
      "Accessibility",
      "Micro-interactions",
    ],
    icon: Figma,
  },
];

export function UIUXSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="uiux" className="relative py-24 lg:pl-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Design Work
          </span>

          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            UI/UX Projects
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A curated collection of user-centered design projects focusing on clarity, usability, and modern interface systems.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {uiuxProjects.map((project, index) => {
            const Icon = project.icon;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group card-glass overflow-hidden border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
              >
                {/* Header */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-6">

                  {/* Action Icons */}
                  {(project.github || project.linkedin) && (
                    <div className="absolute right-4 top-4 flex gap-2">
                      
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View GitHub Repository"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:text-primary"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}

                      {project.linkedin && (
                        <a
                          href={project.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View LinkedIn Post"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:text-primary"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}

                    </div>
                  )}

                  {/* Icon + Category */}
                  <div className="absolute bottom-6 left-6">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-card/80 backdrop-blur-sm">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-3 font-heading text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>

                  <p className="mb-6 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-md border border-border/50 bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
