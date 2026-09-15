import { useState } from 'react'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import { ageGroupOptions } from '@/data/content'

export default function Profile() {
  const { user, profile, refreshProfile, signOut } = useAuth()
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [country, setCountry] = useState(profile?.country ?? '')
  const [ageGroup, setAgeGroup] = useState(profile?.age_group ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [newsletter, setNewsletter] = useState(profile?.newsletter_opt_in ?? false)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    await supabase
      .from('profiles')
      .update({
        display_name: displayName,
        country,
        age_group: ageGroup,
        bio,
        newsletter_opt_in: newsletter,
      })
      .eq('id', user.id)
    await refreshProfile()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function handleDownloadData() {
    if (!user) return
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'neuro-elle-ai-my-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleDeleteAccount() {
    // Deleting an auth.users row requires the service_role key and must happen
    // server-side (a Supabase Edge Function), never in frontend code. This
    // button should call that function once it exists; wiring it is a
    // pre-launch task noted in the README.
    alert(
      'Account deletion requires a server-side Edge Function using the service_role key. ' +
        'This is not yet wired up — see the README pre-launch checklist.'
    )
  }

  return (
    <>
      <PageSEO title="Profile Settings" description="Manage your Neuro Elle AI profile and privacy settings." />
      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Profile Settings</SectionEyebrow>
        <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Your profile</h1>
        <p className="mt-2 text-sm text-charcoal/60">
          Your profile is private by default and only visible to you and administrators.
        </p>
      </Section>

      <Section tone="white">
        <form onSubmit={handleSave} className="max-w-lg space-y-5">
          <Field label="Display Name" value={displayName} onChange={setDisplayName} />
          <Field label="Country" value={country} onChange={setCountry} />

          <div>
            <label className="mb-1.5 block font-display text-sm font-semibold text-charcoal">Age Group</label>
            <select
              value={ageGroup ?? ''}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none focus-visible:border-teal"
            >
              {ageGroupOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block font-display text-sm font-semibold text-charcoal">Short Biography</label>
            <textarea
              value={bio ?? ''}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none focus-visible:border-teal"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-charcoal/70">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="rounded border-black/20"
            />
            Send me neuroscience, brain-health, women&rsquo;s-health, STEM, and research updates.
          </label>

          {saved && <p className="text-sm font-semibold text-teal">Saved.</p>}

          <button
            type="submit"
            className="rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-ivory hover:bg-teal-dark"
          >
            Save Changes
          </button>
        </form>

        <div className="mt-14 max-w-lg space-y-4 border-t border-black/5 pt-10">
          <h2 className="font-display text-lg font-bold text-charcoal">Data &amp; Account</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadData}
              className="rounded-full border border-black/10 px-5 py-2.5 font-display text-sm font-semibold text-teal"
            >
              Download My Data
            </button>
            <button
              onClick={signOut}
              className="rounded-full border border-black/10 px-5 py-2.5 font-display text-sm font-semibold text-charcoal/70"
            >
              Log Out
            </button>
          </div>

          {deleteConfirm ? (
            <div className="rounded-xl border border-coral/40 bg-coral/10 p-4">
              <p className="text-sm text-coral-dark">
                This permanently deletes your account. Are you sure?
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="rounded-full bg-coral-dark px-4 py-2 text-xs font-semibold text-white"
                >
                  Yes, delete my account
                </button>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-charcoal/70"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="font-display text-xs font-semibold text-coral-dark underline underline-offset-4"
            >
              Delete My Account
            </button>
          )}
        </div>
      </Section>
    </>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="mb-1.5 block font-display text-sm font-semibold text-charcoal">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none focus-visible:border-teal"
      />
    </div>
  )
}
