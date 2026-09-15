import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(rawUrl && rawKey)

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Neuro Elle AI] Supabase environment variables are missing. Copy .env.example to .env, ' +
      'restart the dev server (or redeploy), and add your project URL and anon key. ' +
      'The site will still render, but login, registration, and the dashboard will not work ' +
      'until this is configured.'
  )
}

// createClient() throws synchronously if given an empty/invalid URL, which
// crashes the whole app before React even renders (a blank white page with
// no visible error). Falling back to a syntactically valid placeholder URL
// keeps the app rendering — real requests will just fail until .env is set.
const supabaseUrl = rawUrl && rawUrl.length > 0 ? rawUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = rawKey && rawKey.length > 0 ? rawKey : 'placeholder-anon-key'

// The anon key is safe to expose in frontend code — it only works in
// combination with Row Level Security policies defined in Supabase.
// NEVER put the service_role key in frontend code or in this file.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
