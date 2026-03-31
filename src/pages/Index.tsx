import { NavBar, HeroSection, AboutSection } from "@/components/ksi/TopSections";
import { DirectionsSection, ProjectsSection } from "@/components/ksi/DirectionsProjects";
import { EcosystemSection, InvestorsSection, PartnersSection, ContactsSection, Footer } from "@/components/ksi/BottomSections";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <DirectionsSection />
      <EcosystemSection />
      <ProjectsSection />
      <InvestorsSection />
      <PartnersSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
