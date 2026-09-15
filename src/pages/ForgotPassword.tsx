import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setSent(true)
  }

  return (
    <>
      <PageSEO title="Forgot Password" description="Reset your Neuro Elle AI account password." />
      <Section tone="ivory">
        <div className="mx-auto max-w-md">
          <SectionEyebrow>Reset Password</SectionEyebrow>
          <h1 className="font-display text-3xl font-bold text-charcoal">Forgot your password?</h1>

          {sent ? (
            <p className="mt-6 rounded-xl border border-sage/50 bg-aqua/40 p-5 text-sm text-teal-dark">
              If an account exists for that email, a reset link is on its way. Check your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block font-display text-sm font-semibold text-charcoal">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus-visible:border-teal"
                />
              </div>
              {error && <p className="text-sm text-coral-dark">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-ivory hover:bg-teal-dark disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-charcoal/60">
            <Link to="/login" className="font-semibold text-teal">
              Back to log in
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}
