import { Logo } from '../assets/Logo'
import { Segmented } from './ui'
import type { Lang } from '../model/format'
import type { Mode } from '../state/storage'
import type { Dict } from '../i18n'

export function TopBar({
  lang,
  mode,
  clientName,
  t,
  onLang,
  onMode,
  onOpenGlossary,
}: {
  lang: Lang
  mode: Mode
  clientName: string
  t: Dict
  onLang: (l: Lang) => void
  onMode: (m: Mode) => void
  onOpenGlossary: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1840px] flex-wrap items-center gap-3 px-[5%] py-3">
        <Logo />
        <span className="hidden font-display text-[15px] font-medium text-muted sm:inline">
          {t.appTitle}
        </span>

        <span className="pill ml-1 border border-border bg-white px-3 py-1 text-[13px] font-medium text-ink">
          {clientName}
        </span>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Segmented
            ariaLabel="Language"
            value={lang}
            onChange={(v) => onLang(v as Lang)}
            options={[
              { value: 'fr', label: 'FR' },
              { value: 'en', label: 'EN' },
              { value: 'es', label: 'ES' },
            ]}
          />
          <Segmented
            ariaLabel="Mode"
            value={mode}
            onChange={(v) => onMode(v as Mode)}
            options={[
              { value: 'internal', label: t.internal },
              { value: 'presentation', label: t.presentation },
            ]}
          />
          <button
            onClick={onOpenGlossary}
            className="btn rounded-btn bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-accent-hover"
          >
            {t.glossary}
          </button>
        </div>
      </div>
    </header>
  )
}
