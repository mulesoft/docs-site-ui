;(() => {
  'use strict'

  const STORAGE_KEY = 'docs-theme'
  const DARK = 'dark'
  const LIGHT = 'light'

  const getPreferred = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT

  const getStored = () => localStorage.getItem(STORAGE_KEY)

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    updateButtons(theme)
  }

  const updateButtons = (theme) => {
    const isDark = theme === DARK
    document.querySelectorAll('.dark-mode-toggle').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(isDark))
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode')
      const img = btn.querySelector('img')
      if (!img) return
      const base = btn.getAttribute('data-ui-root') || ''
      img.src = isDark ? `${base}/img/icons/light-mode.svg` : `${base}/img/icons/dark-mode.svg`
      img.alt = isDark ? 'Sun icon' : 'Moon icon'
    })
  }

  const toggle = () => {
    const current = document.documentElement.getAttribute('data-theme') || getPreferred()
    const next = current === DARK ? LIGHT : DARK
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
  }

  const markBroken = (img) => img.classList.add('img-broken')

  const init = () => {
    applyTheme(getStored() || getPreferred())

    document.querySelectorAll('.doc .imageblock img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) markBroken(img)
      else img.addEventListener('error', () => markBroken(img))
    })

    document.querySelectorAll('.dark-mode-toggle').forEach((btn) => {
      btn.addEventListener('click', toggle)
    })

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!getStored()) {
          applyTheme(e.matches ? DARK : LIGHT)
        }
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
