import Icon from "@/components/ui/icon";

export function AboutKsiSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 parcel-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="section-label mb-4">◆ О компании</div>
          <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
            Что строит<br /><span className="text-gradient-main">АО КСИ</span>
          </h2>
          <p className="font-ibm text-white/55 text-lg leading-relaxed mb-8">
            АО КСИ — это управляющая компания и амбициозный технологический проект,
            задача которого — поэтапно создать виртуального девелопера: систему, способную
            решать ключевые девелоперские задачи через интеллектуальные контуры,
            профессиональные службы и управляемую инфраструктуру.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {[
            { icon: "Sparkles", text: "Не просто агентство", sub: "Компания с долгосрочной технологической стратегией" },
            { icon: "Layers", text: "Не просто набор услуг", sub: "Единая архитектура интеллектуального девелопмента" },
            { icon: "BrainCircuit", text: "Не просто AI-обёртка", sub: "Собственная методология, службы и операторский контур" },
            { icon: "Rocket", text: "Новый слой девелопмента", sub: "Шаг за шагом — от прикладных контуров к виртуальному девелоперу" },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Icon name={item.icon} size={20}
                className={i % 2 === 0 ? "text-ksi-cyan/60 mb-3" : "text-ksi-purple/60 mb-3"} />
              <div className="font-oswald text-white/75 text-base font-medium mb-1.5">{item.text}</div>
              <p className="font-ibm text-white/35 text-sm leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
