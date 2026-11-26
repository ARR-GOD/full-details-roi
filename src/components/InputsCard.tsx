import { NumberField } from './NumberField'
import { SectionHeader } from './ui'
import { INPUT_CLAMPS, INPUT_KIND } from '../model/defaults'
import type { Inputs } from '../model/types'
import type { Lang } from '../model/format'
import type { Dict } from '../i18n'

const FIELDS: (keyof Inputs)[] = ['rev', 'aov', 'recur', 'repeat', 'margin', 'rwLoy', 'rwRef']

export function InputsCard({
  inputs,
  lang,
  t,
  onChange,
  onReset,
}: {
  inputs: Inputs
  lang: Lang
  t: Dict
  onChange: (k: keyof Inputs, v: number) => void
  onReset: () => void
}) {
  return (
    <section className="card overflow-hidden">
      <SectionHeader>
        <div className="flex items-center justify-between">
          <span>{t.inputs}</span>
          <button
            onClick={onReset}
            className="btn rounded-btn bg-white/70 px-2 py-0.5 text-[12px] font-medium text-muted2 hover:text-accent-text"
          >
            {t.reset}
          </button>
        </div>
      </SectionHeader>
      <div className="space-y-2.5 p-4">
        {FIELDS.map((k) => (
          <label key={k} className="grid grid-cols-[1fr_120px] items-center gap-2">
            <span className="text-[13px] text-muted">{t[k]}</span>
            <NumberField
              value={inputs[k]}
              kind={INPUT_KIND[k]}
              clamp={INPUT_CLAMPS[k]}
              lang={lang}
              label={t[k]}
              onCommit={(v) => onChange(k, v)}
            />
          </label>
        ))}
      </div>
    </section>
  )
}
