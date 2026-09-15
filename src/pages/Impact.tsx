import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'

export default function Impact() {
  return (
    <>
      <PageSEO
        title="Impact"
        description="Research projects, awards, presentations, and community programs from Neuro Elle AI — verified achievements only."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Impact</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          What we&rsquo;ve built, and what it&rsquo;s led to.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
          Research projects, recognitions, presentations, and collaborations — shown as they
          actually happen. Nothing here is projected or estimated.
        </p>
      </Section>

      <Section tone="white">
        <div className="rounded-2xl border border-dashed border-coral/40 bg-coral/5 p-10 text-center">
          <p className="font-display text-sm font-semibold text-coral-dark">CONTENT TO BE ADDED</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Impact entries (awards, presentations, publications, media, collaborations) will appear
            here as a timeline once added through the admin dashboard.
          </p>
        </div>
      </Section>
    </>
  )
}
