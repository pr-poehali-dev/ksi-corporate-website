import Icon from "@/components/ui/icon";

export function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,20,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.04), transparent)" }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="section-label mb-4 justify-center flex">◆ Начать диалог</div>
        <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
          Обсудить задачу<br />
          <span className="text-gradient-main">для системы КриптоМетры</span>
        </h2>
        <p className="font-ibm text-white/45 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          АО КСИ открыто к диалогу с девелоперами, владельцами активов
          и профессиональными участниками рынка, которым нужен интеллектуальный
          контур решения задач.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="/contacts" className="btn-primary-ksi px-8 py-4 rounded-sm text-sm cursor-pointer flex items-center gap-2">
            <Icon name="MessageSquare" size={16} />
            Обсудить задачу
          </a>
          <a href="/contacts" className="btn-outline-ksi px-8 py-4 rounded-sm text-sm cursor-pointer flex items-center gap-2">
            <Icon name="FileText" size={16} />
            Запросить презентацию
          </a>
          <a href="/contacts" className="btn-outline-ksi px-8 py-4 rounded-sm text-sm cursor-pointer flex items-center gap-2"
            style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
            <Icon name="Phone" size={16} />
            Связаться с командой
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 text-white/20">
          <div className="flex items-center gap-2">
            <Icon name="Mail" size={14} />
            <span className="font-ibm text-sm">info@ksi.ru</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={14} />
            <span className="font-ibm text-sm">Москва</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={14} />
            <span className="font-ibm text-sm">Пн–Пт</span>
          </div>
        </div>
      </div>
    </section>
  );
}
