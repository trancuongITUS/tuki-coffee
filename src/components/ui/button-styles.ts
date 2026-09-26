export type ButtonVariant = 'primary' | 'secondary' | 'secondary-on-alt' | 'icon'

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill border-[1.5px] font-semibold leading-none whitespace-nowrap select-none transition-[background-color,color,scale] duration-feedback ease-enter active:press-scale'

const variants: Record<ButtonVariant, string> = {
  // The single primary CTA per screen ("Xem menu").
  primary: 'min-h-12 px-6 border-transparent bg-accent text-on-accent hover:bg-accent-hover',
  secondary:
    'min-h-12 px-6 border-primary bg-transparent text-primary hover:bg-surface-alt',
  // Secondary on a latte section, where a latte hover would be invisible.
  'secondary-on-alt':
    'min-h-12 px-6 border-primary bg-transparent text-primary hover:bg-surface',
  icon: 'size-tap border-border-strong bg-transparent text-text hover:bg-surface-alt',
}

export function buttonStyles(variant: ButtonVariant, className = '') {
  return `${base} ${variants[variant]} ${className}`.trim()
}

/** Ghost/link: primary text, 1.5px underline offset 4px. */
export const linkStyles =
  'text-primary underline decoration-[1.5px] underline-offset-4 transition-colors duration-feedback ease-enter hover:text-text'
