import type { Metadata } from 'next'
import { categories, menu } from '@/content/menu'
import { MenuCard } from '@/components/menu-card'
import { MenuTabs } from '@/components/menu-tabs'
import { OpenStatus } from '@/components/open-status'
import { stagger } from '@/lib/motion'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Menu Tuki Coffee: cà phê, trà và bánh kèm giá.',
}

export default function MenuPage() {
  const panels = categories.map((category) => ({
    id: category.id,
    label: category.label,
    content: (
      <>
        <h2 className="sr-only">{category.label}</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menu
            .filter((item) => item.category === category.id)
            .map((item) => (
              <li key={item.id}>
                <MenuCard item={item} />
              </li>
            ))}
        </ul>
      </>
    ),
  }))

  return (
    <section aria-labelledby="menu-title" className="pt-8 pb-section lg:pt-12">
      <div className="container-page">
        <div className="max-w-measure">
          <p className="eyebrow mb-3" data-reveal>
            Menu
          </p>
          <h1 id="menu-title" className="text-3xl" data-reveal style={stagger(1)}>
            Thực đơn <em>Tuki</em>
          </h1>
          <p className="mt-4 text-lg text-text-muted" data-reveal style={stagger(2)}>
            Cà phê rang mộc, trà thơm và bánh nướng mỗi ngày.
          </p>
          <OpenStatus className="mt-4" />
        </div>

        <div className="mt-10" data-reveal style={stagger(3)}>
          <MenuTabs panels={panels} />
        </div>
      </div>
    </section>
  )
}
