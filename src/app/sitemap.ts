import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site-url'

/** Every page route; add new pages here. */
const routes = ['/', '/menu']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: absoluteUrl(route) }))
}
