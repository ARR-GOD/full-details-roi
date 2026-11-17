import {
  INTEGRATIONS,
  PLAN_INDEX,
  SCENARIOS,
  SCORE_BANDS,
  SCORE_COEF,
  SCORE_COEF_TOTAL,
  VECTORS,
} from './constants'
import type { ScenarioKey } from './constants'
import { ceil1000, lookupPlan, lookupWallet } from './pricing'
import type {
  Baseline,
  IncrementalityAnnex,
  Inputs,
  Integrations,
  ModelResult,
  Pricing,
  ScenarioResult,
  ScoreFit,
  Settings,
} from './types'

/** Scenario-independent baseline. */
export function computeBaseline(inputs: Inputs): Baseline {
  const { rev, aov, repeat } = inputs
  const yOrders = rev / aov
  const uCust = yOrders / repeat
  const revCust = rev / uCust
  return { yOrders, uCust, revCust }
}

/** Compute a single scenario `i` (0=Low, 1=Mid, 2=Best). */
export function computeScenario(
  inputs: Inputs,
  baseline: Baseline,
  i: number
): ScenarioResult {
  const { rev, aov, repeat, margin, rwLoy, rwRef } = inputs
  const { yOrders, uCust, revCust } = baseline
  const { ENG, AOVU, REPU, INC, RED, REF, PASS } = VECTORS

  // --- Loyalty ---
  const members = ENG[i] * uCust
  const aovAfter = (1 + AOVU[i]) * aov
  const repAfter = (1 + REPU[i]) * repeat
  const gross = members * (aov * repeat) * ((1 + AOVU[i]) * (1 + REPU[i]) - 1)
  const trueG = gross * INC[i]
  const lyCost = (gross + members * aovAfter * repAfter) * RED[i] * rwLoy
  const lyGP = trueG * margin
  const lyNP = lyGP - lyCost

  // --- Referral ---
  const rfRev = rwRef === 0 ? 0 : REF[i] * rev
  const rfTrue = rfRev * INC[i]
  const rfOrders = rfRev / aov
  const rfCost = rfOrders * rwRef
  const rfGP = rfTrue * margin
  const rfNP = rfGP - rfCost

  // --- Wallet ---
  const passes = uCust * PASS[i]

  // --- Totals ---
  const tgTot = gross + rfRev
  const tgAfter = tgTot + rev
  const tiTot = trueG + rfTrue
  const tiAfter = tiTot + rev
  const tiGP = tiTot * margin
  const tiCost = lyCost + rfCost
  const tiNP = tiGP - tiCost

  // --- Metrics uplift ---
  const ordAfter = members * repeat * REPU[i] + yOrders + rfOrders
  const mAov = (tgAfter / ordAfter - aov) / aov
  const mRep = (ordAfter / (uCust + rfOrders) - repeat) / repeat
  const mRpc = (tgAfter / (uCust + rfOrders) - revCust) / revCust

  return {
    key: SCENARIOS[i],
    members,
    aovAfter,
    repAfter,
    gross,
    trueG,
    lyCost,
    lyGP,
    lyNP,
    rfRev,
    rfTrue,
    rfOrders,
    rfCost,
    rfGP,
    rfNP,
    passes,
    tgTot,
    tgAfter,
    tiTot,
    tiAfter,
    tiGP,
    tiCost,
    tiNP,
    ordAfter,
    mAov,
    mRep,
    mRpc,
  }
}

/** Score Fit — banded revenue + weighted integrations, over the coef total. */
export function computeScoreFit(inputs: Inputs, integr: Integrations): ScoreFit {
  const { rev } = inputs
  const revBool = rev < 500000 ? 0.25 : rev < 3000000 ? 0.5 : 1
  let valT = SCORE_COEF.revenue * revBool
  for (const k of INTEGRATIONS) {
    valT += SCORE_COEF[k] * (integr[k] ? 1 : 0)
  }
  const coefT = SCORE_COEF_TOTAL
  const scoreFit = valT / coefT
  const scenario: ScenarioKey =
    scoreFit < SCORE_BANDS.low ? 'low' : scoreFit < SCORE_BANDS.mid ? 'mid' : 'best'
  return { revBool, valT, coefT, scoreFit, scenario }
}

/** Pricing (plan + wallet add-on) for the selected scenario. */
export function computePricing(
  inputs: Inputs,
  scenarios: Record<ScenarioKey, ScenarioResult>,
  selected: ScenarioKey,
  settings: Settings
): Pricing {
  const { rev, aov } = inputs
  // Monthly orders from revenue. Use the ACTUAL order count for the tier
  // lookup — the plan tiers step in 500s at the low end (501/1001/1501…), so
  // rounding up to the nearest 1000 (the old ceil1000) would push a value like
  // 1300 into the 1501–2000 tier instead of its correct 1001–1500 tier.
  const mOrders = Math.ceil(rev / aov / 12)
  const p1 = lookupPlan(mOrders)
  const p2 = lookupPlan(settings.manualOrders)

  const planName = settings.plan
  const priceKey = (['', 'lite', 'premium', 'enterprise'] as const)[PLAN_INDEX[planName]]
  const planMonthly = p1[priceKey as 'lite' | 'premium' | 'enterprise']
  const platformCost = planMonthly * 12

  const wpPasses = ceil1000(scenarios[selected].passes)
  const wPrice1 = lookupWallet(wpPasses)
  const manualPasses = settings.manualPasses
  const wPrice2 = lookupWallet(manualPasses)

  return {
    mOrders,
    p1,
    p2,
    planName,
    manualOrders: settings.manualOrders,
    planMonthly,
    platformCost,
    wpPasses,
    wPrice1,
    manualPasses,
    wPrice2,
  }
}

/** Incrementality annex (Internal-only display figures). */
export function computeAnnex(inputs: Inputs, best: ScenarioResult): IncrementalityAnnex {
  const { aov, repeat } = inputs
  const axAovAll = aov
  const axAovScen = best.aovAfter
  const axMin = 60
  const axIncr1 = (60 - aov) / (best.aovAfter - aov)
  const axRepAll = 12 / repeat
  const axRepScen = 12 / best.repAfter
  const axExpiry = 2
  const axIncr2 = 1 - 2 / (12 / best.repAfter)
  return { axAovAll, axAovScen, axMin, axIncr1, axRepAll, axRepScen, axExpiry, axIncr2 }
}

/** Full model: baseline → three scenarios → score → selected → pricing → annex. */
export function computeModel(
  inputs: Inputs,
  integr: Integrations,
  settings: Settings
): ModelResult {
  const baseline = computeBaseline(inputs)
  const scenarios = {
    low: computeScenario(inputs, baseline, 0),
    mid: computeScenario(inputs, baseline, 1),
    best: computeScenario(inputs, baseline, 2),
  } as Record<ScenarioKey, ScenarioResult>

  const score = computeScoreFit(inputs, integr)
  const selected = score.scenario
  const pricing = computePricing(inputs, scenarios, selected, settings)
  const annex = computeAnnex(inputs, scenarios.best)

  return { baseline, scenarios, score, pricing, annex, selected }
}
