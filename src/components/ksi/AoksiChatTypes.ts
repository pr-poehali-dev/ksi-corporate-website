// ─── Constants ────────────────────────────────────────────────────────────────

export const CHAT_API_URL = "https://patient-union-74df.landsearchservice.workers.dev/api/chat";
export const LEAD_API_URL = "https://functions.poehali.dev/2cd3918f-adc8-4de1-9063-4a0c1827bbe4";
export const SESSION_KEY = "aoksi_chat_session_id";
export const HISTORY_KEY = "aoksi_ai_chat_history";
export const DIALOG_STATE_KEY = "aoksi_ai_dialog_state";
export const MIN_REPLY_DELAY = 1800;
export const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

export const GREETING =
  "Здравствуйте. Я ИИ-оператор АО КСИ. Могу помочь с участком, активом, проектом или аналитикой. С чем вы пришли?";

export const INACTIVITY_MESSAGE =
  "Можем продолжить прежнюю тему или начать новый запрос. Что выбираете?";

export const QUICK_QUESTIONS: { label: string; intent: IntentType | null }[] = [
  { label: "Чем занимается АО КСИ?", intent: "general" },
  { label: "Земельный поиск", intent: "land_search" },
  { label: "Реализация активов", intent: "asset_realization" },
  { label: "Проектный креатив", intent: "project_creative" },
  { label: "КСИ Терминал", intent: "ksi_terminal" },
  { label: "Подключить проект", intent: "connect_project" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export type IntentType =
  | "land_search"
  | "asset_realization"
  | "project_creative"
  | "ksi_terminal"
  | "ai_lab"
  | "connect_project"
  | "ready_to_lead"
  | "general";

export type StageType = "new" | "collecting_requirements" | "answering" | "ready_to_lead";

export interface CollectedData {
  role: string | null;
  region: string | null;
  city: string | null;
  assetType: string | null;
  purpose: string | null;
  area: string | null;
  budget: string | null;
  documents: string | null;
  contact: string | null;
}

export interface DialogState {
  activeIntent: IntentType | null;
  stage: StageType;
  lastAssistantQuestion: string | null;
  collectedData: CollectedData;
  lastActivityAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  isQuick?: boolean;
}

export interface LeadForm {
  name: string;
  company: string;
  phone: string;
  email: string;
  requestText: string;
}

// ─── Default state ────────────────────────────────────────────────────────────

export function defaultDialogState(): DialogState {
  return {
    activeIntent: null,
    stage: "new",
    lastAssistantQuestion: null,
    collectedData: {
      role: null, region: null, city: null, assetType: null,
      purpose: null, area: null, budget: null, documents: null, contact: null,
    },
    lastActivityAt: Date.now(),
  };
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getOrCreateSessionId(): string {
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `aoksi-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export function loadLocalHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveLocalHistory(msgs: ChatMessage[]) {
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(msgs));
}

export function loadDialogState(): DialogState {
  try {
    const raw = sessionStorage.getItem(DIALOG_STATE_KEY);
    return raw ? { ...defaultDialogState(), ...JSON.parse(raw) } : defaultDialogState();
  } catch { return defaultDialogState(); }
}

export function saveDialogState(state: DialogState) {
  sessionStorage.setItem(DIALOG_STATE_KEY, JSON.stringify(state));
}

// ─── Intent detection ─────────────────────────────────────────────────────────

export function intentFromQuickLabel(label: string): IntentType | null {
  const q = QUICK_QUESTIONS.find((x) => x.label === label);
  return q?.intent ?? null;
}

// ─── DialogState updater ──────────────────────────────────────────────────────

export function updateDialogStateAfterExchange(
  state: DialogState,
  userText: string,
  aiAnswer: string,
  forcedIntent?: IntentType | null,
): DialogState {
  const next = { ...state, lastActivityAt: Date.now() };

  if (forcedIntent) {
    next.activeIntent = forcedIntent === "ready_to_lead" ? "ready_to_lead" : forcedIntent;
    next.stage = forcedIntent === "ready_to_lead" ? "ready_to_lead" : "collecting_requirements";
  }

  if (!next.activeIntent) {
    const t = userText.toLowerCase();
    if (/участ|земл|ижс|кфх|надел|гектар|га\b/.test(t)) {
      next.activeIntent = "land_search";
      next.stage = "collecting_requirements";
    } else if (/продать|реализ|актив|объект|склад|здани/.test(t)) {
      next.activeIntent = "asset_realization";
      next.stage = "collecting_requirements";
    } else if (/презентац|концепц|визуализ|бренд|айдентик|креатив/.test(t)) {
      next.activeIntent = "project_creative";
      next.stage = "collecting_requirements";
    } else if (/аналитик|монитор|данн|терминал/.test(t)) {
      next.activeIntent = "ksi_terminal";
      next.stage = "collecting_requirements";
    } else if (/ии|чат.бот|автоматиз|нейр|алгоритм/.test(t)) {
      next.activeIntent = "ai_lab";
      next.stage = "collecting_requirements";
    }
  }

  const lastQ = (state.lastAssistantQuestion || "").toLowerCase();
  const userLower = userText.toLowerCase();
  const cd = { ...next.collectedData };

  if (/регион|город|где|москв|питер|областi/.test(lastQ)) {
    cd.region = userText.trim();
    cd.city = userText.trim();
  } else if (/площадь|гектар|га|соток|размер/.test(lastQ)) {
    cd.area = userText.trim();
  } else if (/бюджет|стоимость|цена|сколько/.test(lastQ)) {
    cd.budget = userText.trim();
  } else if (/назначени|жильё|жилой|коммерч/.test(lastQ)) {
    cd.purpose = userText.trim();
  } else if (/документ|гпзу|разрешен/.test(lastQ)) {
    cd.documents = userText.trim();
  } else if (/тип|вид|формат|объект/.test(lastQ)) {
    cd.assetType = userText.trim();
  }

  if (/старая москва|старые границы/.test(userLower)) cd.city = "Москва (старые границы)";
  if (/новая москва/.test(userLower)) cd.city = "Новая Москва";

  next.collectedData = cd;

  const lastSentence = aiAnswer.split(/[.!]/).reverse().find((s) => s.includes("?")) || null;
  next.lastAssistantQuestion = lastSentence ? lastSentence.trim() : null;

  if (/оставьте|телефон|email|специалист свяжется/.test(aiAnswer.toLowerCase())) {
    next.stage = "ready_to_lead";
  }

  return next;
}

// ─── Greeting detection ───────────────────────────────────────────────────────

export const isGreeting = (text: string) =>
  /^(привет|здравствуй|добрый|доброе|hello|hi|ку|хай)\b/i.test(text.trim());
