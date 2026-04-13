/**
 * Formats a number as KM with non-breaking space-separated groups.
 * Example: 12450 -> "12\u00a0450\u00a0\u041a\u041c"
 */
export function formatKM(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return formatted + "\u00a0\u041a\u041c";
}

/**
 * Formats an ISO date string to "DD.MM.YYYY".
 */
export function formatDate(date: string | null | undefined): string {
  if (!date) return "\u2014";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "\u2014";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return "\u2014";
  }
}

/**
 * Formats an ISO date string to "DD.MM.YYYY, HH:MM".
 */
export function formatDateTime(date: string | null | undefined): string {
  if (!date) return "\u2014";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "\u2014";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  } catch {
    return "\u2014";
  }
}

/**
 * Russian pluralization helper.
 */
function pluralize(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

/**
 * Formats an ISO date string as relative time in Russian.
 */
export function formatRelative(date: string | null | undefined): string {
  if (!date) return "\u2014";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "\u2014";

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) {
      return "только что";
    }
    if (diffMin < 60) {
      return `${diffMin} ${pluralize(diffMin, "минуту", "минуты", "минут")} назад`;
    }
    if (diffHours < 24) {
      return `${diffHours} ${pluralize(diffHours, "час", "часа", "часов")} назад`;
    }
    if (diffDays === 1) {
      return "вчера";
    }
    if (diffDays < 7) {
      return `${diffDays} ${pluralize(diffDays, "день", "дня", "дней")} назад`;
    }
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${pluralize(weeks, "неделю", "недели", "недель")} назад`;
    }
    return formatDate(date);
  } catch {
    return "\u2014";
  }
}

/**
 * Truncates a string to a maximum length, appending ellipsis if truncated.
 */
export function truncate(str: string, max: number): string {
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max).trimEnd() + "\u2026";
}
