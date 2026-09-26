/**
 * Light/dark choice. With no stored choice the site follows the OS
 * (`prefers-color-scheme`); a stored choice is applied as `data-theme` on
 * <html>, which tokens.css and the Tailwind `dark:` variant both honour.
 */
export const THEME_STORAGE_KEY = 'tuki-theme'

/**
 * Inline <head> script, runs before first paint: marks JS as available (for
 * animation start states) and restores the stored theme without a flash.
 */
export const themeInitScript = `(function(){var r=document.documentElement;r.classList.add('js');try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')r.dataset.theme=t}catch(e){}})()`
