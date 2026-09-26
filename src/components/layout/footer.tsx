import { ExternalLink, MapPin, Phone } from 'lucide-react'
import { fullAddress, site } from '@/content/site'
import { HoursList } from '@/components/hours-list'
import { Logo } from '@/components/logo'
import { linkStyles } from '@/components/ui/button-styles'

const headingStyles = 'eyebrow mb-4 font-body'

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-text-muted">{site.tagline}</p>
        </div>

        <div>
          <h2 className={headingStyles}>Liên hệ</h2>
          <ul className="grid gap-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-5 text-text-muted" aria-hidden="true" />
              <span>{fullAddress}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-5 text-text-muted" aria-hidden="true" />
              <a href={`tel:${site.phone.tel}`} className={linkStyles}>
                {site.phone.display}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyles}>Giờ mở cửa</h2>
          <HoursList />
        </div>

        <div>
          <h2 className={headingStyles}>Theo dõi Tuki</h2>
          <ul className="grid gap-1 text-sm">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-tap items-center gap-2 ${linkStyles}`}
                >
                  {social.label}
                  <ExternalLink className="size-4" aria-hidden="true" />
                  <span className="sr-only">(mở trong tab mới)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="container-page mt-12 border-t border-border pt-6 text-xs text-text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  )
}
