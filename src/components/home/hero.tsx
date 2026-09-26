import Link from 'next/link'
import { ArrowRight, Navigation } from 'lucide-react'
import { HERO_CTA_ID } from '@/content/navigation'
import { directionsUrl, site } from '@/content/site'
import { OpenStatus } from '@/components/open-status'
import { buttonStyles } from '@/components/ui/button-styles'
import { stagger } from '@/lib/motion'

/** The page's single brand moment: lines rise in sequence, the cup settles, steam drifts for ~4s and stops. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-8 pb-section lg:pt-12">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow hero-rise mb-4" style={stagger(0)}>
            {site.tagline}
          </p>
          <h1 id="hero-title" className="mb-6 text-display">
            <span className="hero-rise block" style={stagger(1)}>
              Một ly cà phê
            </span>
            <span className="hero-rise block" style={stagger(2)}>
              ấm cả <em>ngày dài</em>
            </span>
          </h1>
          <p className="hero-rise max-w-measure text-lg text-text-muted" style={stagger(3)}>
            {site.hero.lead}
          </p>

          <div id={HERO_CTA_ID} className="hero-rise mt-8 flex flex-wrap gap-3" style={stagger(4)}>
            <Link href="/menu" className={buttonStyles('primary')}>
              Xem menu
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles('secondary')}>
              <Navigation className="size-5" aria-hidden="true" />
              Chỉ đường
              <span className="sr-only">(mở Google Maps trong tab mới)</span>
            </a>
          </div>

          <OpenStatus className="hero-rise mt-6" style={stagger(5)} />
        </div>

        <div
          className="hero-grow mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-blob bg-highlight text-on-highlight sm:max-w-md lg:max-w-lg"
          style={stagger(3)}
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" className="w-3/5" focusable="false">
            <g className="hero-steam" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
              <path d="M75 60c-10-14 10-22 0-38" style={{ '--j': 0 } as React.CSSProperties} />
              <path d="M95 60c-10-14 10-22 0-38" style={{ '--j': 1 } as React.CSSProperties} />
              <path d="M115 60c-10-14 10-22 0-38" style={{ '--j': 2 } as React.CSSProperties} />
            </g>
            <path d="M40 80h110v50a45 45 0 0 1-45 45H85a45 45 0 0 1-45-45Z" fill="currentColor" />
            <path d="M150 92h10a20 20 0 0 1 0 40h-12" fill="none" stroke="currentColor" strokeWidth="10" />
            <rect x="28" y="178" width="134" height="10" rx="5" fill="currentColor" opacity=".5" />
          </svg>
        </div>
      </div>
    </section>
  )
}
