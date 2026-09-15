import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { Disclaimer } from '@/components/Disclaimer'
import { womensBrainHealthSections, researchEducationalDisclaimer } from '@/data/content'
import { CTAButton } from '@/components/CTAButton'

export default function WomensBrainHealth() {
  return (
    <>
      <PageSEO
        title="Women's Brain Health"
        description="An educational hub on the female brain, hormones and the nervous system, perimenopause, menopause, and women's neurological health research."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Women&rsquo;s Brain Health</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          The female brain deserves more research.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
          This hub explores hormones and the nervous system, sleep and cognition, mood, brain fog,
          and the neuroscience of perimenopause and menopause — grounded in what research actually
          shows, and honest about where it doesn&rsquo;t yet have answers.
        </p>
        <div className="mt-6 max-w-2xl">
          <Disclaimer>{researchEducationalDisclaimer}</Disclaimer>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-5 sm:grid-cols-2">
          {womensBrainHealthSections.map((topic) => (
            <div key={topic} className="rounded-2xl border border-black/5 bg-ivory p-6">
              <h2 className="font-display text-lg font-bold text-teal">{topic}</h2>
              <p className="mt-2 text-sm text-charcoal/65">
                PLACEHOLDER — quick explanation of {topic.toLowerCase()}.
              </p>
              <div className="mt-4 flex gap-4 text-xs font-semibold">
                <span className="text-coral-dark">Quick Explanation</span>
                <span className="text-teal">Explore the Science →</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="aqua">
        <div className="rounded-3xl bg-white p-8 md:p-10">
          <SectionEyebrow>Future Research Question</SectionEyebrow>
          <blockquote className="max-w-3xl font-editorial text-2xl italic leading-snug text-teal sm:text-3xl">
            &ldquo;Can wearable physiological signals and machine-learning models help researchers
            understand patterns in stress, sleep, cognition, and emotional states during hormonal
            transitions?&rdquo;
          </blockquote>
          <p className="mt-5 max-w-2xl text-sm text-charcoal/65">
            This is a future research direction, not validated technology or a diagnostic tool.
          </p>
          <CTAButton to="/innovation" variant="secondary" className="mt-6">
            See the Innovation Lab
          </CTAButton>
        </div>
      </Section>
    </>
  )
}
