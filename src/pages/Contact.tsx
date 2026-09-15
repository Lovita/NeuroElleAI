import { useState } from 'react'
import { PageSEO } from '@/components/PageSEO'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/Container'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (honeypot) return // basic bot trap; a real deployment should also verify server-side
    // TODO: wire to a Supabase Edge Function or table insert with RLS restricted to inserts only.
    setSubmitted(true)
  }

  return (
    <>
      <PageSEO
        title="Contact"
        description="Get in touch with Neuro Elle AI — for research collaboration, media, sponsorship, or general questions."
      />

      <Section tone="ivory" className="pb-8">
        <SectionEyebrow>Contact</SectionEyebrow>
        <h1 className="max-w-2xl font-display text-4xl font-bold text-charcoal sm:text-5xl">
          Get in touch.
        </h1>
      </Section>

      <Section tone="white">
        {submitted ? (
          <div className="max-w-lg rounded-2xl border border-sage/50 bg-aqua/40 p-8 text-teal-dark">
            <p className="font-display text-lg font-bold">Message sent.</p>
            <p className="mt-2 text-sm">Thank you for reaching out — we&rsquo;ll follow up soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
            {/* honeypot field, hidden from real users */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            <Field label="Name" id="name" required />
            <Field label="Organization" id="organization" />
            <Field label="Email" id="email" type="email" required />
            <div>
              <label htmlFor="reason" className="mb-1.5 block font-display text-sm font-semibold text-charcoal">
                Reason for Contact
              </label>
              <select
                id="reason"
                required
                className="w-full rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none focus-visible:border-teal"
              >
                <option>Research collaboration</option>
                <option>Mentorship</option>
                <option>Media inquiry</option>
                <option>Sponsorship</option>
                <option>General question</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-display text-sm font-semibold text-charcoal">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none focus-visible:border-teal"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-ivory hover:bg-teal-dark"
            >
              Send Message
            </button>
          </form>
        )}
      </Section>
    </>
  )
}

function Field({
  label,
  id,
  type = 'text',
  required = false,
}: {
  label: string
  id: string
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
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm outline-none focus-visible:border-teal"
      />
    </div>
  )
}
