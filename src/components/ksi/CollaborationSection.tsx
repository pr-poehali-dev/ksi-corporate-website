import Icon from "@/components/ui/icon";

const ITEMS = [
  { icon: "FlaskConical", text: "Бета-тестирование отдельных контуров" },
  { icon: "GraduationCap", text: "Обучение и настройка системы" },
  { icon: "GitBranch", text: "Совместная отработка сценариев" },
  { icon: "ClipboardList", text: "Подключение реальных девелоперских задач" },
  { icon: "Rocket", text: "Участие в развитии будущего виртуального девелопера" },
];

export function CollaborationSection() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(14,14,26,1), rgba(10,10,15,1))" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,212,255,0.03), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">◆ Приглашение</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              Приглашение<br /><span className="text-gradient-main">к сотрудничеству</span>
            </h2>
            <p className="font-ibm text-white/50 text-lg leading-relaxed mb-8">
              АО КСИ открыто к работе с девелоперами и профессиональными участниками рынка,
              которые готовы подключаться к прикладным контурам компании, участвовать
              в бета-тестировании, обучении и настройке системы КриптоМетры.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/contacts" className="btn-primary-ksi px-6 py-3 rounded-sm text-sm cursor-pointer">
                Принять участие
              </a>
              <a href="/contacts" className="btn-outline-ksi px-6 py-3 rounded-sm text-sm cursor-pointer">
                Обсудить тестирование
              </a>
              <a href="/contacts" className="btn-outline-ksi px-6 py-3 rounded-sm text-sm cursor-pointer"
                style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
                Связаться с командой
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-sm"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i % 2 === 0 ? "rgba(0,212,255,0.06)" : "rgba(123,47,255,0.06)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.12)" : "rgba(123,47,255,0.12)"}`,
                  }}>
                  <Icon name={item.icon} size={15}
                    style={{ color: i % 2 === 0 ? "#00d4ff" : "#7b2fff", opacity: 0.6 }} />
                </div>
                <p className="font-ibm text-white/50 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
