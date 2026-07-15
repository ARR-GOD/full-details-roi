import { fmtNum, fmtPercent } from '../model/format'
import type { Lang } from '../model/format'
import { INTEGRATIONS, SCORE_COEF } from '../model/constants'
import type { ModelResult } from '../model/types'
import type { Integrations } from '../model/types'
import type { Dict } from '../i18n'

/** Score Fit breakdown (Internal only). */
export function ScoreTable({
  model,
  lang,
  t,
  integr,
}: {
  model: ModelResult
  lang: Lang
  t: Dict
  integr?: Integrations
}) {
  const n2 = (x: number) => fmtNum(x, lang, 2)
  // Reconstruct the per-line value from the score (integr passed from App).
  const rev = SCORE_COEF.revenue * model.score.revBool

  return (
    <div className="card overflow-x-auto">
      <table className="xl-table">
        <thead>
          <tr>
            <th className="text-left">{t.scoreFitTable}</th>
            <th className="num">{t.coefficient}</th>
            <th className="num">{t.value}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left text-muted">{t.revenueBand}</td>
            <td className="num">{n2(SCORE_COEF.revenue)}</td>
            <td className="num">{n2(rev)}</td>
          </tr>
          {INTEGRATIONS.map((k) => {
            const on = integr ? integr[k] : undefined
            const val = on === undefined ? null : SCORE_COEF[k] * (on ? 1 : 0)
            return (
              <tr key={k}>
                <td className="text-left text-muted">{t.integrationNames[k]}</td>
                <td className="num">{n2(SCORE_COEF[k])}</td>
                <td className="num">{val === null ? '—' : n2(val)}</td>
              </tr>
            )
          })}
          <tr className="total-row">
            <td className="text-left">{t.total}</td>
            <td className="num">{n2(model.score.coefT)}</td>
            <td className="num">{n2(model.score.valT)}</td>
          </tr>
          <tr className="total-row">
            <td className="text-left">{t.scoreFitTable}</td>
            <td className="num" />
            <td className="num text-accent">{fmtPercent(model.score.scoreFit, lang, 2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
