import type { ElementType, ReactNode } from 'react'

export function Container({
  children,
  className = '',
  as: Component = 'div',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return <Component className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</Component>
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark mb-3">
      {children}
    </p>
  )
}
