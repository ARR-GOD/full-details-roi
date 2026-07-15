import { fmtCurrency2, fmtNum, fmtPercent } from '../model/format'
import type { Lang } from '../model/format'
import type { ModelResult } from '../model/types'
import type { Dict } from '../i18n'

/** Incrementality annex (Internal only, display). */
export function AnnexTable({
  model,
  lang,
  t,
}: {
  model: ModelResult
  lang: Lang
  t: Dict
}) {
  const a = model.annex
  const cur2 = (x: number) => fmtCurrency2(x, lang)
  const n2 = (x: number) => fmtNum(x, lang, 2)
  const pct = (x: number) => fmtPercent(x, lang, 0)

  return (
    <div className="card overflow-x-auto">
      <table className="xl-table">
        <thead>
          <tr>
            <th className="text-left">{t.annex}</th>
            <th className="num">{t.allCustomers}</th>
            <th className="num">{t.bestScenario}</th>
            <th className="num">{t.minReward}</th>
            <th className="num">{t.incrementality}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left text-muted">{t.annexAov}</td>
            <td className="num">{cur2(a.axAovAll)}</td>
            <td className="num">{cur2(a.axAovScen)}</td>
            <td className="num">{cur2(a.axMin)}</td>
            <td className="num text-accent">{pct(a.axIncr1)}</td>
          </tr>
          <tr>
            <td className="text-left text-muted">{t.annexRep}</td>
            <td className="num">{n2(a.axRepAll)}</td>
            <td className="num">{n2(a.axRepScen)}</td>
            <td className="num">{n2(a.axExpiry)}</td>
            <td className="num text-accent">{pct(a.axIncr2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
