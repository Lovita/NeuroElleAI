import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { PlaceholderNote } from '@/components/Disclaimer'

export default function Guidelines() {
  return (
    <>
      <PageSEO
        title="Community Guidelines"
        description="Community safety guidelines for Neuro Elle AI, including mentorship, moderation, and youth-safety practices."
      />

      <Section tone="ivory">
        <SectionEyebrow>Community Guidelines</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          A safe space to learn about the brain.
        </h1>
        <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-charcoal/75">
          <ul className="list-disc space-y-2 pl-5">
            <li>No unsolicited direct messaging between adults and minors.</li>
            <li>Comments are moderated before or shortly after posting.</li>
            <li>Mentorship requests are reviewed by an administrator before any contact occurs.</li>
            <li>Anyone can report content or a member for review.</li>
            <li>Accounts that violate these guidelines may be suspended or removed.</li>
          </ul>
          <PlaceholderNote>
            Full legal terms of use and moderation policy require professional legal review before
            launch.
          </PlaceholderNote>
        </div>
      </Section>
    </>
  )
}
