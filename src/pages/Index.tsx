import { NavBar } from "@/components/ksi/NavBar";
import { NewHeroSection } from "@/components/ksi/NewHeroSection";
import { HowItWorksSection } from "@/components/ksi/HowItWorksSection";
import { MiningSection } from "@/components/ksi/MiningSection";
import { AudienceNewSection } from "@/components/ksi/AudienceNewSection";
import { ProjectsPreviewSection } from "@/components/ksi/ProjectsPreviewSection";
import { CoauthorPreviewSection } from "@/components/ksi/CoauthorPreviewSection";
import { NewFooter } from "@/components/ksi/NewFooter";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <NewHeroSection />
      <HowItWorksSection />
      <MiningSection />
      <AudienceNewSection />
      <ProjectsPreviewSection />
      <CoauthorPreviewSection />
      <NewFooter />
    </div>
  );
}
