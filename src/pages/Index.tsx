import { NavBar } from "@/components/ksi/NavBar";
import { HeroSection } from "@/components/ksi/HeroSection";
import { AboutKsiSection } from "@/components/ksi/AboutKsiSection";
import { AudienceTabsSection } from "@/components/ksi/AudienceTabsSection";
import { HowWeWorkSection } from "@/components/ksi/HowWeWorkSection";
import { SpeedSection } from "@/components/ksi/SpeedSection";
import { HybridModelSection } from "@/components/ksi/HybridModelSection";
import { InternalServicesSection } from "@/components/ksi/InternalServicesSection";
import { ModulesConnectionSection } from "@/components/ksi/ModulesConnectionSection";
import { ModuleExamplesSection } from "@/components/ksi/ModuleExamplesSection";
import { StrategySection } from "@/components/ksi/StrategySection";
import { TrustArchitectureSection } from "@/components/ksi/TrustArchitectureSection";
import { RoadmapTimelineSection } from "@/components/ksi/RoadmapTimelineSection";
import { EntryProductsSection } from "@/components/ksi/EntryProductsSection";
import { ResponsibilitySection } from "@/components/ksi/ResponsibilitySection";
import { CryptoMeaningSection } from "@/components/ksi/CryptoMeaningSection";
import { BenefitCalculator } from "@/components/ksi/BenefitCalculator";
import { CryptometrySection } from "@/components/ksi/CryptometrySection";
import { AudienceSection } from "@/components/ksi/AudienceSection";
import { CollaborationSection } from "@/components/ksi/CollaborationSection";
import { CTASection } from "@/components/ksi/CTASection";
import { Footer } from "@/components/ksi/ContactsFooterSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <AboutKsiSection />
      <AudienceTabsSection />
      <HowWeWorkSection />
      <SpeedSection />
      <HybridModelSection />
      <InternalServicesSection />
      <ModuleExamplesSection />
      <ModulesConnectionSection />
      <StrategySection />
      <TrustArchitectureSection />
      <RoadmapTimelineSection />
      <EntryProductsSection />
      <BenefitCalculator />
      <ResponsibilitySection />
      <CryptoMeaningSection />
      <CryptometrySection />
      <AudienceSection />
      <CollaborationSection />
      <CTASection />
      <Footer />
    </div>
  );
}