;(function () {
  'use strict'

  const menu = document.querySelector('article.doc .ai-context-menu')
  if (!menu) return

  const copyBtn = menu.querySelector('.ai-context-copy')
  const toggle = menu.querySelector('.ai-context-toggle')
  const optionsPanel = menu.querySelector('.ai-context-options')
  const statusEl = menu.querySelector('.ai-context-status')
  const menuItems = optionsPanel.querySelectorAll('[role="menuitem"]')
  const mdUrl = window.location.href.replace(/(?:\.html)?(?=#|$)/, '.md')

  // Skip markdown check on localhost (local testing)
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  if (!isLocalhost) {
    // Check if the markdown file exists; if not, remove the dropdown
    fetch(mdUrl, { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) removeMenu()
      })
      .catch(function () {
        removeMenu()
      })
  }

  function removeMenu () {
    menu.remove()
    const doc = document.querySelector('article.doc')
    if (doc) doc.classList.add('no-ai-context')
  }

  function openMenu () {
    toggle.setAttribute('aria-expanded', 'true')
    optionsPanel.classList.add('is-open')
    menuItems[0].focus()
  }

  function closeMenu (restoreFocus) {
    toggle.setAttribute('aria-expanded', 'false')
    optionsPanel.classList.remove('is-open')
    if (restoreFocus) toggle.focus()
  }

  function showStatus (message) {
    statusEl.textContent = message
    setTimeout(function () {
      statusEl.textContent = ''
    }, 3000)
  }

  // Tooltip on the copy button for feedback
  const copyTooltip = tippy(copyBtn, {
    arrow: tippy.roundArrow,
    animation: 'shift-away',
    content: 'Copied!',
    delay: 200,
    maxWidth: 240,
    placement: 'bottom',
    trigger: 'manual',
    theme: 'copy-link-popover',
    zIndex: 'var(--z-nav-mobile)',
  })

  function doCopy () {
    fetch(mdUrl)
      .then(function (res) {
        return res.text()
      })
      .then(function (text) {
        return navigator.clipboard.writeText(text).then(function () {
          showStatus('Copied to clipboard')
          copyTooltip.show()
          setTimeout(function () {
            copyTooltip.hide()
          }, 2000)
        })
      })
      .catch(function () {
        window.open(mdUrl, '_blank')
      })
  }

  copyBtn.addEventListener('click', function () {
    doCopy()
  })

  toggle.addEventListener('click', function () {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    if (expanded) {
      closeMenu(false)
    } else {
      openMenu()
    }
  })

  toggle.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault()
      openMenu()
    }
  })

  optionsPanel.addEventListener('keydown', function (e) {
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

  optionsPanel.addEventListener('click', function (e) {
    const button = e.target.closest('[data-action]')
    if (!button) return

    const action = button.getAttribute('data-action')
    if (action === 'copy-md') {
      doCopy()
    } else if (action === 'view-md') {
      window.open(mdUrl, '_blank')
    } else if (action === 'open-chatgpt') {
      const prompt = 'Read from ' + window.location.href + ' so I can ask questions about it.'
      const chatgptUrl = 'https://chatgpt.com/?q=' + encodeURIComponent(prompt)
      window.open(chatgptUrl, '_blank')
    } else if (action === 'open-claude') {
      const claudePrompt = 'Read from ' + window.location.href + ' so I can ask questions about it.'
      const claudeUrl = 'https://claude.ai/new?q=' + encodeURIComponent(claudePrompt)
      window.open(claudeUrl, '_blank')
    } else if (action === 'open-gemini') {
      const geminiPrompt = 'Read from ' + window.location.href + ' so I can ask questions about it.'
      const geminiUrl = 'https://gemini.google.com/app?q=' + encodeURIComponent(geminiPrompt)
      window.open(geminiUrl, '_blank')
    }

    closeMenu(true)
  })

  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target)) {
      closeMenu(false)
    }
  })
})()
