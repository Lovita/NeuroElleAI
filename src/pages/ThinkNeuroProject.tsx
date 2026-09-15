import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { Accordion } from '@/components/Accordion'
import { StatusTag, PlaceholderNote } from '@/components/Disclaimer'
import { CTAButton } from '@/components/CTAButton'

const sections = [
  {
    title: 'Background',
    status: 'literature_review' as const,
    content: 'PLACEHOLDER — background and motivating literature for this project.',
  },
  {
    title: 'Research Question',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — the specific question this project investigates.',
  },
  {
    title: 'Objectives',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — the concrete objectives of the project.',
  },
  {
    title: 'Literature Review',
    status: 'literature_review' as const,
    content: 'PLACEHOLDER — summary of relevant prior research and citations.',
  },
  {
    title: 'Methodology',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — study design, participants/data sources, and procedure.',
  },
  {
    title: 'Bibliometric Analysis',
    status: 'literature_review' as const,
    content: 'PLACEHOLDER — bibliometric review of the surrounding field.',
  },
  {
    title: 'Physiological Signals',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — HRV / EDA / EEG signals used and how they were collected.',
  },
  {
    title: 'Wearable Framework',
    status: 'exploratory_concept' as const,
    content: 'PLACEHOLDER — the proposed wearable data-collection framework.',
  },
  {
    title: 'Data / Analysis',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — analysis approach and, where available, results.',
  },
  {
    title: 'Discussion',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — interpretation of findings in context.',
  },
  {
    title: 'Limitations',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — honest limitations of scope, sample, and method.',
  },
  {
    title: 'Conclusions',
    status: 'original_research' as const,
    content: 'PLACEHOLDER — conclusions supported directly by the data.',
  },
  {
    title: 'Future Research',
    status: 'future_research_direction' as const,
    content: 'PLACEHOLDER — open questions this project raises for future work.',
  },
  {
    title: 'References',
    status: 'literature_review' as const,
    content: 'PLACEHOLDER — full citation list in a consistent format.',
  },
]

export default function ThinkNeuroProject() {
  return (
    <>
      <PageSEO
        title="ThinkNeuro Research Project"
        description="Myra's ThinkNeuro environmental neuroscience research project: background, methodology, physiological signals, and future research directions."
      />

      <Section tone="ivory" className="pb-10">
        <SectionEyebrow>Environmental Neuroscience · Research Project</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          ThinkNeuro Research Project
        </h1>
        <p className="mt-4 text-sm font-semibold text-charcoal/60">Researcher: Myra</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CTAButton to="#poster" variant="secondary">
            View Full Poster
          </CTAButton>
          <CTAButton to="#summary" variant="secondary">
            Download Research Summary
          </CTAButton>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" id="poster">
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-coral/40 bg-coral/5 sm:col-span-2 lg:col-span-3">
            <PlaceholderNote>high-resolution research poster viewer</PlaceholderNote>
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionEyebrow>Project Detail</SectionEyebrow>
        <Accordion
          items={sections.map((s) => ({
            title: s.title,
            content: (
              <div className="space-y-2">
                <StatusTag status={s.status} />
                <p>{s.content}</p>
              </div>
            ),
          }))}
        />
      </Section>
    </>
  )
}
