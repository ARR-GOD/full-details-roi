import { NumberField } from './NumberField'
import { SectionHeader } from './ui'
import type { Lang } from '../model/format'
import type { PlanName } from '../model/constants'
import type { Settings } from '../model/types'
import type { Dict } from '../i18n'

/** Configurable-but-not-primary settings (Internal only). */
export function SettingsCard({
  settings,
  lang,
  t,
  onChange,
}: {
  settings: Settings
  lang: Lang
  t: Dict
  onChange: (patch: Partial<Settings>) => void
}) {
  return (
    <section className="card overflow-hidden">
      <SectionHeader>{t.settings}</SectionHeader>
      <div className="space-y-2.5 p-4">
        <label className="grid grid-cols-[1fr_120px] items-center gap-2">
          <span className="text-[13px] text-muted">{t.clientName}</span>
          <input
            value={settings.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            aria-label={t.clientName}
            className="field w-full border border-border bg-input px-3 py-1.5 text-right text-[14px] font-medium text-ink focus:border-accent"
          />
        </label>

        <label className="grid grid-cols-[1fr_120px] items-center gap-2">
          <span className="text-[13px] text-muted">{t.plan}</span>
          <select
            value={settings.plan}
            onChange={(e) => onChange({ plan: e.target.value as PlanName })}
            aria-label={t.plan}
            className="field w-full border border-border bg-white px-2 py-1.5 text-right text-[14px] font-medium text-ink focus:border-accent"
          >
            <option value="Lite">{t.lite}</option>
            <option value="Premium">{t.premium}</option>
            <option value="Enterprise">{t.enterprise}</option>
          </select>
        </label>

        <label className="grid grid-cols-[1fr_120px] items-center gap-2">
          <span className="text-[13px] text-muted">{t.manualOrders}</span>
          <NumberField
            value={settings.manualOrders}
            kind="number"
            clamp={[0, 1e9]}
            lang={lang}
            label={t.manualOrders}
            onCommit={(v) => onChange({ manualOrders: v })}
          />
        </label>

        <label className="grid grid-cols-[1fr_120px] items-center gap-2">
          <span className="text-[13px] text-muted">{t.manualPasses}</span>
          <NumberField
            value={settings.manualPasses}
            kind="number"
            clamp={[0, 1e9]}
            lang={lang}
            label={t.manualPasses}
            onCommit={(v) => onChange({ manualPasses: v })}
          />
        </label>

        <label className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[13px] text-muted">{t.showAnnex}</span>
          <input
            type="checkbox"
            checked={settings.showAnnex}
            onChange={(e) => onChange({ showAnnex: e.target.checked })}
            aria-label={t.showAnnex}
            className="h-4 w-4 accent-accent"
          />
        </label>
      </div>
    </section>
  )
}
