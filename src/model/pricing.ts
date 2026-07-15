import { PLAN_TIERS, WALLET_TIERS } from './constants'
import type { PlanRow } from './types'

/** Round up to the nearest 1000. */
export function ceil1000(x: number): number {
  return Math.ceil(x / 1000) * 1000
}

/**
 * VLOOKUP-style lookup: return the tier row with the greatest `minThreshold`
 * that is still <= x. Rows must be sorted ascending by their first column.
 * Falls back to the first row when x is below every threshold.
 */
export function lookup<T extends readonly [number, ...number[]]>(
  tiers: ReadonlyArray<T>,
  x: number
): T {
  let match = tiers[0]
  for (const row of tiers) {
    if (row[0] <= x) match = row
    else break
  }
  return match
}

/** Look up the plan tier row for a given monthly-order volume. */
export function lookupPlan(monthlyOrders: number): PlanRow {
  const [minOrders, lite, premium, enterprise] = lookup(PLAN_TIERS, monthlyOrders)
  return { minOrders, lite, premium, enterprise }
}

/** Look up the wallet add-on yearly price for a given active-pass count. */
export function lookupWallet(activePasses: number): number {
  return lookup(WALLET_TIERS, activePasses)[1]
}
