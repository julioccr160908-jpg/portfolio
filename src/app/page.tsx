import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { FaqSection } from "@/components/FaqSection";
import { ContactFooter } from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090B] text-foreground flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300 overflow-x-clip">
      {/* Fixed Editorial Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <ProjectsShowcase />
        <TechStack />
        <About />
        <FaqSection />
      </main>

      {/* Closing Section & Minimal Footer */}
      <ContactFooter />
    </div>
  );
}
