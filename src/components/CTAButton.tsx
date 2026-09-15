import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function CTAButton({
  to,
  children,
  variant = 'primary',
  className = '',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold transition-transform hover:-translate-y-0.5'
  const variants = {
    primary: 'bg-teal text-ivory hover:bg-teal-dark shadow-sm',
    secondary: 'bg-white text-teal border border-teal/20 hover:border-teal/50',
    ghost: 'text-teal underline underline-offset-4',
  }
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
