import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { CTAButton } from '@/components/CTAButton'

export default function Community() {
  return (
    <>
      <PageSEO
        title="Community"
        description="Join a global community for brain science and brain health — learn from research, follow updates, and discover opportunities."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Community</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          A global community for brain science &amp; brain health.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
          Learn from neuroscience. Follow emerging research. Discover opportunities. Connect with a
          community interested in understanding the brain across every stage of life.
        </p>
        <CTAButton to="/register" className="mt-7">
          Join the Community
        </CTAButton>
      </Section>

      <Section tone="white" id="events">
        <SectionEyebrow>Events</SectionEyebrow>
        <div className="rounded-2xl border border-dashed border-coral/40 bg-coral/5 p-10 text-center">
          <p className="font-display text-sm font-semibold text-coral-dark">CONTENT TO BE ADDED</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Webinars, research presentations, and STEM workshops will be listed here once scheduled.
            Members will be able to register and save events to their dashboard.
          </p>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionEyebrow>Community Safety</SectionEyebrow>
        <p className="max-w-2xl text-sm leading-relaxed text-charcoal/70">
          Because teens are part of this community, we don&rsquo;t enable open direct messaging
          between adults and minors, minor profiles stay private by default, and mentorship
          requests go through administrator review before any interaction takes place. See our{' '}
          <a href="/guidelines" className="text-teal underline underline-offset-4">
            Community Guidelines
          </a>{' '}
          for details.
        </p>
      </Section>
    </>
  )
}
