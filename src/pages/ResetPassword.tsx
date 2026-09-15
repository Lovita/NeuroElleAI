import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // Supabase places a recovery session in the URL hash; the client picks it
    // up automatically (detectSessionInUrl: true) before this call runs.
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setDone(true)
    setTimeout(() => navigate('/login'), 1500)
  }

  return (
    <>
      <PageSEO title="Reset Password" description="Set a new password for your Neuro Elle AI account." />
      <Section tone="ivory">
        <div className="mx-auto max-w-md">
          <SectionEyebrow>Reset Password</SectionEyebrow>
          <h1 className="font-display text-3xl font-bold text-charcoal">Choose a new password</h1>

          {done ? (
            <p className="mt-6 rounded-xl border border-sage/50 bg-aqua/40 p-5 text-sm text-teal-dark">
              Password updated. Redirecting you to log in…
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="password" className="mb-1.5 block font-display text-sm font-semibold text-charcoal">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus-visible:border-teal"
                />
              </div>
              {error && <p className="text-sm text-coral-dark">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-ivory hover:bg-teal-dark disabled:opacity-60"
              >
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </Section>
    </>
  )
}
