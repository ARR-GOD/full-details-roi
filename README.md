# Loyoly — Pricing & ROI Calculator

Internal web app for the Loyoly sales team. It replicates the **"Joe — 2026"**
tab of the internal Excel model: a rep types a handful of business inputs and the
app computes the loyalty / referral / wallet ROI across three scenarios
(**Low / Mid / Best**) plus pricing, in front of a prospect.

React 18 + TypeScript + Vite + Tailwind. No backend — all state is client-side and
persisted to `localStorage`.

## Run

```bash
npm install
npm run dev        # dev server (http://localhost:5173)
npm run build      # type-check + static production bundle in dist/
npm run preview    # serve the production build locally
npm test           # Vitest unit + acceptance tests
```

## Where the model lives

All financial logic is in **`src/model/`** as pure, side-effect-free functions —
the UI never does arithmetic.

| File | Responsibility |
|---|---|
| `constants.ts` | Source-of-truth constants: scenario vectors, Score Fit coefficients, plan & wallet tier tables. **This is the file you edit to change the numbers.** |
| `defaults.ts` | Default inputs / integrations / settings, clamp ranges, field kinds. |
| `model.ts` | `computeBaseline`, `computeScenario`, `computeScoreFit`, `computePricing`, `computeAnnex`, and the top-level `computeModel`. |
| `pricing.ts` | `ceil1000`, `lookup` (VLOOKUP), and the plan / wallet tier lookups. |
| `parse.ts` | Locale-tolerant number parsing (`85`, `85%`, `0,85`, `1.234,56`, `1,234.56`) + clamping. |
| `format.ts` | Locale-aware currency / integer / percent formatters; language → currency map. |
| `*.test.ts` | Vitest tests, including every acceptance test from the spec. |

`computeModel(inputs, integrations, settings)` returns everything the UI renders:
baseline, the three scenarios, Score Fit, the selected scenario, pricing, and the
incrementality annex.

## How to change things

### Scenario vectors (Low / Mid / Best)

Edit `VECTORS` in `src/model/constants.ts`. Each vector is `[Low, Mid, Best]`.
The tests in `src/model/model.test.ts` lock the current values against the Excel
model — update them if you intentionally change a vector.

### Score Fit coefficients

Edit `SCORE_COEF` in `src/model/constants.ts`. The denominator `SCORE_COEF_TOTAL`
is computed automatically as *revenue coefficient + Σ integration coefficients*
(currently **38** = 3 + 35), so you never hand-maintain the total.

> **Note on the denominator.** The build spec printed `coefT = 41`, but that value
> fails every acceptance test — the default Score Fit must be `22/38 = 57.89%`, and
> the CRM+Wallet band transitions only line up at **38**. `38` is the value that
> reproduces the Excel behaviour and is therefore the source of truth here.

### Pricing / wallet tier tables

Edit `PLAN_TIERS` and `WALLET_TIERS` in `src/model/constants.ts`. Rows must stay
sorted ascending by their first column (the min-threshold) — `lookup` relies on it.
Plan prices are stored **monthly**; the UI multiplies by 12 for the annual display.

## How to add a language

1. Add the locale to the `Lang` union and `LANGS` array in `src/i18n/index.ts`.
2. Add its BCP-47 locale and currency to `LOCALE` / `CURRENCY` in `src/model/format.ts`
   (currency is language-driven: EN → GBP, everything else → EUR by default).
3. Add a full `Dict` object for the new language to the `T` map in `src/i18n/index.ts`
   — TypeScript will tell you if any key is missing.

Values are **not** FX-converted between languages; only the currency symbol and
number formatting change (this matches the Excel/reference behaviour).

## Modes

- **Internal** — shows the Integrations card, the Settings card, the Score Fit pill
  and table, and the incrementality annex. This is where the rep configures the deal.
- **Presentation** — client-facing. Hides all of the above; Score Fit is never shown
  to the client.

## Persistence

`{ inputs, integr, settings, lang, mode, groups }` is written to
`localStorage['loyoly_roi_calculator']` on every change and re-hydrated (with
per-key validation) on load. Malformed or unknown keys fall back to defaults; keys
the app didn't write are never touched.

## Deploy

Static bundle — deployable to any static host. A `vercel.json` (framework: `vite`,
output: `dist`) is included, so on Vercel it's *New Project → import the repo →
Deploy* with zero extra configuration.

## Two skins, one repo, one branch (internal sales tool + Partner Radar)

This same codebase builds **two different-looking tools** from the exact same
model and formulas — picked at build time by the `VITE_AUDIENCE` env var
(`internal` or `partner`, default `internal` — see `.env`), via `src/skin.ts`
and the `data-skin` attribute it sets on `<html>` (`index.html`, `%VITE_AUDIENCE%`
is substituted by Vite at build time).

- **Internal** (`VITE_AUDIENCE=internal`, unset = same thing): the original tool
  above, unchanged — Loyoly logo, FR/EN/ES picker, "Joe — 2026" demo client.
- **Partner** (`VITE_AUDIENCE=partner`): the version embedded in **Partner
  Radar's partner hub** (an agency shows ROI to their own client, the brand).
  No Loyoly logo (the hub already has its own), no language picker (locked to
  French, since the hub carries no language context into the iframe), no demo
  client name (starts blank so the agency types their client's name). Visually
  it uses Partner Radar's hub design tokens (neutral grays, single mint accent,
  Inter only — see `partner-radar/.interface-design/system.md`) instead of the
  internal Excel-style palette. Colors live as CSS variables in `src/index.css`
  under `[data-skin="partner"]` — **never** add a skin-specific class to a
  component, add the token there instead (see `text-accent-text` / `text-onaccent`
  for why: the partner skin's accent is a light mint, unsafe as text on a light
  background, unlike the internal skin's blue).

**Why this matters for how you work on this repo:** both deployments point at
**this same branch**. A fix to `src/model/` (a formula, `PLAN_TIERS`,
`WALLET_TIERS`, anything in "How to change things" above) ships to both tools
on their next deploy, automatically, with no extra step — that's the entire
point of keeping this as one codebase instead of two. **Never** branch the
partner skin off into its own long-lived branch or fork: if you do, it stops
receiving fixes made here, silently.

**Partner-specific constraints to keep in mind editing this app:**
- Partner Radar embeds this app in an `<iframe>` (cross-origin — it does not
  share `localStorage`, cookies, or a JS window with the host page). Don't add
  anything that assumes it can read the parent page's state directly; cross-
  frame communication, if ever needed (e.g. to sync dark mode), goes through
  `postMessage`, not direct DOM access like `sim-pnl.html` does on its
  same-origin host.
- The agency viewing it is **not** a Loyoly employee — `internal` mode exists
  for them too (to tune assumptions before presenting), but never add a string,
  a field, or a number here that assumes the viewer works at Loyoly, or that
  would leak internal-only context (deal history, CRM status, etc.) — there is
  none of that today; keep it that way.
- `clientName` defaults to the partner's own end client, never the Loyoly demo
  name — see `DEFAULT_SETTINGS.clientName` in `src/model/defaults.ts`.

**Deploy (two Vercel projects, same repo, same branch):**

| | Internal (today) | Partner (new) |
|---|---|---|
| Vercel project | existing, `full-details-roi.vercel.app` | new, under Antoine's Vercel account |
| Branch | this repo's default branch | same |
| `VITE_AUDIENCE` | `internal` (or unset) | `partner` |
| `VITE_APP_TITLE` | `Loyoly — Pricing & ROI` (or unset) | `Calculateur ROI` |

Setting up the second project: *Vercel → New Project → import this same repo →
Environment Variables → add the two partner values above → Deploy*. No other
setting differs.
