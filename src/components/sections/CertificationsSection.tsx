import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const certifications = [
  { id: "01", name: "Design2Code", platform: "Unstop", year: "2025", credential: "https://www.linkedin.com/posts/raunak-sharma-b91650344_design2code-figma-uiux-activity-7409111679499689985-_9eZ" },
  { id: "02", name: "Hack Secure", platform: "VIT Bhopal", year: "2025", credential: "https://www.linkedin.com/posts/raunak-sharma-b91650344_hacksecure2025-hackathon-ideathon-activity-7409219318111993856-HXPP" },
  { id: "03", name: "Python Essentials", platform: "Vityarthi", year: "2025", credential: "https://www.vityarthi.com/certificate/v3bCxOzG6A9g" },
  { id: "04", name: "Digital Literacy", platform: "Vityarthi", year: "2026", credential: "https://www.vityarthi.com/certificate/9ncUzDHR348m" },
  { id: "05", name: "Fundamentals in AI ML", platform: "Vityarthi", year: "2026", credential: "https://www.vityarthi.com/certificate/Jl4tEodmAwv6" },
  { id: "06", name: "Vibe with India Hackathon", platform: "Unstop", year: "2026", credential: "/vibe-with-india-hackathon-certificate.pdf" },
  { id: "07", name: "Treasure Hunt", platform: "VIT Bhopal", year: "2026", credential: "/treasure-hunt-certificate.png" },
];

const colSpans = [
  "md:col-span-6", "md:col-span-6",
  "md:col-span-4", "md:col-span-4", "md:col-span-4",
  "md:col-span-6", "md:col-span-6",
];

export function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative py-32 lg:pl-24 px-6 lg:px-16">
      <div className="ghost-num -top-10 left-0">06</div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-16"
      >
        <div>
          <span className="block text-xs tracking-[0.3em] uppercase text-[#FFB3AE] mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Achievements
          </span>
          <h2 className="font-black uppercase tracking-tighter text-4xl lg:text-6xl text-[#eedfdf]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}>
            CERTIFICATIONS
          </h2>
        </div>
        <span className="font-bold text-[#c6c6c7] text-lg hidden md:block"
          style={{ fontFamily: "'Epilogue', sans-serif" }}>
          01 — 07
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {certifications.map((cert, index) => (
          <motion.a
            key={cert.id}
            href={cert.credential}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`${colSpans[index]} bg-[#251e1e] p-6 lg:p-8 group hover:bg-[#302828] transition-all duration-300 hover:scale-[1.01] relative overflow-hidden`}
          >
            <div className="flex items-start justify-between mb-6">
              <span className="material-symbols-outlined text-2xl text-[#FFB3AE]/30 group-hover:text-[#FFB3AE] transition-colors duration-300">
                workspace_premium
              </span>
              <span className="material-symbols-outlined text-sm text-[#c6c6c7] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                north_east
              </span>
            </div>
            <span
              className="absolute bottom-4 right-4 font-black text-6xl text-[#3b3333] pointer-events-none select-none"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              {cert.id}
            </span>
            <h3
              className="font-bold text-sm text-[#eedfdf] uppercase group-hover:text-[#FFB3AE] transition-colors relative z-10"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              {cert.name}
            </h3>
            <p className="text-xs text-[#c6c6c7] mt-1 relative z-10">
              {cert.platform} • {cert.year}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
