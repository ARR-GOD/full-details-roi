import { SectionHeader, TogglePill } from './ui'
import { INTEGRATIONS } from '../model/constants'
import type { Integrations } from '../model/types'
import type { Dict } from '../i18n'

export function IntegrationsCard({
  integr,
  t,
  onToggle,
}: {
  integr: Integrations
  t: Dict
  onToggle: (k: keyof Integrations) => void
}) {
  return (
    <section className="card overflow-hidden">
      <SectionHeader>{t.integrations}</SectionHeader>
      <div className="flex flex-wrap gap-2 p-4">
        {INTEGRATIONS.map((k) => (
          <TogglePill
            key={k}
            label={t.integrationNames[k]}
            on={integr[k]}
            onToggle={() => onToggle(k)}
          />
        ))}
      </div>
    </section>
  )
}
