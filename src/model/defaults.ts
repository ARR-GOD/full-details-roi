import type { Integrations, Inputs, Settings } from './types'

/** Default inputs from the "Joe — 2026" tab. */
export const DEFAULT_INPUTS: Inputs = {
  rev: 18_400_000,
  aov: 35,
  recur: 0.85,
  repeat: 2,
  margin: 0.7,
  rwLoy: 0.1,
  rwRef: 10,
}

export const DEFAULT_INTEGRATIONS: Integrations = {
  checkout: true,
  crm: true,
  pos: false,
  social: true,
  reviews: true,
  whatsapp: true,
  subscription: false,
  support: true,
  mobileApp: false,
  wallet: false,
}

export const DEFAULT_SETTINGS: Settings = {
  clientName: 'Joe — 2026',
  plan: 'Premium',
  manualOrders: 50000,
  manualPasses: 2000,
  showAnnex: true,
}

/** Clamp bounds for each input field. */
export const INPUT_CLAMPS: Record<keyof Inputs, [number, number]> = {
  rev: [0, 1e12],
  aov: [0.01, 1e7],
  recur: [0, 1],
  repeat: [0.01, 1000],
  margin: [0, 1],
  rwLoy: [0, 1],
  rwRef: [0, 1e7],
}

/** Kind of each input field, driving parsing/formatting. */
export const INPUT_KIND: Record<keyof Inputs, 'currency' | 'percent' | 'number'> = {
  rev: 'currency',
  aov: 'currency',
  recur: 'percent',
  repeat: 'number',
  margin: 'percent',
  rwLoy: 'percent',
  rwRef: 'currency',
}
