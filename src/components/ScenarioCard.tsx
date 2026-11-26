import { fmtCurrency0, fmtMultiplier, fmtPercent } from '../model/format'
import type { Lang } from '../model/format'
import type { ModelResult } from '../model/types'
import type { Dict } from '../i18n'

export function ScenarioCard({
  model,
  lang,
  t,
  internal,
}: {
  model: ModelResult
  lang: Lang
  t: Dict
  internal: boolean
}) {
  const sel = model.scenarios[model.selected]
  const cost = model.pricing.platformCost
  const grossRoi = cost > 0 ? Math.round(sel.tgTot / cost) : 0
  const netRoi = cost > 0 ? Math.round(sel.tiNP / cost) : 0
  const scenLabel = t[model.selected]

  return (
    <section className="card overflow-hidden bg-panel text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="font-display text-[13px] font-semibold uppercase tracking-wide text-white/70">
          {t.mostProbable}
        </span>
        {internal && (
          <span className="pill bg-accent px-2.5 py-1 text-[12px] font-semibold text-onaccent">
            {t.scoreFit} {fmtPercent(model.score.scoreFit, lang, 1)}
          </span>
        )}
      </div>

      <div className="space-y-3 px-4 py-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] uppercase tracking-wide text-highlight">{scenLabel}</span>
          <span className="pill border border-white/20 px-2 py-0.5 text-[12px] text-white/80">
            {t[model.pricing.planName.toLowerCase() as 'lite' | 'premium' | 'enterprise']}
          </span>
        </div>

        <Metric label={t.additionalRevenue} value={fmtCurrency0(sel.tgTot, lang)} big />
        <Metric label={t.incrementalRevenue} value={fmtCurrency0(sel.tiTot, lang)} />
        <Metric
          label={t.incrementalNetProfit}
          value={fmtCurrency0(sel.tiNP, lang)}
          accent
        />

        <div className="my-1 border-t border-white/10" />

        <Metric label={t.platformCost} value={fmtCurrency0(cost, lang)} />
        <div className="grid grid-cols-2 gap-3">
          <RoiBadge label={t.grossRoi} value={fmtMultiplier(grossRoi)} />
          <RoiBadge label={t.netRoi} value={fmtMultiplier(netRoi)} highlight />
        </div>

        <p className="pt-1 text-[12px] text-white/50">
          {t.estimatedOver} {t.perYear}
        </p>
      </div>
    </section>
  )
}

function Metric({
  label,
  value,
  big,
  accent,
}: {
  label: string
  value: string
  big?: boolean
  accent?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[13px] text-white/60">{label}</span>
      <span
        className={`num font-display font-semibold ${
          big ? 'text-[22px]' : 'text-[16px]'
        } ${accent ? 'text-highlight' : 'text-white'}`}
      >
        {value}
      </span>
    </div>
  )
}

function RoiBadge({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-btn px-3 py-2 ${
        highlight ? 'bg-highlight text-ink' : 'bg-white/10 text-white'
      }`}
    >
      <div className={`text-[11px] ${highlight ? 'text-ink/70' : 'text-white/60'}`}>{label}</div>
      <div className="num font-display text-[20px] font-bold">{value}</div>
    </div>
  )
}
