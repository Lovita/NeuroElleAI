import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { StatusTag } from '@/components/Disclaimer'

const concepts = [
  { title: 'Wearable Neurotechnology', status: 'exploratory_concept' as const },
  { title: 'Biosignal Visualization', status: 'exploratory_concept' as const },
  { title: 'Environmental Stress Analysis', status: 'future_research_direction' as const },
  { title: 'AI-Assisted Research Tools', status: 'exploratory_concept' as const },
  { title: 'Neuroscience Education Apps', status: 'exploratory_concept' as const },
  { title: "Women's Brain-Health Visualization", status: 'future_research_direction' as const },
  { title: 'HRV / EDA / EEG Analysis', status: 'exploratory_concept' as const },
  { title: 'Computational Neuroscience Tools', status: 'future_research_direction' as const },
]

export default function Innovation() {
  return (
    <>
      <PageSEO
        title="Innovation Lab"
        description="Exploratory concepts in wearable neurotechnology, biosignal visualization, and AI-assisted neuroscience research tools."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Innovation Lab</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Where wearables, AI, and neuroscience meet — responsibly.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
          Every concept here is exploratory. None of it is a medical device, and none of it is
          presented as validated technology.
        </p>
      </Section>

      <Section tone="white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map((c) => (
            <div key={c.title} className="rounded-2xl border border-black/5 bg-ivory p-6">
              <StatusTag status={c.status} />
              <h2 className="mt-3 font-display text-base font-bold text-teal">{c.title}</h2>
              <p className="mt-2 text-xs text-charcoal/60">PLACEHOLDER — concept description to be added.</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
