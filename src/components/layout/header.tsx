'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { HERO_CTA_ID, navItems } from '@/content/navigation'
import { Logo } from '@/components/logo'
import { buttonStyles } from '@/components/ui/button-styles'
import { MobileDrawer } from '@/components/layout/mobile-drawer'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  // Scroll state lives in data attributes so scrolling never re-renders the header.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const onScroll = () => {
      header.dataset.scrolled = String(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    const heroCta = document.getElementById(HERO_CTA_ID)
    if (!header) return
    header.dataset.showCta = 'false'
    // Pages without a hero CTA (e.g. /menu itself) never show the header CTA.
    if (!heroCta) return
    const observer = new IntersectionObserver(([entry]) => {
      header.dataset.showCta = String(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    observer.observe(heroCta)
    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <header ref={headerRef} className="group/header sticky top-0 z-(--z-sticky)">
        {/* Background fades in by opacity; header height never changes. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-bg opacity-0 shadow-sm transition-opacity duration-orientation-near ease-enter group-data-[scrolled=true]/header:opacity-100"
        />
        <div className="relative container-page flex h-(--header-height) items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Điều hướng chính" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="inline-flex min-h-tap items-center font-medium text-text decoration-[1.5px] underline-offset-8 transition-colors duration-feedback ease-enter hover:text-primary aria-[current=page]:text-primary aria-[current=page]:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="header-cta">
              <Link href="/menu" className={buttonStyles('primary', 'max-sm:px-5')}>
                Xem menu
              </Link>
            </span>
            {/* Below sm the header has no room for it; the drawer carries the toggle instead. */}
            <ThemeToggle className="max-sm:hidden" />
            <button
              ref={toggleRef}
              type="button"
              className={buttonStyles('icon', 'lg:hidden')}
              aria-label="Mở menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} returnFocusRef={toggleRef} pathname={pathname} />
    </>
  )
}
