import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Reveal } from "./Reveal";

export function PricingPreviewSection() {
  return (
    <section className="py-24 border-t border-white/6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal delay={0}>
            <div>
              <div className="section-label mb-4">◆ Стоимость доступа</div>
              <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
                Вы платите<br />
                <span className="text-gradient-main">за интеллект,<br />не за часы</span>
              </h2>
              <p className="font-ibm text-white/50 text-lg leading-relaxed mb-6">
                Доступ к системе АО КСИ — это не консалтинг по почасовым ставкам.
                Это подписка на интеллект виртуального девелопера.
              </p>
              <p className="font-ibm text-white/30 text-base leading-relaxed mb-10">
                Конкретная стоимость определяется по результатам первого разговора — исходя из задачи,
                объёма и формата. Мы не публикуем прайс-лист, потому что каждый запрос индивидуален.
              </p>
              <div className="flex gap-4">
                <Link to="/pricing" className="btn-primary-ksi px-7 py-3.5 text-sm rounded-sm">
                  Форматы доступа
                </Link>
                <Link to="/contacts" className="border border-white/15 hover:border-white/30 text-white/55 hover:text-white/80 transition-all px-7 py-3.5 text-sm font-ibm rounded-sm">
                  Обсудить напрямую
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Три формата */}
          <Reveal delay={150}>
            <div className="space-y-3">
              {[
                {
                  label: "Старт",
                  sub: "Первая задача",
                  desc: "Одна аналитическая задача или концепция. Результат — документ. До 5 рабочих дней.",
                  highlight: false,
                },
                {
                  label: "Доступ",
                  sub: "Основной формат",
                  desc: "Пакет задач. Персональный куратор. Все типы запросов. Повышенный коэффициент КМ.",
                  highlight: true,
                },
                {
                  label: "Проектный",
                  sub: "Для девелоперов",
                  desc: "Полный контур: переупаковка, структурирование, Fee Development. Индивидуальная конструкция.",
                  highlight: false,
                },
              ].map((item) => (
                <div key={item.label} className={`flex gap-4 items-start p-5 border rounded-sm transition-all ${
                  item.highlight ? "border-ksi-cyan/30 bg-ksi-cyan/[0.04]" : "border-white/8 bg-white/[0.02]"
                }`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-oswald text-lg font-semibold ${item.highlight ? "text-ksi-cyan" : "text-white"}`}>
                        {item.label}
                      </span>
                      <span className="font-ibm text-xs text-white/25">{item.sub}</span>
                      {item.highlight && (
                        <span className="font-ibm text-[10px] text-ksi-cyan/60 border border-ksi-cyan/25 px-1.5 py-0.5 rounded-sm">
                          Популярный
                        </span>
                      )}
                    </div>
                    <div className="font-ibm text-white/38 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-white/20 flex-shrink-0 mt-1" />
                </div>
              ))}
              <p className="font-ibm text-white/20 text-xs pt-1 pl-1">
                Все форматы включают КриптоМетры, договор и полный документооборот с НДС
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}