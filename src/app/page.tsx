import { site } from '@/content/site'
import { Hero } from '@/components/home/hero'
import { FeaturedMenu } from '@/components/home/featured-menu'
import { Story } from '@/components/home/story'
import { SpaceGallery } from '@/components/home/space-gallery'
import { Reviews } from '@/components/home/reviews'
import { Visit } from '@/components/home/visit'

export default function HomePage() {
  // Sections alternate cream / latte; the reviews block may be absent, so the last section picks its tone.
  const hasReviews = site.reviews.length > 0

  return (
    <>
      <Hero />
      <FeaturedMenu />
      <Story />
      <SpaceGallery />
      <Reviews className="bg-surface-alt" />
      <Visit className={hasReviews ? '' : 'bg-surface-alt'} />
    </>
  )
}
