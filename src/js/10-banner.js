;(function () {
  'use strict'

  enhanceTopBanner()
  enhanceNoticeBanner()

  function enhanceTopBanner () {
    var topBannerDiv = document.querySelector('.top-banner')
    if (topBannerDiv) makeBannerCloseButtonFunctional(topBannerDiv, '.top-banner-close-button', 'flex')
  }

  function enhanceNoticeBanner () {
    var noticeBannerDiv = document.querySelector('.notice-banner')
    if (noticeBannerDiv) {
      makeSticky(noticeBannerDiv)
      makeBannerCloseButtonFunctional(noticeBannerDiv, '.notice-banner-close-button')
    }
  }

  function makeBannerCloseButtonFunctional (bannerDiv, buttonClassName, classToRemove) {
    var closeButton = document.querySelector(buttonClassName)
    if (closeButton) addEventListeners(bannerDiv, closeButton, classToRemove)
  }

  function makeSticky (noticeBannerDiv) {
    var toolbar = document.querySelector('.toolbar')
    var sticky = noticeBannerDiv.offsetTop
    window.onscroll = function () {
      if (window.pageYOffset + toolbar.offsetHeight + 10 > sticky) {
        noticeBannerDiv.classList.add('sticky')
      } else {
        noticeBannerDiv.classList.remove('sticky')
      }
    }
  }

  function addEventListeners (bannerDiv, closeButton, classToRemove) {
    closeButton.addEventListener('click', function (_e) {
      if (bannerDiv) hideBanner(bannerDiv, classToRemove)
    })
    closeButton.addEventListener('keydown', function (e) {
      if (isSpaceOrEnterKey(e.keyCode)) {
        if (bannerDiv) {
          hideBanner(bannerDiv, classToRemove)
          e.preventDefault()
        }
      }
    })
  }

  function hideBanner (bannerDiv, classToRemove) {
    bannerDiv.classList.add('hide')
    if (classToRemove) bannerDiv.classList.remove(classToRemove)
  }

  function isSpaceOrEnterKey (keyCode) {
    return [13, 32].includes(keyCode)
  }
})()
