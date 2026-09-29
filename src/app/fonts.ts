import { Be_Vietnam_Pro } from 'next/font/google'
import localFont from 'next/font/local'

/*
 * Fraunces is self-hosted: each file is pinned to SOFT 100, WONK 1 and keeps only the opsz axis,
 * so it is ~40KB instead of Google's 100-150KB. Rebuild with docs/design-system/tools/build-fonts.py.
 *
 * Headings above the fold only need upright 600, so that face is the one preloaded. The italic
 * accents and the drawer's 400 weight live in a second family that loads when first used.
 */
export const fraunces = localFont({
  src: './fonts/fraunces-600.woff2',
  weight: '600',
  variable: '--font-fraunces',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

export const frauncesAlt = localFont({
  src: [
    { path: './fonts/fraunces-600-italic.woff2', weight: '600', style: 'italic' },
    { path: './fonts/fraunces-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/fraunces-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-fraunces-alt',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Times New Roman',
})

export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})
