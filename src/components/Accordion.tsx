import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={item.title}>
            <button
              className="flex w-full items-center justify-between px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-display text-base font-semibold text-teal">{item.title}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-teal transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {isOpen && <div className="px-6 pb-6 text-sm leading-relaxed text-charcoal/75">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
