import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { LifespanTimeline } from '@/components/LifespanTimeline'
import { Disclaimer } from '@/components/Disclaimer'
import { medicalDisclaimer } from '@/data/content'
import { CTAButton } from '@/components/CTAButton'

const topics = [
  'Cognition',
  'Stress',
  'Sleep',
  "Women's Brain Health",
  'Hormonal Transitions',
  'Wearable Health Technology',
]

export default function BrainHealth() {
  return (
    <>
      <PageSEO
        title="Brain Health"
        description="Explore brain health across adulthood: cognition, stress, sleep, women's brain health, hormonal transitions, and wearable health technology."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Brain Health</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Brain health, for adults navigating every stage.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
          Cognition, stress, and sleep change across adulthood — and for women, hormonal transitions
          add another layer. This hub brings those threads together in one place.
        </p>
      </Section>

      <Section tone="white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <div key={topic} className="rounded-2xl border border-black/5 bg-ivory p-6">
              <h2 className="font-display text-base font-bold text-teal">{topic}</h2>
              <p className="mt-2 text-xs text-charcoal/60">PLACEHOLDER — educational content to be added.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <SectionEyebrow>Brain Health Across the Lifespan</SectionEyebrow>
        <LifespanTimeline />
        <div className="mt-8 max-w-2xl">
          <Disclaimer>{medicalDisclaimer}</Disclaimer>
        </div>
        <CTAButton to="/womens-brain-health" variant="ghost" className="mt-6">
          Explore Women&rsquo;s Brain Health →
        </CTAButton>
      </Section>
    </>
  )
}
