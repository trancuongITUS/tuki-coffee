import Link from 'next/link'
import { featuredItems } from '@/content/menu'
import { MenuCard } from '@/components/menu-card'
import { SectionHeading } from '@/components/section-heading'
import { buttonStyles } from '@/components/ui/button-styles'
import { stagger } from '@/lib/motion'

export function FeaturedMenu() {
  return (
    <section aria-labelledby="featured-title" className="bg-surface-alt py-section">
      <div className="container-page">
        <SectionHeading
          id="featured-title"
          eyebrow="Món đặc trưng"
          title={
            <>
              Những ly <em>làm nên</em> Tuki
            </>
          }
          lead="Vài món khách quen gọi nhiều nhất. Bấm vào để xem cả menu kèm giá."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item, index) => (
            <li key={item.id} data-reveal style={stagger(index)}>
              <MenuCard item={item} href="/menu" />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center" data-reveal>
          <Link href="/menu" className={buttonStyles('secondary-on-alt')}>
            Xem toàn bộ menu
          </Link>
        </div>
      </div>
    </section>
  )
}
