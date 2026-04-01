import PageLayout from "@/components/ksi/PageLayout";
import Icon from "@/components/ui/icon";
import { DIRECTION_DETAILS } from "@/components/ksi/directionsData";
import { DIRECTIONS } from "@/components/ksi/data";

interface Props {
  slug: string;
}

export default function DirectionDetail({ slug }: Props) {
  const detail = DIRECTION_DETAILS.find(d => d.slug === slug);

  if (!detail) {
    return (
      <PageLayout breadcrumb={[{ label: "Направления", href: "/directions" }, { label: "Не найдено" }]}>
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="font-oswald text-4xl text-white mb-4">Направление не найдено</h1>
          <a href="/directions" className="btn-outline-ksi px-6 py-3 rounded-sm text-sm inline-block">← Все направления</a>
        </div>
      </PageLayout>
    );
  }

  const isCyan = !["ai-lab", "invest-models", "fee-dev-alt", "media", "lss"].includes(detail.id);
  const accentColor = isCyan ? "#00d4ff" : "#7b2fff";
  const bgAccent = isCyan ? "rgba(0,212,255,0.07)" : "rgba(123,47,255,0.07)";
  const borderAccent = isCyan ? "rgba(0,212,255,0.2)" : "rgba(123,47,255,0.2)";

  const related = DIRECTIONS.filter(d => detail.relatedIds.includes(d.id)).slice(0, 4);

  return (
    <PageLayout breadcrumb={[{ label: "Направления", href: "/directions" }, { label: detail.title }]}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, ${isCyan ? "rgba(0,212,255,0.05)" : "rgba(123,47,255,0.05)"} 0%, transparent 60%)` }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono-ibm text-xs px-2.5 py-1 rounded-sm" style={{ background: bgAccent, color: accentColor, border: `1px solid ${borderAccent}` }}>{detail.tag}</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: detail.statusColor }} />
                  <span className="font-mono-ibm text-xs" style={{ color: detail.statusColor }}>{detail.status}</span>
                </div>
              </div>
              <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white leading-tight mb-3">{detail.title}</h1>
              <p className="font-ibm text-white/45 text-lg mb-6">{detail.subtitle}</p>
              <p className="font-ibm text-white/70 text-xl leading-relaxed mb-8 max-w-lg">{detail.tagline}</p>
              <div className="flex flex-wrap gap-4">
                <a href="/contacts" className="btn-primary-ksi px-7 py-3 rounded-sm text-sm cursor-pointer" style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
                  {detail.cta.primary}
                </a>
                {detail.cta.secondary && (
                  <a href="/contacts" className="btn-outline-ksi px-7 py-3 rounded-sm text-sm cursor-pointer">{detail.cta.secondary}</a>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
                <div className="absolute inset-4 rounded-full border" style={{ borderColor: `${accentColor}30` }} />
                <div className="absolute inset-8 rounded-full border" style={{ borderColor: `${accentColor}20` }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-sm flex items-center justify-center" style={{ background: bgAccent, border: `1px solid ${borderAccent}` }}>
                    <Icon name={detail.icon} size={40} style={{ color: accentColor }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Описание */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="section-label mb-3">◆ О направлении</div>
              {detail.intro.map((p, i) => (
                <p key={i} className={`font-ibm leading-relaxed ${i === 0 ? "text-white/70 text-lg" : "text-white/50 text-base"}`}>{p}</p>
              ))}
              {detail.disclaimer && (
                <div className="mt-6 p-5 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="font-mono-ibm text-white/20 text-xs tracking-widest mb-2">ПРАВОВАЯ ОГОВОРКА</div>
                  <p className="font-ibm text-white/35 text-xs leading-relaxed">{detail.disclaimer}</p>
                </div>
              )}
            </div>
            <div>
              <div className="section-label mb-3">◆ Для кого</div>
              <div className="space-y-3">
                {detail.audiences.map((a, i) => (
                  <div key={i} className="card-ksi p-4 rounded-sm">
                    <div className="flex items-start gap-3">
                      <Icon name={a.icon} size={16} style={{ color: accentColor }} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-oswald text-white font-medium text-sm mb-1">{a.title}</div>
                        <p className="font-ibm text-white/40 text-xs leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Клиентские сценарии */}
      {detail.clientScenarios && detail.clientScenarios.length > 0 && (
        <section className="py-20 border-t border-ksi-border/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="section-label mb-4">◆ Клиентские сценарии</div>
            <h2 className="font-oswald text-3xl font-semibold text-white mb-3">С каким запросом к нам обращаются</h2>
            <p className="font-ibm text-white/40 text-base mb-10 max-w-2xl">Выберите сценарий, который соответствует вашей задаче — и мы сразу сориентируем по формату и срокам работы.</p>
            <div className="grid md:grid-cols-3 gap-5">
              {detail.clientScenarios.map((scenario, i) => (
                <div key={i} className="card-ksi p-6 rounded-sm flex flex-col" style={{ borderColor: `${accentColor}20` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono-ibm font-bold" style={{ background: bgAccent, color: accentColor, border: `1px solid ${borderAccent}` }}>
                      {i + 1}
                    </div>
                    <span className="font-oswald text-white font-semibold text-base">{scenario.label}</span>
                  </div>
                  <p className="font-ibm text-white/45 text-sm leading-relaxed flex-1 mb-5">{scenario.description}</p>
                  <a
                    href="/contacts"
                    className="w-full text-center py-2.5 px-4 rounded-sm text-sm font-ibm transition-all"
                    style={{ background: bgAccent, color: accentColor, border: `1px solid ${borderAccent}` }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = `${accentColor}20`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = bgAccent;
                    }}
                  >
                    {scenario.cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ключевые возможности */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-4">◆ Возможности</div>
          <h2 className="font-oswald text-3xl font-semibold text-white mb-10">Ключевые компетенции направления</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {detail.capabilities.map((cap, i) => (
              <div key={i} className="card-ksi p-6 rounded-sm">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-4" style={{ background: bgAccent, border: `1px solid ${borderAccent}` }}>
                  <Icon name={cap.icon} size={18} style={{ color: accentColor }} />
                </div>
                <div className="font-oswald text-white font-medium text-base mb-2">{cap.title}</div>
                <p className="font-ibm text-white/45 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Связанные направления */}
      {related.length > 0 && (
        <section className="py-20 border-t border-ksi-border/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="section-label mb-4">◆ Связанные направления</div>
            <h2 className="font-oswald text-3xl font-semibold text-white mb-8">Работает в связке с</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(dir => (
                <a key={dir.id} href={`/directions/${dir.id}`} className="card-ksi p-5 rounded-sm group cursor-pointer block">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={dir.icon} size={18} style={{ color: dir.color === "cyan" ? "#00d4ff" : "#7b2fff" }} />
                    <span className="font-oswald text-white text-sm font-medium group-hover:text-ksi-cyan transition-colors">{dir.title}</span>
                  </div>
                  <p className="font-ibm text-white/35 text-xs leading-relaxed">{dir.desc.slice(0, 80)}...</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 border-t border-ksi-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center p-12 rounded-sm relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${bgAccent} 0%, rgba(123,47,255,0.03) 100%)`, border: `1px solid ${borderAccent}` }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ksi-cyan/30 to-transparent" />
            <h3 className="font-oswald text-3xl font-semibold text-white mb-3">{detail.cta.primary}?</h3>
            <p className="font-ibm text-white/50 text-base mb-8 max-w-lg mx-auto">
              Напишите нам — укажите вашу роль и задачу, мы ответим по существу
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contacts" className="btn-primary-ksi px-8 py-3 rounded-sm text-sm cursor-pointer" style={!isCyan ? { background: "linear-gradient(135deg, #7b2fff, #a855f7)", color: "#fff" } : {}}>
                Написать нам
              </a>
              <a href="/directions" className="btn-outline-ksi px-8 py-3 rounded-sm text-sm cursor-pointer">
                Все направления
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}