import { useEffect } from 'react'

/**
 * Lightweight SEO helper — sets document title + meta description per page
 * without pulling in an extra dependency. Works fine for a client-rendered
 * SPA on IONOS Deploy Now; for richer crawl needs, a prerender step can be
 * added later without changing this API.
 */
export function PageSEO({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const fullTitle = `${title} · Neuro Elle AI`
    document.title = fullTitle

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])

  return null
}
