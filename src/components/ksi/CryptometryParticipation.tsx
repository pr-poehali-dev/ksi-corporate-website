import Icon from "@/components/ui/icon";

function BetaBlock() {
  return (
    <section id="beta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.03), transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">◆ Участие</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              Принять участие<br /><span className="text-gradient-main">в развитии системы</span>
            </h2>
            <p className="font-ibm text-white/48 text-lg leading-relaxed mb-8">
              АО КСИ приглашает девелоперов, владельцев активов и профессиональных участников
              рынка к участию в тестировании, обучении и настройке КриптоМетров
              на реальных прикладных задачах.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
                Принять участие
              </a>
              <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">
                Обсудить тестирование
              </a>
              <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer"
                style={{ borderColor: "rgba(123,47,255,0.4)", color: "#a070ff" }}>
                Связаться с командой
              </a>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: "FlaskConical", text: "Подключение к бета-тестированию отдельных контуров" },
              { icon: "Settings2", text: "Участие в настройке и обучении системы" },
              { icon: "GitBranch", text: "Проверка прикладных сценариев на реальных данных" },
              { icon: "ClipboardList", text: "Интеграция реальных девелоперских задач" },
              { icon: "Rocket", text: "Участие в развитии будущего виртуального девелопера" },
            ].map((item, i) => (
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
                <p className="font-ibm text-white/48 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophyBlock() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, rgba(10,10,15,1), rgba(12,12,20,1))" }}>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="section-label mb-4 text-center flex justify-center">◆ Замысел</div>
        <h2 className="font-oswald text-3xl md:text-4xl font-semibold text-white leading-tight mb-8 text-center">
          Почему это<br /><span className="text-gradient-main">важно</span>
        </h2>
        <p className="font-ibm text-white/48 text-base leading-relaxed mb-5">
          КриптоМетры создаются как попытка собрать в одной интеллектуальной системе то,
          что в классическом девелопменте часто существует разрозненно: знания, процессы,
          решения, исполнение и профессиональную ответственность.
        </p>
        <p className="font-ibm text-white/30 text-sm leading-relaxed">
          Это не обещание мгновенного результата. Это долгосрочная инженерная задача,
          решение которой проходит через практику — через реальные задачи, реальные службы
          и реальное развитие интеллектуальных контуров.
        </p>
      </div>
    </section>
  );
}

export default function CryptometryParticipation() {
  return (
    <>
      <BetaBlock />
      <PhilosophyBlock />
    </>
  );
}
