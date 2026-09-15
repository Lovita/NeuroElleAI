import { CTAButton } from './CTAButton'

const paths = [
  {
    title: 'For Teens & Students',
    description:
      'Neuroscience, stress and the brain, sleep, EEG, HRV, EDA, AI, wearables, research, competitions, and STEM opportunities.',
    cta: 'Explore Neuroscience',
    to: '/learn',
    tone: 'bg-teal text-ivory',
  },
  {
    title: 'For Adults',
    description:
      "Brain health, cognition, stress, sleep, women's brain health, hormonal transitions, perimenopause, menopause, and wearable health technology.",
    cta: 'Explore Brain Health',
    to: '/brain-health',
    tone: 'bg-white text-charcoal border border-black/5',
  },
]

export function PathCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {paths.map((path) => (
        <div key={path.title} className={`rounded-3xl p-9 md:p-11 ${path.tone}`}>
          <h3 className="font-display text-2xl font-bold">{path.title}</h3>
          <p className={`mt-3 text-sm leading-relaxed ${path.tone.includes('bg-teal') ? 'text-ivory/85' : 'text-charcoal/70'}`}>
            {path.description}
          </p>
          <CTAButton
            to={path.to}
            variant={path.tone.includes('bg-teal') ? 'secondary' : 'primary'}
            className={path.tone.includes('bg-teal') ? '!bg-ivory !text-teal mt-7' : 'mt-7'}
          >
            {path.cta}
          </CTAButton>
        </div>
      ))}
    </div>
  )
}
