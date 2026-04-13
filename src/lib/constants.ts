export interface StatusConfig {
  label: string;
  color: string;
  icon?: string;
}

export interface KmOperationConfig {
  label: string;
  color: string;
  sign: string;
}

export interface LabeledOption {
  value: string;
  label: string;
}

// --- Task statuses ---

export const TASK_STATUSES: Record<string, StatusConfig> = {
  new: { label: "Новая", color: "blue", icon: "Plus" },
  analysis: { label: "В анализе", color: "indigo", icon: "Search" },
  clarification: { label: "Уточнение", color: "yellow", icon: "HelpCircle" },
  in_progress: { label: "В работе", color: "cyan", icon: "Play" },
  result_ready: { label: "Результат готов", color: "purple", icon: "CheckCircle" },
  confirmed: { label: "Подтверждено", color: "green", icon: "CheckCheck" },
  partial_confirmed: { label: "Частично подтв.", color: "emerald", icon: "Check" },
  rework: { label: "Доработка", color: "orange", icon: "RotateCcw" },
  dispute: { label: "Спор", color: "red", icon: "AlertTriangle" },
  closed: { label: "Закрыто", color: "gray", icon: "XCircle" },
  cancelled: { label: "Отменено", color: "gray", icon: "Ban" },
};

// --- KM operation types ---

export const KM_OPERATION_TYPES: Record<string, KmOperationConfig> = {
  topup: { label: "Пополнение", color: "green", sign: "+" },
  bonus: { label: "Бонус", color: "emerald", sign: "+" },
  trial: { label: "Тестовый лимит", color: "blue", sign: "+" },
  reserve: { label: "Резерв", color: "yellow", sign: "\u00b1" },
  unreserve: { label: "Снятие резерва", color: "yellow", sign: "\u00b1" },
  charge: { label: "Списание", color: "red", sign: "\u2212" },
  partial_charge: { label: "Частичное списание", color: "orange", sign: "\u2212" },
  correction: { label: "Корректировка", color: "gray", sign: "\u00b1" },
  refund: { label: "Возврат", color: "green", sign: "+" },
};

// --- Company types ---

export const COMPANY_TYPES: LabeledOption[] = [
  { value: "standard", label: "Стандартная" },
  { value: "premium", label: "Премиум" },
  { value: "enterprise", label: "Корпоративная" },
  { value: "trial", label: "Тестовая" },
];

// --- Company statuses ---

export const COMPANY_STATUSES: Record<string, StatusConfig> = {
  active: { label: "Активна", color: "green" },
  suspended: { label: "Приостановлена", color: "yellow" },
  blocked: { label: "Заблокирована", color: "red" },
  archived: { label: "Архивирована", color: "gray" },
};

// --- Module statuses ---

export const MODULE_STATUSES: Record<string, StatusConfig> = {
  active: { label: "Активен", color: "green" },
  inactive: { label: "Неактивен", color: "gray" },
  beta: { label: "Бета", color: "yellow" },
  deprecated: { label: "Устарел", color: "red" },
};

// --- User roles (client side) ---

export const USER_ROLES_CLIENT: LabeledOption[] = [
  { value: "owner", label: "Владелец" },
  { value: "director", label: "Директор" },
  { value: "admin", label: "Администратор" },
  { value: "manager", label: "Менеджер" },
  { value: "employee", label: "Сотрудник" },
  { value: "viewer", label: "Наблюдатель" },
];

// --- User roles (internal / KSI staff) ---

export const USER_ROLES_INTERNAL: LabeledOption[] = [
  { value: "superadmin", label: "Суперадмин" },
  { value: "admin", label: "Администратор" },
  { value: "manager", label: "Менеджер" },
  { value: "curator", label: "Куратор" },
  { value: "executor", label: "Исполнитель" },
  { value: "analyst", label: "Аналитик" },
  { value: "finance", label: "Финансист" },
  { value: "support", label: "Поддержка" },
];

// --- Task priorities ---

export const TASK_PRIORITIES: Record<string, StatusConfig> = {
  low: { label: "Низкий", color: "gray" },
  medium: { label: "Средний", color: "blue" },
  high: { label: "Высокий", color: "orange" },
  critical: { label: "Критичный", color: "red" },
};

// --- Color mapping for Tailwind usage ---

export const STATUS_COLOR_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", dot: "bg-indigo-400" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", dot: "bg-cyan-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-400" },
  green: { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  red: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  gray: { bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-400" },
};
