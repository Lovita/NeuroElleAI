import { Link } from 'react-router-dom'
import { medicalDisclaimer } from '@/data/content'
import { Container } from './Container'

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Research', to: '/research' },
      { label: 'Brain Health', to: '/brain-health' },
      { label: "Women's Brain Health", to: '/womens-brain-health' },
      { label: 'Learn Neuroscience', to: '/learn' },
      { label: 'Innovation Lab', to: '/innovation' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Insights Journal', to: '/insights' },
      { label: 'Opportunities', to: '/opportunities' },
      { label: 'Impact', to: '/impact' },
      { label: 'Join the Community', to: '/register' },
      { label: 'Events', to: '/community#events' },
    ],
  },
  {
    heading: 'Organization',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Collaborate', to: '/collaborate' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Community Guidelines', to: '/guidelines' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <Container className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-lg font-extrabold text-teal">
            Neuro Elle <span className="text-coral-dark">AI</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/70">
            Understanding the brain, across every stage of life — through research, education,
            innovation, and global awareness.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">
              {col.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-charcoal/75 hover:text-teal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-black/5">
        <Container className="flex flex-col gap-3 py-6 text-xs text-charcoal/60 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl">{medicalDisclaimer}</p>
          <p>&copy; {new Date().getFullYear()} Neuro Elle AI. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  )
}
