/**
 * Public origin of the site, from NEXT_PUBLIC_SITE_URL (see .env.example). Link previews,
 * robots.txt and sitemap.xml need absolute URLs, so they point here. The value is read at
 * build time: set it before `next build`, otherwise they fall back to localhost.
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL

if (!configured && process.env.NODE_ENV === 'production') {
  console.warn('NEXT_PUBLIC_SITE_URL is not set: link previews, robots.txt and sitemap.xml will point to localhost.')
}

export const siteUrl = new URL(configured || 'http://localhost:3000')

/** Absolute URL for a site path, e.g. `absoluteUrl('/menu')`. */
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).href
}
