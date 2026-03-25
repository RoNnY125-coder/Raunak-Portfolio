import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16 lg:pl-20 lg:pt-0"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(16,90%,65%,0.12),transparent_60%)]" />
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hi, I'm{" "}
          <span className="text-gradient">Raunak Sharma</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 font-heading text-xl font-medium text-foreground/90 sm:text-2xl"
        >
          Frontend Developer & UI/UX Designer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground"
        >
          I craft clean, scalable, and user-focused interfaces that bridge the gap between beautiful design and robust engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="gap-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            View Projects
            <ArrowDown className="h-4 w-4" />
          </Button>
          {/* Replace /resume.pdf with your actual hosted resume URL */}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/RoNnY125-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/raunak-sharma-b91650344"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/basically._.raunak?igsh=MXNrNDd0bzRkcjl5MQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-[calc(50%+40px)]"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-14 w-8 items-start justify-center rounded-full border border-border/50 p-2"
        >
          <motion.div className="h-2 w-1 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
