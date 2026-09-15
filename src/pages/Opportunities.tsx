import { useState } from 'react'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { Search } from 'lucide-react'

const categories = [
  'Science Competitions',
  'Research Programs',
  'Internships',
  'STEM Programs',
  'Scholarships',
  'Science Fairs',
  'Hackathons',
  'Mentorship',
  'Conferences',
  'Volunteer Opportunities',
]

export default function Opportunities() {
  const [query, setQuery] = useState('')

  return (
    <>
      <PageSEO
        title="Opportunities"
        description="A searchable hub of science competitions, research programs, internships, scholarships, and STEM opportunities for students."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Opportunities</SectionEyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Find your next opportunity in neuroscience &amp; STEM.
        </h1>

        <div className="mt-8 flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 max-w-xl">
          <Search size={18} className="text-charcoal/40" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search opportunities by name, category, or region"
            className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal/40"
            aria-label="Search opportunities"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-teal border border-black/5">
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="rounded-2xl border border-dashed border-coral/40 bg-coral/5 p-10 text-center">
          <p className="font-display text-sm font-semibold text-coral-dark">CONTENT TO BE ADDED</p>
          <p className="mt-2 text-sm text-charcoal/60">
            No opportunities are listed yet. Once the <code>opportunities</code> table is populated
            through the admin dashboard, entries appear here filterable by age, region, deadline,
            category, and format.
          </p>
        </div>
      </Section>
    </>
  )
}
