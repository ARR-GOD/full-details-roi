import { useEffect, useMemo, useState } from 'react'
import { computeModel } from './model/model'
import { DEFAULT_INPUTS, DEFAULT_INTEGRATIONS } from './model/defaults'
import type { Inputs, Integrations, Settings } from './model/types'
import { T } from './i18n'
import type { Lang } from './model/format'
import {
  defaultState,
  loadState,
  saveState,
} from './state/storage'
import type { GroupKey, Mode } from './state/storage'
import { TopBar } from './components/TopBar'
import { InputsCard } from './components/InputsCard'
import { IntegrationsCard } from './components/IntegrationsCard'
import { SettingsCard } from './components/SettingsCard'
import { ScenarioCard } from './components/ScenarioCard'
import { MainTables } from './components/MainTables'
import { Glossary } from './components/Glossary'

export default function App() {
  const [state, setState] = useState(loadState)
  const [glossaryOpen, setGlossaryOpen] = useState(false)

  const { inputs, integr, settings, lang, mode, groups } = state
  const internal = mode === 'internal'
  const t = T[lang]

  // Persist on every change; never wipe keys we didn't write.
  useEffect(() => {
    saveState(state)
  }, [state])

  // Keep the <html lang> attribute in sync for a11y.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const model = useMemo(
    () => computeModel(inputs, integr, settings),
    [inputs, integr, settings]
  )

  // --- update helpers ---
  const setInput = (k: keyof Inputs, v: number) =>
    setState((s) => ({ ...s, inputs: { ...s.inputs, [k]: v } }))
  const toggleIntegration = (k: keyof Integrations) =>
    setState((s) => ({ ...s, integr: { ...s.integr, [k]: !s.integr[k] } }))
  const patchSettings = (patch: Partial<Settings>) =>
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
  const setLang = (l: Lang) => setState((s) => ({ ...s, lang: l }))
  const setMode = (m: Mode) => setState((s) => ({ ...s, mode: m }))
  const toggleGroup = (k: GroupKey) =>
    setState((s) => ({ ...s, groups: { ...s.groups, [k]: !s.groups[k] } }))
  const resetInputs = () =>
    setState((s) => ({
      ...s,
      inputs: { ...DEFAULT_INPUTS },
      integr: { ...DEFAULT_INTEGRATIONS },
      settings: { ...defaultState().settings },
    }))

  return (
    <div className="min-h-full">
      <TopBar
        lang={lang}
        mode={mode}
        clientName={settings.clientName}
        t={t}
        onLang={setLang}
        onMode={setMode}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      <main className="mx-auto max-w-[1840px] px-[5%] py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left sticky sidebar */}
          <aside className="w-full shrink-0 lg:sticky lg:top-[72px] lg:w-[330px] lg:self-start">
            <div className="space-y-4">
              <InputsCard
                inputs={inputs}
                lang={lang}
                t={t}
                onChange={setInput}
                onReset={resetInputs}
              />
              {internal && (
                <IntegrationsCard integr={integr} t={t} onToggle={toggleIntegration} />
              )}
              {internal && (
                <SettingsCard settings={settings} lang={lang} t={t} onChange={patchSettings} />
              )}
              <ScenarioCard model={model} lang={lang} t={t} internal={internal} />
            </div>
          </aside>

          {/* Right main area */}
          <div className="min-w-0 flex-1">
            <MainTables
              model={model}
              lang={lang}
              t={t}
              groups={groups}
              integr={integr}
              internal={internal}
              showAnnex={settings.showAnnex}
              onToggleGroup={toggleGroup}
            />
          </div>
        </div>
      </main>

      {glossaryOpen && <Glossary t={t} onClose={() => setGlossaryOpen(false)} />}
    </div>
  )
}
