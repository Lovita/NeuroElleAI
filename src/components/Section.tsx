import type { ReactNode } from 'react'
import { Container } from './Container'

export function Section({
  children,
  className = '',
  tone = 'ivory',
  id,
}: {
  children: ReactNode
  className?: string
  tone?: 'ivory' | 'aqua' | 'teal' | 'white'
  id?: string
}) {
  const tones: Record<string, string> = {
    ivory: 'bg-ivory',
    aqua: 'bg-aqua/40',
    teal: 'bg-teal text-ivory',
    white: 'bg-white',
  }
  return (
    <section id={id} className={`${tones[tone]} py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
