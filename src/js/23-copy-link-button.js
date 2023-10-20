;(() => {
  'use strict'

  const uiRootPath = document.getElementById('site-script').dataset.uiRootPath

  const createCopyLinkBtn = (href) => {
    const btn = document.createElement('button')
    const img = document.createElement('img')
    const copyText = 'Copy link to clipboard'

    btn.appendChild(img)
    btn.setAttribute('aria-label', copyText)
    btn.setAttribute('data-href', href)
    btn.classList.add('button-copy-link')
    btn.addEventListener('click', copyLinkToClipboard.bind(btn, href))
    img.setAttribute('alt', copyText)
    img.classList.add('anchor-image')
    img.src = `${uiRootPath}/img/icons/anchor.svg`
    return btn
  }

  function copyLinkToClipboard (linkToCopy) {
    window.navigator.clipboard.writeText(linkToCopy).then(
      function () {
        this.classList.add('clicked')
      }.bind(this),
      function () {}
    )
  }

  const convertSectAnchors = () => {
    document.querySelectorAll('.anchor').forEach((anchor) => {
      const parentHeading = anchor.parentElement
      const headerText = parentHeading.textContent
      if (headerText) {
        const copyLinkBtn = createCopyLinkBtn(anchor.href)
        //anchor.setAttribute('aria-label', `Jump to ${headerText}`)
        parentHeading.replaceChild(copyLinkBtn, anchor);
      }
    })
  }
  const addCopyLinkTooltips = () => {
    document.querySelectorAll('.button-copy-link').forEach((button) => {
      createTooltip(button, 'mouseenter', 'Copy link to clipboard')
      createTooltip(button, 'click', 'Copied')
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
      touchHold: true, // maps touch as click (for some reason)
      zIndex: 'var(--z-nav-mobile)'
    })
  }

  convertSectAnchors()
  addCopyLinkTooltips()
})()
