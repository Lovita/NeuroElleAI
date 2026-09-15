import { PageSEO } from '@/components/PageSEO'
import { CTAButton } from '@/components/CTAButton'
import { Section } from '@/components/Section'

export default function NotFound() {
  return (
    <>
      <PageSEO title="Page Not Found" description="This page doesn't exist on Neuro Elle AI." />
      <Section tone="ivory" className="text-center">
        <h1 className="font-display text-4xl font-bold text-teal">404</h1>
        <p className="mt-3 text-charcoal/70">We couldn&rsquo;t find that page.</p>
        <CTAButton to="/" className="mt-7 mx-auto w-fit">
          Back to Home
        </CTAButton>
      </Section>
    </>
  )
}
