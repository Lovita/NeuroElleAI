import { useState } from 'react'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { learnModules, learnAudienceFilters } from '@/data/content'

export default function Learn() {
  const [filter, setFilter] = useState<string>('All')

  const filterSlug = filter.toLowerCase().replace(/\s+/g, '-')
  const modules =
    filter === 'All' ? learnModules : learnModules.filter((m) => m.audiences.includes(filterSlug as never))

  return (
    <>
      <PageSEO
        title="Learn Neuroscience"
        description="Neuroscience learning modules for students, adults, educators, and researchers — HRV, EDA, EEG, stress, sleep, environmental neuroscience, AI, and more."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Learn Neuroscience</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Neuroscience, explained clearly — for whoever&rsquo;s asking.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
          Filter by who you are, or just browse. Every module offers a 60-second version and a
          deeper dive.
        </p>
      </Section>

      <Section tone="white">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('All')}
            className={`rounded-full px-4 py-2 font-display text-xs font-semibold ${
              filter === 'All' ? 'bg-teal text-ivory' : 'bg-ivory text-charcoal/70'
            }`}
          >
            All
          </button>
          {learnAudienceFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 font-display text-xs font-semibold ${
                filter === f ? 'bg-teal text-ivory' : 'bg-ivory text-charcoal/70'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <div key={mod.slug} className="rounded-2xl border border-black/5 bg-ivory p-6">
              <h2 className="font-display text-base font-bold text-teal">{mod.title}</h2>
              <p className="mt-3 text-xs text-charcoal/60">PLACEHOLDER — module content to be added.</p>
              <div className="mt-4 flex gap-4 text-xs font-semibold">
                <span className="text-coral-dark">Learn in 60 Seconds</span>
                <span className="text-teal">Explore the Science →</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
