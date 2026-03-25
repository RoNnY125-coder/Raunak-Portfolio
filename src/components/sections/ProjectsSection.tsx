import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsSection() {
  const { repos, loading, error } = useGitHubProjects("RoNnY125-coder");
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 lg:pl-20">
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
            Portfolio
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Selected Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Projects focused on frontend architecture, scalable UI systems,
            and real-world functionality.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          {error && (
            <p className="col-span-3 text-center text-muted-foreground">{error}</p>
          )}
          {!loading && !error && repos.length === 0 && (
            <p className="col-span-3 text-center text-muted-foreground">
              No public GitHub projects are available right now.
            </p>
          )}
          {!loading &&
            repos.map((repo, index) => (
              <motion.article
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col rounded-2xl border bg-background/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Folder className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold capitalize transition-colors group-hover:text-primary">
                  {repo.name.replace(/-/g, " ")}
                </h3>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {repo.language && (
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/RoNnY125-coder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="gap-2 transition-all hover:scale-105"
            >
              <Github className="h-4 w-4" />
              View All Projects on GitHub
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
