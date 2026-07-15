/**
 * Parse a user-typed numeric string, tolerant of locale quirks:
 *  - strips spaces (incl. NBSP), currency symbols, and percent signs
 *  - accepts both `,` and `.` as decimal separators
 *  - handles grouped forms like `1.234,56` (EU) and `1,234.56` (UK/US)
 *
 * Returns `NaN` when nothing numeric can be extracted.
 */
export function parseNumber(raw: string): number {
  if (raw == null) return NaN
  let s = String(raw).trim()
  if (s === '') return NaN

  // Strip spaces (regular + non-breaking + narrow), currency & percent symbols.
  s = s.replace(/[\s  ]/g, '')
  s = s.replace(/[€£$%]/g, '')

  const hasComma = s.includes(',')
  const hasDot = s.includes('.')

  if (hasComma && hasDot) {
    // The separator that appears last is the decimal separator.
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) {
      // EU form: 1.234,56 → dots are thousands, comma is decimal.
      s = s.replace(/\./g, '').replace(',', '.')
    } else {
      // UK/US form: 1,234.56 → commas are thousands.
      s = s.replace(/,/g, '')
    }
  } else if (hasComma) {
    // Only comma present — treat as decimal separator.
    s = s.replace(',', '.')
  }
  // else only dot (or neither): already parseable.

  const n = Number(s)
  return Number.isFinite(n) ? n : NaN
}

/** Clamp `x` into [min, max]. Passes NaN through unchanged. */
export function clamp(x: number, min: number, max: number): number {
  if (Number.isNaN(x)) return x
  return Math.min(max, Math.max(min, x))
}

/**
 * Parse a field value from user text into the model's stored representation.
 * Percent fields accept the human number (e.g. `85`) and store the decimal
 * (0.85); the same field also tolerates an explicit `%` or a decimal like
 * `0,85` which is passed through as-is when already <= 1.
 */
export function parseField(
  raw: string,
  kind: 'currency' | 'percent' | 'number',
  clampRange: [number, number]
): number | null {
  const n = parseNumber(raw)
  if (Number.isNaN(n)) return null
  const value = kind === 'percent' ? n / 100 : n
  return clamp(value, clampRange[0], clampRange[1])
}
