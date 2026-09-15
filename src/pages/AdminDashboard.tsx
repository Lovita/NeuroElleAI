import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'

const managementAreas = [
  'Members & Roles',
  'Mentor Applications',
  'Student Research Submissions',
  'Articles',
  'Comments & Reports',
  'Events',
  'Opportunities',
  'Awards & Impact Entries',
  'Newsletter',
  'Homepage & Educational Content',
]

export default function AdminDashboard() {
  return (
    <>
      <PageSEO title="Admin Dashboard" description="Administrator tools for Neuro Elle AI." />
      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Administrator</SectionEyebrow>
        <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Admin Dashboard</h1>
        <p className="mt-2 max-w-xl text-sm text-charcoal/60">
          This is a scaffold. Each area below should be built out as a table view with
          approve/reject/edit/publish/suspend actions, backed by the RLS policies in
          <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5">supabase/rls.sql</code>
          that restrict these actions to the <code className="rounded bg-black/5 px-1.5 py-0.5">admin</code> role.
        </p>
      </Section>

      <Section tone="white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {managementAreas.map((area) => (
            <div key={area} className="rounded-2xl border border-black/5 bg-ivory p-6">
              <h2 className="font-display text-sm font-bold text-teal">{area}</h2>
              <p className="mt-2 text-xs text-charcoal/50">Table view + moderation actions to be built.</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
