import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";

import { HeroSection } from "@/components/ksi/home/HeroSection";
import { ModelSection } from "@/components/ksi/home/ModelSection";
import { CoauthorKeySection } from "@/components/ksi/home/CoauthorKeySection";
import { CoauthorsSection } from "@/components/ksi/home/CoauthorsSection";
import { WhatYouGetSection } from "@/components/ksi/home/WhatYouGetSection";
import { MiningCryptoSection } from "@/components/ksi/home/MiningCryptoSection";
import { ProjectsSection } from "@/components/ksi/home/ProjectsSection";
import { LandownersSection } from "@/components/ksi/home/LandownersSection";
import { DevelopersSection } from "@/components/ksi/home/DevelopersSection";
import { CasesGallery } from "@/components/ksi/home/CasesGallery";
import { PricingPreviewSection } from "@/components/ksi/home/PricingPreviewSection";
import { LegalPreviewSection } from "@/components/ksi/home/LegalPreviewSection";
import { FinalCTASection } from "@/components/ksi/home/FinalCTASection";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <ModelSection />
      <CoauthorKeySection />
      <CoauthorsSection />
      <WhatYouGetSection />
      <MiningCryptoSection />
      <ProjectsSection />
      <LandownersSection />
      <DevelopersSection />
      <CasesGallery />
      <PricingPreviewSection />
      <LegalPreviewSection />
      <FinalCTASection />
      <NewFooter />
    </div>
  );
}
