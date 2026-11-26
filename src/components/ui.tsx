import type { ReactNode } from 'react'

/** Segmented control (FR/EN/ES, Internal/Presentation, …). */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  ariaLabel: string
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-0.5 rounded-btn border border-border bg-white p-0.5"
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`btn px-3 py-1 text-[13px] font-medium ${
              active ? 'bg-ink text-white' : 'text-muted hover:bg-canvas'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** On/off pill toggle used by the Integrations card. */
export function TogglePill({
  label,
  on,
  onToggle,
}: {
  label: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`pill inline-flex items-center gap-1.5 border px-3 py-1 text-[13px] font-medium ${
        on
          ? 'border-accent bg-accent-softer text-accent-text'
          : 'border-border bg-white text-muted2 hover:bg-canvas'
      }`}
    >
      <span
        aria-hidden
        className={`inline-block h-2 w-2 rounded-full ${on ? 'bg-accent' : 'bg-muted3'}`}
      />
      {label}
    </button>
  )
}

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-green-border bg-green-band px-4 py-2 font-display text-[13px] font-semibold text-ink">
      {children}
    </div>
  )
}

export function GroupToggle({
  open,
  onToggle,
  title,
}: {
  open: boolean
  onToggle: () => void
  title: string
}) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      className="btn inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-accent-text"
    >
      <span
        aria-hidden
        className="inline-flex h-5 w-5 items-center justify-center rounded border border-strong bg-white text-[13px] leading-none"
      >
        {open ? '−' : '+'}
      </span>
      <span className="font-display">{title}</span>
    </button>
  )
}
