import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Container } from './Container'
import { primaryNav, type NavItem } from '@/data/navigation'
import { useAuth } from '@/context/AuthContext'

export function Header() {
  const [open, setOpen] = useState(false)
  const { user, profile } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-ivory/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-display text-lg font-extrabold tracking-tight text-teal">
              Neuro Elle <span className="text-coral-dark">AI</span>
            </span>
            <span className="hidden whitespace-nowrap text-[11px] font-medium tracking-wide text-charcoal/60 sm:block">
              Neuroscience · Women&rsquo;s Brain Health · AI · Education
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item: NavItem) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 font-display text-[13px] font-semibold tracking-tight transition-colors ${
                  isActive ? 'text-teal' : 'text-charcoal/70 hover:text-teal'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <Link
              to="/dashboard"
              className="rounded-full px-4 py-2 font-display text-[13px] font-semibold text-teal hover:bg-aqua"
            >
              {profile?.display_name ? `Hi, ${profile.display_name}` : 'Dashboard'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-full px-4 py-2 font-display text-[13px] font-semibold text-teal hover:bg-aqua"
            >
              Log In
            </Link>
          )}
          <Link
            to="/register"
            className="rounded-full bg-teal px-5 py-2.5 font-display text-[13px] font-semibold text-ivory shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-teal-dark"
          >
            Join the Community
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-teal lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" className="border-t border-black/5 bg-ivory lg:hidden" aria-label="Mobile">
          <Container className="flex flex-col py-3">
            {primaryNav.map((item: NavItem) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-black/5 py-3 font-display text-sm font-semibold ${
                    isActive ? 'text-teal' : 'text-charcoal/80'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <Link to="/dashboard" onClick={() => setOpen(false)} className="font-display text-sm font-semibold text-teal">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="font-display text-sm font-semibold text-teal">
                  Log In
                </Link>
              )}
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="rounded-full bg-teal px-5 py-3 text-center font-display text-sm font-semibold text-ivory"
              >
                Join the Community
              </Link>
            </div>
          </Container>
        </nav>
      )}
    </header>
  )
}

/**
 * Brand mark: a teal-to-sage gradient roundel carrying the same waveform-into-
 * node motif as the hero's SignalTrace visual, so the logo and the hero
 * illustration read as the same visual idea at two different scales.
 */
function LogoMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F4C5C" />
          <stop offset="100%" stopColor="#1a6b7f" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#logoGradient)" />
      <circle cx="20" cy="20" r="19" stroke="#A8C7B8" strokeOpacity="0.4" strokeWidth="1" />
      <path
        d="M8 22c1.5-5 3-5 3.8-1.2S14 24 15.6 20 18 14 20 14s2 3.5 3.5 5.5S26.5 22 29 19"
        stroke="#FAF7F2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="29" cy="19" r="2.1" fill="#E98775" />
    </svg>
  )
}