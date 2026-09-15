import { Link } from 'react-router-dom'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { CTAButton } from '@/components/CTAButton'
import { Pipeline } from '@/components/Pipeline'
import { StatusTag } from '@/components/Disclaimer'

export default function Research() {
  return (
    <>
      <PageSEO
        title="Research"
        description="Environmental neuroscience research at Neuro Elle AI: wearable HRV, EDA, and EEG signals, machine learning, and the ThinkNeuro research project."
      />

      <Section tone="ivory" className="pb-10">
        <SectionEyebrow>Research — Stream One</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Environmental Neuroscience
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
          This research stream examines the relationship between environmental exposure and
          physiological, cognitive, and emotional responses — using wearable biosignals (HRV, EDA,
          EEG) and machine learning to look for patterns across natural and urban/industrial
          settings.
        </p>
      </Section>

      <Section tone="white">
        <SectionEyebrow>The Research Pipeline</SectionEyebrow>
        <div className="grid gap-10 lg:grid-cols-2">
          <Pipeline />
          <div className="space-y-4 text-sm leading-relaxed text-charcoal/70">
            <p>
              Each stage of this pipeline sits at a different level of scientific maturity. We label
              every section so it&rsquo;s never ambiguous whether something is established literature,
              current work, or a future direction:
            </p>
            <div className="flex flex-wrap gap-2">
              <StatusTag status="literature_review" />
              <StatusTag status="original_research" />
              <StatusTag status="exploratory_concept" />
              <StatusTag status="future_research_direction" />
            </div>
            <p>
              Proposed frameworks are never presented as completed findings, and unvalidated
              technology concepts are always labeled as exploratory.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="aqua">
        <div className="grid items-center gap-8 rounded-3xl bg-white p-8 md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <SectionEyebrow>Featured Project</SectionEyebrow>
            <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
              ThinkNeuro Research Project
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal/70">
              Myra&rsquo;s current environmental neuroscience research project — background,
              methodology, physiological signals, and future research directions.
            </p>
          </div>
          <CTAButton to="/research/thinkneuro">View the Project</CTAButton>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionEyebrow>Research — Stream Two</SectionEyebrow>
        <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
          Women&rsquo;s Brain Health &amp; Hormonal Neuroscience
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/70">
          Research themes include the female brain, hormones and neurological function, cognition,
          sleep, mood, attention, brain fog, and hormonal transitions across perimenopause and
          menopause — and, honestly, the research gaps that remain.
        </p>
        <Link
          to="/womens-brain-health"
          className="mt-5 inline-block font-display text-sm font-semibold text-teal underline underline-offset-4"
        >
          Explore Women&rsquo;s Brain Health →
        </Link>
      </Section>
    </>
  )
}
