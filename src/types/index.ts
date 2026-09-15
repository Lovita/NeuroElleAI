// ==========================================================
// Shared domain types for Neuro Elle AI
// ==========================================================

export type AgeGroup =
  | 'under_13'
  | '13_15'
  | '16_17'
  | '18_24'
  | '25_39'
  | '40_49'
  | '50_64'
  | '65_plus'
  | 'prefer_not_to_say'

export type MemberRole = 'member' | 'student_researcher' | 'mentor' | 'contributor' | 'admin'

export interface Profile {
  id: string
  display_name: string
  country: string | null
  age_group: AgeGroup | null
  bio: string | null
  avatar_url: string | null
  role: MemberRole
  is_private: boolean
  newsletter_opt_in: boolean
  created_at: string
}

export interface Interest {
  id: string
  label: string
  slug: string
}

export type ContentStatus =
  | 'original_research'
  | 'literature_review'
  | 'educational_content'
  | 'exploratory_concept'
  | 'future_research_direction'

export interface Citation {
  author: string
  publication: string
  year: number
  doi?: string
  url?: string
}

export interface ResearchProject {
  id: string
  slug: string
  title: string
  researcher: string
  summary: string
  status: ContentStatus
  posterUrl?: string
  summaryPdfUrl?: string
  citations: Citation[]
}

export interface Article {
  id: string
  slug: string
  title: string
  author: string
  date: string
  category: string
  readingTimeMinutes: number
  excerpt: string
  status: ContentStatus
}

export interface Opportunity {
  id: string
  title: string
  organization: string
  category:
    | 'Science Competitions'
    | 'Research Programs'
    | 'Internships'
    | 'STEM Programs'
    | 'Scholarships'
    | 'Science Fairs'
    | 'Hackathons'
    | 'Mentorship'
    | 'Conferences'
    | 'Volunteer Opportunities'
  ageRange: string
  region: string
  deadline: string | null
  format: 'Online' | 'In Person' | 'Hybrid'
  url: string
}
