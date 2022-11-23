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
      closeButton.innerHTML = '&times;'
      noticeBannerDiv.insertBefore(closeButton, noticeBannerDiv.firstChild)
    }
  }

  const enhanceTopBanner = () => {
    const topBannerDiv = document.querySelector('.top-banner')
    if (topBannerDiv) {
      makeBannerCloseButtonFunctional(topBannerDiv, '.top-banner-close-button', 'flex')
    }
  }

  const enhanceNoticeBanner = () => {
    const noticeBannerDiv = document.querySelector('.notice-banner')
    if (noticeBannerDiv) {
      makeSticky(noticeBannerDiv)
      makeBannerCloseButtonFunctional(noticeBannerDiv, '.notice-banner-close-button')
    }
  }

  const makeBannerCloseButtonFunctional = (bannerDiv, buttonClassName, classToRemove) => {
    const closeButton = document.querySelector(buttonClassName)
    if (closeButton) {
      addEventListeners(bannerDiv, closeButton, classToRemove)
    }
  }

  const makeSticky = (bannerDiv) => {
    const toolbar = document.querySelector('.toolbar')
    const sticky = bannerDiv.offsetTop
    window.onscroll = () => {
      if (window.pageYOffset + toolbar.offsetHeight + 10 > sticky) {
        bannerDiv.classList.add('sticky')
      } else {
        bannerDiv.classList.remove('sticky')
      }
    }
  }

  const addEventListeners = (bannerDiv, closeButton, classToRemove) => {
    closeButton.addEventListener('click', (_e) => {
      if (bannerDiv) hideBanner(bannerDiv, classToRemove)
    })
    closeButton.addEventListener('keydown', (e) => {
      if (isSpaceOrEnterKey(e.keyCode)) {
        if (bannerDiv) {
          hideBanner(bannerDiv, classToRemove)
          e.preventDefault()
        }
      }
    })
  }

  const hideBanner = (bannerDiv, classToRemove) => {
    bannerDiv.classList.add('hide')
    if (classToRemove) bannerDiv.classList.remove(classToRemove)
  }

  const isSpaceOrEnterKey = (keyCode) => {
    return [13, 32].includes(keyCode)
  }

  processPartialNoticeBanner()
  enhanceTopBanner()
  enhanceNoticeBanner()
})()
