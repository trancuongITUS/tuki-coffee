import Image from 'next/image'
import { site } from '@/content/site'
import { SectionHeading } from '@/components/section-heading'
import { stagger } from '@/lib/motion'

/**
 * Static grid (no auto-playing carousel). On large screens the first photo
 * spans 2×2 so six photos tile a 3-column grid without gaps.
 */
export function SpaceGallery() {
  return (
    <section id="khong-gian" aria-labelledby="space-title" className="py-section">
      <div className="container-page">
        <SectionHeading
          id="space-title"
          eyebrow="Không gian quán"
          title={
            <>
              Một góc <em>để ở lại</em>
            </>
          }
          lead="Ánh sáng ấm, bàn gỗ và chỗ ngồi đủ rộng cho một buổi chiều dài."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.gallery.map((photo, index) => (
            <li
              key={photo.caption}
              data-reveal
              style={stagger(index)}
              className={index === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}
            >
              <figure className="flex h-full flex-col gap-2">
                <div
                  className={`relative overflow-hidden rounded-lg ${
                    index === 0 ? 'aspect-4/3 lg:aspect-auto lg:flex-1' : 'aspect-4/3'
                  }`}
                >
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      loading="lazy"
                      sizes={index === 0 ? '(min-width: 1024px) 50rem, 100vw' : '(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw'}
                      className="object-cover"
                    />
                  ) : (
                    <div role="img" aria-label={`Ảnh tạm: ${photo.alt}`} className="placeholder-hatch grid size-full place-items-center">
                      <span className="rounded-pill bg-surface px-3 py-1 text-xs font-semibold text-text-muted">
                        Ảnh sắp có
                      </span>
                    </div>
                  )}
                </div>
                <figcaption className="text-sm text-text-muted">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
