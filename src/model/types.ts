import type { IntegrationKey, PlanName, ScenarioKey } from './constants'

/** Editable business inputs. Percentages are stored as decimals. */
export interface Inputs {
  /** Annual revenue. */
  rev: number
  /** Average order value. */
  aov: number
  /** Recurring customers rate (decimal). */
  recur: number
  /** Repeat rate (Wallet). */
  repeat: number
  /** Gross margin (decimal). */
  margin: number
  /** Reward loyalty (decimal). */
  rwLoy: number
  /** Reward referrals (currency). */
  rwRef: number
}

export type Integrations = Record<IntegrationKey, boolean>

/** Scenario-independent baseline figures. */
export interface Baseline {
  yOrders: number
  uCust: number
  revCust: number
}

/** All computed outputs for a single scenario. */
export interface ScenarioResult {
  key: ScenarioKey
  // Loyalty
  members: number
  aovAfter: number
  repAfter: number
  gross: number
  trueG: number
  lyCost: number
  lyGP: number
  lyNP: number
  // Referral
  rfRev: number
  rfTrue: number
  rfOrders: number
  rfCost: number
  rfGP: number
  rfNP: number
  // Wallet
  passes: number
  // Totals
  tgTot: number
  tgAfter: number
  tiTot: number
  tiAfter: number
  tiGP: number
  tiCost: number
  tiNP: number
  // Metrics uplift
  ordAfter: number
  mAov: number
  mRep: number
  mRpc: number
}

export interface ScoreFit {
  revBool: number
  valT: number
  coefT: number
  scoreFit: number
  scenario: ScenarioKey
}

export interface PlanRow {
  minOrders: number
  lite: number
  premium: number
  enterprise: number
}

export interface Pricing {
  mOrders: number
  /** Auto plan row from revenue. */
  p1: PlanRow
  /** Manual plan row from `manualOrders`. */
  p2: PlanRow
  planName: PlanName
  /** Custom monthly-order volume used for the p2 row. */
  manualOrders: number
  /** Monthly price of the selected plan (auto row). */
  planMonthly: number
  /** Annual platform cost = planMonthly * 12. */
  platformCost: number
  // Wallet add-on
  wpPasses: number
  wPrice1: number
  manualPasses: number
  wPrice2: number
}

/** Configurable-but-not-primary settings. */
export interface Settings {
  clientName: string
  plan: PlanName
  manualOrders: number
  manualPasses: number
  showAnnex: boolean
}

export interface IncrementalityAnnex {
  axAovAll: number
  axAovScen: number
  axMin: number
  axIncr1: number
  axRepAll: number
  axRepScen: number
  axExpiry: number
  axIncr2: number
}

export interface ModelResult {
  baseline: Baseline
  scenarios: Record<ScenarioKey, ScenarioResult>
  score: ScoreFit
  pricing: Pricing
  annex: IncrementalityAnnex
  /** The selected scenario, driven by Score Fit. */
  selected: ScenarioKey
}
