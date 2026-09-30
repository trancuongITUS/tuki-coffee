import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, House } from 'lucide-react'
import { navItems } from '@/content/navigation'
import { buttonStyles, linkStyles } from '@/components/ui/button-styles'
import { stagger } from '@/lib/motion'

export const metadata: Metadata = {
  title: 'Không tìm thấy trang',
}

/** Every section link except Menu, which already is the primary CTA. */
const suggestions = navItems.filter((item) => item.href !== '/menu')

/**
 * The "0" of 404: a cup seen from above. On load a coffee drop falls into it and ripples
 * spread three times (~4s), then everything rests. Colours follow tokens, so it flips with dark mode.
 */
function CupZero() {
  return (
    <svg viewBox="0 0 140 140" className="not-found-cup h-[0.82em] w-auto overflow-visible" focusable="false">
      <circle cx="64" cy="72" r="56" fill="var(--color-surface-alt)" stroke="var(--color-primary)" strokeWidth="3" />
      <rect x="92" y="63" width="36" height="18" rx="9" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="4" />
      <circle cx="64" cy="72" r="38" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="4" />
      <circle cx="64" cy="72" r="29" fill="var(--color-primary)" />
      <path d="M44 64a22 22 0 0 1 12-12" fill="none" stroke="var(--color-highlight)" strokeWidth="4" strokeLinecap="round" />
      <g fill="none" stroke="var(--color-surface)" strokeWidth="2.5">
        <circle className="not-found-ripple" cx="64" cy="72" r="24" style={{ '--j': 0 } as React.CSSProperties} />
        <circle className="not-found-ripple" cx="64" cy="72" r="24" style={{ '--j': 2 } as React.CSSProperties} />
      </g>
      <path
        className="not-found-drop"
        d="M64 52c4.5 6.5 8 10 8 14a8 8 0 0 1-16 0c0-4 3.5-7.5 8-14Z"
        fill="var(--color-logo-accent)"
      />
    </svg>
  )
}

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="grid min-h-[calc(100svh-var(--header-height))] place-items-center py-section"
    >
      <div className="container-page flex flex-col items-center text-center">
        <div
          className="flex items-center gap-[0.06em] font-display text-[calc(var(--text-display)*1.5)] leading-none font-semibold tracking-display text-primary [font-variation-settings:var(--display-variation)]"
          aria-hidden="true"
        >
          <span className="hero-rise" style={stagger(0)}>
            4
          </span>
          <span className="hero-grow" style={stagger(1)}>
            <CupZero />
          </span>
          <span className="hero-rise" style={stagger(2)}>
            4
          </span>
        </div>

        <p className="eyebrow hero-rise mt-10" style={stagger(3)}>
          Lỗi 404 · Không tìm thấy trang
        </p>
        <h1 id="not-found-title" className="hero-rise mt-3 text-3xl" style={stagger(4)}>
          Ly này <em>cạn</em> mất rồi
        </h1>
        <p className="hero-rise mx-auto mt-4 max-w-measure text-lg text-text-muted" style={stagger(5)}>
          Trang bạn tìm không tồn tại hoặc đã được chuyển đi. Trong lúc chờ, ghé xem menu hôm nay hoặc quay về trang
          chủ nhé.
        </p>

        <div className="hero-rise mt-8 flex flex-wrap justify-center gap-3" style={stagger(6)}>
          <Link href="/menu" className={buttonStyles('primary')}>
            Xem menu
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
          <Link href="/" className={buttonStyles('secondary')}>
            <House className="size-5" aria-hidden="true" />
            Về trang chủ
          </Link>
        </div>

        <nav aria-label="Gợi ý trang" className="hero-rise mt-8" style={stagger(7)}>
          <p className="text-sm text-text-muted">Hoặc ghé qua</p>
          <ul className="mt-2 flex flex-wrap justify-center gap-x-6">
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`inline-flex min-h-tap items-center ${linkStyles}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
