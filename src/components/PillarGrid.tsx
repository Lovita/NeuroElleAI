import { pillars } from '@/data/content'

export function PillarGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar: (typeof pillars)[number], i: number) => (
        <div
          key={pillar.title}
          className="group rounded-3xl border border-black/5 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-teal/5"
        >
          <span className="font-editorial text-3xl text-sage">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 font-display text-xl font-bold text-teal">{pillar.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{pillar.description}</p>
        </div>
      ))}
    </div>
  )
}
