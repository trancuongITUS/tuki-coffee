import Link from 'next/link'

/**
 * Temporary wordmark until the real logo exists. Every page renders the logo
 * through this component, so swapping in the real mark is a one-file change.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-tap items-center font-display text-xl leading-none font-bold tracking-display text-primary [font-variation-settings:var(--display-variation)] ${className}`}
    >
      Tuki Coffee
    </Link>
  )
}
