import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";

export default function Documents() {
  return (
    <PageLayout breadcrumb={[{ label: "Документы" }]}>
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="section-label mb-5">◆ Документы и правовая информация</div>
            <h1 className="font-oswald text-5xl font-bold text-white leading-tight mb-6">
              Правовая прозрачность
            </h1>
            <p className="font-ibm text-white/50 text-lg leading-relaxed">
              Документы компании, реквизиты и правовые оговорки
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Правовая информация */}
            <div>
              <div className="section-label mb-4">◆ Правовая информация</div>
              <div className="card-ksi rounded-sm divide-y divide-ksi-border/30">
                {[
                  { label: "Полное наименование", value: "Акционерное общество «КриптоСтройИнвест»" },
                  { label: "Сокращённое наименование", value: "АО «КСИ»" },
                  { label: "ОГРН", value: "0000000000000" },
                  { label: "ИНН", value: "0000000000" },
                  { label: "КПП", value: "000000000" },
                  { label: "ОКПО", value: "00000000" },
                  { label: "Юридический адрес", value: "Москва, Россия" },
                  { label: "Год регистрации", value: "2023" },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-4 flex items-start gap-4">
                    <span className="font-mono-ibm text-white/30 text-xs tracking-widest w-48 flex-shrink-0 pt-0.5 leading-relaxed">{item.label}</span>
                    <span className="font-ibm text-white/65 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Документы */}
            <div className="space-y-4">
              <div className="section-label mb-4">◆ Документы</div>
              {[
                { icon: "FileText", title: "Учредительные документы", desc: "Устав общества предоставляется по запросу", action: "Запросить", available: false },
                { icon: "Shield", title: "Политика конфиденциальности", desc: "Правила обработки персональных данных", action: "Открыть", available: true },
                { icon: "FileCheck", title: "Пользовательское соглашение", desc: "Условия использования сервисов группы", action: "Открыть", available: true },
                { icon: "Scale", title: "Политика обработки данных", desc: "В соответствии с ФЗ-152", action: "Открыть", available: true },
              ].map((doc, i) => (
                <div key={i} className="card-ksi p-5 rounded-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <Icon name={doc.icon} size={18} className="text-ksi-cyan" />
                  </div>
                  <div className="flex-1">
                    <div className="font-oswald text-white font-medium text-base">{doc.title}</div>
                    <div className="font-ibm text-white/35 text-xs mt-0.5">{doc.desc}</div>
                  </div>
                  <button className={`font-mono-ibm text-xs px-3 py-1.5 rounded-sm flex-shrink-0 transition-all ${doc.available ? "btn-outline-ksi" : ""}`}
                    style={!doc.available ? { background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.06)" } : {}}>
                    {doc.action}
                  </button>
                </div>
              ))}

              {/* Реквизиты */}
              <div className="section-label mt-8 mb-4">◆ Банковские реквизиты</div>
              <div className="card-ksi p-6 rounded-sm" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <p className="font-ibm text-white/35 text-sm leading-relaxed">
                  Банковские реквизиты предоставляются по запросу
                  для верифицированных партнёров и контрагентов.
                </p>
                <a href="/contacts" className="btn-outline-ksi px-5 py-2 rounded-sm text-sm inline-block mt-4 cursor-pointer">
                  Запросить реквизиты
                </a>
              </div>
            </div>
          </div>

          {/* Полная правовая оговорка */}
          <div className="mt-12 p-8 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="font-mono-ibm text-white/25 text-xs tracking-widest mb-4">ПРАВОВАЯ ОГОВОРКА — ПОЛНАЯ ВЕРСИЯ</div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-ibm text-white/45 text-sm leading-relaxed mb-4">
                  АО «КриптоСтройИнвест» не осуществляет и не организует публичное
                  привлечение денежных средств от физических и юридических лиц.
                </p>
                <p className="font-ibm text-white/45 text-sm leading-relaxed">
                  Отдельные модели участия в проектах группы реализуются исключительно
                  в рамках индивидуально структурируемых юридических конструкций —
                  партнёрских соглашений, корпоративных договоров или иных
                  предусмотренных законом механизмов.
                </p>
              </div>
              <div>
                <p className="font-ibm text-white/45 text-sm leading-relaxed mb-4">
                  Деятельность компании осуществляется в соответствии с требованиями
                  действующего российского законодательства, применимого к каждому
                  конкретному направлению работы.
                </p>
                <p className="font-ibm text-white/45 text-sm leading-relaxed">
                  Информация на данном сайте носит информационный характер
                  и не является публичной офертой или инвестиционным предложением.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
