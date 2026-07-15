export type Lang = 'fr' | 'en' | 'es'

/** BCP-47 locale for each language. */
export const LOCALE: Record<Lang, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
}

/** Currency depends on language: EN → GBP, FR & ES → EUR. */
export const CURRENCY: Record<Lang, 'EUR' | 'GBP'> = {
  fr: 'EUR',
  en: 'GBP',
  es: 'EUR',
}

const cache = new Map<string, Intl.NumberFormat>()
function nf(key: string, locale: string, opts: Intl.NumberFormatOptions): Intl.NumberFormat {
  const existing = cache.get(key)
  if (existing) return existing
  const created = new Intl.NumberFormat(locale, opts)
  cache.set(key, created)
  return created
}

/** Currency with 0 decimals. */
export function fmtCurrency0(x: number, lang: Lang): string {
  return nf(`c0-${lang}`, LOCALE[lang], {
    style: 'currency',
    currency: CURRENCY[lang],
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(safe(x))
}

/** Currency with 2 decimals. */
export function fmtCurrency2(x: number, lang: Lang): string {
  return nf(`c2-${lang}`, LOCALE[lang], {
    style: 'currency',
    currency: CURRENCY[lang],
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe(x))
}

/** Integer (grouped). */
export function fmtInt(x: number, lang: Lang): string {
  return nf(`i-${lang}`, LOCALE[lang], { maximumFractionDigits: 0 }).format(safe(x))
}

/** Fixed decimals number. */
export function fmtNum(x: number, lang: Lang, digits: number): string {
  return nf(`n${digits}-${lang}`, LOCALE[lang], {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(safe(x))
}

/** Percent with a given number of decimals. Input is a decimal (0.85 → 85%). */
export function fmtPercent(x: number, lang: Lang, digits = 0): string {
  return nf(`p${digits}-${lang}`, LOCALE[lang], {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(safe(x))
}

/** Multiplier badge, e.g. ×7. */
export function fmtMultiplier(x: number): string {
  return `×${Math.round(safe(x))}`
}

function safe(x: number): number {
  return Number.isFinite(x) ? x : 0
}
