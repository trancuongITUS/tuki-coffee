import { Star } from 'lucide-react'
import { site } from '@/content/site'
import { SectionHeading } from '@/components/section-heading'
import { linkStyles } from '@/components/ui/button-styles'
import { stagger } from '@/lib/motion'

/** Real reviews only, quoted verbatim with their source. Renders nothing until `site.reviews` has entries. */
export function Reviews({ className = '' }: { className?: string }) {
  if (site.reviews.length === 0) return null

  return (
    <section aria-labelledby="reviews-title" className={`py-section ${className}`}>
      <div className="container-page">
        <SectionHeading
          id="reviews-title"
          eyebrow="Khách nói gì"
          title={
            <>
              Lời <em>khách quen</em>
            </>
          }
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {site.reviews.map((review, index) => (
            <li key={review.sourceUrl} data-reveal style={stagger(index)}>
              <figure className="flex h-full flex-col gap-4 rounded-md bg-surface p-6 shadow-sm">
                <div className="flex gap-1 text-highlight" role="img" aria-label={`${review.rating} trên 5 sao`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`size-5 ${i < review.rating ? 'fill-current' : 'opacity-30'}`} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="flex-1">
                  <p>“{review.text}”</p>
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-semibold">{review.author}</span>
                  <span className="text-text-muted"> · </span>
                  <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className={linkStyles}>
                    Google Maps
                    <span className="sr-only">(mở trong tab mới)</span>
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
