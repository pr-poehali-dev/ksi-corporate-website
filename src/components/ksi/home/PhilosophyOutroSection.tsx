export function PhilosophyOutroSection() {
  return (
    <section className="relative py-32 sm:py-40" style={{ background: "#050810" }}>
      {/* Линии */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)" }} />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/40 mb-7">
          ◆ Следующий слой отрасли
        </p>
        <h2 className="font-oswald text-white font-semibold leading-[1.05] mb-8"
          style={{ fontSize: "clamp(30px, 4vw, 56px)" }}>
          Новый интеллектуальный слой<br />девелопмента
        </h2>
        <p className="font-ibm text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Следующий этап развития отрасли связан не только со строительством и капиталом,
          но и с появлением систем, способных собирать знания, процессы, решения и исполнение
          в единую управляемую среду.
        </p>
      </div>
    </section>
  );
}
