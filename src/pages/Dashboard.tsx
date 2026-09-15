import { useEffect, useState } from 'react'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'

const PENDING_INTERESTS_KEY = 'nea_pending_interests'

const dashboardSections = [
  'My Interests',
  'Saved Content',
  'Research I Follow',
  'Recommended For You',
  'Upcoming Events',
  'Research Updates',
  'Opportunities',
  'Science Competitions',
  'New Articles',
  'Brain Health Resources',
]

export default function Dashboard() {
  const { user, profile, refreshProfile } = useAuth()
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    async function syncPendingInterests() {
      if (!user) return
      const pending = localStorage.getItem(PENDING_INTERESTS_KEY)
      if (pending) {
        const labels: string[] = JSON.parse(pending)
        if (labels.length > 0) {
          await supabase
            .from('user_interests')
            .insert(labels.map((label) => ({ user_id: user.id, interest_label: label })))
        }
        localStorage.removeItem(PENDING_INTERESTS_KEY)
      }
      const { data } = await supabase.from('user_interests').select('interest_label').eq('user_id', user.id)
      setInterests((data ?? []).map((r: { interest_label: string }) => r.interest_label))
      refreshProfile()
    }
    syncPendingInterests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <PageSEO title="Dashboard" description="Your personalized Neuro Elle AI member dashboard." />
      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Member Dashboard</SectionEyebrow>
        <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
          Welcome back{profile?.display_name ? `, ${profile.display_name}` : ''}.
        </h1>
      </Section>

      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-ivory p-6 lg:col-span-1">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-teal">My Interests</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {interests.length > 0 ? (
                interests.map((i) => (
                  <span key={i} className="rounded-full bg-aqua px-3 py-1.5 text-xs font-semibold text-teal-dark">
                    {i}
                  </span>
                ))
              ) : (
                <p className="text-xs text-charcoal/50">No interests saved yet — edit your profile to add some.</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {dashboardSections
              .filter((s) => s !== 'My Interests')
              .map((section) => (
                <div key={section} className="rounded-2xl border border-black/5 bg-ivory p-5">
                  <h3 className="font-display text-sm font-bold text-teal">{section}</h3>
                  <p className="mt-2 text-xs text-charcoal/50">
                    Personalized based on your interests and age group. Content to be added.
                  </p>
                </div>
              ))}
          </div>
        </div>
      </Section>
    </>
  )
}
