import { fmtCurrency0, fmtCurrency2, fmtInt } from '../model/format'
import type { Lang } from '../model/format'
import { PLAN_INDEX } from '../model/constants'
import type { ModelResult } from '../model/types'
import type { Dict } from '../i18n'

/** Pricing group: plan ladder (annual = monthly × 12) + wallet add-on. */
export function PricingTable({
  model,
  lang,
  t,
}: {
  model: ModelResult
  lang: Lang
  t: Dict
}) {
  const { p1, p2, planName } = model.pricing
  const selCol = PLAN_INDEX[planName] // 1..3
  const cur0 = (x: number) => fmtCurrency0(x, lang)
  const int = (x: number) => fmtInt(x, lang)

  const planCols = [
    { key: 'lite' as const, label: t.lite, idx: 1 },
    { key: 'premium' as const, label: t.premium, idx: 2 },
    { key: 'enterprise' as const, label: t.enterprise, idx: 3 },
  ]

  return (
    <div className="space-y-4">
      <div className="card overflow-x-auto">
        <table className="xl-table">
          <thead>
            <tr>
              <th className="text-left">
                {t.monthlyOrders}: {int(model.pricing.mOrders)}
              </th>
              {planCols.map((c) => (
                <th key={c.key} className={`num ${c.idx === selCol ? 'sel' : ''}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left text-muted">
                {t.autoPlan} ({int(model.pricing.mOrders)})
              </td>
              {planCols.map((c) => (
                <td key={c.key} className={`num ${c.idx === selCol ? 'sel' : ''}`}>
                  {cur0(p1[c.key] * 12)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="text-left text-muted">
                {t.customPlan} ({int(model.pricing.manualOrders)})
              </td>
              {planCols.map((c) => (
                <td key={c.key} className={`num ${c.idx === selCol ? 'sel' : ''}`}>
                  {cur0(p2[c.key] * 12)}
                </td>
              ))}
            </tr>
            <tr className="total-row">
              <td className="text-left">{t.platformCost}</td>
              {planCols.map((c) => (
                <td key={c.key} className={`num ${c.idx === selCol ? 'sel' : ''}`}>
                  {c.idx === selCol ? cur0(model.pricing.platformCost) : cur0(p1[c.key] * 12)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card overflow-x-auto">
        <table className="xl-table">
          <thead>
            <tr>
              <th className="text-left">{t.walletAddon}</th>
              <th className="num">{t.walletPassesTiered}</th>
              <th className="num">{t.annualPrice}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left text-muted">{t.walletPriceAuto}</td>
              <td className="num">{int(model.pricing.wpPasses)}</td>
              <td className="num">{fmtCurrency2(model.pricing.wPrice1, lang)}</td>
            </tr>
            <tr>
              <td className="text-left text-muted">{t.walletPriceManual}</td>
              <td className="num">{int(model.pricing.manualPasses)}</td>
              <td className="num">{fmtCurrency2(model.pricing.wPrice2, lang)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
