import Icon from "@/components/ui/icon";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,20,1))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,255,0.03), transparent)" }} />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <div className="section-label mb-4 justify-center flex">◆ Контакт</div>
        <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-5">
          Обсудить задачу, службу<br />
          <span className="text-gradient-main">или участие в развитии системы</span>
        </h2>
        <p className="font-ibm text-white/42 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Если вам близка идея интеллектуального девелопмента и вы хотите работать
          с прикладными контурами АО КСИ уже сейчас, команда открыта к диалогу.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a href="/contacts" className="btn-primary-ksi px-7 py-3.5 rounded-sm text-sm cursor-pointer flex items-center gap-2">
            <Icon name="MessageSquare" size={16} />
            Обсудить задачу
          </a>
          <a href="/contacts" className="btn-outline-ksi px-7 py-3.5 rounded-sm text-sm cursor-pointer flex items-center gap-2">
            <Icon name="FileText" size={16} />
            Запросить презентацию
          </a>
          <a href="/contacts" className="btn-outline-ksi px-7 py-3.5 rounded-sm text-sm cursor-pointer flex items-center gap-2"
            style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
            <Icon name="Phone" size={16} />
            Связаться
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 text-white/18">
          <div className="flex items-center gap-2">
            <Icon name="Mail" size={13} />
            <span className="font-ibm text-sm">info@ksi.ru</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={13} />
            <span className="font-ibm text-sm">Москва</span>
          </div>
        </div>
      </div>
    </section>
  );
}
