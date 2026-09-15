import { useState } from 'react'
import { lifespanStages } from '@/data/content'

export function LifespanTimeline() {
  const [active, setActive] = useState(0)
  const stage = lifespanStages[active]

  return (
    <div>
      <div
        className="grid grid-cols-2 gap-2 sm:flex sm:gap-2"
        role="tablist"
        aria-label="Brain health across the lifespan"
      >
        {lifespanStages.map((s: (typeof lifespanStages)[number], i: number) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`flex-1 rounded-full border px-4 py-3 text-center font-display text-sm font-semibold transition-colors ${
              active === i
                ? 'border-teal bg-teal text-ivory'
                : 'border-black/10 bg-white text-charcoal/70 hover:border-teal/40'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-8 rounded-3xl border border-black/5 bg-white p-8 md:p-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
          {stage.label}
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {stage.topics.map((topic: string) => (
            <li key={topic} className="flex items-center gap-3 text-sm text-charcoal/80">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
