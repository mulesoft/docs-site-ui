;(() => {
  'use strict'

  const addCloseButton = (noticeBannerDiv) => {
    let closeButton = document.createElement('button')
    closeButton = addCloseButtonAttributes(closeButton)
    noticeBannerDiv.appendChild(closeButton)
  }

  const addCloseButtonAttributes = (closeButton) => {
    closeButton.title = 'Close notice banner'
    closeButton.classList.add('close-button')
    const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    closeButton.innerHTML = `<img loading="lazy" src="${uiRootPath}/img/icons/close.svg" alt="">`
    return closeButton
  }

  const addEventListeners = (bannerDiv, classToRemove) => {
    const closeButton = bannerDiv.querySelector('.close-button')
    if (closeButton) {
      closeButton.addEventListener('click', () => hideBanner(bannerDiv, classToRemove))
      closeButton.addEventListener('keydown', (e) => {
        if (isSpaceOrEnterKey(e.keyCode)) {
          if (bannerDiv) {
            if (isTopBanner(bannerDiv)) {
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
  }

  const enhanceNoticeBanner = (noticeBannerDiv) => addEventListeners(noticeBannerDiv)
  const enhanceTopBanner = (topBannerDiv) => addEventListeners(topBannerDiv, 'flex')

  const getNextFocusableElement = () => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement)
    let nextIndex = currentIndex + 1 >= focusableElements.length ? 0 : currentIndex + 1
    while (focusableElements[nextIndex]) {
      const currElement = focusableElements[nextIndex]
      if (isVisible(currElement) && !insideBanners(currElement)) return currElement
      nextIndex++
    }
  }

  const hasCloseButton = (element) => element.firstChild?.tagName === 'BUTTON'

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

  const isSpaceOrEnterKey = (keyCode) => [13, 32].includes(keyCode)
  const isTopBanner = (element) => element.classList.contains('top-banner')
  const isVisible = (element) =>
    !element.classList.contains('hide') && window.getComputedStyle(element).display !== 'none'

  const moveBanner = (bannerDiv) => {
    const existingBanner = document.querySelector('.doc .notice-banner:not(.paragraph)')
    if (existingBanner) replaceExistingBanner(bannerDiv, existingBanner)
    else {
      const doc = document.querySelector('.doc')
      if (doc) doc.parentElement.insertBefore(bannerDiv, doc)
    }
  }

  const processPartialNoticeBanner = (partialNoticeBannerDiv) => {
    partialNoticeBannerDiv.classList.add('flex')
    moveBanner(partialNoticeBannerDiv)
    if (!hasCloseButton(partialNoticeBannerDiv)) addCloseButton(partialNoticeBannerDiv)
  }

  const remove = (element) => element?.remove()

  const replaceExistingBanner = (newBanner, existingBanner) => {
    existingBanner.parent.insertBefore(newBanner, existingBanner)
    remove(existingBanner)
  }

  const partialNoticeBannerDiv = document.querySelector('.doc .notice-banner.paragraph')
  if (partialNoticeBannerDiv) processPartialNoticeBanner(partialNoticeBannerDiv)

  const topBannerDiv = document.querySelector('.top-banner')
  if (topBannerDiv) enhanceTopBanner(topBannerDiv)

  const noticeBannerDiv = document.querySelector('.notice-banner')
  if (noticeBannerDiv) enhanceNoticeBanner(noticeBannerDiv)
})()
