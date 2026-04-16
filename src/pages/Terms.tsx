import { useEffect, useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";

export default function Terms() {
  const [s, setS] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07")
      .then(r => r.json())
      .then(d => { if (d.settings) setS(d.settings); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const name = s.company_full_name || "АО «КриптоСтройИнвест»";
  const site = s.website || "https://aoksi.ru/";
  const email = s.email || "info@aoksi.ru";

  return (
    <PageLayout breadcrumb={[{ label: "Пользовательское соглашение" }]}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
            ))}
          </div>
        ) : (
          <article className="prose-invert">
            <h1 className="font-oswald text-2xl md:text-3xl font-semibold text-white mb-8 uppercase tracking-wider">
              Пользовательское соглашение
            </h1>

            <div className="space-y-8 font-ibm text-white/60 text-sm leading-relaxed">
              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">1. Общие положения</h2>
                <p>Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между {name} (далее — Администрация) и пользователем сети Интернет (далее — Пользователь), возникающие при использовании сайта {site} (далее — Сайт).</p>
                <p className="mt-2">Использование Сайта означает безоговорочное согласие Пользователя с настоящим Соглашением. В случае несогласия с условиями Соглашения Пользователь должен прекратить использование Сайта.</p>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">2. Предмет соглашения</h2>
                <p>Администрация предоставляет Пользователю доступ к информационным материалам, размещённым на Сайте, в том числе:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Информация о деятельности компании и её проектах</li>
                  <li>Описание внутренних служб и направлений</li>
                  <li>Материалы дорожной карты и глоссария</li>
                  <li>Контактные данные и формы обратной связи</li>
                </ul>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">3. Права и обязанности сторон</h2>
                <p className="font-oswald text-base text-white/70 mb-2">3.1. Администрация обязуется:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Обеспечивать доступность Сайта в круглосуточном режиме, за исключением времени проведения технических работ</li>
                  <li>Обрабатывать персональные данные Пользователя в соответствии с Политикой обработки персональных данных</li>
                  <li>Не передавать персональные данные Пользователя третьим лицам, за исключением случаев, предусмотренных законодательством</li>
                </ul>
                <p className="font-oswald text-base text-white/70 mb-2 mt-4">3.2. Пользователь обязуется:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Использовать Сайт исключительно в законных целях</li>
                  <li>Не предпринимать действий, направленных на нарушение работоспособности Сайта</li>
                  <li>Предоставлять достоверные данные при заполнении форм обратной связи</li>
                  <li>Не копировать и не распространять материалы Сайта без письменного согласия Администрации</li>
                </ul>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">4. Интеллектуальная собственность</h2>
                <p>Все материалы, размещённые на Сайте, включая тексты, графические изображения, логотипы, товарные знаки и иные объекты интеллектуальной собственности, являются собственностью Администрации или её партнёров и защищены законодательством Российской Федерации об интеллектуальной собственности.</p>
                <p className="mt-2">Использование материалов Сайта без письменного разрешения Администрации запрещено.</p>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">5. Ограничение ответственности</h2>
                <p>Администрация не несёт ответственности за:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Временную недоступность Сайта вследствие технических работ или обстоятельств непреодолимой силы</li>
                  <li>Убытки, понесённые Пользователем в результате использования или невозможности использования Сайта</li>
                  <li>Содержание и доступность ресурсов третьих лиц, ссылки на которые могут быть размещены на Сайте</li>
                </ul>
                <p className="mt-2">Информация на Сайте носит исключительно информационный характер и не является публичной офертой.</p>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">6. Изменение условий соглашения</h2>
                <p>Администрация оставляет за собой право в любое время изменять условия настоящего Соглашения без предварительного уведомления Пользователя. Новая редакция Соглашения вступает в силу с момента её размещения на Сайте.</p>
                <p className="mt-2">Продолжение использования Сайта после внесения изменений означает согласие Пользователя с новой редакцией Соглашения.</p>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">7. Применимое право</h2>
                <p>Настоящее Соглашение регулируется и толкуется в соответствии с законодательством Российской Федерации. Все споры, возникающие в связи с настоящим Соглашением, подлежат разрешению в соответствии с действующим законодательством Российской Федерации по месту нахождения Администрации.</p>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">Контактная информация</h2>
                <p>По вопросам, связанным с настоящим Соглашением, вы можете обратиться:</p>
                <div className="mt-2 space-y-1">
                  <p>Оператор: {name}</p>
                  <p>Email: {email}</p>
                </div>
              </section>
            </div>
          </article>
        )}
      </div>
    </PageLayout>
  );
}