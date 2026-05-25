import { NavBar } from "@/components/ksi/NavBar";
import { NewFooter } from "@/components/ksi/NewFooter";

import { HeroSection } from "@/components/ksi/home/HeroSection";
import { ValueTodaySection } from "@/components/ksi/home/ValueTodaySection";
import { ModulesShowcaseSection } from "@/components/ksi/home/ModulesShowcaseSection";
import { HowWeWorkSection } from "@/components/ksi/home/HowWeWorkSection";
import { SpeedSection } from "@/components/ksi/home/SpeedSection";
import { NewLogicSection } from "@/components/ksi/home/NewLogicSection";
import { InternalContoursSection } from "@/components/ksi/home/InternalContoursSection";
import { CryptometryTeaserSection } from "@/components/ksi/home/CryptometryTeaserSection";
import { PartnershipSection } from "@/components/ksi/home/PartnershipSection";
import { PhilosophyOutroSection } from "@/components/ksi/home/PhilosophyOutroSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-ksi-dark text-white">
      <NavBar />
      <HeroSection />
      <ValueTodaySection />
      <ModulesShowcaseSection />
      <HowWeWorkSection />
      <SpeedSection />
      <NewLogicSection />
      <InternalContoursSection />
      <CryptometryTeaserSection />
      <PartnershipSection />
      <PhilosophyOutroSection />
      <NewFooter />
    </div>
  );
}