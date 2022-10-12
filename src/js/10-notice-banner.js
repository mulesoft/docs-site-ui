;(function () {
  'use strict'

  var noticeBannerContainer = document.querySelector('.notice-banner')
  if (noticeBannerContainer) {
    var toolbar = document.querySelector('.toolbar')
    var sticky = noticeBannerContainer.offsetTop
    window.onscroll = function () {
      makeSticky(noticeBannerContainer, toolbar, sticky)
    }
  }

  var noticeBannerCloseButton = document.querySelector('.notice-banner-close')
  if (noticeBannerCloseButton) {
    noticeBannerCloseButton.addEventListener('click', function (e) {
      if (noticeBannerContainer) {
        noticeBannerContainer.classList.add('hide')
      }
    })
    noticeBannerCloseButton.addEventListener('keydown', function (e) {
      if (isSpaceOrEnterKey(e.keyCode)) {
        if (noticeBannerContainer) {
          noticeBannerContainer.classList.add('hide')
          e.preventDefault()
        }
      }
    })
  }

  function makeSticky (dc, t, s) {
    if (window.pageYOffset + t.offsetHeight + 10 > s) {
      dc.classList.add('sticky')
    } else {
      dc.classList.remove('sticky')
    }
  }

  function isSpaceOrEnterKey (keyCode) {
    return [13, 32].includes(keyCode)
  }
})()
