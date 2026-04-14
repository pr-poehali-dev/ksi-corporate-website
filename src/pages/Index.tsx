import { NavBar } from "@/components/ksi/NavBar";
import { HeroSection } from "@/components/ksi/HeroSection";
import { AboutKsiSection } from "@/components/ksi/AboutKsiSection";
import { InternalServicesSection } from "@/components/ksi/InternalServicesSection";
import { CryptometrySection } from "@/components/ksi/CryptometrySection";
import { WorkingContoursSection } from "@/components/ksi/WorkingContoursSection";
import { HybridModelSection } from "@/components/ksi/HybridModelSection";
import { AudienceSection } from "@/components/ksi/AudienceSection";
import { CollaborationSection } from "@/components/ksi/CollaborationSection";
import { PhilosophySection } from "@/components/ksi/PhilosophySection";
import { CTASection } from "@/components/ksi/CTASection";
import { Footer } from "@/components/ksi/ContactsFooterSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <AboutKsiSection />
      <InternalServicesSection />
      <CryptometrySection />
      <WorkingContoursSection />
      <HybridModelSection />
      <AudienceSection />
      <CollaborationSection />
      <PhilosophySection />
      <CTASection />
      <Footer />
    </div>
  );
}
