import type { ReactNode } from 'react'
import { stagger } from '@/lib/motion'

type Props = {
  id?: string
  eyebrow: string
  /** Put one keyword in `<em>` for the italic rhythm. */
  title: ReactNode
  lead?: ReactNode
  align?: 'start' | 'center'
  className?: string
}

export function SectionHeading({ id, eyebrow, title, lead, align = 'start', className = '' }: Props) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-measure ${className}`}>
      <p className="eyebrow mb-3" data-reveal style={stagger(0)}>
        {eyebrow}
      </p>
      <h2 id={id} className="text-2xl" data-reveal style={stagger(1)}>
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-lg text-text-muted in-[.on-inverse]:text-text-inverse/85 ${centered ? 'mx-auto' : ''}`}
          data-reveal
          style={stagger(2)}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
