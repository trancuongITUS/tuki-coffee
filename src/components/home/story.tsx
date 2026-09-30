import { Bean, Flame, HandHeart } from 'lucide-react'
import { site } from '@/content/site'
import { DrinkArt } from '@/components/drink-art'
import { SectionHeading } from '@/components/section-heading'
import { stagger } from '@/lib/motion'

const valueIcons = { bean: Bean, flame: Flame, 'hand-heart': HandHeart }

/** The page's single espresso block: the strongest contrast mid-page. */
export function Story() {
  return (
    <section id="cau-chuyen" aria-labelledby="story-title" className="px-2">
      <div className="on-inverse rounded-xl py-section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div
            className="mx-auto grid aspect-square w-full max-w-xs place-items-center rounded-blob bg-highlight text-on-highlight [--art-bg:var(--color-highlight)] sm:max-w-sm lg:max-w-md"
            data-reveal
            aria-hidden="true"
          >
            <DrinkArt shape="cup" className="w-3/5" />
          </div>

          <div>
            <SectionHeading
              id="story-title"
              eyebrow="Câu chuyện Tuki"
              title={
                <>
                  Chậm lại, <em>một chút thôi</em>
                </>
              }
            />
            <div className="mt-6 grid max-w-measure gap-4 text-text-inverse/85">
              {site.story.paragraphs.map((paragraph, index) => (
                <p key={paragraph} data-reveal style={stagger(index + 2)}>
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {site.story.values.map((value, index) => {
                const Icon = valueIcons[value.icon]
                return (
                  <li key={value.title} data-reveal style={stagger(index + 4)}>
                    <Icon className="size-6" aria-hidden="true" />
                    <h3 className="mt-3 text-lg">{value.title}</h3>
                    <p className="mt-1 text-sm text-text-inverse/85">{value.text}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
