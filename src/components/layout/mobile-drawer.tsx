'use client'

import { useEffect, useRef, type RefObject } from 'react'
import Link from 'next/link'
import { MapPin, Navigation, X } from 'lucide-react'
import { navItems } from '@/content/navigation'
import { directionsUrl, fullAddress } from '@/content/site'
import { OpenStatus } from '@/components/open-status'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonStyles } from '@/components/ui/button-styles'

type Props = {
  open: boolean
  onClose: () => void
  /** Focus goes back here when the drawer closes. */
  returnFocusRef: RefObject<HTMLButtonElement | null>
  pathname: string
}

/** Slides in from the right (the toggle sits on the right). Locks page scroll, traps focus, closes on Esc. */
export function MobileDrawer({ open, onClose, returnFocusRef, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const returnTarget = returnFocusRef.current
    root.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      // Skip controls hidden at this breakpoint (e.g. the theme toggle from sm up).
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
        (el) => el.offsetParent !== null,
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      root.style.overflow = previousOverflow
      returnTarget?.focus({ preventScroll: true })
    }
  }, [open, onClose, returnFocusRef])

  return (
    <div className="drawer lg:hidden" data-open={open}>
      <div className="drawer-scrim" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
        inert={!open}
        className="drawer-panel flex flex-col gap-8 overflow-y-auto bg-bg px-6 pt-3 pb-8 shadow-lg"
      >
        <div className="flex justify-end gap-2">
          <ThemeToggle className="sm:hidden" />
          <button ref={closeRef} type="button" className={buttonStyles('icon')} aria-label="Đóng menu" onClick={onClose}>
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Điều hướng chính">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={onClose}
                  className="flex min-h-12 items-center font-display text-2xl tracking-display text-text [font-variation-settings:var(--display-variation)] transition-colors duration-feedback ease-enter hover:text-primary aria-[current=page]:text-primary aria-[current=page]:italic"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
          <OpenStatus />
          <p className="flex items-start gap-2 text-sm text-text-muted">
            <MapPin className="mt-0.5 size-5" aria-hidden="true" />
            {fullAddress}
          </p>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles('secondary', 'w-full')}>
            <Navigation className="size-5" aria-hidden="true" />
            Chỉ đường
            <span className="sr-only">(mở Google Maps trong tab mới)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
