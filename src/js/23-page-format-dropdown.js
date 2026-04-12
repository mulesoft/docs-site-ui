;(() => {
  'use strict'

  const dropdowns = document.querySelectorAll('.page-options-dropdown')
  if (!dropdowns.length) return

  const mdUrl = window.location.href.replace(/(?:\.html)?(?=#|$)/, '.md')
  const prompt = 'Read from ' + window.location.href + ' so I can ask questions about it.'

  // Skip markdown check on localhost (local testing)
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  if (!isLocalhost) {
    fetch(mdUrl, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          dropdowns.forEach((d) => {
            d.remove()
          })
        }
      })
      .catch(() => {
        dropdowns.forEach((d) => {
          d.remove()
        })
      })
  }

  // Adjust sidebar top when banners are visible
  const sidebar = document.querySelector('.toc-sidebar')
  if (sidebar) {
    const adjustSidebarTop = () => {
      let offset = 0
      const topBanner = document.querySelector('.top-banner:not(.hide)')
      const noticeBanner = document.querySelector('.notice-banner:not(.hide)')
      if (topBanner) offset += topBanner.offsetHeight
      if (noticeBanner) offset += noticeBanner.offsetHeight
      sidebar.style.top = offset ? offset + 'px' : ''
    }
    adjustSidebarTop()
    // Re-check when banners are dismissed
    document.addEventListener('click', (e) => {
      if (e.target.closest('.close-button')) setTimeout(adjustSidebarTop, 100)
    })
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.page-options-toggle')
    const optionsPanel = dropdown.querySelector('.page-options-menu')
    const statusEl = dropdown.querySelector('.page-options-status')
    if (!toggle || !optionsPanel) return

    const menuItems = optionsPanel.querySelectorAll('[role="menuitem"]')
    if (!menuItems.length) return

    const scrollParent = dropdown.closest('.scrollbar')

    const openMenu = () => {
      if (scrollParent) scrollParent.style.overflow = 'visible'
      toggle.setAttribute('aria-expanded', 'true')
      optionsPanel.removeAttribute('hidden')
      optionsPanel.classList.add('is-open')
      menuItems[0].focus()
    }

    const closeMenu = (restoreFocus) => {
      if (scrollParent) scrollParent.style.overflow = ''
      toggle.setAttribute('aria-expanded', 'false')
      optionsPanel.classList.remove('is-open')
      optionsPanel.setAttribute('hidden', '')
      if (restoreFocus) toggle.focus()
    }

    // Set href for link items
    const viewMd = optionsPanel.querySelector('[data-action="view-md"]')
    const openChatgpt = optionsPanel.querySelector('[data-action="open-chatgpt"]')
    const openClaude = optionsPanel.querySelector('[data-action="open-claude"]')
    const openGemini = optionsPanel.querySelector('[data-action="open-gemini"]')

    if (viewMd) viewMd.href = mdUrl
    if (openChatgpt) openChatgpt.href = 'https://chatgpt.com/?q=' + encodeURIComponent(prompt)
    if (openClaude) openClaude.href = 'https://claude.ai/new?q=' + encodeURIComponent(prompt)
    if (openGemini) openGemini.href = 'https://gemini.google.com/app?q=' + encodeURIComponent(prompt)

    // Copy button with tooltip
    const copyBtn = optionsPanel.querySelector('[data-action="copy-md"]')
    let copyTooltip
    if (copyBtn && typeof tippy === 'function') {
      const isFooter = dropdown.classList.contains('page-options-footer')
      copyTooltip = tippy(isFooter ? toggle : copyBtn, {
        arrow: tippy.roundArrow,
        animation: 'shift-away',
        content: 'Copied!',
        delay: 200,
        maxWidth: 240,
        placement: isFooter ? 'top' : 'bottom',
        trigger: 'manual',
        theme: 'copy-link-popover',
        zIndex: 'var(--z-nav-mobile)',
      })

      copyBtn.addEventListener('click', () => {
        fetch(mdUrl)
          .then((res) => res.text())
          .then((text) =>
            navigator.clipboard.writeText(text).then(() => {
              if (statusEl) {
                statusEl.textContent = 'Copied to clipboard'
                setTimeout(() => {
                  statusEl.textContent = ''
                }, 3000)
              }
              if (copyTooltip) {
                copyTooltip.show()
                setTimeout(() => {
                  copyTooltip.hide()
                }, 2000)
              }
            })
          )
          .catch(() => {
            window.open(mdUrl, '_blank')
          })
        closeMenu(true)
      })
    }

    // Lock the toggle and container width so the menu doesn't stretch them
    const toggleWidth = toggle.offsetWidth
    if (toggleWidth) {
      toggle.style.width = toggleWidth + 'px'
      dropdown.style.width = dropdown.offsetWidth + 'px'
    }

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true'
      if (expanded) {
        closeMenu(false)
      } else {
        openMenu()
      }
    })

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault()
        openMenu()
      }
    })

    optionsPanel.addEventListener('keydown', (e) => {
      const currentIndex = [].indexOf.call(menuItems, document.activeElement)

      if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault()
        const next = (currentIndex + 1) % menuItems.length
        menuItems[next].focus()
      } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        e.preventDefault()
        const prev = (currentIndex - 1 + menuItems.length) % menuItems.length
        menuItems[prev].focus()
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault()
        closeMenu(true)
      } else if (e.key === 'Tab') {
        closeMenu(false)
      }
    })

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        closeMenu(false)
      }
    })

    // Close after clicking a link item
    optionsPanel.querySelectorAll('a[role="menuitem"]').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu(false)
      })
    })
  })
})()
