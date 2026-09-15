import { pipelineSteps } from '@/data/content'

export function Pipeline() {
  return (
    <ol className="flex flex-col gap-0">
      {pipelineSteps.map((step: string, i: number) => (
        <li key={step} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal font-display text-xs font-bold text-ivory">
              {i + 1}
            </span>
            {i < pipelineSteps.length - 1 && <span className="h-10 w-px bg-sage/60" aria-hidden="true" />}
          </div>
          <p className="pt-1.5 pb-2 font-display text-base font-semibold text-charcoal">{step}</p>
        </li>
      ))}
    </ol>
  )
}
