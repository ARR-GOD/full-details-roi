import { DEFAULT_INPUTS, DEFAULT_INTEGRATIONS, DEFAULT_SETTINGS } from '../model/defaults'
import { INTEGRATIONS } from '../model/constants'
import type { Inputs, Integrations, Settings } from '../model/types'
import type { Lang } from '../model/format'
import { LANGS } from '../i18n'

export type Mode = 'internal' | 'presentation'
export type GroupKey = 'scenarioDetails' | 'totals' | 'pricingScore'
export type Groups = Record<GroupKey, boolean>

export interface PersistedState {
  inputs: Inputs
  integr: Integrations
  settings: Settings
  lang: Lang
  mode: Mode
  groups: Groups
}

export const STORAGE_KEY = 'loyoly_roi_calculator'

export const DEFAULT_GROUPS: Groups = {
  scenarioDetails: true,
  totals: true,
  pricingScore: true,
}

export function defaultState(): PersistedState {
  return {
    inputs: { ...DEFAULT_INPUTS },
    integr: { ...DEFAULT_INTEGRATIONS },
    settings: { ...DEFAULT_SETTINGS },
    lang: 'fr',
    mode: 'internal',
    groups: { ...DEFAULT_GROUPS },
  }
}

function isNum(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x)
}
function isBool(x: unknown): x is boolean {
  return typeof x === 'boolean'
}

/**
 * Hydrate from localStorage with validation. Any malformed or missing key
 * falls back to its default — we never trust the stored blob wholesale, and
 * we never touch keys we didn't write.
 */
export function loadState(): PersistedState {
  const base = defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return base
    const parsed = JSON.parse(raw) as Record<string, unknown>

    if (parsed.inputs && typeof parsed.inputs === 'object') {
      for (const k of Object.keys(base.inputs) as (keyof Inputs)[]) {
        const v = (parsed.inputs as Record<string, unknown>)[k]
        if (isNum(v)) base.inputs[k] = v
      }
    }
    if (parsed.integr && typeof parsed.integr === 'object') {
      for (const k of INTEGRATIONS) {
        const v = (parsed.integr as Record<string, unknown>)[k]
        if (isBool(v)) base.integr[k] = v
      }
    }
    if (parsed.settings && typeof parsed.settings === 'object') {
      const s = parsed.settings as Record<string, unknown>
      if (typeof s.clientName === 'string') base.settings.clientName = s.clientName
      if (s.plan === 'Lite' || s.plan === 'Premium' || s.plan === 'Enterprise')
        base.settings.plan = s.plan
      if (isNum(s.manualOrders)) base.settings.manualOrders = s.manualOrders
      if (isNum(s.manualPasses)) base.settings.manualPasses = s.manualPasses
      if (isBool(s.showAnnex)) base.settings.showAnnex = s.showAnnex
    }
    if (typeof parsed.lang === 'string' && (LANGS as string[]).includes(parsed.lang))
      base.lang = parsed.lang as Lang
    if (parsed.mode === 'internal' || parsed.mode === 'presentation') base.mode = parsed.mode
    if (parsed.groups && typeof parsed.groups === 'object') {
      for (const k of Object.keys(base.groups) as GroupKey[]) {
        const v = (parsed.groups as Record<string, unknown>)[k]
        if (isBool(v)) base.groups[k] = v
      }
    }
  } catch {
    // Corrupt JSON → defaults.
  }
  return base
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage full / unavailable — ignore, the app still works in-memory.
  }
}
