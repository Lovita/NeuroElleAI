import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'
import { ageGroupOptions, interestOptions } from '@/data/content'
import { CTAButton } from '@/components/CTAButton'
import { Check } from 'lucide-react'

const PENDING_INTERESTS_KEY = 'nea_pending_interests'

export default function Register() {
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [interests, setInterests] = useState<string[]>([])

  const isUnder13 = ageGroup === 'under_13'

  function toggleInterest(label: string) {
    setInterests((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]))
  }

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault()
    if (isUnder13) return // ordinary self-registration is blocked for under-13; see AgeGate notice below
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          country,
          age_group: ageGroup,
          newsletter_opt_in: newsletterOptIn,
        },
      },
    })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    // A DB trigger (see supabase/schema.sql) creates the profiles row from this metadata.
    // If email confirmation is required, there is no session yet — stash interests locally
    // and the dashboard will sync them to user_interests on first authenticated load.
    if (!data.session) {
      localStorage.setItem(PENDING_INTERESTS_KEY, JSON.stringify(interests))
    }

    setStep(2)
  }

  async function handleSaveInterests() {
    setLoading(true)
    const { data } = await supabase.auth.getSession()
    if (data.session && interests.length > 0) {
      const rows = interests.map((label) => ({ user_id: data.session!.user.id, interest_label: label }))
      await supabase.from('user_interests').insert(rows)
      localStorage.removeItem(PENDING_INTERESTS_KEY)
    } else if (interests.length > 0) {
      localStorage.setItem(PENDING_INTERESTS_KEY, JSON.stringify(interests))
    }
    setLoading(false)
    setStep(3)
  }

  return (
    <>
      <PageSEO title="Join the Community" description="Create your Neuro Elle AI community account in three steps." />
      <Section tone="ivory">
        <div className="mx-auto max-w-lg">
          <SectionEyebrow>Join the Community</SectionEyebrow>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full font-display text-xs font-bold ${
                    step >= s ? 'bg-teal text-ivory' : 'bg-white text-charcoal/40 border border-black/10'
                  }`}
                >
                  {step > s ? <Check size={14} /> : s}
                </span>
                {s < 3 && <span className={`h-px w-8 ${step > s ? 'bg-teal' : 'bg-black/10'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleCreateAccount} className="mt-8 space-y-5">
              <h1 className="font-display text-2xl font-bold text-charcoal">Create Account</h1>

              <TextField label="Display Name" id="displayName" value={displayName} onChange={setDisplayName} required />
              <TextField label="Email" id="email" type="email" value={email} onChange={setEmail} required />
              <TextField label="Password" id="password" type="password" value={password} onChange={setPassword} required />
              <TextField label="Country" id="country" value={country} onChange={setCountry} required />

              <div>
                <label htmlFor="ageGroup" className="mb-1.5 block font-display text-sm font-semibold text-charcoal">
                  Age Group
                </label>
                <select
                  id="ageGroup"
                  required
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus-visible:border-teal"
                >
                  <option value="" disabled>
                    Select an age group
                  </option>
                  {ageGroupOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {isUnder13 && (
                <div className="rounded-xl border border-coral/40 bg-coral/10 p-4 text-sm text-coral-dark">
                  Members under 13 can&rsquo;t register on their own. Please have a parent or
                  guardian contact us at{' '}
                  <Link to="/contact" className="underline underline-offset-2">
                    our contact page
                  </Link>{' '}
                  to set up guardian-consented access.
                </div>
              )}

              <label className="flex items-start gap-3 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  checked={newsletterOptIn}
                  onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  className="mt-0.5 rounded border-black/20"
                />
                Send me neuroscience, brain-health, women&rsquo;s-health, STEM, and research updates.
              </label>

              {error && <p className="text-sm text-coral-dark">{error}</p>}

              <button
                type="submit"
                disabled={loading || isUnder13}
                className="w-full rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-ivory hover:bg-teal-dark disabled:opacity-50"
              >
                {loading ? 'Creating account…' : 'Continue'}
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="mt-8">
              <h1 className="font-display text-2xl font-bold text-charcoal">Choose Your Interests</h1>
              <p className="mt-2 text-sm text-charcoal/60">Select as many as you like — you can change these anytime.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {interestOptions.map((label) => {
                  const selected = interests.includes(label)
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleInterest(label)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        selected ? 'border-teal bg-teal text-ivory' : 'border-black/10 bg-white text-charcoal/70'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={handleSaveInterests}
                disabled={loading}
                className="mt-8 w-full rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-ivory hover:bg-teal-dark disabled:opacity-60"
              >
                {loading ? 'Saving…' : 'Continue'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="mt-10 text-center">
              <h1 className="font-display text-2xl font-bold text-teal">Welcome to the community.</h1>
              <p className="mt-3 text-sm text-charcoal/70">
                Check your email to verify your account, then log in to reach your dashboard.
              </p>
              <CTAButton to="/login" className="mt-7 mx-auto w-fit">
                Go to Log In
              </CTAButton>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

function TextField({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-display text-sm font-semibold text-charcoal">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus-visible:border-teal"
      />
    </div>
  )
}
