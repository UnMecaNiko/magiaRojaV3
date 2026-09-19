export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/**
 * Misma regla que pidió Nicolas el 2026-09-18 para velasquezlopez.com y
 * presalesagent: si la primera etiqueta de Accept-Language empieza por `es`,
 * español; cualquier otro navegador, inglés.
 */
export function localeFromAcceptLanguage(header: string | null): Locale {
  const first = (header ?? "").split(",")[0]?.trim() ?? "";
  return /^es\b/i.test(first) ? "es" : "en";
}

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}
