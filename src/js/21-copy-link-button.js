;(() => {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
  const copyHoverText = MSCX.l10n.getMessage('copy-link-hover-text')
  const copiedText = MSCX.l10n.getMessage('copy-link-copied-text')

  const createCopyLinkBtn = (href) => {
    const btn = document.createElement('button')
    const img = document.createElement('img')

    btn.appendChild(img)
    btn.setAttribute('aria-label', copyHoverText)
    btn.classList.add('button-copy-link')
    btn.addEventListener('click', copyLinkToClipboard.bind(btn, href))
    img.setAttribute('alt', copyHoverText)
    img.classList.add('anchor-image')
    img.src = `${uiRootPath}/img/icons/anchor.svg`
    return btn
  }

  function copyLinkToClipboard (linkToCopy) {
    window.navigator.clipboard.writeText(linkToCopy)
  }

  const convertSectAnchors = () => {
    document.querySelectorAll('.anchor').forEach((anchor) => {
      const parentHeading = anchor.parentElement
      const headerText = parentHeading.textContent
      if (headerText) {
        const copyLinkBtn = createCopyLinkBtn(anchor.href)
        parentHeading.replaceChild(copyLinkBtn, anchor)
      }
    })
  }

  const addCopyLinkTooltips = () => {
    document.querySelectorAll('.button-copy-link').forEach((button) => {
      createTooltip(button, 'mouseenter', copyHoverText)
      createTooltip(button, 'click', copiedText)
    })
  }

  const createTooltip = (btn, eventType, msg) => {
    tippy(btn, {
      arrow: tippy.roundArrow,
      animation: 'shift-away',
      content: msg,
      delay: 200,
      maxWidth: 240,
      placement: 'bottom',
      trigger: eventType,
      theme: 'copy-link-popover',
      touchHold: true,
      zIndex: 'var(--z-nav-mobile)',
    })
  }

  convertSectAnchors()
  addCopyLinkTooltips()
})()
