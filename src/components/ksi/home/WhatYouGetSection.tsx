import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

const BENEFITS = [
  {
    icon: "Brain",
    title: "Интеллект девелопера",
    desc: "Доступ к системе АО КСИ: команда + ИИ решают вашу задачу — анализ, концепция, модель, стратегия.",
    tag: "Сразу",
  },
  {
    icon: "Coins",
    title: "КриптоМетры",
    desc: "За каждую задачу начисляются КриптоМетры — единицы вашего зафиксированного вклада в систему.",
    tag: "За каждый кейс",
  },
  {
    icon: "Star",
    title: "Статус соавтора",
    desc: "Ранние участники получают статус соавтора виртуального девелопера. Он не присваивается позже.",
    tag: "Только сейчас",
  },
  {
    icon: "ArrowUpRight",
    title: "Проектные привилегии",
    desc: "По мере роста системы соавторы первыми получают доступ к новым механикам и условиям.",
    tag: "В будущем",
  },
  {
    icon: "Shield",
    title: "Полный документооборот",
    desc: "Договор, акты, счета-фактуры. Работаем по НДС. Всё для корпоративной бухгалтерии.",
    tag: "Всегда",
  },
  {
    icon: "Users",
    title: "Персональный контакт",
    desc: "Не колл-центр, не чат-бот. Реальная команда, которая знает вашу задачу и контекст.",
    tag: "Всегда",
  },
];

export function WhatYouGetSection() {
  return (
    <section className="py-24 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal delay={0}>
          <div className="section-label mb-4">◆ Что вы получаете</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white leading-tight">
              Что получает<br /><span className="text-gradient-main">соавтор системы</span>
            </h2>
            <Link to="/pricing" className="font-ibm text-ksi-cyan/60 hover:text-ksi-cyan text-sm flex items-center gap-1 transition-colors self-start md:self-auto">
              Стоимость доступа <Icon name="ArrowRight" size={13} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((item) => (
              <div key={item.title} className="group p-6 border border-white/8 bg-white/[0.02] rounded-sm hover:border-ksi-cyan/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <Icon name={item.icon as "Brain"} size={22} className="text-ksi-cyan/55" />
                  <span className="font-ibm text-[10px] text-white/20 border border-white/8 px-2 py-0.5 rounded-sm tracking-[0.1em] uppercase">
                    {item.tag}
                  </span>
                </div>
                <div className="font-oswald text-white text-xl font-medium mb-2">{item.title}</div>
                <div className="font-ibm text-white/40 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}