// ==========================================================
// Structural site copy. This file contains messaging, section
// framing, and navigational content only — no research findings,
// statistics, or credentials are asserted here. Anything requiring
// a citation is marked SOURCE REQUIRED in the relevant page and
// must not be filled in without a real reference.
// ==========================================================

export const pillars = [
  {
    title: 'Research',
    description: 'Evidence-driven neuroscience and scientific inquiry.',
  },
  {
    title: 'Education',
    description: 'Making complex brain science understandable.',
  },
  {
    title: 'Innovation',
    description: 'Exploring wearables, AI, and emerging technology.',
  },
  {
    title: 'Global Awareness',
    description: 'Expanding access to brain-health knowledge.',
  },
]

export const lifespanStages = [
  {
    id: 'adolescence',
    label: 'Adolescence',
    topics: ['Brain development', 'Sleep', 'Learning', 'Stress', 'Emotional regulation'],
  },
  {
    id: 'young-adulthood',
    label: 'Young Adulthood',
    topics: ['Cognition', 'Stress', 'Lifestyle', 'Sleep', 'Mental workload'],
  },
  {
    id: 'midlife',
    label: 'Midlife',
    topics: ['Hormonal transitions', 'Sleep', 'Cognitive changes', 'Stress', "Women's brain health"],
  },
  {
    id: 'healthy-aging',
    label: 'Healthy Aging',
    topics: ['Cognition', 'Brain health', 'Sleep', 'Lifestyle', 'Emerging neuroscience research'],
  },
]

export const approachSteps = ['Research', 'Translate', 'Educate', 'Innovate', 'Collaborate']

export const pipelineSteps = [
  'Environmental Exposure',
  'HRV / EDA / EEG',
  'Signal Collection & Cleaning',
  'Physiological Pattern Analysis',
  'Machine Learning',
  'Cognitive / Emotional Insights',
  'Wearable Neurotechnology Applications',
]

export const learnModules = [
  {
    slug: 'what-is-hrv',
    title: 'What is HRV?',
    audiences: ['foundations', 'students'],
  },
  {
    slug: 'what-is-eda',
    title: 'What is EDA?',
    audiences: ['foundations', 'students'],
  },
  {
    slug: 'what-is-eeg',
    title: 'What is EEG?',
    audiences: ['foundations', 'students'],
  },
  {
    slug: 'stress-and-the-brain',
    title: 'How does stress affect the brain?',
    audiences: ['foundations', 'adults'],
  },
  {
    slug: 'sleep-science',
    title: 'What happens during sleep?',
    audiences: ['foundations', 'adults'],
  },
  {
    slug: 'environmental-neuroscience',
    title: 'What is environmental neuroscience?',
    audiences: ['deeper-dive', 'students', 'researchers'],
  },
  {
    slug: 'wearables-in-neuroscience',
    title: 'How are wearables used in neuroscience?',
    audiences: ['deeper-dive', 'students'],
  },
  {
    slug: 'computational-neuroscience',
    title: 'What is computational neuroscience?',
    audiences: ['deeper-dive', 'researchers'],
  },
  {
    slug: 'ai-in-neuroscience',
    title: 'How is AI used in neuroscience?',
    audiences: ['deeper-dive', 'educators'],
  },
  {
    slug: 'what-is-machine-learning',
    title: 'What is machine learning?',
    audiences: ['foundations', 'students'],
  },
  {
    slug: 'what-are-biosignals',
    title: 'What are biosignals?',
    audiences: ['foundations', 'students'],
  },
] as const

export const learnAudienceFilters = [
  'Foundations',
  'Deeper Dive',
  'Students',
  'Adults',
  'Educators',
  'Researchers',
] as const

export const womensBrainHealthSections = [
  'Why Study the Female Brain?',
  'Hormones & the Nervous System',
  'Sleep & Cognition',
  'Mood & Emotional Regulation',
  'Brain Fog',
  'What is Perimenopause?',
  'Menopause & the Brain',
  "Women's Neurological Health",
  'Research Gaps',
  'Emerging Research',
]

export const interestOptions = [
  'Neuroscience',
  "Women's Brain Health",
  'Perimenopause Research',
  'Environmental Neuroscience',
  'Wearable Technology',
  'AI & Machine Learning',
  'Brain Health',
  'Sleep & Cognition',
  'Teen STEM',
  'Research Opportunities',
  'Science Competitions',
  'Mentorship',
  "Women's Health Awareness",
  'Biomedical Engineering',
  'Computational Neuroscience',
]

export const ageGroupOptions: { value: string; label: string }[] = [
  { value: 'under_13', label: 'Under 13' },
  { value: '13_15', label: '13–15' },
  { value: '16_17', label: '16–17' },
  { value: '18_24', label: '18–24' },
  { value: '25_39', label: '25–39' },
  { value: '40_49', label: '40–49' },
  { value: '50_64', label: '50–64' },
  { value: '65_plus', label: '65+' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

export const medicalDisclaimer =
  'This platform provides educational and research information only. It is not a substitute for professional medical advice, diagnosis, or treatment.'

export const researchEducationalDisclaimer =
  'This content is for educational and research purposes only and does not constitute medical advice, diagnosis, or treatment.'
