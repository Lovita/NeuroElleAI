import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { PlaceholderNote } from '@/components/Disclaimer'

export default function Privacy() {
  return (
    <>
      <PageSEO title="Privacy" description="How Neuro Elle AI collects, uses, and protects member data." />

      <Section tone="ivory">
        <SectionEyebrow>Privacy</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Privacy, by design.
        </h1>

        <div className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-charcoal/75">
          <p>
            Neuro Elle AI collects only what&rsquo;s needed to run the community: a display name,
            email, country, broad age group, and stated interests. We do not collect medical
            diagnoses, medications, menstrual-cycle information, health history, neurological
            symptoms, or medical records as part of ordinary membership.
          </p>
          <p>
            Members can download their data, delete their account, change their password, and
            manage email preferences from their profile settings at any time.
          </p>
          <p>
            Minors&rsquo; profiles are private by default and cannot be made public. We do not
            expose email addresses, phone numbers, home addresses, precise location, school
            schedules, or personal medical information on any public profile.
          </p>
          <PlaceholderNote>
            This page is a working draft. It must be reviewed by a qualified privacy/legal
            professional for COPPA, GDPR, CCPA, and any other applicable jurisdictional
            requirements before public launch.
          </PlaceholderNote>
        </div>
      </Section>
    </>
  )
}
