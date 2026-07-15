// ---------------------------------------------------------------------------
// Source-of-truth constants for the Loyoly "Joe — 2026" ROI model.
//
// DO NOT change any value here without a corresponding change in the Excel
// model — the acceptance tests in ./model.test.ts lock these numbers down.
// See README.md ("Changing the model") for how these flow through.
// ---------------------------------------------------------------------------

/** Scenario index order used everywhere in the model. */
export const SCENARIOS = ['low', 'mid', 'best'] as const
export type ScenarioKey = (typeof SCENARIOS)[number]

/** Per-scenario constant vectors, indexed [Low, Mid, Best]. */
export const VECTORS = {
  /** Engagement — share of unique customers who become engaged members. */
  ENG: [0.1, 0.14, 0.17],
  /** AOV uplift. */
  AOVU: [0.1, 0.2, 0.3],
  /** Repeat uplift. */
  REPU: [0.15, 0.2, 0.3],
  /** Incrementality factor. */
  INC: [0.6, 0.65, 0.7],
  /** Rewards redemption. */
  RED: [0.3, 0.35, 0.4],
  /** Referral rate. */
  REF: [0.005, 0.01, 0.02],
  /** Active wallet passes as a share of unique customers. */
  PASS: [0.05, 0.1, 0.15],
} as const

/** Integration keys, in display order. */
export const INTEGRATIONS = [
  'checkout',
  'crm',
  'pos',
  'social',
  'reviews',
  'whatsapp',
  'subscription',
  'support',
  'mobileApp',
  'wallet',
] as const
export type IntegrationKey = (typeof INTEGRATIONS)[number]

/**
 * Score Fit coefficients. `revenue` is the weight applied to the (banded)
 * revenue signal; the rest are the per-integration weights.
 *
 * The denominator (coefT) is the sum of every coefficient at its maximum:
 *   revenue(3) + Σ integrations(35) = 38.
 *
 * NOTE: the build spec printed `coefT = 41`, but that fails every acceptance
 * test (default Score Fit must be 57.89% = 22/38). 38 is the value that
 * reproduces the Excel behaviour, so it is the source of truth here.
 */
export const SCORE_COEF = {
  revenue: 3,
  checkout: 6,
  crm: 6,
  pos: 5,
  social: 2,
  reviews: 2,
  whatsapp: 2,
  subscription: 2,
  support: 1,
  mobileApp: 3,
  wallet: 6,
} as const

/** Sum of every coefficient at its maximum — the Score Fit denominator. */
export const SCORE_COEF_TOTAL =
  SCORE_COEF.revenue +
  INTEGRATIONS.reduce((sum, k) => sum + SCORE_COEF[k], 0) // 3 + 35 = 38

/** Score Fit band thresholds: < LOW → Low, < MID → Mid, else Best. */
export const SCORE_BANDS = { low: 0.4, mid: 0.7 } as const

/**
 * Plan pricing tiers (from the hidden "Pricing" sheet), as
 * [minMonthlyOrders, Lite €/mo, Premium €/mo, Enterprise €/mo].
 */
export const PLAN_TIERS: ReadonlyArray<readonly [number, number, number, number]> = [
  [0, 99, 449, 1200],
  [501, 198.8, 548.8, 1299.8],
  [1001, 248.7, 598.7, 1349.7],
  [1501, 298.6, 648.6, 1399.6],
  [2001, 348.5, 698.5, 1449.5],
  [2501, 373.45, 723.45, 1474.45],
  [3001, 423.4, 773.4, 1524.4],
  [4001, 473.35, 823.35, 1574.35],
  [5001, 523.3, 873.3, 1624.3],
  [6001, 573.25, 923.25, 1674.25],
  [7001, 723.2, 1073.2, 1824.2],
  [10001, 848.15, 1198.15, 1949.15],
  [12501, 923.12, 1273.12, 2024.12],
  [15001, 998.09, 1348.09, 2099.09],
  [17501, 1073.06, 1423.06, 2174.06],
  [20001, 1223.03, 1573.03, 2324.03],
  [25001, 1373, 1723, 2474],
  [30001, 1522.97, 1872.97, 2623.97],
  [35001, 1672.94, 2022.94, 2773.94],
  [40001, 1822.91, 2172.91, 2923.91],
  [45001, 1972.88, 2322.88, 3073.88],
]

/** Wallet add-on tiers, as [minActivePasses, yearly € (already −12%)]. */
export const WALLET_TIERS: ReadonlyArray<readonly [number, number]> = [
  [0, 2101.44],
  [1001, 4212.912],
  [5001, 6852.384],
  [10001, 12131.856],
  [20001, 17411.328],
  [30001, 27970.8],
  [50001, 38530.272],
  [70001, 54369.744],
]

/** Plan index into a PLAN_TIERS row (offset by 1 for the threshold column). */
export const PLAN_INDEX = { Lite: 1, Premium: 2, Enterprise: 3 } as const
export type PlanName = keyof typeof PLAN_INDEX
