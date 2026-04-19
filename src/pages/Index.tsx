import { NavBar } from "@/components/ksi/NavBar";
import { HeroSection } from "@/components/ksi/HeroSection";
import { AboutKsiSection } from "@/components/ksi/AboutKsiSection";
import { HybridModelSection } from "@/components/ksi/HybridModelSection";
import { InternalServicesSection } from "@/components/ksi/InternalServicesSection";
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
      <HybridModelSection />
      <InternalServicesSection />
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
