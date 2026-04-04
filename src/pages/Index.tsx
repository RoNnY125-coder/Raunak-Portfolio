import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ArchivePanel } from "@/components/sections/ArchivePanel";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [archiveOpen, setArchiveOpen] = useState(false);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = [
      "home",
      "projects",
      "about",
      "skills",
      "experience",
      "certifications",
      "contact",
    ];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#181212]">
      {/* Atmospheric gradient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-[#930616]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#8d1515]/5 rounded-full blur-[100px]" />
      </div>

      <TopNav
        activeSection={activeSection}
        onArchiveOpen={() => setArchiveOpen(true)}
      />
      <Sidebar
        activeSection={activeSection}
        onArchiveOpen={() => setArchiveOpen(true)}
      />
      <ArchivePanel
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
      />

      <main className="relative z-10 lg:ml-24">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;