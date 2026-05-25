import PageLayout from "@/components/ksi/PageLayout";
import CryptometryHero from "@/components/ksi/CryptometryHero";
import CryptometryArchitecture from "@/components/ksi/CryptometryArchitecture";
import CryptometrySystem from "@/components/ksi/CryptometrySystem";
import CryptometryTasks from "@/components/ksi/CryptometryTasks";
import CryptometryStrategy from "@/components/ksi/CryptometryStrategy";
import CryptometryCoopLogic from "@/components/ksi/CryptometryCoopLogic";
import CryptometryParticipation from "@/components/ksi/CryptometryParticipation";

export default function Cryptometry() {
  return (
    <PageLayout breadcrumb={[{ label: "Проект КриптоМетры" }]}>
      <CryptometryHero />
      <CryptometryArchitecture />
      <CryptometrySystem />
      <CryptometryTasks />
      <CryptometryStrategy />
      <CryptometryCoopLogic />
      <CryptometryParticipation />
    </PageLayout>
  );
}