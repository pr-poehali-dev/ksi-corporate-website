import { Reveal } from "./Reveal";
import { useEarlyAccessModal } from "@/contexts/EarlyAccessModalContext";

const COAUTHORS = [
  { name: "ООО «РегионСтрой»", type: "Землевладелец" },
  { name: "АО «Девелопмент Юг»", type: "Девелопер" },
  { name: "ООО «ИнвестЛенд»", type: "Инвестор" },
  { name: "ООО «ЮгПартнёр»", type: "Партнёр" },
  { name: "ИП Морозов А.С.", type: "Землевладелец" },
  { name: "ООО «АктивРеалт»", type: "Девелопер" },
];

export function CoauthorsSection() {
  const { openModal } = useEarlyAccessModal();
  return (
    <section className="py-20 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label mb-3">◆ Соавторы системы</div>
              <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight">
                Первые соавторы<br />виртуального девелопера
              </h2>
            </div>
            <p className="font-ibm text-white/35 text-sm max-w-xs">
              Юридические лица, которые уже подключились к системе и обучают её своими задачами.
            </p>
          </div>
        </Reveal>

        {/* Плашки компаний */}
        <Reveal delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {COAUTHORS.map((c) => (
              <div key={c.name} className="flex flex-col justify-between p-5 border border-white/8 bg-white/[0.02] rounded-sm">
                <div className="font-ibm text-white/20 text-[10px] tracking-[0.2em] uppercase mb-3">{c.type}</div>
                <div className="font-oswald text-white/65 text-base font-medium">{c.name}</div>
              </div>
            ))}
            {/* Плашка «место для вас» */}
            <div className="flex flex-col justify-between p-5 border border-ksi-cyan/20 bg-ksi-cyan/[0.03] rounded-sm col-span-2 md:col-span-3">
              <div className="font-ibm text-ksi-cyan/40 text-[10px] tracking-[0.2em] uppercase mb-2">Следующий соавтор</div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-oswald text-white/40 text-base">Ваша организация</div>
                <button onClick={openModal} className="btn-primary-ksi inline-flex px-6 py-2.5 text-sm rounded-sm self-start sm:self-auto">
                  Подключиться к системе
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}