import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    name: "Design2Code",
    platform: "Unstop",
    year: "2025",
    credential:
      "https://www.linkedin.com/posts/raunak-sharma-b91650344_design2code-figma-uiux-activity-7409111679499689985-_9eZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFY8o50BE0sEy87C3_WPmiWdyMAj-GzA-48",
  },
  {
    name: "Hack Secure",
    platform: "VIT Bhopal",
    year: "2025",
    credential:
      "https://www.linkedin.com/posts/raunak-sharma-b91650344_hacksecure2025-hackathon-ideathon-activity-7409219318111993856-HXPP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFY8o50BE0sEy87C3_WPmiWdyMAj-GzA-48",
  },
  {
    name: "Python Essentials",
    platform: "Vityarthi",
    year: "2025",
    credential: "https://www.vityarthi.com/certificate/v3bCxOzG6A9g",
  },
  {
    name: "Digital Literacy",
    platform: "Vityarthi",
    year: "2026",
    credential: "https://www.vityarthi.com/certificate/9ncUzDHR348m",
  },
  {
    name: "Fundamentals in AI ML",
    platform: "Vityarthi",
    year: "2026",
    credential: "https://www.vityarthi.com/certificate/Jl4tEodmAwv6",
  },
  {
    name: "Vibe with India Hackathon",
    platform: "Unstop",
    year: "2026",
    credential: "/vibe-with-india-hackathon-certificate.pdf",
  },
  {
    name: "Treasure Hunt",
    platform: "VIT Bhopal",
    year: "2026",
    credential: "/treasure-hunt-certificate.png",
  },
];

export function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative py-24 lg:pl-20">
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
            Achievements
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Certifications
          </h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <motion.a
                key={cert.name}
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group card-glass hover:glow-border p-5 transition-all duration-300 hover:border-primary/30"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mb-2 font-heading text-sm font-semibold leading-tight transition-colors group-hover:text-primary">
                  {cert.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{cert.platform}</span>
                  <span>&bull;</span>
                  <span>{cert.year}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
