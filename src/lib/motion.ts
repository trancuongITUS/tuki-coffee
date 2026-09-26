import type { CSSProperties } from 'react'

/** Vị trí trong chuỗi stagger; CSS nhân với `--motion-stagger-step`. */
export function stagger(index: number): CSSProperties {
  return { '--i': index } as CSSProperties
}

/** Đọc một token thời lượng (ví dụ `--motion-duration-orientation-near`) ra mili giây. */
export function readDuration(token: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  const amount = parseFloat(value)
  if (Number.isNaN(amount)) return 0
  return value.endsWith('ms') ? amount : amount * 1000
}
