import { useEffect, useState } from "react";
import PageLayout from "@/components/ksi/PageLayout";

export default function Privacy() {
  const [s, setS] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://functions.poehali.dev/de77851c-6234-460f-903b-ca3df97ddc07")
      .then(r => r.json())
      .then(d => { if (d.settings) setS(d.settings); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const name = s.privacy_company_name || s.company_full_name || "АО «КриптоСтройИнвест»";
  const addr = s.privacy_company_address || s.legal_address || "";
  const dpoName = s.privacy_dpo_name || "";
  const dpoEmail = s.privacy_dpo_email || "";
  const date = s.privacy_effective_date || "";
  const dataTypes = s.privacy_data_types || "ФИО, адрес электронной почты, номер телефона, IP-адрес";
  const purposes = s.privacy_processing_purposes || "Обработка заявок и обращений";
  const thirdParties = s.privacy_third_parties || "";
  const storagePeriod = s.privacy_storage_period || "3 года с момента последнего взаимодействия";
  const extra = s.privacy_extra_clauses || "";

  return (
    <PageLayout breadcrumb={[{ label: "Политика обработки персональных данных" }]}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
            ))}
          </div>
        ) : (
          <article className="prose-invert">
            <h1 className="font-oswald text-2xl md:text-3xl font-semibold text-white mb-2 uppercase tracking-wider">
              Политика обработки персональных данных
            </h1>
            {date && <p className="font-ibm text-white/30 text-sm mb-8">Дата вступления в силу: {date}</p>}

            <div className="space-y-8 font-ibm text-white/60 text-sm leading-relaxed">
              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">1. Общие положения</h2>
                <p>Настоящая Политика обработки персональных данных (далее — Политика) определяет порядок обработки и защиты персональных данных {name} (далее — Оператор){addr ? `, расположенного по адресу: ${addr}` : ""}.</p>
                <p className="mt-2">Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и иными нормативными правовыми актами Российской Федерации.</p>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">2. Цели обработки персональных данных</h2>
                <p>Оператор обрабатывает персональные данные в следующих целях:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {purposes.split(",").map((p, i) => (
                    <li key={i}>{p.trim()}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">3. Категории персональных данных</h2>
                <p>Оператор может обрабатывать следующие персональные данные:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {dataTypes.split(",").map((t, i) => (
                    <li key={i}>{t.trim()}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">4. Правовые основания обработки</h2>
                <p>Обработка персональных данных осуществляется на следующих правовых основаниях:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Согласие субъекта персональных данных на обработку</li>
                  <li>Исполнение договора, стороной которого является субъект персональных данных</li>
                  <li>Осуществление прав и законных интересов Оператора</li>
                </ul>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">5. Права субъекта персональных данных</h2>
                <p>Субъект персональных данных имеет право:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Получить информацию об обработке своих персональных данных</li>
                  <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия или бездействие Оператора в Роскомнадзор</li>
                </ul>
              </section>

              {thirdParties && (
                <section>
                  <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">6. Передача данных третьим лицам</h2>
                  <p>Оператор может передавать персональные данные следующим третьим лицам:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {thirdParties.split(",").map((t, i) => (
                      <li key={i}>{t.trim()}</li>
                    ))}
                  </ul>
                  <p className="mt-2">Передача осуществляется исключительно в целях, указанных в настоящей Политике, и с соблюдением требований законодательства.</p>
                </section>
              )}

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">{thirdParties ? "7" : "6"}. Сроки обработки и хранения</h2>
                <p>Персональные данные хранятся в течение срока: {storagePeriod}.</p>
                <p className="mt-2">По истечении указанного срока персональные данные подлежат уничтожению, если иное не предусмотрено законодательством Российской Федерации.</p>
              </section>

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">{thirdParties ? "8" : "7"}. Меры по защите персональных данных</h2>
                <p>Оператор принимает необходимые и достаточные организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий.</p>
              </section>

              {extra && (
                <section>
                  <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">{thirdParties ? "9" : "8"}. Дополнительные положения</h2>
                  <p>{extra}</p>
                </section>
              )}

              <section>
                <h2 className="font-oswald text-lg text-white/80 mb-3 uppercase tracking-wider">Контактная информация</h2>
                <p>По вопросам обработки персональных данных вы можете обратиться:</p>
                <div className="mt-2 space-y-1">
                  <p>Оператор: {name}</p>
                  {addr && <p>Адрес: {addr}</p>}
                  {dpoName && <p>Ответственный за обработку ПДн: {dpoName}</p>}
                  {dpoEmail && <p>Email: {dpoEmail}</p>}
                </div>
              </section>
            </div>
          </article>
        )}
      </div>
    </PageLayout>
  );
}