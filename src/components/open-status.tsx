'use client'

import { useSyncExternalStore } from 'react'
import { Clock } from 'lucide-react'
import { site } from '@/content/site'
import { getOpenStatus, hoursSummary } from '@/lib/opening-hours'

// Re-check twice a minute so the label flips close to the real opening/closing time.
const RECHECK_INTERVAL = 30_000

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, RECHECK_INTERVAL)
  return () => window.clearInterval(id)
}

/** Current minute: stable between renders, changes when the status could change. */
const getMinute = () => Math.floor(Date.now() / 60_000)
const getServerMinute = () => null

/**
 * "Đang mở cửa · đóng lúc 22:00" / "Đã đóng · mở lúc 7:00", computed in the
 * shop's time zone. The server (static HTML) renders the hours summary on the
 * same single line, so hydration swaps text without shifting layout.
 */
export function OpenStatus({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute)
  const status = minute === null ? null : getOpenStatus(site.hours, new Date(minute * 60_000), site.timeZone)

  return (
    <p className={`inline-flex items-center gap-2 text-sm text-text-muted ${className}`} style={style}>
      <span
        aria-hidden="true"
        className={`size-2.5 flex-none rounded-pill ${status === null ? 'bg-border-strong' : status.isOpen ? 'bg-fresh' : 'bg-danger'}`}
      />
      <Clock className="size-5" aria-hidden="true" />
      {status === null ? (
        <span>{hoursSummary(site.hours)}</span>
      ) : status.isOpen ? (
        <span>
          <strong className="font-semibold text-text">Đang mở cửa</strong> · đóng lúc {status.closesAt}
        </span>
      ) : (
        <span>
          <strong className="font-semibold text-text">Đã đóng</strong>
          {status.opensAt && ` · mở lúc ${status.opensAt}${status.opensOn ? ` ${status.opensOn}` : ''}`}
        </span>
      )}
    </p>
  )
}
