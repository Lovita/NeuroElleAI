import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'

const categories = [
  'Neuroscience',
  "Women's Brain Health",
  'Wearables',
  'AI & Health',
  'Environmental Neuroscience',
  'Youth in STEM',
  'Research Notes',
  'Brain Health',
]

export default function Insights() {
  return (
    <>
      <PageSEO
        title="Insights"
        description="The Neuro Elle AI journal: articles on neuroscience, women's brain health, wearables, AI, and youth STEM research."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Insights Journal</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Notes from the research.
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-teal border border-black/5">
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="rounded-2xl border border-dashed border-coral/40 bg-coral/5 p-10 text-center">
          <p className="font-display text-sm font-semibold text-coral-dark">CONTENT TO BE ADDED</p>
          <p className="mt-2 text-sm text-charcoal/60">
            No articles have been published yet. New pieces will appear here with author, date,
            category, reading time, and full citations — never invented statistics or sources.
          </p>
        </div>
      </Section>
    </>
  )
}
