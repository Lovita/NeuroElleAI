import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate('/dashboard')
  }

  return (
    <>
      <PageSEO title="Log In" description="Log in to your Neuro Elle AI community account." />
      <Section tone="ivory">
        <div className="mx-auto max-w-md">
          <SectionEyebrow>Welcome Back</SectionEyebrow>
          <h1 className="font-display text-3xl font-bold text-charcoal">Log in</h1>

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
            <div>
              <label htmlFor="password" className="mb-1.5 block font-display text-sm font-semibold text-charcoal">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus-visible:border-teal"
              />
            </div>

            {error && <p className="text-sm text-coral-dark">{error}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-charcoal/70">
                <input type="checkbox" className="rounded border-black/20" defaultChecked />
                Remember me
              </label>
              <Link to="/forgot-password" className="font-semibold text-teal">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-ivory hover:bg-teal-dark disabled:opacity-60"
            >
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal/60">
            New here?{' '}
            <Link to="/register" className="font-semibold text-teal">
              Join the community
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}
