import Icon from "@/components/ui/icon";

export const MESSENGER_OPTIONS = [
  { value: "telegram", label: "Telegram", icon: "Send" },
  { value: "whatsapp", label: "WhatsApp", icon: "MessageCircle" },
  { value: "viber", label: "Viber", icon: "Phone" },
  { value: "call", label: "Звонок", icon: "PhoneCall" },
] as const;

export type MessengerValue = typeof MESSENGER_OPTIONS[number]["value"];

export function formatPhoneRU(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (!digits) return "";
  if (digits[0] === "8") digits = "7" + digits.slice(1);
  if (digits[0] !== "7") digits = "7" + digits;
  digits = digits.slice(0, 11);

  const country = digits[0];
  const area = digits.slice(1, 4);
  const part1 = digits.slice(4, 7);
  const part2 = digits.slice(7, 9);
  const part3 = digits.slice(9, 11);

  let out = "+" + country;
  if (digits.length > 1) out += " (" + area;
  if (digits.length >= 4) out += ")";
  if (digits.length >= 5) out += " " + part1;
  if (digits.length >= 8) out += "-" + part2;
  if (digits.length >= 10) out += "-" + part3;
  return out;
}

interface Props {
  phone: string;
  messengers: MessengerValue[];
  onPhoneChange: (v: string) => void;
  onMessengersChange: (v: MessengerValue[]) => void;
}

export default function PhoneMessengersField({ phone, messengers, onPhoneChange, onMessengersChange }: Props) {
  const toggle = (val: MessengerValue) => {
    if (messengers.includes(val)) {
      onMessengersChange(messengers.filter((m) => m !== val));
    } else {
      onMessengersChange([...messengers, val]);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPhoneChange(formatPhoneRU(e.target.value));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && phone) {
      e.preventDefault();
      const digits = phone.replace(/\D/g, "");
      onPhoneChange(formatPhoneRU(digits.slice(0, -1)));
    }
  };

  return (
    <div>
      <label className="font-mono-ibm text-white/30 text-xs tracking-widest block mb-2">ТЕЛЕФОН</label>
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        onKeyDown={handlePhoneKeyDown}
        placeholder="+7 (___) ___-__-__"
        inputMode="tel"
        className="w-full bg-ksi-dark border border-ksi-border rounded-sm px-4 py-3 font-ibm text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-ksi-cyan/40 transition-colors"
      />
      <div className="font-mono-ibm text-white/25 text-[10px] tracking-widest mt-3 mb-2">УДОБНЫЙ СПОСОБ СВЯЗИ</div>
      <div className="flex flex-wrap gap-2">
        {MESSENGER_OPTIONS.map((opt) => {
          const active = messengers.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className="flex items-center gap-2 px-3 py-2 rounded-sm border text-xs font-ibm transition-all"
              style={{
                borderColor: active ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)",
                background: active ? "rgba(0,212,255,0.08)" : "transparent",
                color: active ? "rgb(0,212,255)" : "rgba(255,255,255,0.45)",
              }}
            >
              <span
                className="w-3.5 h-3.5 flex items-center justify-center rounded-[2px] border flex-shrink-0"
                style={{
                  borderColor: active ? "rgba(0,212,255,0.6)" : "rgba(255,255,255,0.2)",
                  background: active ? "rgba(0,212,255,0.15)" : "transparent",
                }}
              >
                {active && <Icon name="Check" size={10} className="text-ksi-cyan" />}
              </span>
              <Icon name={opt.icon} size={12} />
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}