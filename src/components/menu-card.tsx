import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, tagLabels, type MenuItem, type MenuTag } from '@/content/menu'
import { DrinkArt, artTones } from '@/components/drink-art'

const tagStyles: Record<MenuTag, string> = {
  signature: 'bg-highlight text-on-highlight',
  moi: 'bg-fresh text-on-fresh',
  'thuan-chay': 'bg-fresh text-on-fresh',
}

type Props = {
  item: MenuItem
  /** Linked cards (home "Món đặc trưng") get hover feedback; plain /menu cards don't. */
  href?: string
}

export function MenuCard({ item, href }: Props) {
  const body = (
    <>
      <div className={`relative aspect-4/5 overflow-hidden rounded-[calc(var(--radius-md)-var(--space-1))] ${artTones[item.art.tone]}`}>
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-[scale] duration-feedback ease-enter group-hover:scale-(--motion-scale-max)"
          />
        ) : (
          <div className="grid size-full place-items-center">
            <DrinkArt
              shape={item.art.shape}
              className="w-3/5 transition-[scale] duration-feedback ease-enter group-hover:scale-(--motion-scale-max)"
            />
          </div>
        )}
        {item.tags && (
          <ul className="absolute top-3 left-3 flex flex-wrap gap-2" aria-label="Nhãn">
            {item.tags.map((tag) => (
              <li key={tag} className={`rounded-pill px-3 py-1 text-xs leading-snug font-semibold ring-2 ring-surface ${tagStyles[tag]}`}>
                {tagLabels[tag]}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="px-2 pt-4 pb-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg">{item.name}</h3>
          <span className="font-semibold whitespace-nowrap text-primary tabular-nums">{formatPrice(item.price)}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-text-muted">{item.description}</p>
      </div>
    </>
  )

  const card = 'relative block h-full rounded-md bg-surface p-3 shadow-sm'

  if (!href) return <article className={card}>{body}</article>

  // Shadow grows via a pseudo-element's opacity, never by animating box-shadow.
  return (
    <Link
      href={href}
      className={`group ${card} transition-[translate] duration-feedback ease-enter hover:hover-lift after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-lg after:transition-opacity after:duration-feedback after:ease-enter hover:after:opacity-100`}
    >
      {body}
    </Link>
  )
}
