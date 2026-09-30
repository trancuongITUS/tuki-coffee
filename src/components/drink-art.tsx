import type { ArtShape, ArtTone } from '@/content/menu'

/** Tone = background block + illustration colour. `--art-bg` lets shapes cut "negative space" in the block colour. */
export const artTones: Record<ArtTone, string> = {
  caramel: 'bg-highlight text-on-highlight [--art-bg:var(--color-highlight)]',
  espresso: 'bg-surface-inverse text-text-inverse [--art-bg:var(--color-surface-inverse)]',
  matcha: 'bg-fresh text-on-fresh [--art-bg:var(--color-fresh)]',
  latte: 'bg-surface-alt text-primary [--art-bg:var(--color-surface-alt)]',
}

function Cup() {
  return (
    <>
      <path d="M40 80h110v50a45 45 0 0 1-45 45H85a45 45 0 0 1-45-45Z" fill="currentColor" />
      <path d="M150 92h10a20 20 0 0 1 0 40h-12" fill="none" stroke="currentColor" strokeWidth="10" />
      <path d="M62 98c14 8 52 8 66 0" fill="none" stroke="var(--art-bg)" strokeWidth="6" strokeLinecap="round" opacity=".5" />
      <rect x="28" y="178" width="134" height="10" rx="5" fill="currentColor" opacity=".5" />
    </>
  )
}

function Glass() {
  return (
    <>
      <path d="M106 150 128 12" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M68 86h64l-6 94H74Z" fill="currentColor" />
      <rect x="80" y="98" width="18" height="18" rx="4" fill="var(--art-bg)" opacity=".45" transform="rotate(-12 89 107)" />
      <rect x="102" y="112" width="16" height="16" rx="4" fill="var(--art-bg)" opacity=".45" transform="rotate(10 110 120)" />
      <path d="M58 40h84l-11 142a10 10 0 0 1-10 9H79a10 10 0 0 1-10-9Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
    </>
  )
}

function Cake() {
  return (
    <>
      <path d="M36 122 150 80a10 10 0 0 1 14 9v33Z" fill="currentColor" opacity=".55" />
      <path d="M36 122h128v46a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8Z" fill="currentColor" />
      <rect x="36" y="142" width="128" height="8" fill="var(--art-bg)" opacity=".6" />
      <circle cx="132" cy="80" r="11" fill="currentColor" />
      <rect x="24" y="182" width="152" height="10" rx="5" fill="currentColor" opacity=".5" />
    </>
  )
}

const shapes: Record<ArtShape, () => React.JSX.Element> = { cup: Cup, glass: Glass, cake: Cake }

/** Placeholder illustration for a menu item until real photography is available. */
export function DrinkArt({ shape, className = '' }: { shape: ArtShape; className?: string }) {
  const Shape = shapes[shape]
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <Shape />
    </svg>
  )
}
