/**
 * Loyoly wordmark. The reference project ships SVG assets in `assets/`; this
 * is a lightweight inline stand-in in the Loyoly palette so the app is fully
 * self-contained. Swap for `logo-loyoly.svg` when the brand asset is dropped in.
 */
export function Logo({ white = false }: { white?: boolean }) {
  const fg = white ? '#FFFFFF' : '#2B251F'
  return (
    <span className="inline-flex items-center gap-2 select-none" aria-label="Loyoly">
      <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="16" fill="none" stroke="#FEC229" strokeWidth="6" />
        <circle cx="32" cy="32" r="5" fill="#2965FE" />
      </svg>
      <span
        className="font-display text-[18px] font-semibold tracking-tight"
        style={{ color: fg }}
      >
        loyoly
      </span>
    </span>
  )
}
