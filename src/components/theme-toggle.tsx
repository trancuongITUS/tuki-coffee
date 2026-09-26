'use client'

import { Moon, Sun } from 'lucide-react'
import { buttonStyles } from '@/components/ui/button-styles'
import { THEME_STORAGE_KEY } from '@/lib/theme'

const systemPrefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

function toggleTheme() {
  const root = document.documentElement
  const current = root.dataset.theme ?? (systemPrefersDark() ? 'dark' : 'light')
  const next = current === 'dark' ? 'light' : 'dark'
  root.dataset.theme = next
  try {
    // Picking what the OS already prefers means "follow the OS" again on the next visit.
    if ((next === 'dark') === systemPrefersDark()) localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    // Storage blocked (private mode): the choice still applies for this page view.
  }
}

/** The icon follows the same `dark:` rule as the tokens, so server HTML and client always agree. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Đổi giao diện sáng/tối"
      title="Đổi giao diện sáng/tối"
      className={buttonStyles('icon', className)}
    >
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  )
}
