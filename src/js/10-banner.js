;(() => {
  'use strict'

  const processPartialNoticeBanner = () => {
    const partialNoticeBannerDiv = document.querySelector('.doc .notice-banner.paragraph')
    if (partialNoticeBannerDiv) {
      removeExistingNoticeBanner()
      moveNoticeBannerToDoc(partialNoticeBannerDiv)
      addCloseButton(partialNoticeBannerDiv)
    }
  }

  const removeExistingNoticeBanner = () => {
    const versionNoticeBannerDiv = document.querySelector('.doc .notice-banner:not(.paragraph)')
    if (versionNoticeBannerDiv) versionNoticeBannerDiv.remove()
  }

  const moveNoticeBannerToDoc = (noticeBannerDiv) => {
    const doc = document.querySelector('.doc')
    if (doc) doc.insertBefore(noticeBannerDiv, doc.firstChild)
  }

  const addCloseButton = (noticeBannerDiv) => {
    if (noticeBannerDiv.firstChild?.tagName !== 'BUTTON') {
      const closeButton = document.createElement('button')
      closeButton.title = 'Close notice banner'
      closeButton.classList.add('notice-banner-close-button')
      closeButton.classList.add('button')
      closeButton.innerHTML = '&times;'
      noticeBannerDiv.insertBefore(closeButton, noticeBannerDiv.firstChild)
    }
  }

  const enhanceTopBanner = () => {
    const topBannerDiv = document.querySelector('.top-banner')
    if (topBannerDiv) {
      makeBannerCloseButtonFunctional(topBannerDiv, 'flex')
    }
  }

  const enhanceNoticeBanner = () => {
    const noticeBannerDiv = document.querySelector('.notice-banner')
    if (noticeBannerDiv) {
      makeBannerCloseButtonFunctional(noticeBannerDiv)
    }
  }

  const makeBannerCloseButtonFunctional = (bannerDiv, classToRemove) => {
    const closeButton = bannerDiv.querySelector('.close-button')
    if (closeButton) {
      addEventListeners(bannerDiv, closeButton, classToRemove)
    }
  }

  const addEventListeners = (bannerDiv, closeButton, classToRemove) => {
    closeButton.addEventListener('click', (_e) => {
      if (bannerDiv) hideBanner(bannerDiv, classToRemove)
    })
    closeButton.addEventListener('keydown', (e) => {
      if (isSpaceOrEnterKey(e.keyCode)) {
        if (bannerDiv) {
          if (bannerDiv.classList.contains('top-banner')) {
            const menuButton = document.querySelector('.nav-toggle')
            if (menuButton && window.getComputedStyle(menuButton).display !== 'none') {
              menuButton.focus()
            } else {
              const nextFocusableElement = getNextFocusableElement()
              if (nextFocusableElement) nextFocusableElement.focus()
            }
          } else {
            const nextFocusableElement = getNextFocusableElement()
            if (nextFocusableElement) nextFocusableElement.focus()
          }
          hideBanner(bannerDiv, classToRemove)
          e.preventDefault()
        }
      }
    })
  }

  const getNextFocusableElement = () => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const focusedElement = document.activeElement
    const currentIndex = Array.from(focusableElements).indexOf(focusedElement)
    let nextIndex = currentIndex + 1 >= focusableElements.length ? 0 : currentIndex + 1
    while (focusableElements[nextIndex]) {
      const currElement = focusableElements[nextIndex]
      if (isVisible(currElement) && !insideBanners(currElement)) return currElement
      nextIndex++
    }
  }

  const hideBanner = (bannerDiv, classToRemove) => {
    bannerDiv.classList.add('hide')
    if (classToRemove) bannerDiv.classList.remove(classToRemove)
  }

  const insideBanners = (element) => {
    const banners = document.querySelectorAll('.banner')
    for (let i = 0; i < banners.length; i++) {
      const banner = banners[i]
      if (banner.contains(element)) return true
    }
    return false
  }

  const isSpaceOrEnterKey = (keyCode) => {
    return [13, 32].includes(keyCode)
  }

  const isVisible = (element) => {
    return !element.classList.contains('hide') && window.getComputedStyle(element).display !== 'none'
  }

  processPartialNoticeBanner()
  enhanceTopBanner()
  enhanceNoticeBanner()
})()
