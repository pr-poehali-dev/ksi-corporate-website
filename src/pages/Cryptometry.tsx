import PageLayout from "@/components/ksi/PageLayout";
import CryptometryHero from "@/components/ksi/CryptometryHero";
import CryptometrySystem from "@/components/ksi/CryptometrySystem";
import CryptometryTasks from "@/components/ksi/CryptometryTasks";
import CryptometryParticipation from "@/components/ksi/CryptometryParticipation";

export default function Cryptometry() {
  return (
    <PageLayout breadcrumb={[{ label: "Проект КриптоМетры" }]}>
      <CryptometryHero />
      <CryptometrySystem />
      <CryptometryTasks />
      <CryptometryParticipation />
    </PageLayout>
  );
}
