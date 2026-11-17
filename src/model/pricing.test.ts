import { describe, expect, it } from 'vitest'
import { ceil1000, lookup, lookupPlan, lookupWallet } from './pricing'
import { PLAN_TIERS } from './constants'

describe('ceil1000', () => {
  it('rounds up to the nearest 1000', () => {
    expect(ceil1000(0)).toBe(0)
    expect(ceil1000(1)).toBe(1000)
    expect(ceil1000(1000)).toBe(1000)
    expect(ceil1000(1001)).toBe(2000)
    expect(ceil1000(43809.52)).toBe(44000) // rev/aov/12 for defaults
  })
})

describe('lookup at tier boundaries', () => {
  it('exactly 1000 monthly orders → the 501 tier (Premium 548.8)', () => {
    const row = lookupPlan(1000)
    expect(row.minOrders).toBe(501)
    expect(row.premium).toBe(548.8)
  })

  it('exactly 1001 monthly orders → the 1001 tier (Premium 598.7)', () => {
    const row = lookupPlan(1001)
    expect(row.minOrders).toBe(1001)
    expect(row.premium).toBe(598.7)
  })

  it('1300 monthly orders → the 1001–1500 tier, NOT 1501–2000 (regression)', () => {
    // Regression for the ceil1000 bug: rounding 1300 up to 2000 used to land in
    // the 1501–2000 tier (Lite 298.6/mo → 3583€/yr) instead of the correct
    // 1001–1500 tier (Lite 248.7/mo → 2984€/yr).
    const row = lookupPlan(1300)
    expect(row.minOrders).toBe(1001)
    expect(row.lite * 12).toBeCloseTo(2984.4, 2)
  })

  it('tier boundaries at 1500 vs 1501 are exact', () => {
    expect(lookupPlan(1500).minOrders).toBe(1001)
    expect(lookupPlan(1501).minOrders).toBe(1501)
  })

  it('below the first threshold → the first row', () => {
    expect(lookup(PLAN_TIERS, -5)[0]).toBe(0)
    expect(lookupPlan(0).premium).toBe(449)
  })

  it('above the last threshold → the last row', () => {
    const row = lookupPlan(1_000_000)
    expect(row.minOrders).toBe(45001)
    expect(row.premium).toBe(2322.88)
  })
})

describe('wallet lookup', () => {
  it('picks the correct pass tier', () => {
    expect(lookupWallet(0)).toBe(2101.44)
    expect(lookupWallet(1000)).toBe(2101.44)
    expect(lookupWallet(1001)).toBe(4212.912)
    expect(lookupWallet(2000)).toBe(4212.912)
    expect(lookupWallet(80000)).toBe(54369.744)
  })
})
