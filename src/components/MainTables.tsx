import { ScenarioTable } from './ScenarioTable'
import type { Row } from './ScenarioTable'
import { GroupToggle } from './ui'
import { PricingTable } from './PricingTable'
import { ScoreTable } from './ScoreTable'
import { AnnexTable } from './AnnexTable'
import {
  fmtCurrency0,
  fmtCurrency2,
  fmtInt,
  fmtNum,
  fmtPercent,
} from '../model/format'
import type { Lang } from '../model/format'
import type { Integrations, ModelResult, ScenarioResult } from '../model/types'
import type { GroupKey, Groups } from '../state/storage'
import type { Dict } from '../i18n'

export function MainTables({
  model,
  lang,
  t,
  groups,
  integr,
  internal,
  showAnnex,
  onToggleGroup,
}: {
  model: ModelResult
  lang: Lang
  t: Dict
  groups: Groups
  integr: Integrations
  internal: boolean
  showAnnex: boolean
  onToggleGroup: (k: GroupKey) => void
}) {
  const { low, mid, best } = model.scenarios
  const trip = (fn: (s: ScenarioResult) => number, fmt: (x: number) => string): [string, string, string] => [
    fmt(fn(low)),
    fmt(fn(mid)),
    fmt(fn(best)),
  ]
  const cur0 = (x: number) => fmtCurrency0(x, lang)
  const cur2 = (x: number) => fmtCurrency2(x, lang)
  const int = (x: number) => fmtInt(x, lang)
  const pct1 = (x: number) => fmtPercent(x, lang, 1)
  const n2 = (x: number) => fmtNum(x, lang, 2)

  const detailRows: Row[] = [
    { section: t.loyaltySection, label: '', values: ['', '', ''] },
    { label: t.members, values: trip((s) => s.members, int) },
    { label: t.aovAfter, values: trip((s) => s.aovAfter, cur2) },
    { label: t.repAfter, values: trip((s) => s.repAfter, n2) },
    { label: t.grossUplift, values: trip((s) => s.gross, cur0) },
    { label: t.trueGross, values: trip((s) => s.trueG, cur0) },
    { label: t.loyaltyCost, values: trip((s) => s.lyCost, cur0) },
    { label: t.loyaltyGP, values: trip((s) => s.lyGP, cur0) },
    { label: t.loyaltyNP, values: trip((s) => s.lyNP, cur0), total: true },
    { section: t.referralSection, label: '', values: ['', '', ''] },
    { label: t.referralRevenue, values: trip((s) => s.rfRev, cur0) },
    { label: t.referralTrue, values: trip((s) => s.rfTrue, cur0) },
    { label: t.referralOrders, values: trip((s) => s.rfOrders, int) },
    { label: t.referralCost, values: trip((s) => s.rfCost, cur0) },
    { label: t.referralGP, values: trip((s) => s.rfGP, cur0) },
    { label: t.referralNP, values: trip((s) => s.rfNP, cur0), total: true },
    { section: t.walletSection, label: '', values: ['', '', ''] },
    { label: t.walletPasses, values: trip((s) => s.passes, int) },
  ]

  const totalRows: Row[] = [
    { label: t.totalGrossUplift, values: trip((s) => s.tgTot, cur0), total: true },
    { label: t.revenueAfter, values: trip((s) => s.tgAfter, cur0) },
    { label: t.totalIncremental, values: trip((s) => s.tiTot, cur0), total: true },
    { label: t.incrementalAfter, values: trip((s) => s.tiAfter, cur0) },
    { label: t.incrementalGP, values: trip((s) => s.tiGP, cur0) },
    { label: t.totalCost, values: trip((s) => s.tiCost, cur0) },
    { label: t.totalNP, values: trip((s) => s.tiNP, cur0), total: true },
    { section: t.metricsSection, label: '', values: ['', '', ''] },
    { label: t.ordersAfter, values: trip((s) => s.ordAfter, int) },
    { label: t.aovUplift, values: trip((s) => s.mAov, pct1) },
    { label: t.repeatUplift, values: trip((s) => s.mRep, pct1) },
    { label: t.rpcUplift, values: trip((s) => s.mRpc, pct1) },
  ]

  return (
    <div className="space-y-8">
      <Group
        title={t.scenarioDetails}
        open={groups.scenarioDetails}
        onToggle={() => onToggleGroup('scenarioDetails')}
      >
        <ScenarioTable title={t.scenarioDetails} rows={detailRows} selected={model.selected} t={t} />
      </Group>

      <Group title={t.totals} open={groups.totals} onToggle={() => onToggleGroup('totals')}>
        <ScenarioTable title={t.totals} rows={totalRows} selected={model.selected} t={t} />
      </Group>

      <Group
        title={t.pricingScore}
        open={groups.pricingScore}
        onToggle={() => onToggleGroup('pricingScore')}
      >
        <div className="space-y-4">
          <PricingTable model={model} lang={lang} t={t} />
          {internal && <ScoreTable model={model} lang={lang} t={t} integr={integr} />}
          {internal && showAnnex && <AnnexTable model={model} lang={lang} t={t} />}
        </div>
      </Group>
    </div>
  )
}

function Group({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-3">
        <GroupToggle open={open} onToggle={onToggle} title={title} />
      </div>
      {open && children}
    </section>
  )
}
