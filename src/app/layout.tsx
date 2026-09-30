import type { Metadata } from 'next'
import { beVietnamPro, fraunces, frauncesAlt } from './fonts'
import { site } from '@/content/site'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { RevealObserver } from '@/components/reveal-observer'
import { siteUrl } from '@/lib/site-url'
import { themeInitScript } from '@/lib/theme'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${frauncesAlt.variable} ${beVietnamPro.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-pill bg-surface px-6 py-3 font-semibold text-primary shadow-md focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-toast)"
        >
          Bỏ qua, tới nội dung chính
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
