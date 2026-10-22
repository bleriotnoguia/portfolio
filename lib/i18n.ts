export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const SITE_URL = "https://www.bleriotnoguia.com";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export type Localized = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Replaces {name} placeholders. Dictionaries hold plain strings so they can be
// passed from server components to client components.
export function format(
  template: string,
  values: Record<string, string | number>
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? "")
  );
}

// "2020-11" -> "Nov 2020" / "nov. 2020"
export function formatMonth(locale: Locale, yearMonth: string) {
  const [year, month] = yearMonth.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

// "2026-10-22" -> "October 22, 2026" / "22 octobre 2026"
export function formatDate(locale: Locale, isoDate: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
