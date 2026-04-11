;(function () {
  'use strict'

  var dropdowns = document.querySelectorAll('.page-options-dropdown')
  if (!dropdowns.length) return

  var mdUrl = window.location.href.replace(/(?:\.html)?(?=#|$)/, '.md')
  var prompt = 'Read from ' + window.location.href + ' so I can ask questions about it.'

  // Skip markdown check on localhost (local testing)
  var isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  if (!isLocalhost) {
    fetch(mdUrl, { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) {
          dropdowns.forEach(function (d) { d.remove() })
        }
      })
      .catch(function () {
        dropdowns.forEach(function (d) { d.remove() })
      })
  }

  dropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.page-options-toggle')
    var optionsPanel = dropdown.querySelector('.page-options-menu')
    var statusEl = dropdown.querySelector('.page-options-status')
    if (!toggle || !optionsPanel) return

    var menuItems = optionsPanel.querySelectorAll('[role="menuitem"]')
    if (!menuItems.length) return

    // Set href for link items
    var viewMd = optionsPanel.querySelector('[data-action="view-md"]')
    var openChatgpt = optionsPanel.querySelector('[data-action="open-chatgpt"]')
    var openClaude = optionsPanel.querySelector('[data-action="open-claude"]')
    var openGemini = optionsPanel.querySelector('[data-action="open-gemini"]')

    if (viewMd) viewMd.href = mdUrl
    if (openChatgpt) openChatgpt.href = 'https://chatgpt.com/?q=' + encodeURIComponent(prompt)
    if (openClaude) openClaude.href = 'https://claude.ai/new?q=' + encodeURIComponent(prompt)
    if (openGemini) openGemini.href = 'https://gemini.google.com/app?q=' + encodeURIComponent(prompt)

    // Copy button with tooltip
    var copyBtn = optionsPanel.querySelector('[data-action="copy-md"]')
    var copyTooltip
    if (copyBtn && typeof tippy === 'function') {
      var isFooter = dropdown.classList.contains('page-options-footer')
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

      copyBtn.addEventListener('click', function () {
        fetch(mdUrl)
          .then(function (res) { return res.text() })
          .then(function (text) {
            return navigator.clipboard.writeText(text).then(function () {
              if (statusEl) {
                statusEl.textContent = 'Copied to clipboard'
                setTimeout(function () { statusEl.textContent = '' }, 3000)
              }
              if (copyTooltip) {
                copyTooltip.show()
                setTimeout(function () { copyTooltip.hide() }, 2000)
              }
            })
          })
          .catch(function () {
            window.open(mdUrl, '_blank')
          })
        closeMenu(true)
      })
    }

    // Lock the toggle and container width so the menu doesn't stretch them
    var toggleWidth = toggle.offsetWidth
    if (toggleWidth) {
      toggle.style.width = toggleWidth + 'px'
      dropdown.style.width = dropdown.offsetWidth + 'px'
    }

    // Find scrollable ancestor that may clip the menu
    var scrollParent = dropdown.closest('.scrollbar')

    function openMenu () {
      if (scrollParent) scrollParent.style.overflow = 'visible'
      toggle.setAttribute('aria-expanded', 'true')
      optionsPanel.removeAttribute('hidden')
      optionsPanel.classList.add('is-open')
      menuItems[0].focus()
    }

    function closeMenu (restoreFocus) {
      if (scrollParent) scrollParent.style.overflow = ''
      toggle.setAttribute('aria-expanded', 'false')
      optionsPanel.classList.remove('is-open')
      optionsPanel.setAttribute('hidden', '')
      if (restoreFocus) toggle.focus()
    }

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true'
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
      var currentIndex = [].indexOf.call(menuItems, document.activeElement)

      if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault()
        var next = (currentIndex + 1) % menuItems.length
        menuItems[next].focus()
      } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        e.preventDefault()
        var prev = (currentIndex - 1 + menuItems.length) % menuItems.length
        menuItems[prev].focus()
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault()
        closeMenu(true)
      } else if (e.key === 'Tab') {
        closeMenu(false)
      }
    })

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        closeMenu(false)
      }
    })

    // Close after clicking a link item
    optionsPanel.querySelectorAll('a[role="menuitem"]').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(false)
      })
    })
  })
})()
