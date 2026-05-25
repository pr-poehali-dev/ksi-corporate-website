import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ContactModal } from "@/components/ksi/ContactModal";
import { useEarlyAccessModal } from "@/contexts/EarlyAccessModalContext";

const DIRECTIONS = [
  { icon: "Target", text: "Пилотные задачи" },
  { icon: "Plug", text: "Прикладные контуры" },
  { icon: "Beaker", text: "Тестирование модулей" },
  { icon: "Briefcase", text: "Работа с активами и проектами в новой логике" },
  { icon: "Network", text: "Участие в развитии кооперативной системы" },
];

export function PartnershipSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultMessage, setDefaultMessage] = useState("");
  const { openModal: openEarlyAccessModal } = useEarlyAccessModal();

  const openWith = (msg: string) => {
    setDefaultMessage(msg);
    setModalOpen(true);
  };

  return (
    <section className="relative py-28 sm:py-36" style={{ background: "#06080d" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/45 mb-5">
            ◆ Сотрудничество и бета-участие
          </p>
          <h2 className="font-oswald text-white font-semibold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(30px, 3.6vw, 52px)" }}>
            Для девелоперов, владельцев активов,<br />землевладельцев и партнёров системы
          </h2>
          <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
            АО КСИ приглашает к диалогу не только заказчиков, но и участников будущей кооперативной системы —
            тех, кто готов участвовать в её практической сборке и развитии вместе с нами.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {DIRECTIONS.map((d) => (
            <div
              key={d.text}
              className="p-5 rounded-sm transition-all"
              style={{
                background: "rgba(15,21,32,0.4)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-sm mb-4"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)" }}
              >
                <Icon name={d.icon} size={15} className="text-[#00d4ff]" />
              </div>
              <p className="font-ibm text-white/65 text-sm leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => openWith("Обсудить задачу")}
            className="inline-flex items-center justify-center font-ibm font-semibold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-sm transition-all"
            style={{
              background: "#00d4ff",
              color: "#0a0a0f",
              boxShadow: "0 0 30px rgba(0,212,255,0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 45px rgba(0,212,255,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.2)")}
          >
            Обсудить задачу
          </button>
          <button
            onClick={() => openWith("Запросить презентацию АО КСИ")}
            className="inline-flex items-center justify-center font-ibm font-medium text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-sm transition-all"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)";
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            Запросить презентацию
          </button>
          <button
            onClick={openEarlyAccessModal}
            className="inline-flex items-center justify-center font-ibm font-medium text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-sm transition-all"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(123,47,255,0.45)";
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            Обсудить участие
          </button>
        </div>
      </div>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} defaultMessage={defaultMessage} />
    </section>
  );
}