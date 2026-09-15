import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { CTAButton } from '@/components/CTAButton'

const audiences = [
  'Researchers',
  'Universities',
  'Physicians',
  'Educators',
  'Neuroscience Organizations',
  "Women's-Health Organizations",
  'Schools',
  'Youth Organizations',
  'NGOs',
  'Sponsors',
  'Mentors',
]

export default function Collaborate() {
  return (
    <>
      <PageSEO
        title="Collaborate"
        description="Partner with Neuro Elle AI — for researchers, universities, physicians, educators, NGOs, sponsors, and mentors."
      />

      <Section tone="teal" className="pb-14">
        <SectionEyebrow>Collaborate</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
          Let&rsquo;s advance brain health through research, education &amp; collaboration.
        </h1>
        <div className="mt-8 flex flex-wrap gap-4">
          <CTAButton to="/contact" variant="secondary" className="!bg-ivory !text-teal">
            Collaborate
          </CTAButton>
          <CTAButton to="/contact" variant="secondary" className="!bg-ivory !text-teal">
            Become a Mentor
          </CTAButton>
          <CTAButton to="/contact" variant="secondary" className="!bg-ivory !text-teal">
            Invite to Speak
          </CTAButton>
          <CTAButton to="/contact" variant="secondary" className="!bg-ivory !text-teal">
            Support the Initiative
          </CTAButton>
        </div>
      </Section>

      <Section tone="white">
        <SectionEyebrow>Who We Work With</SectionEyebrow>
        <div className="flex flex-wrap gap-3">
          {audiences.map((a) => (
            <span key={a} className="rounded-full bg-ivory px-4 py-2 text-sm font-medium text-charcoal/75 border border-black/5">
              {a}
            </span>
          ))}
        </div>
      </Section>
    </>
  )
}
