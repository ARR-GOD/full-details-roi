/**
 * Which visual skin this build renders — fixed at build time by VITE_AUDIENCE,
 * never changed at runtime. `internal` is the original Loyoly sales tool
 * (unchanged look); `partner` is the hub-themed version for the partner tool.
 *
 * One model (`src/model/`), one set of components, one repo: a fix here
 * ships to both deployments on their next build.
 */
export const SKIN = (import.meta.env.VITE_AUDIENCE === 'partner' ? 'partner' : 'internal') as
  | 'internal'
  | 'partner'
