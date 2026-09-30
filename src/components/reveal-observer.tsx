'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Scroll reveal for `[data-reveal]`: each element animates in on first entry
 * and is never hidden again. Hiding only starts once this effect runs, and
 * anything already on screen is marked visible first, so content never
 * disappears if JS fails and never flickers above the fold.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const pending = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )

    for (const el of pending) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('is-in')
      else observer.observe(el)
    }
    document.documentElement.classList.add('reveal-ready')

    return () => observer.disconnect()
  }, [pathname])

  return null
}
