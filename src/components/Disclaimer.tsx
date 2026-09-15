import type { ContentStatus } from '@/types'

export function Disclaimer({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-sage/60 bg-aqua/50 px-5 py-4 text-sm leading-relaxed text-teal-dark">
      {children}
    </div>
  )
}

export function PlaceholderNote({ children }: { children: string }) {
  return (
    <div className="rounded-xl border border-dashed border-coral/50 bg-coral/5 px-4 py-3 text-xs font-medium text-coral-dark">
      PLACEHOLDER — {children}
    </div>
  )
}

const statusLabels: Record<ContentStatus, string> = {
  original_research: 'Original Research',
  literature_review: 'Literature Review',
  educational_content: 'Educational Content',
  exploratory_concept: 'Exploratory Concept',
  future_research_direction: 'Future Research Direction',
}

const statusColors: Record<ContentStatus, string> = {
  original_research: 'bg-teal text-ivory',
  literature_review: 'bg-sage/40 text-teal-dark',
  educational_content: 'bg-aqua text-teal-dark',
  exploratory_concept: 'bg-coral/15 text-coral-dark',
  future_research_direction: 'bg-plum/15 text-plum',
}

export function StatusTag({ status }: { status: ContentStatus }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  )
}
