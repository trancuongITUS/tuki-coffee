import { MapPin, Navigation, Phone } from 'lucide-react'
import { directionsUrl, fullAddress, mapEmbedUrl, site } from '@/content/site'
import { HoursList } from '@/components/hours-list'
import { OpenStatus } from '@/components/open-status'
import { SectionHeading } from '@/components/section-heading'
import { buttonStyles, linkStyles } from '@/components/ui/button-styles'
import { stagger } from '@/lib/motion'

export function Visit({ className = '' }: { className?: string }) {
  return (
    <section id="ghe-tuki" aria-labelledby="visit-title" className={`py-section ${className}`}>
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="visit-title"
            eyebrow="Ghé Tuki"
            title={
              <>
                Hẹn bạn <em>ở quán</em>
              </>
            }
          />

          <div className="mt-8 grid gap-6 rounded-lg bg-surface p-6 shadow-sm sm:p-8" data-reveal style={stagger(2)}>
            <OpenStatus />
            <HoursList />
            <div className="grid gap-3 border-t border-border pt-6">
              <p className="flex items-start gap-2">
                <MapPin className="mt-1 size-5 text-text-muted" aria-hidden="true" />
                <span>{fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-5 text-text-muted" aria-hidden="true" />
                <a href={`tel:${site.phone.tel}`} className={linkStyles}>
                  {site.phone.display}
                </a>
              </p>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles('secondary', 'justify-self-start max-sm:w-full')}
            >
              <Navigation className="size-5" aria-hidden="true" />
              Chỉ đường
              <span className="sr-only">(mở Google Maps trong tab mới)</span>
            </a>
          </div>
        </div>

        {/* Native lazy loading defers the map until it scrolls near the viewport. */}
        <div className="placeholder-hatch relative aspect-4/3 overflow-hidden rounded-lg lg:aspect-auto lg:min-h-96" data-reveal style={stagger(3)}>
          <iframe
            src={mapEmbedUrl}
            title={`Bản đồ đường tới ${site.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </section>
  )
}
