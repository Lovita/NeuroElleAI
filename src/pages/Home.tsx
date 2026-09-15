import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { CTAButton } from '@/components/CTAButton'
import { PillarGrid } from '@/components/PillarGrid'
import { PathCards } from '@/components/PathCards'
import { LifespanTimeline } from '@/components/LifespanTimeline'
import { SignalTrace } from '@/components/SignalTrace'

export default function Home() {
  return (
    <>
      <PageSEO
        title="Understanding the Brain, Across Every Stage of Life"
        description="Neuro Elle AI is a global neuroscience and women's brain-health platform exploring wearable biosignals, environmental stress, hormonal transitions, and AI through research, education, innovation, and global awareness."
      />

      {/* HERO */}
      <Section tone="ivory" className="pt-16 pb-10 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Neuro Elle AI</SectionEyebrow>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              Understanding the brain.
              <br />
              <span className="text-teal">Across every stage of life.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Exploring neuroscience, women&rsquo;s brain health, wearable biosignals, environmental
              stress, hormonal transitions, and emerging technology through research, education,
              innovation, and global awareness.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CTAButton to="/research">Explore the Research</CTAButton>
              <CTAButton to="/register" variant="secondary">
                Join the Community
              </CTAButton>
            </div>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-4">
            <SignalTrace className="h-auto w-full" />
          </div>
        </div>
      </Section>

      {/* FOUR PILLARS */}
      <Section tone="white">
        <SectionEyebrow>Our Four Pillars</SectionEyebrow>
        <h2 className="max-w-2xl font-display text-3xl font-bold text-charcoal sm:text-4xl">
          Brain science for every generation.
        </h2>
        <div className="mt-10">
          <PillarGrid />
        </div>
      </Section>

      {/* CHOOSE YOUR PATH */}
      <Section tone="ivory">
        <SectionEyebrow>Choose Your Path</SectionEyebrow>
        <h2 className="max-w-2xl font-display text-3xl font-bold text-charcoal sm:text-4xl">
          Two ways in. One platform.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-charcoal/65">
          Whether you&rsquo;re a student discovering neuroscience for the first time or an adult
          exploring brain health at midlife, these are two pathways into the same body of work —
          not two separate sites.
        </p>
        <div className="mt-10">
          <PathCards />
        </div>
      </Section>

      {/* LIFESPAN TIMELINE */}
      <Section tone="white">
        <SectionEyebrow>Brain Health Across the Lifespan</SectionEyebrow>
        <h2 className="max-w-2xl font-display text-3xl font-bold text-charcoal sm:text-4xl">
          The brain changes. Our understanding should keep up.
        </h2>
        <div className="mt-10">
          <LifespanTimeline />
        </div>
        <p className="mt-6 text-xs text-charcoal/50">
          Educational overview only. This is not medical advice — see a licensed clinician for
          personal health guidance.
        </p>
      </Section>

      {/* CLOSING CTA */}
      <Section tone="teal">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-lg font-display text-3xl font-bold sm:text-4xl">
              Join a global community learning about the brain together.
            </h2>
            <p className="mt-3 max-w-md text-sm text-ivory/80">
              Follow emerging research, discover opportunities, and connect with a community
              interested in understanding the brain across every stage of life.
            </p>
          </div>
          <CTAButton to="/register" variant="secondary" className="!bg-ivory !text-teal shrink-0">
            Join the Community
          </CTAButton>
        </div>
      </Section>
    </>
  )
}
