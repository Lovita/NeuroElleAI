import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { PlaceholderNote } from '@/components/Disclaimer'
import { approachSteps } from '@/data/content'

export default function About() {
  return (
    <>
      <PageSEO
        title="About"
        description="The mission, vision, and approach behind Neuro Elle AI — a global neuroscience and women's brain-health research, education, and awareness platform."
      />

      <Section tone="ivory" className="pb-12">
        <SectionEyebrow>About Neuro Elle AI</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          A global initiative for understanding the brain, at every stage of life.
        </h1>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-sm leading-relaxed text-charcoal/75">
            <h2 className="font-display text-lg font-bold text-teal">Our Mission</h2>
            <p>
              Neuro Elle AI exists to make neuroscience and brain-health research understandable,
              credible, and accessible — to students discovering the field for the first time, and
              to adults navigating the cognitive and neurological changes that come with hormonal
              transitions, stress, and aging.
            </p>
            <h2 className="font-display text-lg font-bold text-teal">Why Women&rsquo;s Brain Health</h2>
            <p>
              Female-specific neuroscience — particularly around hormonal transitions such as
              perimenopause and menopause — remains an under-resourced area of research relative to
              its prevalence and impact. Neuro Elle AI treats this as a core research and education
              focus, not an afterthought, while remaining a broader neuroscience platform for
              everyone.
            </p>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-charcoal/75">
            <h2 className="font-display text-lg font-bold text-teal">Why Young Researchers Matter</h2>
            <p>
              Curiosity-driven student research is how the next generation of scientists learns
              rigor, humility, and the discipline of evidence. Neuro Elle AI is built to give young
              researchers a credible home for that work, without ever overstating what has been
              shown.
            </p>
            <h2 className="font-display text-lg font-bold text-teal">Scientific Integrity</h2>
            <p>
              Every claim on this platform is labeled as original research, literature review,
              educational content, an exploratory concept, or a future research direction. We do not
              publish fabricated statistics, citations, affiliations, or endorsements.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionEyebrow>Our Approach</SectionEyebrow>
        <div className="grid gap-4 sm:grid-cols-5">
          {approachSteps.map((step, i) => (
            <div key={step} className="rounded-2xl border border-black/5 bg-ivory p-6 text-center">
              <span className="font-editorial text-2xl text-sage">{i + 1}</span>
              <p className="mt-2 font-display text-sm font-bold text-teal">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <SectionEyebrow>Founder &amp; Student Researcher</SectionEyebrow>
        <div className="grid gap-8 rounded-3xl border border-black/5 bg-white p-8 md:grid-cols-[220px_1fr] md:p-10">
          <div className="flex h-56 w-full items-center justify-center rounded-2xl bg-aqua/60 md:h-full">
            <PlaceholderNote>professional photograph</PlaceholderNote>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-charcoal">Myra</h2>
              <p className="text-sm font-semibold text-coral-dark">Founder &amp; Student Researcher</p>
            </div>
            <PlaceholderNote>
              biography — replace with Myra&rsquo;s introduction, academic background, and what drew her to
              neuroscience
            </PlaceholderNote>
            <div className="grid gap-3 sm:grid-cols-2">
              <PlaceholderNote>research interests</PlaceholderNote>
              <PlaceholderNote>ThinkNeuro research summary</PlaceholderNote>
              <PlaceholderNote>awards &amp; competitions</PlaceholderNote>
              <PlaceholderNote>presentations, publications &amp; speaking</PlaceholderNote>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
