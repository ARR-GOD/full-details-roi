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
