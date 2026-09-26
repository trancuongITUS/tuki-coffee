'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { readDuration } from '@/lib/motion'

type Panel = { id: string; label: string; content: ReactNode }

/**
 * Category tabs (Cà phê / Trà / Bánh). The indicator slides via clip-path and
 * the list cross-fades: fade out, swap, fade in. Every panel is rendered in
 * the HTML, so the whole menu is readable without JS.
 */
export function MenuTabs({ panels }: { panels: Panel[] }) {
  const [selected, setSelected] = useState(panels[0].id)
  const [shown, setShown] = useState(panels[0].id)
  const [fading, setFading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef(new Map<string, HTMLButtonElement>())
  const swapTimer = useRef<number | undefined>(undefined)

  const placeIndicator = useCallback((id: string) => {
    const tab = tabRefs.current.get(id)
    const indicator = indicatorRef.current
    if (!tab || !indicator) return
    const left = tab.offsetLeft - indicator.offsetLeft
    const right = indicator.offsetWidth - left - tab.offsetWidth
    indicator.style.setProperty('--clip-left', `${left}px`)
    indicator.style.setProperty('--clip-right', `${right}px`)
  }, [])

  // Re-measure on selection, and whenever tab widths change (web fonts loading, resize).
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const place = () => placeIndicator(selected)
    place()
    list.dataset.ready = 'true'
    const observer = new ResizeObserver(place)
    observer.observe(list)
    return () => observer.disconnect()
  }, [selected, placeIndicator])

  useEffect(() => () => window.clearTimeout(swapTimer.current), [])

  function select(id: string) {
    if (id === selected) return
    setSelected(id)
    setFading(true)
    window.clearTimeout(swapTimer.current)
    swapTimer.current = window.setTimeout(() => {
      setShown(id)
      setFading(false)
    }, readDuration('--motion-duration-orientation-near'))
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = panels.findIndex((panel) => panel.id === selected)
    const moves: Record<string, number> = {
      ArrowRight: (index + 1) % panels.length,
      ArrowLeft: (index - 1 + panels.length) % panels.length,
      Home: 0,
      End: panels.length - 1,
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    const next = panels[moves[event.key]].id
    select(next)
    tabRefs.current.get(next)?.focus()
  }

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Danh mục menu"
        onKeyDown={onKeyDown}
        className="group/tabs relative inline-flex rounded-pill bg-surface p-1 shadow-sm"
      >
        <span ref={indicatorRef} aria-hidden="true" className="tabs-indicator opacity-0 group-data-[ready=true]/tabs:opacity-100" />
        {panels.map((panel) => {
          const isSelected = panel.id === selected
          return (
            <button
              key={panel.id}
              ref={(node) => {
                if (node) tabRefs.current.set(panel.id, node)
                else tabRefs.current.delete(panel.id)
              }}
              id={`tab-${panel.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${panel.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(panel.id)}
              className="relative min-h-tap rounded-pill px-6 text-sm font-semibold text-text-muted transition-colors duration-orientation-near ease-enter hover:text-text aria-selected:text-on-primary"
            >
              {panel.label}
            </button>
          )
        })}
      </div>

      <div className="tab-panels mt-8" data-fading={fading}>
        {panels.map((panel) => (
          <div
            key={panel.id}
            id={`panel-${panel.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${panel.id}`}
            hidden={panel.id !== shown}
            tabIndex={0}
          >
            {panel.content}
          </div>
        ))}
      </div>
    </div>
  )
}
