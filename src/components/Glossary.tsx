import { useEffect } from 'react'
import type { Dict } from '../i18n'

export function Glossary({ t, onClose }: { t: Dict; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="backdrop fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.glossaryTitle}
    >
      <div
        className="card mt-4 w-full max-w-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="font-display text-[17px] font-semibold text-ink">{t.glossaryTitle}</h2>
          <button
            onClick={onClose}
            className="btn rounded-btn px-3 py-1 text-[13px] font-medium text-muted2 hover:bg-canvas"
          >
            {t.close}
          </button>
        </div>
        <div className="space-y-5 px-5 py-5">
          {t.glossarySections.map((s, i) => (
            <section key={i}>
              <h3 className="mb-1 font-display text-[14px] font-semibold text-accent-text">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
