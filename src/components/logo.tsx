import Link from 'next/link'
import { logoPaths } from '@/components/logo-paths'

/**
 * Compact lockup (phin symbol + "tuki") from docs/brand. Colours follow --color-logo and
 * --color-logo-accent, so the logo turns cream with a caramel drop in dark mode.
 * `className` sizes the mark by height; the width follows the artwork.
 */
export function Logo({ className = 'h-9 lg:h-10' }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex min-h-tap items-center">
      <svg viewBox={logoPaths.viewBox} className={`w-auto ${className}`} aria-hidden="true" focusable="false">
        <path fill="var(--color-logo)" fillRule="evenodd" d={logoPaths.symbol} />
        <path fill="var(--color-logo-accent)" d={logoPaths.symbolDrop} />
        <path fill="var(--color-logo)" d={logoPaths.word} />
        <path fill="var(--color-logo-accent)" d={logoPaths.wordDrop} />
      </svg>
      <span className="sr-only">Tuki Coffee</span>
    </Link>
  )
}
