import { site } from '@/content/site'
import { groupHours } from '@/lib/opening-hours'

export function HoursList({ className = '' }: { className?: string }) {
  return (
    <dl className={`grid gap-2 text-sm ${className}`}>
      {groupHours(site.hours).map((group) => (
        <div key={group.days} className="flex justify-between gap-4">
          <dt className="text-text-muted">{group.days}</dt>
          <dd className="font-semibold tabular-nums">{group.range}</dd>
        </div>
      ))}
    </dl>
  )
}
