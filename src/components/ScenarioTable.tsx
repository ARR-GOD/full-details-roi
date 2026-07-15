import type { ScenarioKey } from '../model/constants'
import type { Dict } from '../i18n'

export interface Row {
  label: string
  values: [string, string, string]
  total?: boolean
  /** Section sub-header row (spans, green band). */
  section?: string
}

const ORDER: ScenarioKey[] = ['low', 'mid', 'best']

export function ScenarioTable({
  title,
  rows,
  selected,
  t,
}: {
  title: string
  rows: Row[]
  selected: ScenarioKey
  t: Dict
}) {
  const selIdx = ORDER.indexOf(selected)
  return (
    <div className="card overflow-x-auto">
      <table className="xl-table">
        <thead>
          <tr>
            <th className="text-left">{title}</th>
            <th className={`num ${selIdx === 0 ? 'sel' : ''}`}>{t.low}</th>
            <th className={`num ${selIdx === 1 ? 'sel' : ''}`}>{t.mid}</th>
            <th className={`num ${selIdx === 2 ? 'sel' : ''}`}>{t.best}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) =>
            r.section ? (
              <tr key={`s-${i}`}>
                <td
                  colSpan={4}
                  className="!bg-green-band !border-green-border font-display text-[12px] font-semibold"
                >
                  {r.section}
                </td>
              </tr>
            ) : (
              <tr key={i} className={r.total ? 'total-row' : ''}>
                <td className="text-left text-muted">{r.label}</td>
                {r.values.map((v, j) => (
                  <td key={j} className={`num ${j === selIdx ? 'sel' : ''}`}>
                    {v}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
