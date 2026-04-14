import { NavBar } from "@/components/ksi/NavBar";
import { HeroSection } from "@/components/ksi/HeroSection";
import { ThreeLevelsSection } from "@/components/ksi/ThreeLevelsSection";
import { HybridModelSection } from "@/components/ksi/HybridModelSection";
import { AILabSection } from "@/components/ksi/AILabSection";
import { CryptometrySection } from "@/components/ksi/CryptometrySection";
import { ModulesSection } from "@/components/ksi/ModulesSection";
import { AudienceSection } from "@/components/ksi/AudienceSection";
import { RoadmapSection } from "@/components/ksi/RoadmapSection";
import { DifferenceSection } from "@/components/ksi/DifferenceSection";
import { CTASection } from "@/components/ksi/CTASection";
import { Footer } from "@/components/ksi/ContactsFooterSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <ThreeLevelsSection />
      <HybridModelSection />
      <AILabSection />
      <CryptometrySection />
      <ModulesSection />
      <AudienceSection />
      <RoadmapSection />
      <DifferenceSection />
      <CTASection />
      <Footer />
    </div>
  );
}
