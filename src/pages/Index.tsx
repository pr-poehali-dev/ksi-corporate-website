import { NavBar } from "@/components/ksi/NavBar";
import { HeroSection } from "@/components/ksi/HeroSection";
import { AboutKsiSection } from "@/components/ksi/AboutKsiSection";
import { CryptometrySection } from "@/components/ksi/CryptometrySection";
import { SystemCircuitSection } from "@/components/ksi/SystemCircuitSection";
import { InternalServicesSection } from "@/components/ksi/InternalServicesSection";
import { HybridModelSection } from "@/components/ksi/HybridModelSection";
import { TasksSection } from "@/components/ksi/TasksSection";
import { RoadmapSection } from "@/components/ksi/RoadmapSection";
import { DifferenceSection } from "@/components/ksi/DifferenceSection";
import { CTASection } from "@/components/ksi/CTASection";
import { Footer } from "@/components/ksi/ContactsFooterSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <AboutKsiSection />
      <CryptometrySection />
      <SystemCircuitSection />
      <InternalServicesSection />
      <HybridModelSection />
      <TasksSection />
      <RoadmapSection />
      <DifferenceSection />
      <CTASection />
      <Footer />
    </div>
  );
}
