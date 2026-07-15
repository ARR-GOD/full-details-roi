import { useEffect, useRef, useState } from 'react'
import { parseField } from '../model/parse'
import type { Lang } from '../model/format'
import { fmtCurrency0, fmtInt, fmtNum, fmtPercent } from '../model/format'

type Kind = 'currency' | 'percent' | 'number'

/**
 * Editable numeric field mirroring the Excel input cells.
 *  - On focus: shows the raw editable number (percent shown as `85`, not `85 %`).
 *  - On blur / Enter: parses (accepts `,`/`.`, strips spaces & symbols), clamps,
 *    and reformats for display in the active locale.
 */
export function NumberField({
  value,
  kind,
  clamp,
  lang,
  onCommit,
  label,
  decimals = 2,
}: {
  value: number
  kind: Kind
  clamp: [number, number]
  lang: Lang
  onCommit: (v: number) => void
  label: string
  decimals?: number
}) {
  const [focused, setFocused] = useState(false)
  const [draft, setDraft] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const display = formatDisplay(value, kind, lang, decimals)

  // Keep the draft in sync when value changes externally (e.g. Reset).
  useEffect(() => {
    if (!focused) setDraft('')
  }, [value, focused])

  function rawEditable(): string {
    if (kind === 'percent') return trimZeros(value * 100)
    return trimZeros(value)
  }

  function commit() {
    const parsed = parseField(draft, kind, clamp)
    if (parsed != null) onCommit(parsed)
    setFocused(false)
    setDraft('')
  }

  return (
    <input
      ref={ref}
      aria-label={label}
      inputMode="decimal"
      className="field w-full border border-border bg-input px-3 py-1.5 text-right text-[14px] font-medium text-ink tabular-nums focus:border-accent"
      value={focused ? draft : display}
      onFocus={() => {
        setFocused(true)
        setDraft(rawEditable())
        // Select all so typing replaces.
        requestAnimationFrame(() => ref.current?.select())
      }}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          ref.current?.blur()
        } else if (e.key === 'Escape') {
          setFocused(false)
          setDraft('')
          ref.current?.blur()
        }
      }}
    />
  )
}

function formatDisplay(value: number, kind: Kind, lang: Lang, decimals: number): string {
  if (kind === 'currency') return fmtCurrency0(value, lang)
  if (kind === 'percent') return fmtPercent(value, lang, value * 100 % 1 === 0 ? 0 : 1)
  // number: integers show as int, else with decimals
  return Number.isInteger(value) ? fmtInt(value, lang) : fmtNum(value, lang, decimals)
}

/** Human-editable representation without trailing zeros. */
function trimZeros(n: number): string {
  if (Number.isInteger(n)) return String(n)
  return String(Number(n.toFixed(6)))
}
